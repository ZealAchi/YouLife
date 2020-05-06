import React, { useState, useEffect } from 'react'
import { ListItem, CheckBox, Body, View } from 'native-base'
import { Texto } from './Text'


export default function DayOfWeek(props) {
    const [dias, updateDias] = useState([
        { dia: "Lunes", lun: 0, select: 0 }, { dia: "Martes", mar: 0, select: 0 }, { dia: "Miercoles", mie: 0, select: 0 }, { dia: "Jueves", jue: 0, select: 0 }, { dia: "Viernes", vie: 0, select: 0 }, { dia: "Sabado", sab: 0, select: 0 }, { dia: "Domingo", dom: 0, select: 0 }
    ])
    const {setDaysWeek}=props
    return (
        <View style={{ marginTop: 12, }}>
        <Texto Bold colorLabel="white" style={{ marginBottom: 12 }} size={15}>Selecciona los días de entrenamiento</Texto>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center' }}>
            <Content dias={dias} updateDias={updateDias} setDaysWeek={setDaysWeek} />
        </View>
        </View>)
}
const Content = (props) => {
    const { dias,setDaysWeek } = props
    const [state, setState] = useState(null)
    
    useEffect(()=>{
        if(state!==null){
            setDaysWeek({
                lun: state[0].select,
                mar: state[1].select,
                mie: state[2].select,
                jue: state[3].select,
                vie: state[4].select,
                sab: state[5].select,
                dom: state[6].select
            })
        }   
    },[state])
    
    return dias && dias.map((item, i) => {
        return (       
            <View key={i} style={{ paddingTop: -1, marginBottom:5,justifyContent:'center', alignContent:'center',alignItems:'center',flexWrap:'wrap',dislapy:'flex', alignSelf:'center', width: 80, borderBottomColor: 'transparent'}}>
            {/* <ListItem style={{ paddingTop: 0, right: 10, width: 80, borderBottomColor: 'transparent' }}> */}
                <CheckBox checked={state === null ? dias[i].select === 0 ? false : true : state[i].select === 0 ? false : true} onBlur={2} onPress={(e) => {
                    item.select === 0 ? item.select = 1 : item.select = 0;
                    const newData = dias
                    setState({ ...newData })
                }} />
                <Texto size={10} style={{ color: '#fff',textAlign:'center' }} >{item.dia}</Texto>
            </View>
        )
    })
}
