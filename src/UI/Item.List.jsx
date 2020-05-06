import React, { useEffect, useContext, useState } from 'react'

import { View, ImageBackground, Image, Linking } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Card, ListItem, Button, Icon, Rating } from 'react-native-elements'
import { CardItem } from 'native-base'
import { Texto } from './Text';
import { useData } from '../Hooks/useData';
import { useWs } from '../Hooks/useWS';

export default function ItemList(props) {
    const {  calificacion, comentario, estado, iden, iden_condominio, iden_tipo, nombre, numero, tarifa, fecha, entrenamiento } = props
    const { data: tipoProfesor, setData: setTipoProfesor } = useData()
    const { FunctionsAuth } = useWs()
    useEffect(() => {
        FunctionsAuth.getDataAPITipoProfesor( setTipoProfesor, iden)
    }, [])
    return (
        <Card
            containerStyle={{
                padding: 0,
                padding: 2,
                flex: 1,
                height:90,
                // borderRadius: entrenamiento ? 0 : 15,
                borderRadius: 15
            }}
        >
            <View style={{ flexDirection: 'row',height:'100%', }}>
                <View style={{ flex: 1.8, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../Assets/Perfil1.png')}
                        style={{
                            height: 55, width: 55,
                            borderRadius: 50
                        }} />
                </View>
                <CardItem style={{ justifyContent: 'flex-end', borderRadius: 15, flex: 3 }}>
                    <View style={{ flex: 1 }}>
                        <Texto size={'13'} Bold>{nombre}</Texto>
                        <Texto size={'9'}  colorLabel={'#717171'}>{tipoProfesor}</Texto>
                        <View style={{ alignItems: 'center', marginTop: 2, paddingTop: 2, flexDirection: 'row', flex: 1 }}>
                            <Rating
                                startingValue={calificacion}
                                readonly
                                imageSize={14}
                            />
                            <Texto size={'9'} style={{ marginLeft: 5 }}>{`${calificacion}/5`}</Texto>
                        </View>
                    </View>
                </CardItem>
                <CardItem style={{ borderRadius: 15, flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', alignContent: "center", alignItems: 'center' }}>
                            <View style={{ width: 32, height: 32, backgroundColor: '#ddd', borderRadius: 50, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <FontAwesome name="phone" color='green' size={25} onPress={() => {
                                    Linking.openURL(`tel:${numero}`)
                                }} />
                            </View>
                            <Ionicons name="logo-whatsapp" onPress={() => {
                                Linking.openURL(`whatsapp://send?text=Hola&phone=${numero}`)
                            }} color='green' style={{ paddingLeft: 6 }} size={30} />
                        </View>
                        {/* <Texto style={{}} size='9'>{`Desde ${DateNew.getUTCMonth() + 1}/${DateNew.getUTCFullYear()}`}</Texto> */}
                        {/* <IconPersonWithName owner={'Nina Vera'} /> */}
                    </View>
                </CardItem>
            </View>
        </Card>
    )
}