import React, { useEffect, useState, useContext } from 'react'
import { View, TouchableOpacity, Text, Platform, Image, Alert } from 'react-native'
import { WebView } from 'react-native-webview';
import { DataContext } from '../Context/Datos.Context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthStackScreen } from './AuthStackNavigation'
import { DrawerScreen } from './DrawerNavigator'
import { useWs } from '../Hooks/useWS'
const RootStack = createStackNavigator()
export const RootStackScreen = () => {
  const { token,setToken } = useContext(DataContext)

  // console.log(token)
  const Ws = useWs()
  useEffect(() => {
    Ws.FunctionsNoAuth.getToken(setToken)
  }, [])
  return (<RootStack.Navigator headerMode="none">
    {!token ?
      <RootStack.Screen name="Auth" component={AuthStackScreen} options={{ animationEnabled: false }} />
      :
      <RootStack.Screen name="App" component={DrawerScreen} options={{ animationEnabled: false }} />}

    <RootStack.Screen
      name="Modal"
      component={Modal}
      options={{
        animationEnabled: true,
        cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1]
              })
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp'
              })
            }
          };
        }
      }} />
  </RootStack.Navigator>)
}


import Slideshow from 'react-native-image-slider-show';
import { Texto } from '../UI/Text'
import Colors from '../UI/Colors'
import { Button } from '../UI/Button'
import { ScrollView } from 'react-native-gesture-handler';
import { AirbnbRating } from 'react-native-elements';



