import React, { useState } from 'react'
import { Texto } from "../../../UI/Text"
import { View } from 'native-base'
import Colors from '../../../UI/Colors'
import { CheckBox, Picker } from "native-base"
import { Button } from '../../../UI/Button'

export default function Filtro({ route }) {
    const { params } = route
    if (params.type===undefined) {
        return null
    }
    switch (params.type) {
        case 'Filtrar Maquinas':
            return <Maquinas />
            break;
        case 'Filtrar Profesores':
            return <Profesores />
            break;
            return <Texto>Filtro</Texto>
        default:
            break;
    }


}

function Profesores({ route }) {
    const [state, setState] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
        option6: false,
        option7: false,
        option8: false
    })
    const { option1,
        option2,
        option3,
        option4,
        option5,
        option6,
        option7,
        option8, } = state
    const CheckBoxList = [
        {
            label: 'Musculación',
            value: state.option1,
            onPress: () => setState({ ...state, option1: !option1 })
        }, {
            label: 'Yoga',
            value: state.option2,
            onPress: () => setState({ ...state, option2: !option2 })
        }, {
            label: 'Spinning',
            value: state.option3,
            onPress: () => setState({ ...state, option3: !option3 })
        }, {
            label: 'Crossfit',
            value: state.option4,
            onPress: () => setState({ ...state, option4: !option4 })
        }, {
            label: 'Natación',
            value: state.option5,
            onPress: () => setState({ ...state, option5: !option5 })
        }, {
            label: 'Cardio',
            value: state.option6,
            onPress: () => setState({ ...state, option6: !option6 })
        }
    ]
    return (<View style={{ flex: 1, backgroundColor: Colors.Fondo1, paddingTop: '12%', paddingRight: '12%', paddingBottom: '0.1%', paddingLeft: '12%' }}>
        <View style={{ flex: 1 }}>
            <Texto colorLabel='white' size={13}>Más detalles del Profesor que estás buscando:</Texto>
            <View style={{ flex: 0.35, flexDirection: 'column', top: 20 }}>
                <Texto colorLabel='white' size={13}>Ordenar por:</Texto>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                    <Picker
                        mode={'dropdown'}
                        style={{ height: 50, width: 70, color: 'white' }}
                        onValueChange={(itemValue, itemIndex) => {

                        }}>
                        {['Mejor Puntuación'].map((item, i) => {
                            return <Picker.Item label={`${item}`} value={i} />
                        })}
                    </Picker>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <Texto colorLabel='white' size={13}>Disciplinas:</Texto>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                        {CheckBoxList.map((item, i) => {

                            return (<View style={{ width: '50%', flexDirection: 'row', marginTop: 10 }}>
                                <CheckBox checked={item.value} color="#ffffff" style={{ backgroundColor: 'rgba(0, 184, 8,1.0)' }} onPress={() => item.onPress()} />
                                <Texto style={{ marginLeft: 20 }} size={16} colorLabel='white'>{item.label}</Texto>
                            </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        </View>
        <View style={{ flex: 0.1 }}>
            <Button>
                <Texto Bold>Filtrar</Texto>
            </Button>
        </View>
    </View>)
}

function Maquinas() {
    const [state, setState] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
        option6: false,
        option7: false,
        option8: false
    })
    const { option1,
        option2,
        option3,
        option4,
        option5,
        option6,
        option7,
        option8, } = state
    const CheckBoxList = [
        {
            label: 'Piernas',
            value: state.option1,
            onPress: () => setState({ ...state, option1: !option1 })
        }, {
            label: 'Hombros',
            value: state.option2,
            onPress: () => setState({ ...state, option2: !option2 })
        }, {
            label: 'Pecho',
            value: state.option3,
            onPress: () => setState({ ...state, option3: !option3 })
        }, {
            label: 'Espalda',
            value: state.option4,
            onPress: () => setState({ ...state, option4: !option4 })
        }, {
            label: 'Espinales',
            value: state.option5,
            onPress: () => setState({ ...state, option5: !option5 })
        }, {
            label: 'Brazos',
            value: state.option6,
            onPress: () => setState({ ...state, option6: !option6 })
        }, {
            label: 'Abdominales',
            value: state.option7,
            onPress: () => setState({ ...state, option7: !option7 })
        }, {
            label: 'Glúteos',
            value: state.option8,
            onPress: () => setState({ ...state, option8: !option8 })
        },
    ]
    return (<View style={{ flex: 1, backgroundColor: Colors.Fondo1, paddingTop: '12%', paddingRight: '12%', paddingBottom: '0.1%', paddingLeft: '12%' }}>
        <View style={{ flex: 1 }}>
            <Texto colorLabel='white' size={13}>Más detalles de la Máquina que estás buscando:</Texto>

            <View style={{ flex: 0.35, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <Picker
                    mode={'dropdown'}
                    style={{ height: 50, width: 70, color: 'white' }}
                    onValueChange={(itemValue, itemIndex) => {

                    }}>
                    {['Mas Nueva'].map((item, i) => {
                        return <Picker.Item label={`${item}`} value={i} />
                    })}
                </Picker>

            </View>

            <View style={{ flex: 1 }}>
                <Texto colorLabel='white' size={13}>A trabajar:</Texto>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                        {CheckBoxList.map((item, i) => {

                            return (<View style={{ width: '50%', flexDirection: 'row', marginTop: 10 }}>
                                <CheckBox checked={item.value} color="#ffffff" style={{ backgroundColor: 'rgba(0, 184, 8,1.0)' }} onPress={() => item.onPress()} />
                                <Texto style={{ marginLeft: 20 }} size={16} colorLabel='white'>{item.label}</Texto>
                            </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        </View>
        <View style={{ flex: 0.1 }}>
            <Button>
                <Texto>Filtrar</Texto>
            </Button>
        </View>
    </View>)
}