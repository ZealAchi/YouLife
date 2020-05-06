import { useState } from 'react'

export function useUserList() {
    const [userList, setUserList] = useState(false)
    const [userSelect, setUsersSelects] = useState({invitados:[]})
    
    const setUsersSelectsFunction = (e, c) => {
        const NewData = { iden_usuario: e, nombre: c }
        const { invitados } =userSelect
        if (invitados.length === 0) {
            setUsersSelects({ invitados: [...invitados, NewData] })
        }
        var bandera=false
        for (let i = 0; i < invitados.length; i++) {
            if((invitados[i].iden_usuario === e)===true){
                bandera=true
            }
        }
        if(bandera){
            const newDateE = invitados.filter((item) => { return item.iden_usuario !== e })
            setUsersSelects({ invitados: newDateE })    
        }else{
            setUsersSelects({ invitados: [...invitados, NewData] })
        }
    }
    return {
        userList,
        setUserList,
        userSelect,
        setUsersSelects,
        setUsersSelectsFunction
    }
}