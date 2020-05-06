import React, { useState, useEffect, useContext } from 'react'
import { Texto } from '../../../UI/Text'
import { Picker, View, Item, DatePicker } from 'native-base'
import { ScrollView, TextInput, TouchableOpacity, Switch, DatePickerIOS } from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from '../../../UI/Colors'
import { Button } from '../../../UI/Button'
import { DataContext } from '../../../Context/Datos.Context'
import DayOfWeek from '../../../UI/DayfOfWeek'
import TimeOrDate from '../../../UI/TimeOrDate'
import { useWs } from '../../../Hooks/useWS'



export function CrearEntrenamiento(props) {

    const { UserList } = useContext(DataContext)

    useEffect(() => {
        setState({ ...state, ...UserList.userSelect })
    }, [UserList])

    const [state, setState] = useState({
        Profesor: 'Si',
        iden_tipo: '',
        iden_comuna: '',
        Min: 1,
        Max: 1,
        horario: null,
        horario_final: null,
        disiplinaData: [],
        comunaList: [],
        invitados: [],
        entrenamiento: []
    })
    useEffect(() => {
        if (state.horario !== null) {
            console.log(state.horario,'state.horario')
            // var Tiempo = `${state.horario.getHours()}:${state.horario.getMinutes()}:${state.horario.getSeconds()}`
            // setState({...state,horario:Tiempo})
        }
        if (state.horario_final !== null) {
            console.log(state.horario_final,'state.horario_final')
            // var Tiempo = `${state.horario_final.getHours()}:${state.horario_final.getMinutes()}:${state.horario_final.getSeconds()}`
            // setState({...state,horario_final:Tiempo})
        }
    }, [state.horario, state.horario_final])

    const [daysWeek, setDaysWeek] = useState(null)
    useEffect(() => {
        if (daysWeek !== null)
            setState({ ...state, ...daysWeek })
    }, [daysWeek])
    const Ws = useWs()

    const [disiplinaData, setDisiplinaData] = useState(null)
    const [comunaList, setComunaList] = useState(null)
    useEffect(() => {
        Ws.FunctionsAuth.getDataAPIListComuna(setComunaList);
        Ws.FunctionsAuth.getDataAPITipoDisiplina(setDisiplinaData)
    }, [Ws.FunctionsAuth.getDataAPIListComuna, Ws.FunctionsAuth.getDataAPITipoDisiplina])
    useEffect(() => {
        if (disiplinaData !== null)
            setState({ ...state, disiplinaData: disiplinaData })

    }, [disiplinaData])

    useEffect(() => {
        if (comunaList !== null)
            setState({ ...state, comunaList: comunaList })
    }, [comunaList])


    const Datos = [
        { label: '¿Con Profesor?', values: ['Si', 'No'], value: state.Profesor, onChange: (itemValue) => { setState({ ...state, Profesor: itemValue }) } },
        { label: 'Disiplina', values: ['Yoga', 'Yoga2'], value: state.iden_tipo, onChange: (itemValue) => setState({ ...state, iden_tipo: itemValue }) },
        { label: 'Elegir Profesor', values: ['Por Comuna', 'Por Comuna2'], value: state.iden_comuna, onChange: (itemValue) => setState({ ...state, iden_comuna: itemValue }) },
    ]
    const DatosIntegrantes = [
        {
            titulo: 'Integrantes', campos: [
                { titulo: 'Mínimo', value: state.Min, onChange: (itemValue) => { setState({ ...state, Min: itemValue }); } },
                { titulo: 'Máximo', value: state.Max, onChange: (itemValue) => { setState({ ...state, Max: itemValue }); } }
            ],
        }
    ]
    const [value, setValue] = useState(false);
    useEffect(() => {
        setState({ ...state, afines: value === false ? 0 : 1 })
    }, [value])

    const { navigation } = props

    const [datos, setDatos] = useState()
    useEffect(() => {
        setDatos({
            entrenamiento: {
                iden_tipo: state.iden_tipo,
                Min: state.Min,
                Max: state.Max,
                fecha: state.fecha,
                fecha_final: state.fecha_final,
                horario: state.horario,
                horario_final: state.horario_final,
                ...daysWeek,
                descripcion: state.descripcion,
                iden_comuna: state.iden_comuna,
            }, afines: state.afines, invitados: state.invitados
        })
    }, [state])
    const CreaEntrenamiento = () => {
        setDatos({
            entrenamiento: {
                iden_tipo: state.iden_tipo,
                Min: state.Min,
                Max: state.Max,
                fecha: state.fecha,
                fecha_final: state.fecha_final,
                horario:state.horario,
                horario_final:state.horario_final,
                ...daysWeek,
                descripcion: state.descripcion,
                iden_comuna: state.iden_comuna,
            }, afines: state.afines, invitados: state.invitados
        })
        
        // Ws.FunctionsAuth.postDataApiCrearEntrenamiento(datos,navigation.pop())
        Ws.FunctionsAuth.postDataApiCrearEntrenamiento(datos)
    }
    return (
        <View style={{ flex: 1, paddingLeft: 12, paddingRight: 12, paddingTop: 12, backgroundColor: Colors.Fondo1 }}>
            <ScrollView>
                <View style={{}}>
                    {Datos.map((item, i) => {
                        return (<ItemEntrenamiento conProfesor={state.Profesor} i={i} key={i} label={item.label} state={state} setState={setState} values={item.values} onChange={item.onChange} value={item.value} />)
                    })}
                    <View style={{}}>
                        {DatosIntegrantes.map((item, i) => {
                            return (<View key={i}>
                                <Texto Bold colorLabel={'white'} size={15} fontFamily="RobotoSlab-Light">{item.titulo}</Texto>
                                <View style={{ flexDirection: 'row', flex: 0.5, marginTop: 12, marginBottom: 12 }}>
                                    {item.campos.map((itemCampos, i) => {
                                        const { onChange } = itemCampos
                                        return (<View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Texto colorLabel={'white'} size={16}>{itemCampos.titulo}</Texto>
                                            <Picker
                                                selectedValue={itemCampos.value}
                                                placeholderIconColor="white"
                                                iosIcon={<AntDesign name="down" />}
                                                placeholderIconColor="#ddd"
                                                // placeholderStyle={{ backgruondColor:'red',borderBottomWidth:12 }}
                                                style={{
                                                    height: 50, width: 70,
                                                    color: 'white',
                                                    fontFamily: "RobotoSlab-Light",
                                                    borderColor: '#ddd',
                                                    borderRadius: 10,
                                                    borderEndColor: 'red',
                                                    borderTopWidth: 23,
                                                    borderRightColor: 'red'
                                                }}
                                                onValueChange={onChange}>
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((option, i) => {
                                                    return <Picker.Item key={i} label={`${itemCampos.value === option ? itemCampos.value : option}`} value={`${itemCampos.value === option ? itemCampos.value : option}`} />
                                                })}
                                            </Picker>
                                        </View>)
                                    })}
                                </View>
                            </View>)
                        })}
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center' }}>
                        <View><Texto colorLabel={'white'} size={16}>Invitar a:</Texto></View>
                        <TouchableOpacity onPress={() => { navigation.navigate('SearchUsuarios', { invitados: UserList.userSelect.invitados }) }} style={{ marginLeft: 12 }}>
                            <View style={{ borderBottomColor: 'white', borderRadius: 1, borderBottomWidth: 1, height: 'auto', width: 250 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                    <Feather name="search" color="white" size={18} />
                                    <Texto colorLabel={'white'} size={16} style={{ left: 12, flex: 1 }}>
                                        {UserList && UserList.userSelect.invitados.length === 0 ?
                                            'Buscar Usuario:' : UserList.userSelect.invitados.map((item, i) => {
                                                return <>{item.nombre}{i === 0 && ''}{(i === 0) && (UserList.userSelect.invitados.length > 1) && ','} {i === 1 && "."}</>
                                            })}
                                    </Texto>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {UserList && UserList.userSelect.invitados.length !== 0 &&
                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 5 }}>
                            <View style={{ flex: 0.23 }} />
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <TouchableOpacity onPress={() => { navigation.navigate('SearchUsuarios') }} style={{ flexDirection: 'row', flex: 1 }}>
                                    <Entypo name="plus" size={18} color="white" />
                                    <Texto colorLabel={'white'} size={13} Bold style={{}}>
                                        Invitar a otro usuario
                                    </Texto>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
                <View style={{ marginTop: 18,marginBottom:10, flexDirection: 'row' }}>
                    <View style={{ flex: 4 }}>
                        <Texto Bold colorLabel={'white'} size={15}>Invitar a usuarios con los itereses a fines</Texto>
                    </View>
                    <View style={{ flex: 2 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Switch
                                // onTintColor='red'
                                // tintColor='blue'
                                // trackColor='pink'
                                thumbColor={Colors}
                                value={value}
                                onValueChange={v => {
                                    setValue(v);
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',marginBottom:12 }}>
                    <ItemPersonal>
                        <Texto colorLabel={'white'} size={16} style={{ left: 5 }}>{'Fecha Inicio'}</Texto>
                        <TimeOrDate date state={state.fecha} type='input' setData={(e) => setState({ ...state, fecha: e })} />
                    </ItemPersonal>
                    <ItemPersonal>
                        <Texto colorLabel={'white'} size={16} style={{ left: 5 }}>{'Fecha Fin'}</Texto>
                        <TimeOrDate date state={state.fecha_final} type='input' setData={(e) => setState({
                            ...state,
                            fecha_final: e
                        })} />
                    </ItemPersonal>
                </View>
                <View style={{ flexDirection: 'row',marginBottom:12  }}>
                    <ItemPersonal>
                        <Texto colorLabel={'white'} size={16} style={{ left: 5 }}>{'Hora de Inicio'}</Texto>
                        <TimeOrDate state={state.horario} type='input' setData={(e) => setState({ ...state, horario: e })} />
                    </ItemPersonal>
                    <ItemPersonal>
                        <Texto colorLabel={'white'} size={16} style={{ left: 5 }}>{'Hora final'}</Texto>
                        <TimeOrDate state={state.horario_final} type='input' setData={(e) => setState({ ...state, horario_final: e })} />
                    </ItemPersonal>
                </View>
                <View>
                    <DayOfWeek setDaysWeek={setDaysWeek} />
                </View>
                <View style={{marginBottom:12}} >
                    <Item stackedLabel style={{
                        alignItems: 'stretch',
                        marginBottom: 10,
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        height: 50,
                        flex: 1,
                        // borderColor: '#ddd',
                        // borderBottomWidth: 1,
                        paddingTop: 18,
                        marginBottom:18
                    }} >
                        <Texto colorLabel={'white'} size={16} style={{ left: 5 }}>Descripción</Texto>
                        <TextInput
                            multiline
                            onChangeText={(value) => setState({ ...state, descripcion: value })}
                            placeholder="Escribe una descripción"
                            placeholderTextColor="#ddd"
                            numberOfLines={4}
                            style={{ color: 'white',}}
                            value={value}
                        />
                    </Item>
                </View>
                <View style={{ flex: 1, marginTop: 12, marginBottom: 17 }}>
                    <Button onPress={() => navigation.goBack()} styleButton={{ backgroundColor: 'white' }}>
                        <Texto Bold>CANCELAR</Texto>
                    </Button>
                    <Button styleButton={{ marginTop: 12 }} onPress={() => { CreaEntrenamiento() }}>
                        <Texto Bold>CONFIRMAR</Texto>
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
}


const ItemEntrenamiento = ({ conProfesor, i, state, values, label, onChange, value }) => {
    var Data = []
    if (label !== 'Disiplina') { Data = values } else { Data = state.disiplinaData }
    if (i === 2 || (label === "Elegir Profesor" && (conProfesor === 'Si'))) { Data = state.comunaList }
    return (
        (i !== 2 || (label === "Elegir Profesor" && (conProfesor === 'Si'))) ?
            <View style={{
                borderColor: '#ddd',
                borderBottomWidth: 1,
            }}>
                <Texto Bold colorLabel={'white'} size={15} fontFamily="RobotoSlab-Light">
                    {label}
                </Texto>
                <Picker
                    selectedValue={value}
                    placeholderIconColor={'#ddd'}
                    itemStyle={{ fontFamily: "RobotoSlab-Light", }}
                    style={{
                        borderColor: '#ddd',
                        fontFamily: "RobotoSlab-Light",
                        borderBottomWidth: 1, height: 50, width: '100%', color: 'white', justifyContent: 'center', alignItems: 'center', alignContent: 'center', textAlign: 'center', textAlignVertical: 'center'
                    }}
                    onValueChange={onChange}>
                    {Data.map((item, i) => {
                        return (
                            <Picker.Item key={i} style={{ fontFamily: "RobotoSlab-Light" }} label={item.nombre_comuna ? item.nombre_comuna : item.nombre ? item.nombre : item} value={item.iden_comuna ? item.iden_comuna : item.iden ? item.iden : item} />
                        )
                    })}
                </Picker>
            </View>
            : null
    )
}

const ItemPersonal = ({ children }) => <Item stackedLabel style={{
    alignItems: 'stretch',
    marginBottom: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 50,
    flex: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 18
}} >{children}</Item>