import React, { useEffect, useContext, useState } from 'react'

import { View, ImageBackground, Image, Linking, TouchableHighlight } from 'react-native'
import * as RootNavigation from'./../../../../../Navigations/RootNavigation'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import { Card, ListItem, Button, Icon, Rating } from 'react-native-elements'
import { CardItem } from 'native-base'
import { Texto } from '../../../../../UI/Text';
import { useWs } from '../../../../../Hooks/useWS';


export function ItemProfesor(props) {
    const { calificacion, comentario, estado, iden, iden_condominio, nombre, numero, tarifa, fecha, entrenamiento, EsMiProfesor } = props
    
    
    const [state, setState] = useState(null)
    const Ws = useWs()
    useEffect(() => {
        if (iden !== undefined)
            Ws.FunctionsAuth.getDataAPIProfesor(setState, iden)
    }, [iden])
    if (state === null) {
        return null
    }
    const {iden_tipo}=state
    return (
        <Card
            containerStyle={{
                padding: 0,
                height:82,
                margin: 10,
                flex: 1,
                borderRadius: entrenamiento ? 0 : 15,
            }}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1.8, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('./../../../../../Assets/Perfil1.png')}
                        style={{
                            height: 55, width: 55,
                            borderRadius: 50
                        }} />
                </View>
                <CardItem style={{ justifyContent: 'flex-end',height:80, flex: 3 }}>
                    <View style={{ flex: 1 }}>
                        <Texto size={'13'} Bold>{state.nombre}</Texto>
                        <Texto size={'9'} fontFamily='RobotoSlab-Light' colorLabel={'#717171'}>
                            <GetTypeTeacher iden={iden_tipo} />
                        </Texto>
                        <View style={{ alignItems: 'center', marginTop: 2, paddingTop: 2, flexDirection: 'row', flex: 1 }}>
                            <TouchableHighlight onPress={() => {RootNavigation.navigate('Modal',{ iden:iden,type:'Calificación',data:{EsMiProfesor:EsMiProfesor}})
                             }}>
                                <Rating
                                    startingValue={state.calificacion}
                                    readonly
                                    imageSize={14}
                                />
                            </TouchableHighlight>
                            <Texto size={'9'} style={{ marginLeft: 5 }}>{`${state.calificacion}/5`}</Texto>
                        </View>
                    </View>
                </CardItem>
                <CardItem style={{ borderRadius: 15,flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', alignContent: "center", alignItems: 'center' }}>
                            <View style={{ width: 25, height: 25, backgroundColor: '#ddd', borderRadius: 50, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <FontAwesome name="phone" color='green' size={20} onPress={() => {
                                    Linking.openURL(`tel:${state.numero}`)
                                }} />
                            </View>
                            <Ionicons name="logo-whatsapp" onPress={() => {
                                Linking.openURL(`whatsapp://send?text=Hola&phone=${state.numero}`)
                            }} color='green' style={{ paddingLeft: 6 }} size={26} />
                        </View>
                        {/* <Texto style={{}} size='9'>{`Desde ${DateNew.getUTCMonth() + 1}/${DateNew.getUTCFullYear()}`}</Texto> */}
                        {/* <IconPersonWithName owner={'Nina Vera'} /> */}
                    </View>
                </CardItem>
            </View>
        </Card>
    )
}
function GetTypeTeacher(props) {
    const { iden } = props
    const [nombre, setNombre] = useState()
    const Ws=useWs()
    useEffect(() => {
        Ws.FunctionsAuth.getDataAPITipoProfesor(setNombre, iden)
    }, [])
    return nombre !== undefined ? nombre : null
}