export const Modal = ({ navigation, route }) => {
  const Ws = useWs()
  const { params } = route


  switch (params.type) {
    case 'ViewMaquinas':
      const [state, setState] = useState({ showVideo: false })
      const { data } = params
      const { showVideo } = state
      function ChangeStatusVideo() {
        setState({ ...state, showVideo: !showVideo })
      }
      return (<View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ width: '85%', height: '80%' }}>
          <Card width="20%" height="30%" style={{ flex: 1 }} >

            <Button styleButton={{ backgroundColor: 'red', width: 25, height: 26, bottom: '3%', marginLeft: '102%', backgroundColor: 'transparent' }} onPress={() => { navigation.pop() }} >
              <AntDesign size={23.5} name='closecircle' color='#000' style={{ backgroundColor: 'white', borderRadius: 50 }} />
            </Button>
            <Button styleButton={{ backgroundColor: 'blue', width: 25, height: 23, bottom: '3%', marginLeft: '-0%', backgroundColor: 'transparent' }} onPress={ChangeStatusVideo} >
              {showVideo && showVideo ? <Image style={{ width: 23.84, height: 21 }} source={require('../Assets/Flecha.png')} /> : <AntDesign size={23.5} name='camerao' />}
            </Button>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 12 }}>

              {showVideo &&
                showVideo ?
                <Slideshow
                  containerStyle={{ width: '94%' }}
                  dataSource={[
                    { url: data.img }
                  ]} />
                : <WebView
                  mediaPlaybackRequiresUserAction={((Platform.OS !== 'android') || (Platform.Version >= 17)) ? false : undefined}
                  originWhitelist={['*']}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10__5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15"
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{
                    uri: data.link
                  }}
                  allow='autoplay'
                  cacheEnabled={true}
                  allowsInlineMediaPlayback={true}
                  mediaPlaybackRequiresUserAction={true}
                />
              }
            </View>
            <View style={{ flex: .6, }}>
              <Texto size={18} color='#000000' >
                {data.nombre}
              </Texto>
              <ScrollView>
                <Texto color="#454545" style={{ marginTop: 10 }} size={13} color='#000000' >
                  {data.categoria}
                </Texto>
                <Texto style={{ marginTop: 10 }} size={11} color='#000000' >
                  {data.descripcion}
                </Texto>
              </ScrollView>
            </View>
          </Card>
        </View>
      </View>)
      break;
    case 'SolicitarCodigo':
      setQrImage = params.setQrImage
      return (
        <View style={{ flex: 1, backgroundColor: 'transparent', padding: 15, justifyContent: 'center' }}>
          <View style={{ backgroundColor: Colors.Fondo1, borderRadius: 15, padding: 5 }}>
            <Texto size={15} colorLabel={Colors.TercerColor}>
              Un momento
        </Texto>
            <Texto style={{ marginTop: 30 }} size={13} colorLabel={Colors.SecondColor} >
              !Su solicitud ha sido enviada con éxito!
        </Texto>
            <Texto style={{ marginTop: 10 }} size={13} colorLabel={Colors.TercerColor} >
              ¿Deseas continuar?
        </Texto>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 80 }}>
              <Button backgroundColor="transparent" styleButton={{ marginTop: 18 }} onPress={() => navigation.pop()}>
                <Texto size={14} style={{ color: Colors.TercerColor }}>CANCELAR</Texto>
              </Button>
              <Button backgroundColor="transparent" styleButton={{ marginTop: 18, color: Colors.SecondColor }} onPress={() => {
                Ws.FunctionsNoAuth.RequestCode(params.state, navigation, setQrImage)
              }}>
                <Texto size={14} style={{ color: Colors.SecondColor }}>CONTINUAR</Texto>
              </Button>
            </View>
          </View>
        </View>)
    case 'Calificación':
      return (<View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: '85%', height: '40%' }}><Card style={{ flex: 1, backgroundColor: 'white' }} >
          {CalificarProfesor(navigation, params.iden, params.data.EsMiProfesor)}
        </Card></View>
        <Button styleButton={{ backgroundColor: 'red', width: 25, height: 26, bottom: '42%', marginLeft: '80%', backgroundColor: 'transparent' }} onPress={() => { navigation.pop() }} >
          <AntDesign size={23.5} name='closecircle' color='#000' style={{ backgroundColor: 'white', borderRadius: 50 }} />
        </Button>

      </View>)
    case 'EntrenamientoConfirmacion':
      return (<View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ><View style={{ width: '80%', height: '40%' }}><Card width="20%" height="30%" style={{ flex: 1, backgroundColor: 'white' }} >
        {EntrenamientoConfirmacion(navigation, params.EsMiProfesor, params.iden)}
      </Card></View>
      </View>)
    case 'NotificacionInvitacionASerProfesor':

    return <NotificacionInvitacionASerProfesor iden={params.iden} data={params.item} navigation={navigation}/>
    case 'NotificacionTeinvitoAmiEntrenamiento':

      const [entrenamiento, setEntrenamiento] = useState(null)
      useEffect(() => {
        Ws.FunctionsAuth.getDataAPIEntrenamientos(setEntrenamiento, params.iden)
      }, [])
      if (entrenamiento === null) {
        return <Texto>Loading</Texto>
      }
      const inscribirse = () => Ws.FunctionsAuth.postDataAPIInscribirseEntrenamiento({ estado: 1, iden_entrenamiento: params.iden }, navigation.pop())
      const darseDeBaja = () => Ws.FunctionsAuth.postDataAPIDarseDeBajaEntrenamiento({ estado: 2, iden_entrenamiento: params.iden, msg: 'Invitación rechazada.' }, navigation.pop())

      const { lun = "", mar = "", mie = "", jue = "", vie = "", sab = "", dom = "" } = entrenamiento
      const InicioHoraCadena = entrenamiento.horario.split(":", 3);
      const InicioHoraFinal = InicioHoraCadena[0]
      const InicioMinutosFinal = InicioHoraCadena[1]
      const FinalHoraCadena = entrenamiento.horario_final.split(":", 3);
      const FinalHoraFinal = FinalHoraCadena[0]
      const FinalMinutosFinal = FinalHoraCadena[1]
      return (
        <View style={{ flex: 1, backgroundColor: 'transparent', padding: 15, justifyContent: 'center' }}>
          <View style={{ backgroundColor: Colors.Fondo1, borderRadius: 15, padding: 8 }}>
            <Texto colorLabel={"white"} size={24} Bold style={{ textAlign: 'center', marginBottom: 16 }}>Invitación </Texto>
            <Texto colorLabel={"white"} size={15} style={{ marginBottom: 2 }}>
              <Texto colorLabel={"white"} size={14} Bold >Juan Gabriel </Texto>te Invito a que participes en su entrenamiento de {entrenamiento.nombre}.</Texto>
            <Texto colorLabel={"white"} size={15}  >
              <Texto colorLabel={"white"} Bold size={14}>Ubicación: </Texto>{entrenamiento.nombre_comuna}
            </Texto>
            <Texto colorLabel={"white"} size={15} >
              <Texto colorLabel={"white"} Bold size={14}>Fecha de inicio: </Texto>{`${new Date(entrenamiento.fecha).getDay()}/${new Date(entrenamiento.fecha).getMonth()}/${new Date(entrenamiento.fecha).getFullYear()}`}
            </Texto>
            <Texto colorLabel={"white"} size={15}  >
              <Texto colorLabel={"white"} Bold size={14}>Fecha de terminación:</Texto> {`${new Date(entrenamiento.fecha_final).getDay()}/${new Date(entrenamiento.fecha_final).getMonth()}/${new Date(entrenamiento.fecha_final).getFullYear()}`}
            </Texto>

            <Texto colorLabel={"white"} size={15}>
              <Texto colorLabel={"white"} Bold size={14}>Horario: </Texto> {`${InicioHoraFinal}:${InicioMinutosFinal}`} a {`${FinalHoraFinal}:${FinalMinutosFinal}`}
            </Texto>
            <Texto colorLabel={"white"} size={15}>
              <Texto colorLabel={"white"} Bold size={14}>Dias a la semana: </Texto>
              {lun === 1 ? 'Lunes' : ''}
              {((lun === 1) && (mar === 1 || mie === 1 || jue === 1 || vie === 1 || sab === 1 || dom === 1)) ? ',  ' : ''}
              {mar === 1 ? 'Martes' : ''}
              {(mie === 1 || jue === 1 || vie === 1 || sab === 1 || dom === 1) && mar == 1 ? ', ' : ''}
              {mie === 1 ? 'Miercoles' : ''}
              {(mie === 1 && (jue === 1 || vie === 1 || sab === 1 || dom === 1)) ? ',  ' : ''}
              {jue === 1 ? 'Juevs' : ''}
              {(jue === 1 && (vie === 1 || sab === 1 || dom === 1)) ? ', ' : ''}
              {vie === 1 ? 'Viernes' : ''}
              {((vie === 1) && sab === 1 || dom === 1) ? ', ' : ''}
              {sab === 1 ? 'Sabado' : ''}
              {((sab === 1) && 0 !== dom) ? ', ' : ''}
              {dom === 1 ? 'Domingo' : ''}
            </Texto>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 80 }}>
              <Button backgroundColor="transparent" styleButton={{ marginTop: 18 }} onPress={() => darseDeBaja()}>
                <Texto size={14} style={{ color: Colors.TercerColor }}>RECHAZAR</Texto>
              </Button>
              <Button backgroundColor="transparent" styleButton={{ marginTop: 18, color: Colors.SecondColor }} onPress={() => {
                inscribirse()
              }}>
                <Texto size={14} style={{ color: Colors.SecondColor }}>CONTINUAR</Texto>
              </Button>
            </View>
          </View>
        </View>)
        break;
    default:
      return (<View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity style={{ backgroundColor: 'white', padding: 20 }} onPress={() => navigation.pop()}>
          <Text>Modal me</Text>
        </TouchableOpacity>
      </View>)
  }

}


