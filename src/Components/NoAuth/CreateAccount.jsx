import React, { useState, useContext } from 'react'
import { Image ,KeyboardAvoidingView, StyleSheet, ScrollView, Alert, DatePickerIOS } from "react-native";
import { Form, Item, Input, View, Label, DatePicker } from 'native-base';

import { ScreenContainer } from "../ScreenContainer"
import styled from 'styled-components'
import { Texto } from '../../UI/Text';
import { Button } from '../../UI/Button';
import Colors from '../../UI/Colors';
import { useWs } from '../../Hooks/useWS';


export const CreateAccount = ({navigation}) => {
    const WS=useWs()
    const [state, setState] = useState({
        loadingVisible: false,
        formValid: true,
        nombre: '',
        fechan: '',
        rut: '',
        email: '',
        password: ''
    })
    const { loadingVisible, email, rut, formValid } = state
    const withDate = '                                                               '

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
                        marginRight: '8%', backgroundColor: 'transparent',
                    }}>
                        <Card style={{
                            flex: 1,
                        }} background={Colors.PrincipalColor} >
                            <Form style={{
                            }}>
                                <View style={{ backgroundColor: 'transparent', marginBottom: -15 }}>
                                    <Image style={{ width: '100%', height: 100, marginTop: 0 }}
                                        resizeMode="center" source={require('../../Assets/logo_youtrain.png')} />
                                </View>
                                <ScrollView style={{ paddingTop: 0, }}>
                                    <Input2 label="Nombre y Apellido" onChange={(e) => setState({ ...state, nombre: e })} value={state.nombre} />
                                    <Item stackedLabel style={{
                                        alignItems: 'stretch',
                                        marginBottom: 1,
                                        justifyContent: 'center',
                                        backgroundColor: 'transparent',
                                        height: 50,
                                        borderColor: '#ddd',
                                        borderBottomWidth: 1,
                                        paddingTop: 18
                                    }} >
                                        <Label style={{ color: Colors.TercerColor, fontFamily: 'normal' }}  >{'Fecha de Nacimiento'}</Label>
                                        <Item picker style={{ borderBottomColor: 'transparent' }} >
                                            {Platform.OS !== 'ios' ?
                                                <DatePicker onDateChange={(e) => { setState({ ...state, fechan: e.getTime() }) }} textStyle={{ color: Colors.TercerColor, textAlign: 'right', borderBottomColor: 'transparent' }}
                                                    placeHolderText={withDate} /> :
                                                <DatePickerIOS
                                                    date={state.fechan}
                                                    textStyle={{ color: Colors.TercerColor, textAlign: 'right', borderBottomColor: 'transparent' }}
                                                    onDateChange={(e) => { setState({ ...state, fechan: e.getTime() }) }}
                                                />}
                                        </Item>
                                    </Item>
                                    <Input2 label="RUT" onChange={(e) => setState({ ...state, rut: e })} value={state.rut} />
                                    <Input2 label="Email" onChange={(e) => setState({ ...state, email: e })} value={state.email} />
                                    <Input2 label="Password" onChange={(e) => setState({ ...state, email: password })} value={state.password} >
                                        <Input style={{ borderColor: 'transparent', fontFamily: 'normal', color: Colors.TercerColor }} secureTextEntry={true} onChangeText={(e) => setState({ ...state, password: e })} value={state.password} />
                                    </Input2>
                                    <Button  background="#D6EA5F" styleButton={{ marginBottom: 15, marginTop: 25, justifyContent: 'center' }}
                                    onPress={()=>{WS.FunctionsNoAuth.signUp(state,{navigate:navigation.goBack})}}>
                                        <Texto Bold fontFamily='normal'>CREAR CUENTA</Texto>
                                    </Button>
                                    <View style={{
                                        marginBottom: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'transparent',
                                        padding: 12,
                                        paddingBottom: 5,
                                        borderColor: '#000',
                                        // height: 50,
                                        borderColor: '#ddd',
                                        // borderBottomWidth: 1,
                                        paddingTop: 18
                                    }}>

                                    </View>
                                </ScrollView>
                            </Form>
                        </Card>
                    </View>
                </View>
                <View style={styles.halfHeight} >
                    <></>
                </View>
            </View>
        </ScreenContainer>
    )
}


const Card = styled.View`
 width:100%;
 /* height:88%; */
 background:${
    props => {
        if (props.background !== undefined) {
            return props.background
        } else { return '#fff' }
    }};
    padding-left:7%;
    /* padding-top:2%; */
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
        backgroundColor: 'transparent',
        padding: 12,
        paddingBottom: 5,
        borderColor: '#000',
        // height: 50,
        borderColor: '#ddd',
        // borderBottomWidth: 1,
        paddingTop: 18
    }}>

        <Item floatingLabel  >
            <Label style={{ color: Colors.TercerColor, fontFamily: 'normal' }}  >{label}</Label>
            {children ? children : <Input style={{ borderColor: 'transparent', fontFamily: 'normal', color: Colors.TercerColor }} onChangeText={onChange} value={value} />}
        </Item>
    </View>
}