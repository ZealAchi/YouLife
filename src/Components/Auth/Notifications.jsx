import React, { useContext, useState, useEffect } from "react";
import { View, ScrollView } from "native-base";

import { Container, Header, Thumbnail, Content, List, ListItem, Text, Separator, Left, Right, Body, Button } from 'native-base';
import { NotificationsContext } from "../../Context/Notifications.Context";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as RootNavigation from '../../Navigations/RootNavigation';
// import { useWs } from "../../Hooks/useWS";
// 


function ItemNotification() {
    const { notifications, request } = useContext(NotificationsContext)
    // const WS=useWs()
    const VerNotificacion = ({ iden }) => {
        let iden_notificaciones = [iden]        
        request({ opcion: '3', iden_notificaciones });
        return null
    }

    return (<>
        <Separator bordered>
            <Text>{'hoy'}</Text>
        </Separator>
        <View style={{ flexDirection: 'column-reverse' }}>
            {notifications.map((item, i) => {
                const [entrenamientoValidacion, setEntrenamientoValidacion] = useState(null)
                useEffect(() => {
                    if (item.entrenamiento !== null) {
                        if (item.entrenamiento.iden === JSON.parse(item.texto)) {
                            setEntrenamientoValidacion(true)
                        }
                    }
                }, [])

                switch (item.type) {
                    case "NotificacionTeinvitoAmiEntrenamiento":
                        return <Content>
                            <TouchableOpacity onPress={() => {
                                RootNavigation.navigate('Modal', {
                                    type: 'NotificacionTeinvitoAmiEntrenamiento',
                                    iden: entrenamientoValidacion ? item.texto : 0,
                                });
                                VerNotificacion({ iden: item.iden });
                            }}><ContenidoNotificacion item={item} />
                            </TouchableOpacity></Content>
                    case 'NotificacionInvitacionASerProfesor':

                        console.log(item, 'NOtifiaciones as s sk')
                        return <TouchableOpacity onPress={() => {
                            RootNavigation.navigate('Modal', {
                                type:   'NotificacionInvitacionASerProfesor',
                                iden:   entrenamientoValidacion ? item.texto : 0,
                                item:   item
                            });
                            VerNotificacion({ iden: item.iden });
                        }}><Content><ContenidoNotificacion item={item} /></Content></TouchableOpacity>
                    default:
                        return <TouchableOpacity onPress={() => {
                            VerNotificacion({ iden: item.iden })
                        }}><Content><ContenidoNotificacion item={item} /></Content></TouchableOpacity>
                }
            })}
        </View>

    </>)
}

const ContenidoNotificacion = (props) => {
    const { item } = props
    return <>
        <List>
            <ListItem thumbnail>
                <Left>
                    {/* <Thumbnail circular source={{ uri: item.image }} /> */}
                    <Thumbnail circular source={{ uri: 'https://scontent.fmex10-2.fna.fbcdn.net/v/t1.15752-9/83490387_518900338759927_1115738748659695616_n.png?_nc_cat=107&_nc_eui2=AeFfLADF9hGCOF7Mqwvenj9uMheD9CLPq4x1YOAKjb0yFKn41c96USktnGJbLkVTdWSOr_oU1IOw_r5qfhQ1wV0xEqGAp8KKaFKg3VJuPQ9q-g&_nc_ohc=4cvXPEWluw4AX88DaHC&_nc_ht=scontent.fmex10-2.fna&oh=ab32463f326f956577f86066dcb1094e&oe=5EC72019' }} />
                </Left>
                <Body>
                    <Text>{'YouTrain'} </Text>
                    <Text note>{item.nombre_user}</Text>
                    <Text numberOfLines={2} note><Tipo type={item.type} texto={item.texto} /></Text>
                </Body>
                <Right style={{ marginTop: 0 }}>
                    <Text note>{item.time}</Text>
                </Right>
            </ListItem>
        </List>
    </>
}

function Tipo({ type, texto }) {

    switch (type) {
        case 'NotificacionTeinvitoAmiEntrenamiento':
            return 'Te invito a mi entrenamiento.'
        case 'NotificacionInvitacionASerProfesor':
            return '¿Te gustaria ser el Profesor de este entrenamiento?.'
        case 'NotificacionSistema':
            return texto
        default:
            return '???'
    }
}
export function Notifications() {
    return (
        <Container>
            <Content>
                <ItemNotification />
            </Content>
        </Container>
    )
}

// const getNotifications = [
//     {
//          notificacion: [{
//             InformacionEntrenamieno:[...],
//             propetario: 'Juan Diego',
//             tiempo:'12/10/29:08:05:14',
//             TipoNotificacion: 'Grupo Runner',///Aqui por ejemplo poner
//             /// 'Invitacion Entrenamiento' o 'Nuevo Grupo Entrenamiento ¿Ser profesor? o Algo asi 
//             //o poner numeros en el protocolo para saber que tipo de accion se hara
//         },
//         ] 
//     },
// ]