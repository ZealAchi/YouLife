import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View } from 'react-native';
import { useEffect } from 'react';
import { Button } from './Button';
import { Texto } from './Text';

export default function TimeOrDate(props) {
    const { date } = props

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [value, setValue] = useState(null)
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (dato) => {
        if (props.date) {
            try {
                const Fecha=new Date(dato).toLocaleDateString()
                hideDatePicker()
                setValue(Fecha)
                props.setData(Fecha)
            } catch (error) {
                console.log(error)
            }

        } else {
            hideDatePicker()
            const Tiempo=`${dato.getHours()}:${dato.getMinutes()}:${/*dato.getSeconds()*/'00'}`
            setValue(Tiempo)
            props.setData(Tiempo)
        }

    };
    const { type } = props

    // useEffect(() => {
    //     if (!date)
    //         if (props.state !== null) {
    //             var Tiempo =props.state
    //             try {
    //                 Tiempo = `${props.state.getHours()}:${props.state.getMinutes()}:${props.state.getSeconds()}`
    //                 setValue(Tiempo)
    //                 props.setData(Tiempo)
    //             } catch (error) {
    //                 Tiempo =props.state
    //                 props.setData(Tiempo)
    //             }
    //         }
    // }, [props.state])
    if (!date)
        return (
            <View>
                {type === 'input' ?
                    <Button onPress={showDatePicker} backgroundColor='transparent'>
                        <Texto colorLabel="white" size={15}>{value !== null ? `${value}` : "Selecciona una hora"}</Texto>
                    </Button>
                    : <Button onPress={showDatePicker}>
                        <Texto size={15}>{value !== null ? `${value}` : "Selecciona una hora"}</Texto>
                    </Button>}

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        );
    return (
        <View>
            {type === 'input' ?
                <Button onPress={showDatePicker} backgroundColor='transparent'>
                    <Texto colorLabel="white" size={15}>{value !== null ? `${value}` : "Selecciona una fecha"}</Texto>
                </Button>
                : <Button onPress={showDatePicker}>
                    <Texto size={15}>{value !== null ? `${value}` : "Selecciona una fecha"}</Texto>
                </Button>}

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};