const EntrenamientoConfirmacion = (navigation, EsMiProfesor, iden) => {
  const Ws = useWs()
  const inscribirse = () => Ws.FunctionsAuth.postDataAPIInscribirseEntrenamiento({ estado: 1, iden_entrenamiento: iden }, navigation.pop())
  const darseDeBaja = () => Ws.FunctionsAuth.postDataAPIDarseDeBajaEntrenamiento({ estado: 2, iden_entrenamiento: iden }, navigation.pop())

  return <View style={{ margin: 12 }}>
    <Texto size={15} Bold>Un momento</Texto>
    <Texto size={13} style={{ marginTop: 8 }}>Está a punto de {!EsMiProfesor ? 'inscribirte a' : 'darte de baja de'} esta clase:</Texto>
    <Texto size={13} style={{ marginTop: 12 }} Bold>Pesas</Texto>
    <Texto size={13} style={{ marginTop: 2 }}>Lun - Mar - Jue</Texto>
    <Texto size={13} style={{ marginTop: 2 }} Bold>20hs -Las Condes</Texto>
    <Texto size={13} style={{ marginTop: 25 }} Bold>¿Deseas confirmar?</Texto>
    <View style={{ display: 'flex', marginTop: 15, flexDirection: 'row', justifyContent: 'space-around' }}>
      <Button size={16} Bold styleButton={{}} label={'CANCELAR'} backgroundColor={'white'} onPress={() => { navigation.pop() }} />
      <Button size={16} Bold styleButton={{}} label={'CONFIRMAR'} backgroundColor={'white'} onPress={() => { !EsMiProfesor ? inscribirse() : darseDeBaja() }} />
    </View>
  </View>
}

