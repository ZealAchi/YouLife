import React, { memo, useContext, useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Texto } from '../../../UI/Text'
import { ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Image } from 'react-native-elements';
import { Button } from '../../../UI/Button';
import Colors from '../../../UI/Colors';
import { useWs } from '../../../Hooks/useWS';
import { Integrantes } from './Components/GrupoEntrenamientoView/Integrantes'
import * as RootNavigation from '../../../Navigations/RootNavigation';
import { ItemProfesor } from './Components/GrupoEntrenamientoView/ItemProfesor';
// import { useClock } from '../../../Hooks/useClock';
import { useTime } from '../../../Hooks/useTime';
import { DataContext } from '../../../Context/Datos.Context';
// import ItemProfesor from './ItemProfesor';
// import { DataContext } from '../../../../../Context/Data.Context';



export const GrupoEntramientoHomeView = memo(function ({ route: { params } }) {
    const { TiempoFaltante,state } = useContext(DataContext)
    const { EntrenamientoID, TipoEntrenamiento, DiasSemana } = params
    const EsMiProfesor = TipoEntrenamiento === 'Mis Entrenamientos'
    
    const Ws = useWs()
    const [entrenamiento, setEntrenamiento] = useState(null)
    const [listMembers, setListMembers] = useState(null)
// console.log(entrenamiento,'entrenamiento')
    const UT = useTime()
    // FunctionsTime
    const getDia = UT.FunctionsTime.getDayName();

    useEffect(() => {
        if (entrenamiento === null) {
            Ws.FunctionsAuth.getDataAPIEntrenamientos(setEntrenamiento, EntrenamientoID)
        }
    }, [0])

    useEffect(() => {
        if (listMembers === null) {
            Ws.FunctionsAuth.getDataAPIListMembers(setListMembers, EntrenamientoID)
        }
    }, [0])


    // const { timeString } = useClock()
    if (entrenamiento === null || listMembers === null)
        return null


    const { lun, mar, mie, jue, vie, sab, dom } = DiasSemana
    var validarDia = {
        lun: (lun === 1 ? 'lun' : '' === getDia) === false ? '' : 'lun',
        mar: (mar === 1 ? 'mar' : '' === getDia) === false ? '' : 'mar',
        mie: (mie === 1 ? 'mie' : '' === getDia) === false ? '' : 'mie',
        jue: (jue === 1 ? 'jue' : '' === getDia) === false ? '' : 'jue',
        vie: (vie === 1 ? 'vie' : '' === getDia) === false ? '' : 'vie',
        sab: (sab === 1 ? 'sab' : '' === getDia) === false ? '' : 'sab',
        dom: (dom === 1 ? 'dom' : '' === getDia) === false ? '' : 'dom',
    }
    var Arreglo = []

        if (validarDia['lun'] !== '') {
            if (getDia.toLocaleUpperCase() === 'lun'.toLocaleUpperCase()) {
                Arreglo.push('lun')
            }
        }
        if (validarDia['mar'] !== '') {
            if (getDia.toLocaleUpperCase() === 'mar'.toLocaleUpperCase()) {
                Arreglo.push('mar')
            }
        }
        if (validarDia['mie'] !== '') {
            if (getDia.toLocaleUpperCase() === 'mie'.toLocaleUpperCase()) {
                Arreglo.push('mie')
            }
        }
        if (validarDia['jue'] !== '') {
            if (getDia.toLocaleUpperCase() === 'jue'.toLocaleUpperCase()) {
                Arreglo.push('jue')
            }
        }
        if (validarDia['vie'] !== '') {
            if (getDia.toLocaleUpperCase() === 'lun'.toLocaleUpperCase()) {
                Arreglo.push('vie')
            }
        }
        if (validarDia['sab'] !== '') {
            if (getDia.toLocaleUpperCase() === 'sab'.toLocaleUpperCase()) {
                Arreglo.push('sab')
            }
        }
        if (validarDia['dom'] !== '') {
            if (getDia.toLocaleUpperCase() === 'dom'.toLocaleUpperCase()) {
                Arreglo.push('dom')

            }
        }

    return (<View style={{ backgroundColor: Colors.PrincipalColor, flex: 1 }}>
        <ScrollView style={{ flex: 1, margin: 12, backgroundColor: Colors.Fondo1, borderRadius: 15 }}>
            <View style={{ flex: 1, display: 'flex' }}>
                <View style={{ flex: 1 }}>
                    <Image
                        source={{ uri: entrenamiento.img }}
                        style={{ height: 170 }}
                        // blurRadius={15}
                        borderRadius={15}
                        resizeMode='stretch'
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
                <View style={{ flex: 0.5, display: 'flex', flex: 1, marginTop: 2, paddingTop: 5,padding:2 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Texto size={18} Bold colorLabel={Colors.TercerColor}>{entrenamiento && entrenamiento.nombre}</Texto>
                        <Texto style={{ flex: 1, textAlign: 'right' }} size={11.6} colorLabel={Colors.TercerColor}>
                            {entrenamiento && entrenamiento.horario} a {entrenamiento && entrenamiento.horario_final} hs
                        </Texto>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
                        <Texto size={11} colorLabel={Colors.TercerColor} style={{ flex: 1 }}>
                            {`${new Date(entrenamiento.fecha).getDay()}/${new Date(entrenamiento.fecha).getMonth()} a ${new Date(entrenamiento.fecha_final).getDay()}/${new Date(entrenamiento.fecha_final).getMonth()} `}

                            {lun === 1 ? 'Lu' : ''}
                            {((lun === 1) && (mar === 1 || mie === 1 || jue === 1 || vie === 1 || sab === 1 || dom === 1)) ? ' - ' : ''}
                            {mar === 1 ? 'Ma' : ''}
                            {(mie === 1 || jue === 1 || vie === 1 || sab === 1 || dom === 1) && mar == 1 ? ' - ' : ''}
                            {mie === 1 ? 'Mi' : ''}
                            {(mie === 1 && (jue === 1 || vie === 1 || sab === 1 || dom === 1)) ? '1 - ' : ''}
                            {jue === 1 ? 'Ju' : ''}
                            {(jue === 1 && (vie === 1 || sab === 1 || dom === 1)) ? ' 2- ' : ''}
                            {vie === 1 ? 'Vi' : ''}
                            {((vie === 1) && (sab === 1 || dom === 1)) ? ' - 3' : ''}
                            {sab === 1 ? 'Sa' : ''}
                            {((sab === 1) && 1 === dom) ? ' - 4' : ''}
                            {dom === 1 ? 'Dom' : ''}

                        </Texto>
                        <View style={{ flex: 1, flexDirection: 'row-reverse', alignContent: 'center' }}>
                        {JSON.stringify(Arreglo)!=='[]'?<>
                        <Texto size={11} style={{ marginLeft: 5 }} colorLabel={Colors.TercerColor}>
                                <TiempoFaltante DiaAhora={getDia} dia={Arreglo} horarioInicio={entrenamiento.horario} />
                            </Texto>
                            {state.timeString!=='Tu Entrenamiento ya empezo.'&&<AntDesign color={'white'} name={'clockcircleo'} size={12} />}
                        </>:<Texto size={11} style={{ marginLeft: 5 }} colorLabel={Colors.TercerColor} >
                            Hoy no hay entrenamiento
                                </Texto>}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Texto size={11.5} colorLabel={Colors.TercerColor} style={{ flex: 1 }}>{entrenamiento.nombre_comuna}</Texto>
                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                            <Texto size={11} colorLabel={Colors.TercerColor} style={{ textAlign: 'right' }}>{`${listMembers && listMembers.length}/${entrenamiento && entrenamiento.max}`}</Texto>
                            <FontAwesome color={'white'} name={'users'} size={10} style={{ textAlign: 'right', marginRight: 5, marginTop: 1.5 }} />
                        </View>

                    </View>
                </View>
            </View>
            <View style={{ flex: 0.6, marginBottom: 6,paddingBottom:10, borderBottomColor: '#b2bec3', borderBottomWidth: 1, borderTopWidth:entrenamiento.iden_profesor !==0? 1:0, borderTopColor:entrenamiento.iden_profesor !==0? '#b2bec3':'transparent' }}>
                {entrenamiento.iden_profesor !== 0 && <ItemProfesor iden={entrenamiento && entrenamiento.iden_profesor} EsMiProfesor={EsMiProfesor} />}
            </View>
            <View style={{ flex: 0.5, marginBottom: 12, paddingBottom: 12 }}>
                <Texto size={13} style={{ flex: 1, marginLeft: 12, marginTop: 2 }} colorLabel={Colors.TercerColor}>Integrantes:{`${listMembers && listMembers.length}/${entrenamiento && entrenamiento.max}`}</Texto>
                {listMembers && listMembers.map((item, i) => {
                    return (<Integrantes iden={item.iden_usuario} />)
                })}
            </View>
            <View style={{ flex: 1 }}>
                {/* <Texto size={11} style={{ textAlign: 'center' }} colorLabel={Colors.TercerColor}>ver más integrantes</Texto> */}
            </View>
            <View style={{ flex: 1, paddingLeft: 50, paddingRight: 50, marginTop: 12, marginBottom: 12 }}>

                <Button onPress={() => {
                    // EsMiEntrenamiento={EsMiProfesor}
                    RootNavigation.navigate('Modal', { type: 'EntrenamientoConfirmacion', EsMiProfesor: EsMiProfesor, iden: EntrenamientoID })
                }}>
                    <Texto Bold>{TipoEntrenamiento === 'Mis Entrenamientos' ? 'DAR DE BAJA' : 'INSCRIBIRSE'}</Texto>
                </Button>
            </View>
        </ScrollView>
    </View >)
})


// function TiempoFaltante(props) {
//     const { dia, horarioInicio, DiaAhora } = props
//     console.log(horarioInicio)
//     const [timeString, setTimeString] = useState('')
//     useEffect(()=>{
//         const clockInterval=setInterval(()=>{
//             const now=new Date();
//             //HH::mm:ss
//             // if (DiaAhora.toLocaleUpperCase() !== horarioInicio.toLocaleUpperCase()) {
//                 const newTimeString = formatDate(now, horarioInicio)
//                 setTimeString(newTimeString)
//             // }
//             },1000)
//             return ()=>{
//                 clearInterval(clockInterval)
//             }
//         },[])
//     return(<Texto size={11} style={{ marginLeft: 5 }} colorLabel={Colors.TercerColor} >
//         {timeString}
//     </Texto>)
// }
// function formatDate(date, horarioInicio) {
//     if (!date && !DiaAhora)
//         return ''
//     const hours = `0${date.getHours()}`.slice(-2)
//     const minutes = `0${date.getMinutes()}`.slice(-2)
//     const seconds = `0${date.getSeconds()}`.slice(-2)
//     const HoraCadena = horarioInicio.split(":", 3);
//     const HoraFinal=(HoraCadena[0])-(hours)
//     const MinutosFinal=(HoraCadena[1])-(minutes)
//     const SegundosFinal=(HoraCadena[2])-(seconds)
//     return `${HoraFinal}:${MinutosFinal}:${SegundosFinal}`

// }
