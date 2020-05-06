import React, { useState, createContext, useEffect, useContext } from "react";
// import { NotifiactionService } from "../Services/Notification";
import { useWs } from "../Hooks/useWS";
import { useData } from "../Hooks/useData";
import { DataContext } from "./Datos.Context";
import * as RootNavigation from './../Navigations/RootNavigation';

// import { AuthContext } from "./Auth.Context";

export const NotificationsContext = createContext();

const DataInit = {
    notifications: [],
    localNotify: null
}
const localNotifyInit=null

function NotificationsContextProvider({ children }) {

    const [rs, setRs] = useState(0);
    const [ws, setWs] = useState(null);

    const [state, setState] = useState(DataInit);

    const [localNotify, setLocalNotify] = useState(localNotifyInit);

    
    const { token } = useContext(DataContext);
    
    const request = (props) => {

        const { token: token1, opcion, iden_notificaciones = [] } = props
        let payload = {
            token: token1 ? token1 : token,
            opcion,
            iden_notificaciones
        };
        ws.send(JSON.stringify(payload));
    }

    function onRegister(token) {
        // console.log("[Notification] onRegister", token)
    }
    function onNotification(notify) {
        // console.log("[Notification] onNotification", notify)
    }
    function onOpenNotification(notify) {
        // console.log("[Notification] onOpenNotification", notify)
        // alert("Open Notification")
        RootNavigation.navigate('Modal',{
        })
    }

    function EnviarNotification(Data) {

        
        const options = {
            soundName: 'default',
            playSound: true,
            vibrate: true,
        }
        localNotify.showNotification(1, "YouTrain",
            Data.texto,
            Data//data
            , options//options
        )
    }
    function CancelarNotification() {
        localNotify.cancelAllLocalNotification()
    }

    // var ws = new WebSocket('ws://45.236.130.116:92/Handler.ashx');

    useEffect(() => {

        //Descomentar
        // setState({ ...state, localNotify: NotifiactionService })
        // setLocalNotify(NotifiactionService)
        // if (localNotify != null) {
        //     localNotify.configure(onRegister,
        //         onNotification,
        //         onOpenNotification)
        // }
    }, [token])
    // console.log(localNotify,'localNotify s')
    const heartbeat = async (ws) => {
        setTimeout(
            function () {
                //console.log(ws.readyState);
				/*  0 	CONNECTING 	Socket has been created. The connection is not yet open.
					1 	OPEN 	The connection is open and ready to communicate.
					2 	CLOSING 	The connection is in the process of closing.
					3 	CLOSED 	The connection is closed or couldn't be opened.	
				*/
                if (rs !== ws.readyState) {
                    setRs(ws.readyState)
                }
                heartbeat(ws);
            }
                .bind(this),
            1000
        );}
    const configureWebsocket = async () => {
        ws.onopen = () => {
            
            if (token !== '' || token === false) {
                // ws.send(`{"token":"${token}","opcion":1}`);
                request({ opcion: '1' });
                // console.log('Conectado con token', token)
                request({ opcion: '2' });
            } else {
            }
        };
        ws.onmessage = e => {
            // EnviarNotification('')
            // const Data = JSON.parse(e.data)
            var fecha = new Date()
            var Tiempo = (`${fecha.getHours()}:${fecha.getMinutes()}`)
            const { data } = JSON.parse(e.data)
            const notifications = []
            if (data !== null) {
                if (data.length > 1) {
    
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        switch (element.tipo) {
                            case 0:
                                notifications.push({ ...element, time: Tiempo, type: 'NotificacionSistema' })
                                setState({ ...state, notifications: [...notifications] })
                                // console.log('notification del sistema')
                                break;
                            case 1:
                                notifications.push({ ...element, time: Tiempo, type: 'NotificacionTeinvitoAmiEntrenamiento' })
                                setState({ ...state, notifications: [...notifications] })
                                // console.log(notifications,'invitacion entrenamiento')
                                break;
                            case 2:
                                // console.log('profesor entrenamiento')
                                notifications.push({ ...element, time: Tiempo, type: 'NotificacionInvitacionASerProfesor' })
                                setState({ ...state, notifications: [...notifications] })
                                break;
                            default:
                                // console.log('default')
                                break;
                        }
                    }
    
                } else {
                    switch (data[0].tipo) {
                        case 0:
                            // console.log('notifications dek sistema')
                            break;
                        case 1:
                            // console.log('invitacion entrenamiento')
                                // EnviarNotification(e.data)
                                // state.notifications.push([e.data, { time: Tiempo }])
                                // state.notifications.push([e.data, { time: Tiempo },{time: Tiempo}, {type: 'NotificacionTeinvitoAmiEntrenamiento'}])
                                // setState({ ...state, notifications: [...state.notifications] })
                            break;
                        case 2:
                                // EnviarNotification(e.data)
                                // // console.log(data[0],'profesor entrenamiento')
                                // state.notifications.push([e.data, { time: Tiempo },{time: Tiempo}, {type: 'NotificacionInvitacionASerProfesor'}])
                                // setState({ ...state, notifications: [...state.notifications] })
                            break;
                        default:
                            // EnviarNotification(e.data)
                            break;
                    }
                }
    
            } else {
    
            }
    
    
            // if (Data.data !== null && Data.result === 1) {
            //     EnviarNotification(Data.data[0])
            //     state.notifications.push([e.data, { time: Tiempo }])
            //     setState({ ...state, notifications: [...state.notifications] })
            // }
            // if (Data.data === (undefined || null || "null") && Data.result === 1) {
            //     EnviarNotification()
            //     state.notifications.push([e.data, { time: Tiempo }])
            //     setState({ ...state, notifications: [...state.notifications] })
            // }
        };
        ws.onerror = e => {
            console.log(e.message);
        };
        ws.onclose = e => {
            console.log(e.code, e.reason);
            request({ opcion: '0' });
        };
    }
    
    useEffect(() => {
        if (ws === null) { setWs(new WebSocket('ws://45.236.130.116:92/Handler.ashx')); }
        if (ws !== null && (rs === 0||(token!==null||token!==undefined))) { configureWebsocket(); heartbeat(ws); }
        // if (ws !== null && rs === 0) {console.log('asd aksj dkj')}
    }, [ws, rs,token])
    return (
        <NotificationsContext.Provider value={{ ...state, request }}>
            {children}
        </NotificationsContext.Provider>
    );
}

export default NotificationsContextProvider;





