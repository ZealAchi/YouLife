import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Image } from "react-native";
import { Form, Item, Input, View, Label, DatePicker } from 'native-base';

import styled from 'styled-components'
import { Texto } from "../../UI/Text";
import Colors from '../../UI/Colors';
import { Button } from '../../UI/Button';
import { ScreenContainer } from '../ScreenContainer';


export const ForgetPassword = () => {
    const [state, setState] = useState({
        loadingVisible: false,
        formValid: true,
        NombreApellido: '',
        FechaNacimiento: '',
        Rut: '',
        Email: '',
        Contraseña: ''
    })
    function RecuperarContraseña() {
        setState({ ...state, loadingVisible: true })
        setTimeout(() => {
            if (state.email === 'luis@mail.com') {
                setState({ ...state, loadingVisible: false, formValid: false })

            } else {
                setState({ ...state, loadingVisible: false, formValid: true })

            }
        }, 2000)
    }

    return (
        <ScreenContainer>
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
                                backgroundColor: '',
                                padding: 12,
                                marginBottom: 1,
                                paddingBottom: 25,
                                height: 70,
                                paddingTop: -24,

                            }}>
                                <View style={{ backgroundColor: 'transparent', marginBottom: -15 }}>
                                    <Image style={{ width: '100%', height: 100, marginTop: 0 }}
                                        resizeMode="center" source={require('./../../Assets/logo_youtrain.png')} />
                                </View>
                                <Input2 label="RUT" onChange={(e) => setState({ ...state, FechaNacimiento: e })} value={state.FechaNacimiento} />
                                <Input2 label="Email" onChange={(e) => setState({ ...state, Rut: e })} value={state.Rut} />
                                <Button background="#D6EA5F" styleButton={{ top: '7%', justifyContent: 'center' }} onPress={RecuperarContraseña}>
                                    <Texto Bold>RECUPERAR CUENTA</Texto>
                                </Button>
                            </Form>
                        </Card>

                    </View>
                </View>
                <View style={styles.halfHeight} >
                    <></>
                </View>

            </View></ScreenContainer>)
}




const Container = styled.View`
display:flex;
padding-right:8%;
padding-left:8%;
`

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
    border-radius:14;

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
        flex: 1,
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
        // marginBottom: 15,
        // background:'red',
        // backgroundColor: 'pink',
        // justifyContent: 'center',
        // textAlign: 'center',
        // alignContent: 'center',
        // alignItems: 'center'
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
        // height: 50,
        borderColor: '#ddd',
        // borderBottomWidth: 1,
        paddingTop: 18
    }}>

        <Item floatingLabel  >
            <Label style={{ fontFamily: 'normal', color: Colors.TercerColor }} >{label}</Label>
            {children ? children : <Input style={{ fontFamily: 'normal', borderColor: 'transparent', color: Colors.TercerColor }} onChange={onChange} value={value} />}

        </Item>
    </View>
}