import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Entypo from 'react-native-vector-icons/Entypo'
import { Button } from './Button';
import { Texto } from './Text';



export default function LoadFile({ change }) {
    const [state, setState] = useState({
        singleFileOBJ: '',
        fileBase64: ''
    })
    const [base64, setBase64] = useState(null)
    async function SingleFilePicker() {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            change(res.uri)
            if (res.type === ('application/pdf')) {
                setState({ singleFileOBJ: res });
            } else {
                Alert.alert(
                    'YouTrain',
                    `Selecciona un archivo PDF`,
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert(
                    'YouTrain',
                    `Acción Cancelada`,
                    [

                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            } else {
                Alert.alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }
    return (
        <View >
            <Texto colorLabel="white" size={12} style={{ paddingBottom: 12 }}>
                Nombre del Archivo: {state.singleFileOBJ.name ? state.singleFileOBJ.name : ''}
            </Texto>
            <Button icon={{ position: 'right', element: <Entypo name="upload" size={20} /> }} onPress={SingleFilePicker} background={'white'} styleButton={{}} label={'CARGAR CV'} backgroundColor={'white'} />
        </View>
    );
}