const CalificarProfesor = (navigation, iden, EsMiProfesor) => {
  const [state, setState] = useState(null)
  useEffect(() => {
    setState({ ...state, iden: iden, calificacion: 5 })
  }, [iden])
  const Ws = useWs()
  const handleSubmit = () => {
    if (EsMiProfesor === false) {
      Alert.alert(
        'YouTrain',
        `${'No puedes Calificar al profesor si no estas en este entrenamiento'}`,
        [
          { text: 'OK', onPress: null }
        ],
        { cancelable: false },
      )
    } else {
      Ws.FunctionsAuth.postDataAPICalificarProfesor(state, navigation.pop())
    }

  }

  return <View style={{ marginTop: 10 }}>
    <Texto size={18} Bold style={{ textAlign: 'center' }}>¿Qué te pareció esta Rutina?</Texto>
    <AirbnbRating
      count={5}
      reviews={["Terrible", "Malo", "Bien ", "Muy Bien", "Excelente"]}
      defaultRating={5}
      onFinishRating={(e) => setState({ ...state, calificacion: e })}
    />
    <Texto size={13} style={{ marginTop: 25 }} >Tu opinión nos interesa para que podamos seguir mejorando.</Texto>
    <Button size={16} Bold styleButton={{ marginTop: 20 }} label={'CALIFICAR'} onPress={() => { handleSubmit(); }} />
  </View>
}







const Card = styled.View`
width:98%;
height:97%;
background:${
  props => {
    if (props.background !== undefined) {
      return props.background
    } else { return '#fff' }
  }};
    padding-left:7%;
    padding-top:2%;
    padding-right:7%;
    border-radius:14;
`

