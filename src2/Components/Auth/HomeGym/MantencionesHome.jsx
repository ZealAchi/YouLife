import React from 'react'
import { View, CheckBox, Switch } from 'native-base'
import { Texto } from '../../../UI/Text'
import { Button } from '../../../UI/Button'
import Colors from '../../../UI/Colors'
import { useData } from '../../../Hooks/useData'
import { useEffect } from 'react'


export function MantencionesHome() {
    const {setData,data}=useData()
    useEffect(()=>{
        setData({            
                titulo: "Titulo Test",
                detalle: "Detalle test",
                fecha: 1570982967,
                token: "f77a67c8-631c-4fc3-a79d-ffeb63572732"
        })
    },[])
    if(data===null)
        return<Texto>Loading</Texto>
    
    return (<View style={{ flex: 1, backgroundColor: '#000' }}>

        <View style={{ flex: 1, marginLeft: 12, marginRight: 12, marginTop: 18, marginBottom: 18, backgroundColor: Colors.Fondo1, padding: 12, borderRadius:12 }}>
            <View style={{ flex: 1, marginTop: 12 }}>
                <Texto colorLabel="white" Bold>Mantención del Edificio #143</Texto>
            </View>
            <View style={{ flex: 1 }}>
                <Texto colorLabel="white" Bold>Última Mantención</Texto>
                <Texto colorLabel="white">2/03/19</Texto>
            </View>
            <View style={{ flex: 1 }}>
                <Texto colorLabel="white" Bold>Plan</Texto>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '50%', flexDirection: 'row', marginTop: 10 }}>
                        <CheckBox checked={true} color="#ffffff" style={{ backgroundColor: 'rgba(0, 184, 8,1.0)' }} onPress={() => { }} />
                        <Texto style={{ marginLeft: 20 }} size={16} colorLabel='white'>{'Vigente'}</Texto>
                    </View>
                    <View style={{ width: '50%', flexDirection: 'row', marginTop: 10 }}>
                        <CheckBox checked={true} color="#ffffff" style={{ backgroundColor: 'rgba(0, 184, 8,1.0)' }} onPress={() => { }} />
                        <Texto style={{ marginLeft: 20 }} size={16} colorLabel='white'>{'No vigente'}</Texto>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Texto size={15} colorLabel="white" style={{ flex: 0.95 }} Bold>Solicitar regularización del contrato al administrador</Texto>
                <View style={{ flex: 0.21 }}>
                    <Switch thumbColor="white" tintColor='rgba(0,184,8,1.0)' />
                </View>
            </View>
            <View style={{ bottom: 0, marginLeft: 30, marginRight: 30, flex: 1 }}>
                <Button>
                    <Texto Bold>Enviar</Texto>
                </Button>
            </View>
        </View>
    </View>)
}