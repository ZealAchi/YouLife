import React, { useContext, useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Button } from '../../../UI/Button'
import Colors from '../../../UI/Colors'
import { Texto } from '../../../UI/Text'
import { ItemPicker } from '../../../UI/ItemPicker'
import { useWs } from '../../../Hooks/useWS'
import { useData } from '../../../Hooks/useData'
import { Input } from '../../../UI/Input'
import LoadFile from '../../../UI/LoadFile'
import { useBase64 } from '../../../Hooks/ToBase64'
// import LoadFile from '../../../../Util/LoadFile'
// import {ItemPicker} from '../../../../Util/ItemPicker'
// import { useBase64 } from '../../../../../Hooks/ToBase64'


export function QuieroSerProfesor(props) {
    const [base64,setBase64] = useState(null)
    const Base64=useBase64(base64,setBase64)

    // const { getDataAPI,postDataAPI } = useContext(DataContext)

    const [state, setState] = useState({
        nombre: '',
        disciplina: '',
        tarifa: '',
        comentario: '',
        CVUpload: '',
        preCVUpload: null
    })
    const {preCVUpload}=state
    useEffect(()=>{
        setState({...state,CVUpload:base64})
    },[base64])
    useEffect(()=>{
        if(preCVUpload!==null){
            if((preCVUpload!=='')){
                const Base64da=Base64.ToBase64(preCVUpload)//Pasa a Base64
            }
        }
    },[preCVUpload])
    const Ws = useWs()
    const { data: listDisiplinas, setData: setListDisiplinas } = useData()
    useEffect(() => {
        Ws.FunctionsAuth.getDataAPIObtenerDiciplinas(setListDisiplinas)
    }, [])
    const handleSubmit =()=>Ws.FunctionsAuth.postDataAPISerProfesor({state:state,nextAction:()=>{alert("Hombres Lunares")}})
    const onChange = (itemValue) => setState({ ...state, disciplina: itemValue })
    const changeCV=(value)=>{setState({...state,preCVUpload:value});}
    return (
        <View style={{ backgroundColor: Colors.Fondo1, flex: 1 }}>
            <View style={{ flex: 0.1 }} />
            <ScrollView style={{ flex: 0.25, margin: 12, padding: 1, borderRadius: 15, marginLeft: 25, marginRight: 25, display: 'flex' }} centerContent={true}>
                <View >
                    <View >
                        <Texto style={{ textAlign: 'center', paddingBottom: 12 }} size={15} colorLabel={Colors.TercerColor} Bold>SER PROFESOR</Texto>
                        <Texto size={11} colorLabel={Colors.TercerColor}>
                            Hola <Texto size={11} Bold colorLabel={Colors.TercerColor} >Carlos</Texto>, necesitamos que completes el siguiente formulario para sumarte a nuestro equipo de profesores
                        </Texto>
                        <Texto size={11} colorLabel={Colors.TercerColor} Bold>en YouTrain.</Texto>
                    </View>
                    <View style={{ display: 'flex' }}>
                        <Input style={{ marginBottom: 12 }} label='Nombre' onChange={(e) => setState({ ...state, nombre: e })} />
                        <View style={{ flexDirection: 'row', display: 'flex' }}>
                            <View style={{ flex: 1.5, top: 12,borderBottomColor:'#ddd',borderBottomWidth:1 }}>
                                <ItemPicker data={listDisiplinas} label="Disciplinas" onChange={onChange} state={state} />
                            </View>
                            <View style={{ flex: 1, top: 31 }}>
                                <Input label="Tarifa Grupal" onChange={(e) => setState({ ...state, tarifa: e })} />
                            </View>
                        </View>
                        <Input style={{marginBottom:15}} label='Comentarios' multiline={true} numberOfLines={4} onChange={(e) => setState({ ...state, comentario: e })} />
                    </View>
                    <View style={{ marginRight: 20, marginLeft: 20 }}>
                        <View style={{ marginTop: 12 }}>
                            <LoadFile change={changeCV} />
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <Button label={'ENVIAR'}  onPress={handleSubmit} >
                                <Texto Bold>ENVIAR</Texto>
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>)
}