const NotificacionInvitacionASerProfesor=(props)=>{
  const {data,iden,navigation}=props
  console.log(data,'datososss o k')
  const Ws = useWs()
  const [entrenamiento, setEntrenamiento] = useState(null)
      useEffect(() => {
        Ws.FunctionsAuth.getDataAPIEntrenamientos(setEntrenamiento, iden)
      }, [])
      if (entrenamiento === null) {
        return <Texto>Loading</Texto>
      }
      console.log(entrenamiento,'entrenamiento')
      const inscribirse = () => Ws.FunctionsAuth.postDataAPITomarEntrenamiento({ estado: 1, iden_entrenamiento: iden }, navigation.pop())
      const darseDeBaja = () => Ws.FunctionsAuth.postDataAPINoTomarEntrenamiento({ estado: 2, iden_entrenamiento: iden }, navigation.pop())

      const { lun = "", mar = "", mie = "", jue = "", vie = "", sab = "", dom = "" } = entrenamiento
      const InicioHoraCadena = entrenamiento.horario.split(":", 3);
      const InicioHoraFinal = InicioHoraCadena[0]
      const InicioMinutosFinal = InicioHoraCadena[1]
      const FinalHoraCadena = entrenamiento.horario_final.split(":", 3);
      const FinalHoraFinal = FinalHoraCadena[0]
      const FinalMinutosFinal = FinalHoraCadena[1]
      return (
        <View style={{ flex: 1, backgroundColor: 'transparent', padding: 15, justifyContent: 'center' }}>
          <View style={{ backgroundColor: Colors.Fondo1, borderRadius: 15, padding: 8 }}>
            <Texto colorLabel={"white"} size={24} Bold style={{ textAlign: 'center', marginBottom: 16 }}>¿Te Gustaría ser Profesor? </Texto>
            <Texto colorLabel={"white"} size={15} style={{ marginBottom: 2 }}>
              <Texto colorLabel={"white"} size={14} Bold >{data.nombre_user} </Texto> ah creado un nuevo entrenamiento.</Texto>
            <Texto colorLabel={"white"} size={15}  >
              <Texto colorLabel={"white"} Bold size={14}>Ubicación: </Texto>{entrenamiento.nombre_comuna}
            </Texto>
            <Texto colorLabel={"white"} size={15} >
              <Texto colorLabel={"white"} Bold size={14}>Fecha de inicio: </Texto>{`${new Date(entrenamiento.fecha).getDay()}/${new Date(entrenamiento.fecha).getMonth()}/${new Date(entrenamiento.fecha).getFullYear()}`}
            </Texto>
            <Texto colorLabel={"white"} size={15}  >
              <Texto colorLabel={"white"} Bold size={14}>Fecha de terminación:</Texto> {`${new Date(entrenamiento.fecha_final).getDay()}/${new Date(entrenamiento.fecha_final).getMonth()}/${new Date(entrenamiento.fecha_final).getFullYear()}`}
            </Texto>

            <Texto colorLabel={"white"} size={15}>
              <Texto colorLabel={"white"} Bold size={14}>Horario: </Texto> {`${InicioHoraFinal}:${InicioMinutosFinal}`} a {`${FinalHoraFinal}:${FinalMinutosFinal}`}
            </Texto>
            <Texto colorLabel={"white"} size={15}>
              <Texto colorLabel={"white"} Bold size={14}>Dias a la semana: </Texto>
              {lun === 1 ? 'Lunes' : ''}
              {((lun === 1) && (mar === 1 || mie === 1 || jue === 1 || vie === 1 || sab === 1 || dom === 1)) ? ',  ' : ''}
              {mar === 1 ? 'Martes' : ''}
              {(mie === 1 || jue === 1 || vie === 1 || sab === 1 || dom === 1) && mar == 1 ? ', ' : ''}
              {mie === 1 ? 'Miercoles' : ''}
              {(mie === 1 && (jue === 1 || vie === 1 || sab === 1 || dom === 1)) ? ',  ' : ''}
              {jue === 1 ? 'Juevs' : ''}
              {(jue === 1 && (vie === 1 || sab === 1 || dom === 1)) ? ', ' : ''}
              {vie === 1 ? 'Viernes' : ''}
              {((vie === 1) && sab === 1 || dom === 1) ? ', ' : ''}
              {sab === 1 ? 'Sabado' : ''}
              {((sab === 1) && 0 !== dom) ? ', ' : ''}
              {dom === 1 ? 'Domingo' : ''}
            </Texto>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 80 }}>
              <Button backgroundColor="transparent" styleButton={{ marginTop: 18 }} onPress={() => darseDeBaja()}>
                <Texto size={14} style={{ color: Colors.TercerColor }}>RECHAZAR</Texto>
              </Button>
              <Button backgroundColor="transparent" styleButton={{ marginTop: 18, color: Colors.SecondColor }} onPress={() => {
                inscribirse()
              }}>
                <Texto size={14} style={{ color: Colors.SecondColor }}>ACEPTAR</Texto>
              </Button>
            </View>
          </View>
        </View>)
      }