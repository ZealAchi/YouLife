import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components/native'
import { Form, Item, Input, View, Label } from 'native-base';
import { ScrollView, StatusBar, StyleSheet, Alert, Image } from 'react-native';
import { ImageBackground } from "react-native";
import { ListItem, CheckBox, Body } from 'native-base';
import axios from 'axios'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


import AsyncStorage from '@react-native-community/async-storage';
import { Button } from './../../UI/Button'
import { ScreenContainer } from '../ScreenContainer'
import colors from './../../UI/Colors';
// import { Texto } from '../../UI/Text';
import { useWs } from '../../Hooks/useWS';
import { LoadingContext } from '../../Context/Load.Context';
const dataInit = {
    formValid: true,
    message: undefined,
    result: undefined,
}

StatusBar.setBarStyle("#09D8D2", true);
export const Login = ({ navigation }) => {
    // const [Token, setToken] = useState(null)
    // const { setToken } = useContext(DataContext)
    const Loading = useContext(LoadingContext)
    const WS=useWs()
    const { navigate } = navigation



    const [state, setState] = useState({
        ...dataInit,
        email: "",
        password: "",
        recuerdame: false,
        cargando: true
    })
    const { email, password } = state

    useEffect(() => {
        setTimeout(function () {
            if (state.cargando === false) {
                setState({ ...state, cargando: !state.cargando });
            }
            AsyncStorage.getItem('@App:Recuerdame').then((value) => {
                setState({ ...JSON.parse(value), ...dataInit })
            }).catch(e => console.log(e))
        }, 1000)

        // functionVerifyToken()
    }, [])
    function SaveRecuerdame() {
        try {
            if (state.recuerdame) {
                const constSaveData = { email: email, password: password, recuerdame: state.recuerdame }
                AsyncStorage.setItem('@App:Recuerdame', JSON.stringify(constSaveData)).then(value => {
                }).catch((error) => {
                    console.log(error)
                })
            } else {
                AsyncStorage.removeItem('@App:Recuerdame');
            }
        } catch (error) {
            console.log(error)
        }
    }
    const Recuerdame = (value) => {
        setState({ ...state, recuerdame: value })
    }
    // const functionVerifyToken = () => {
    //     // setState({ ...state, loadingVisible: true })
    //     AsyncStorage.getItem('@App:Data').then((token) => {
    //         if (token !== null) {
    //             axios.post(`${uri}/api/Access/LoginToken`, { token: token }).then(async res => {
    //                 const { data } = res
    //                 try {
    //                     if (data.data === null) {
    //                         alert(data.message)
    //                         // setState({ ...state, loadingVisible: false })
    //                     } else {
    //                         if (data.result === 1) {
    //                             data.data[0] && SetData(data.data[0])
    //                             // setState({ ...state, loadingVisible: false })
    //                             navigate('LoggedIn')
    //                         }
    //                     }
    //                 } catch (error) {
    //                     console.log(error)
    //                     throw error
    //                 }
    //             }).catch((e) => {
    //                 console.log(e)

    //             })
    //         } else {
    //             // setState({ ...state, loadingVisible: false })
    //         }
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }
    const Cargando = () => {
        return <ImageBackground source={require('../../Assets/Splash.png')} style={{ flex: 1 }} />
    }

    if (state.cargando === true) {
        return <Cargando />
    }
    return (
        <ScreenContainer>
            {/* <Button title="sign In" onPress={()=>signIn()}/> */}
            {/* <Button title="Create Account" onPress={()=>navigation.push("CreateAccount")}/> */}
            {/* <Button title="Abrir Modal" onPress={()=>navigation.push("Modal")}/> */}
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.halfHeight} >
                        <Image style={{ width: '100%', height: 100 }}
                            resizeMode="center" source={require('./../../Assets/logo_youtrain.png')} />
                    </View>
                    <View style={[styles.quarterHeight]} >
                        <View style={{
                            flex: 1,
                            marginLeft: '8%',
                            marginRight: '8%'
                        }}>
                            <Card style={{
                                flex: 1,
                                with: 302,
                                height: 306,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                alignSelf: 'center'
                            }} background={colors.PrincipalColor} >
                                <Form style={{
                                    flex: 1, backgroundColor: colors.PrincipalColor,
                                    padding: 12,
                                    marginBottom: 1,
                                    paddingBottom: 5,
                                    height: 70,
                                    paddingTop: 16,
                                }}>
                                    <View style={{
                                        marginBottom: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: colors.PrincipalColor,
                                        padding: 12,
                                        paddingBottom: 5,

                                        borderColor: '#000',
                                        height: 50,
                                        borderColor: '#ddd',
                                        borderBottomWidth: 1,
                                        paddingTop: 18
                                    }}>
                                        <FontAwesome name="user-o" size={20} color={colors.SecondColor} />
                                        <Item floatingLabel style={{ borderBottomColor: 'transparent', borderStyle: 'solid' }} >
                                            <Label style={{ fontFamily: 'RobotoSlab-Bold', left: 25, bottom: 4, color: colors.TercerColor }}>RUT/E-Mail</Label>
                                            <Input allowFontScaling clearTextOnFocus value={email} style={{ borderColor: 'transparent', fontFamily: 'RobotoSlab-Light', color: colors.TercerColor }} onChangeText={(e) => setState({ ...state, email: e })} />
                                        </Item>
                                    </View>
                                    <View style={{
                                        marginBottom: 2,
                                        marginTop: 3,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: colors.PrincipalColor,
                                        padding: 12,
                                        paddingBottom: 5,
                                        borderColor: '#000',
                                        height: 50,
                                        borderColor: '#ddd',
                                        borderBottomWidth: 1,
                                        paddingTop: 18
                                    }}>
                                        <Feather name="lock" size={20} color={colors.SecondColor} />
                                        <Item floatingLabel style={{ borderBottomColor: 'transparent', borderStyle: 'solid' }} >
                                            <Label style={{ fontFamily: 'RobotoSlab-Bold', left: 25, bottom: 4, color: colors.TercerColor }}>Contraseña</Label>
                                            <Input allowFontScaling clearTextOnFocus secureTextEntry={true} style={{ borderColor: 'transparent', fontFamily: 'RobotoSlab-Light', color: colors.TercerColor }} value={password} onChangeText={(e) => setState({ ...state, password: e })} />
                                        </Item>
                                    </View>
                                    <View >
                                        <View style={{ backgroundColor: colors.PrincipalColor, marginTop: 19.61, flexDirection: 'row', justifyContent: 'space-around', textAlign: 'center', alignItems: 'center' }}>
                                            <View style={{ backgroundColor: 'trasparent', flexDirection: 'row', flex: 1 }}>
                                                <ListItem style={{ paddingTop: 0, right: 10, width: 110, borderBottomColor: 'transparent' }}>
                                                    <CheckBox checked={state.recuerdame} onBlur={2} onPress={() => { Recuerdame(!state.recuerdame) }} />
                                                    <Body>
                                                        <View style={{ left: 6 }}>
                                                            <Text zize={10} style={{ color: '#fff' }} fontFamily='RobotoSlab-Light'>Recordarme</Text>
                                                        </View>
                                                    </Body>
                                                </ListItem>
                                            </View>
                                            <View style={{ backgroundColor: 'trasparent' }}>
                                                {/* <Button title="sign In" onPress={()=>signIn()}/> */}
                                                <Button onPress={() => { navigate("ForgetPassword") }} styleButton={{ right: 0, top: -8 }} backgroundColor={'transparent'} >
                                                    {/* <Button background="transparent" style={{ right: 0, top: -8 }} onPress={() => navigate('ForgotPassword')}> */}
                                                    <Text zize={10} style={{ fontFamily: 'RobotoSlab-Light', left: 0, lineHeight: 13.64 }} color={colors.SecondColor}>¿Olvidaste tu contraseña?</Text>
                                                </Button>
                                                {/* </Button> */}
                                            </View>
                                        </View>
                                    </View>
                                    {/* <Button background={colors.SecondColor} style={{ marginTop: 23 }} >
                                        <Text style={{ fontFamily: 'RobotoSlab-Bold' }}>INICIAR SESIÓN</Text>
                                    </Button> */}

                                    <Button Bold onPress={() => { WS.FunctionsNoAuth.signIn(SaveRecuerdame, state) }} styleButton={{ marginTop: 23 }} >
                                        <Text style={{ fontFamily: 'RobotoSlab-Bold' }}>INICIAR SESIÓN</Text>
                                    </Button>

                                    <View style={{ flex: 1 }}>
                                        <View style={{ flex: 1, paddingTop: 18, flexDirection: 'row', justifyContent: 'center' }}>
                                            <View style={{ paddingRight: 6 }}>
                                                {/* <Button background="transparent">
                                                    <Text zize={10} color={colors.TercerColor} fontFamily='RobotoSlab-Light'>¿No tienes una cuenta?</Text>
                                                </Button> */}
                                                <Button backgroundColor={'transparent'} size={10} onPress={() => { console.log("s") }} label="¿No tienes una cuenta?" color={colors.SecondColor} />
                                            </View>
                                            <View style={{ paddingRight: 6 }}>
                                                {/* <Button background="transparent" style={{ right: 0 }} onPress={() => navigate('Register')}>
                                                    <Text zize={10} style={{ fontFamily: 'RobotoSlab-Bold' }} style={{ left: 0 }} color={colors.SecondColor}>Registrate aquí</Text>
                                                </Button> */}
                                                <Button backgroundColor={'transparent'} styleButton={{ right: 0 }} color={colors.SecondColor} size={10} onPress={() => navigation.push("CreateAccount")} label="Registrate aquí" />

                                            </View>
                                        </View>
                                    </View>

                                </Form>
                            </Card>
                        </View>
                    </View>
                    <View style={[styles.quarterHeight2, { flex: 1, justifyContent: 'center', paddingTop: 40, alignItems: 'center', alignContent: 'center', backgroundColor: 'transparent' }]}>
                        <ScrollView>
                            <Card background='transparent' style={{ marginBottom: 50, alignContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Button onPress={() => { console.log("s") }} styleButton={{ marginBottom: 8, height: 43, width: 272 }} backgroundColor={'#004896'} >
                                        <View style={{ flexDirection: "row", alignContent: 'stretch', alignItems: 'center', }}>
                                            <View style={{ marginRight: 8 }}>
                                                <FontAwesome name="facebook-f" size={28} color={'white'} style={{}} />
                                            </View>
                                            <View>
                                                <Text color="#ffffff" Bold style='13'>Continuar con Facebook</Text>
                                            </View>
                                        </View>
                                    </Button>
                                    {/* <Button background='#004896' style={{ marginBottom: 8, height: 43, width: 272 }}>
                                        <View style={{ flexDirection: "row", alignContent: 'stretch', alignItems: 'center', }}>
                                            <View style={{ marginRight: 8 }}>
                                                <FontAwesome name="facebook-f" size={28} color={'white'} style={{}} />
                                            </View>
                                            <View>
                                                <Text color="#ffffff" Bold style='13'>Continuar con Facebook</Text>
                                            </View>
                                        </View>
                                            </Button>*/}
                                    <Button onPress={() => navigate('RequestCode')} styleButton={{ marginBottom: 8, height: 43, width: 272, backgroundColor: colors.PrincipalColor, borderWidth: 1, borderColor: colors.white }} backgroundColor={'#004896'} >
                                        <View style={{ flexDirection: "row", alignContent: 'stretch', alignItems: 'center', flex: 1 }}>
                                            <View style={{ marginRight: 8 }}>
                                                <FontAwesome name="qrcode" size={28} color={colors.SecondColor} style={{ marginLeft: -41.9 }} />
                                            </View><View>
                                                <Text color="#ffffff" Bold style='13'>Solicitar Código</Text></View>
                                        </View>
                                    </Button>

                                    {/* <Button background="#A6A6A6" style={{ marginBottom: 8, height: 43, width: 272, backgroundColor: colors.PrincipalColor, borderWidth: 1, borderColor: colors.white }} onPress={() => navigate('SolicitarCodigo')}>
                                        <View style={{ flexDirection: "row", alignContent: 'stretch', alignItems: 'center', flex: 1 }}>
                                            <View style={{ marginRight: 8 }}>
                                                <FontAwesome name="qrcode" size={28} color={colors.SecondColor} style={{ marginLeft: -41.9 }} />
                                            </View><View>
                                                <Text color="#ffffff" Bold style='13'>Solicitar Código</Text></View>
                                        </View>
                                    </Button> */}
                                    <Button onPress={() => navigate('ScannerCode')} styleButton={{ height: 43, width: 272, backgroundColor: colors.PrincipalColor, borderWidth: 1, borderColor: colors.white }} backgroundColor={'#004896'} >
                                        <View style={{ flexDirection: "row", alignContent: 'stretch', alignItems: 'center', flex: 1 }} >
                                            <View style={{ marginRight: 8 }}>
                                                <FontAwesome name="qrcode" size={28} color={colors.SecondColor} style={{ marginLeft: -39.5 }} />
                                            </View><View>
                                                <Text color="#ffffff" style='13' Bold>Escanear Código</Text></View>
                                        </View>
                                    </Button>
                                    {/*     <Button background="#09D8D2" style={{ height: 43, width: 272, backgroundColor: colors.PrincipalColor, borderWidth: 1, borderColor: colors.white }} onPress={() => navigate('ScanearCodigo')}>
                                        <View style={{ flexDirection: "row", alignContent: 'stretch', alignItems: 'center', flex: 1 }} >
                                            <View style={{ marginRight: 8 }}>
                                                <FontAwesome name="qrcode" size={28} color={colors.SecondColor} style={{ marginLeft: -39.5 }} />
                                            </View><View>
                                                <Text color="#ffffff" style='13' Bold>Escanear Código</Text></View>
                                        </View>
                                    </Button> */}
                                </View>
                            </Card>
                        </ScrollView>
                    </View>

                </View>
            </ScrollView>
        </ScreenContainer>
    )
}



const Text = styled.Text`
font-family:${props => {
        if (props.fontFamily !== undefined) {
            return props.fontFamily
        } else {
            return 'normal'
        }
    }};
font-size:${props => {
        if (props.zize !== undefined) {
            return props.zize
        } else {
            return '16'
        }
    }};
color:${
    props => {
        if (props.color !== undefined) {
            return props.color
        } else {
            return '#000000'
        }
    }
    };
`
const Card = styled.View`
 width:100%;
 height:88%;
 background:${
    props => {
        if (props.background !== undefined) {
            return props.background
        } else { return colors.PrincipalColor }
    }};
    padding-left:7%;
    padding-top:2%;
    padding-right:7%;
    border-radius:14px;
`



const styles = StyleSheet.create({
    notificationWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        flexDirection: 'column',
        justifyContent: 'space-between',
        //   alignItems: 'flex-end',
    },
    halfHeight: {
        flex: .8,
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
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
});
