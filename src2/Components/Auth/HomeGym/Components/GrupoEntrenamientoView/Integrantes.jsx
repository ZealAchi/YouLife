import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { Card } from 'react-native-elements'
import { CardItem } from 'native-base'
import { Texto } from '../../../../../UI/Text'
import { useWs } from '../../../../../Hooks/useWS'

export function Integrantes(props) {
    const [integrante, setIntegrante] = useState(null)
    const { iden, entrenamiento } = props
    const WS = useWs()
    useEffect(() => {
        WS.FunctionsAuth.getDataAPIIntegrantesGrupoEntrenamiento(setIntegrante, iden)
    }, [])
    if (integrante === null) {
        return <></>
    }
    // console.log(integrante,'Wdoa')
    const añoUser=new Date().getFullYear()-new Date(integrante.fechan*1000).getFullYear()

    return (
        <Card containerStyle={{
                padding: 0,
                margin: 10,
                flex: 1,
                height: 65,
                borderRadius: entrenamiento ? 0 : 15,
            }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: integrante.avatar }}
                        style={{
                            height: 55, width: 55,
                            borderRadius: 50
                        }} />
                </View>
                <CardItem style={{ justifyContent: 'flex-end', borderRadius: 15, flex: 5 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Texto size={'12.85'} Bold>{integrante.nombre}</Texto>
                            <Texto size={'11.6'} style={{marginLeft:6}} >{añoUser} {añoUser===1?'año':'años'}</Texto>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Entypo size={18} name={'location-pin'} color={'#000'} />
                            <Texto size={11.6} >You Train
                            <Ubicacion iden_condominio={integrante.iden_condominio} />
                            </Texto>
                        </View>
                    </View>
                </CardItem>
            </View>
        </Card>
    )
}
function Ubicacion({ iden_condominio }) {
    const [condominio, setCondominio] = useState(' ')
    const WS = useWs()
    useEffect(() => {
        WS.FunctionsAuth.getDataAPIUbicacionGrupoEntrenamiento(setCondominio, iden_condominio)
    }, [])

    // console.log('condominio',condominio)
    return `${' ' + condominio.nombre}`

}