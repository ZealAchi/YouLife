import React, { useState, createContext, useEffect, useContext } from "react";
import { NotifiactionService } from "../Services/Notification";
import { useWs } from "../Hooks/useWS";
import { useData } from "../Hooks/useData";
import { DataContext } from "./Datos.Context";
// import { AuthContext } from "./Auth.Context";

export const NotificationsContext = createContext();

const DataInit = {
    notifications: [],
    localNotify: null
}

function NotificationsContextProvider({ children }) {
    const [state, setState] = useState(DataInit);
    const { localNotify } = state

    const [rs, setRs] = useState(0);
    const [ws, setWs] = useState(null);

    const { token } = useContext(DataContext)
    // ws1.send(`{"token":"${token}","opcion":1}`);
    const request = async (token, opcion) => {
        let payload = {
            token,
            opcion,
        };
        // ws1.send(`{"token":"${token}","opcion":0}`);
        console.log(payload)
        ws.send(JSON.stringify(payload));
    }

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
        );
    }

    const configureWebsocket = async () => {
        ws.onopen = function (open_event) {
            console.log(open_event,'open_event')
            ws.onmessage = function (event) {
                console.log(event);
                let tjo = JSON.parse(event.data);
                console.log(tjo, 'onmessage')
                switch(tjo['tipo']) {
                    case 'Entrenamiento':

                    break;

                }
            }
        }
    }


    useEffect(() => {
        if (ws === null) { setWs(new WebSocket('ws://45.236.130.116:92/Handler.ashx')); }
        if (ws !== null && rs === 0) { configureWebsocket(); heartbeat(ws); }
    }, [ws, rs])


    function onRegister(token) {
        console.log("[Notification] onRegister", token)
    }
    function onNotification(notify) {
        console.log("[Notification] onNotification", notify)
    }
    function onOpenNotification(notify) {
        console.log("[Notification] onOpenNotification", notify)
        alert("Open Notification")
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
    // var ws1 = new WebSocket('ws://45.236.130.116:92/Handler.ashx');
    // const { token } = useContext(DataContext)


    useEffect(()=>{
        if(ws!==null)
        if (token !== '' || token === false) {
                request(token,'1');	
                console.log('Conectado con token', token)
            }
    },[token,ws])
    useEffect(()=>{
        if (token !== '' || token === false) {
            request(token,'2');
        }
    })
    // useEffect(() => {
    //     setState({ ...state, localNotify: NotifiactionService })
    //     if (localNotify != null) {
    //         localNotify.configure(onRegister,
    //             onNotification,
    //             onOpenNotification)
    //     }
    //     ws1.onopen = () => {
    //         if (token !== '' || token === false) {
    //             ws1.send(`{"token":"${token}","opcion":1}`);
    //             console.log('Conectado con token', token)
    //         } else {
    //         }
    //     };
    // }, [token])
    
    // ws1.onmessage = e => {
    //     const Data = JSON.parse(e.data)

    //     if (Data.data !== null && Data.result === 1) {
    //         EnviarNotification(Data.data[0])
    //         var fecha = new Date()
    //         var Tiempo = (`${fecha.getHours()}:${fecha.getMinutes()}`)
    //         state.notifications.push([e.data, { time: Tiempo }])
    //         setState({ ...state, notifications: [...state.notifications] })
    //     }
    //     if (Data.data === (undefined || null || "null") && Data.result === 1) {
    //         EnviarNotification()
    //         var fecha = new Date()
    //         var Tiempo = (`${fecha.getHours()}:${fecha.getMinutes()}`)
    //         state.notifications.push([e.data, { time: Tiempo }])
    //         // console.log(state)
    //         setState({ ...state, notifications: [...state.notifications] })
    //     }
    // };
    // ws1.onerror = e => {
    //     console.log(e.message);
    // };
    // ws1.onclose = e => {
    //     console.log(e.code, e.reason);
    //     ws1.send(`{"token":"${token}","opcion":0}`);
    // }; 
    return (
        <NotificationsContext.Provider value={{ ...state }}>
            {children}
        </NotificationsContext.Provider>
    );
}

export default NotificationsContextProvider;
