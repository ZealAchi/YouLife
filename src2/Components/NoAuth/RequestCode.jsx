import React, { useState } from "react";
import { Texto } from "../../UI/Text";
import { ScreenContainer } from "../ScreenContainer";
import styled from "styled-components";
import { Image } from 'react-native';

import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { Form, Item, Input, View, Label } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../UI/Colors";
import { Button } from "../../UI/Button";


export const RequestCode = ({navigation}) => {
    const [state, setState] = useState({
        loadingVisible: false,
        formValid: true,
        nombre: '',
        email: '',
        direccion: '',
        edificio: '',
        departamento: '',
        telefono: '',
        ShowMessage: false,
        // qrImage: 'http://45.236.130.116:92/qr/1580346442.Jpeg',
        qrImage: undefined,
    })
    const setQrImage = (data) => {
        setState({ ...state, qrImage: data })
    }
    const { loadingVisible, email, rut, formValid, qrImage } = state

    const withDate = '                                                               '
    function handleCloseNotification() {
        setState({ ...state, ShowMessage: false })
    }
    function ShowMessage() {
        setState({ ...state, ShowMessage: true })
    }
    const Data = [
        { label: "Nombre y Apellido", onChange: (e) => setState({ ...state, nombre: e }), value: state.nombre },
        { label: "Email", onChange: (e) => setState({ ...state, email: e }), value: state.email },
        { label: "Dirección", onChange: (e) => setState({ ...state, direccion: e }), value: state.direccion },
        { label: "Edificio", onChange: (e) => setState({ ...state, edificio: e }), value: state.edificio },
        { label: "Departamento", onChange: (e) => setState({ ...state, departamento: e }), value: state.departamento },
        { label: "Teléfono", onChange: (e) => setState({ ...state, telefono: e }), value: state.telefono },
    ]
    return (<ScreenContainer>
            <View style={styles.container}>
                <View style={styles.halfHeight} >
                    <></>
                </View>
                <View style={[styles.quarterHeight]} >
                    <View style={{
                        flex: 1,
                        marginLeft: '8%',
                        paddingBottom: 0,
                        marginRight: '8%', backgroundColor: 'transparent',
                    }}>
                        <Card style={{
                            flex: 1,
                            with: 302,
                            height: 306,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                        }} background={Colors.PrincipalColor} >
                            <Form style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                padding: 12,
                                marginBottom: 1,
                                paddingBottom: 25,
                                height: 70,
                                paddingTop: -18,
                            }}>

                                <View style={{ backgroundColor: 'transparent', marginBottom: -15 }}>
                                    <Image style={{ width: '100%', height: 100, marginTop: 0 }}
                                        resizeMode="center" source={require('./../../Assets/logo_youtrain.png')} />
                                </View>
                                <ScrollView>
                                    {qrImage === undefined ? Data.map((item, i) => {
                                        return (
                                            <Input2 key={i} label={item.label} onChange={item.onChange} value={item.value} />
                                        )
                                    }) : <>
                                            <Image style={{ width: 250, height: 250, marginTop: 0 }}
                                                resizeMode="center" source={{ uri: qrImage }} />
                                        </>
                                    }
                                    {qrImage === undefined ? <Button background="#D6EA5F" styleButton={{ marginTop: 17, justifyContent: 'center' }} 
                                    onPress={()=>{navigation.navigate('Modal',{
                                        type:'SolicitarCodigo',
                                        state:state,
                                        setQrImage:setQrImage
                                    })}}>
                                        <Texto Bold >GENERAR CÓDIGO</Texto>
                                    </Button> : <Button background="#D6EA5F" styleButton={{ marginTop: 17, justifyContent: 'center' }} onPress={()=>navigation.navigate('CreateAccount')}>
                                            <Texto Bold>ACEPTAR</Texto>
                                        </Button>
                                    }
                                </ScrollView>
                            </Form>
                        </Card>

                    </View>
                </View>
                <View style={styles.halfHeight} >
                    <></>
                </View>
                {/* <Loader
                    modalVisible={loadingVisible}
                    animationType="fade"
                /> */}
                {/* <Notification showNotification={state.ShowMessage} handleCloseNotification={handleCloseNotification} state={state} setQrImage={setQrImage} /> */}
            </View>
        
    </ScreenContainer>)
}




const Card = styled.View`
 width:100%;
 height:88%;
 background:${
    props => {
        if (props.background !== undefined) {
            return props.background
        } else { return '#fff' }
    }};
    padding-left:7%;
    padding-top:2%;
    padding-right:7%;
    border-radius:14px;

`



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        flexDirection: 'column',
        justifyContent: 'space-between',
        //   alignItems: 'flex-end',
    },
    halfHeight: {
        flex: 0.08,
        paddingLeft: '20%',
        paddingRight: '20%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quarterHeight: {
        flex: 2.4,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    quarterHeight2: {
        flex: 1,
        width: 150,
    }
});




const Input2 = (props) => {
    const { label, onChange, value, children } = props
    return <View style={{
        marginBottom: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        paddingBottom: 5,
        borderColor: '#000',
        borderColor: '#ddd',
        paddingTop: 18
    }}>

        <Item floatingLabel  >
            <Label style={{ color: Colors.TercerColor, fontFamily: 'normal' }} >{label}</Label>
            {children ? children : <Input style={{ borderColor: 'transparent', fontFamily: 'normal', color: Colors.TercerColor }} onChangeText={onChange} value={value} />}

        </Item>
    </View>
}