import React, { useContext, useState, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';

import { useData } from "../Hooks/useData";
import { useUserList } from "../Hooks/useUserList";
import { Texto } from "../UI/Text";
import Colors from "../UI/Colors";

// import { useWs } from "../Hooks/useWS";
export const DataContext = createContext();

function DataContextProvider({ children }) {
    const UserList = useUserList()

    const { setUsersSelects } = UserList
    const { data: token, setData: setToken } = useData()
    
    useEffect(() => {
        if (token === undefined) {
            try {
                AsyncStorage.removeItem('@App:Token');
            } catch (error) {
                console.log(error)
            }
        }
    }, [token])
    
    // console.log(token,'Token args')

    const [state,setState]=useState({timeString:undefined})

    function TiempoFaltante(props) {
        
        const { dia, horarioInicio, DiaAhora } = props
        // console.log(DiaAhora.toLocaleUpperCase() === dia[0].toLocaleUpperCase(),'props aks alks kas k  k kl')
        if(JSON.stringify(dia)==='[]')
        return null
        const [timeString, setTimeString] = useState('')
        useEffect(() => {
            const clockInterval = setInterval(() => {
                if (DiaAhora.toLocaleUpperCase() === dia[0].toLocaleUpperCase()) {
                    // console.log("args")
                    const now = new Date();
                    const newTimeString = formatDate(now, horarioInicio)
                    setTimeString(newTimeString)
                    // console.log(timeString,'timeString')
                    // setState({state,timeString:newTimeString})
                }
            }, 800)
            return () => {
                clearInterval(clockInterval)
            }
        }, [])
        return (<Texto size={11} style={{ marginLeft: 5 }} colorLabel={Colors.TercerColor} >
            {timeString}
            </Texto>
        )
    }
    function formatDate(date, horarioInicio) {
        console.log(date,'date',horarioInicio,'horarioInicio')
        if (!date && !DiaAhora)
            return ''

        const hours = `0${date.getHours()}`.slice(-2)
        const minutes = `0${date.getMinutes()}`.slice(-2)
        const seconds = `0${date.getSeconds()}`.slice(-2)
        const HoraCadena = horarioInicio.split(":", 3);
        const HoraFinal = (HoraCadena[0]) - (hours)
        const MinutosFinal = (HoraCadena[1]) - (minutes)
        const SegundosFinal = (HoraCadena[2]) - (seconds)
        
        return SegundosFinal<0?'Tu Entrenamiento ya empezo.':`${HoraFinal}:${MinutosFinal}:${SegundosFinal}`

    }
    return (
        <DataContext.Provider value={{ token, setToken: setToken,state, UserList, setUsersSelects,TiempoFaltante }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContextProvider;