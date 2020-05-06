import React, { useEffect } from 'react'
import { ScreenContainerAuth } from '../ScreenContainer'
import { Texto } from '../../UI/Text'
import Colors from '../../UI/Colors'
import styled from 'styled-components'
import { View, ScrollView, StyleSheet, TouchableHighlight, Platform, StatusBar, TextInput, Image, Alert } from 'react-native'

import HeaderSearchorWithOptions from '../../UI/HeaderSearchorWithOptions'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { HomeCardGrupoEntrenamiento } from './components/HomeCardGrupoEntrenamientos'

export const Home = ({ navigation }) => {
    function OpenPublicidad() {
        console.log('CLick  ')
        // Linking.openURL('https://www.sportika.cl');
    }
    const { navigate } = navigation;
    useEffect(() => {
        navigation.closeDrawer()
    }, [1])
    
    return (
        <ScreenContainerAuth>

            <HeaderSearchorWithOptions search navigation={navigation} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={styles.scrollview}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <View style={{ padding: 25 }}>
                        <Texto fontFamily='normal' colorLabel={Colors.TercerColor} textAlign='center'>YouTrain</Texto>
                    </View>
                    <View style={{ flexDirection: 'row', height: 100, justifyContent: 'center', alignItems: 'center', alignContent: 'center', padding: 25, marginBottom: 25 }}>
                        {optionsUsersNews.map((item, i) => {
                            return (<CardText key={i} ico={item.ico} color={item.background} title={item.title} accion={item.navigate} navigate={navigate} />)
                        })}
                    </View>

                    {/* Banner Publicitario */}
                    {/* <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                        <TouchableHighlight onPress={OpenPublicidad}>
                            <Image style={{ width: 205.24, height: 75.1 }} source={require('./../../../../assets/svg/Publicidad.png')} />
                        </TouchableHighlight>
                    </View> */}
                    {/* Fin Banner Publicitario */}
                    {/* <View>
                        <Texto fontFamily='normal' colorLabel={Colors.TercerColor} >Comunidades</Texto>
                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView
                                style={styles.scrollView}
                                contentContainerStyle={{ paddingRight: 30 }}
                                horizontal
                                showsHorizontalScrollIndicator={false}>
                                {ComunidadesInfo.map((item, i) => {
                                    return <HomeCardComunidades key={i} {...item} />
                                })}
                            </ScrollView>
                        </View>
                        <Texto fontFamily='normal' colorLabel={Colors.TercerColor} >Mural de Avisos</Texto>
                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView
                                style={styles.scrollView}
                                contentContainerStyle={{ paddingRight: 30 }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {MuralDeAvisos.map((item, i) => {
                                    return (
                                        <Suspense fallback={<></>} key={i} >
                                            <HomeCardMuralAvisos {...item} />
                                        </Suspense>
                                    )
                                })}
                            </ScrollView>
                        </View> */}


                    <Texto colorLabel="white" >Grupos de Entrenamiento</Texto>
                    <View style={{flex:1}}>
                            <HomeCardGrupoEntrenamiento />
                    </View>

                    {/*<Texto fontFamily='normal' >UltimasNoticias</Texto>
                    <View style={{ flexDirection: 'row' }}>
                        <ScrollView
                            style={styles.scrollView}
                            contentContainerStyle={{ paddingRight: 30 }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {UltimasNoticias.map((item, i) => <HomeCardUltimasNoticias key={i} {...item} />)}

                        </ScrollView></View>

                    {/* <Texto colorLabel={Colors.TercerColor} fontFamily='normal' style={{ marginTop: 12 }}>Reservas y Pagos</Texto>
                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView
                                style={styles.scrollView}
                                contentContainerStyle={{ paddingRight: 20 }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {[1, 2, 3, 4].map((item, i) => {
                                    return <HomeCardReservasyPagos key={i} />
                                })}

                            </ScrollView></View> */}
                    {/* </View> */}
                </ScrollView>
                <View style={{ flex: 30, backgroundColor: 'transparent' }}>
                    {/* <WebView source={{ uri: 'https://www.doyoutrain.com/app' }} /> */}
                </View>
            </View>
        </ScreenContainerAuth>
    )
}


const CardText = (props) => {
    const { navigate, accion, ico, title } = props

    return (
        <View>
            <CardHomePrincipal imageStyle={{ borderRadius: 1 }} >

                <View style={{ padding: 12 }}>
                    <TouchableOpacity style={{ borderRadius: 50 }} onPress={accion === 'HomeGym' ? () => navigate(accion) : null}>
                        <Image source={ico} style={{
                            height: navigate === 'Gym' ? 100 : 100, width: navigate === 'HomeGym' ? 100 : 100
                        }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Texto fontFamily='normal' size={16} colorLabel={Colors.TercerColor} style={{ marginTop: 5 }}>{title}</Texto>
                    </View>
                </View>
            </CardHomePrincipal>
        </View>

    )
}
const optionsUsersNews = [
    {
        title: 'MI GYM',
        navigate: 'HomeGym',
        ico: require('../../Assets/Logo.png')
    },
    // {
    //     title:'Avisos',
    //     navigate: 'Avisos',
    //     ico: require('./../../assets/menus/avisos_icon_youtrain.png')
    // },
    // {
    //     title:'Comunidad',
    //     navigate: 'Comunidad',
    //     ico: require('./../../assets/menus/comunidad_icon_youtrain.png')
    // }
]

// const optionsUser = [
//     {
//         background: GymImg,
//         title: 'Gym',
//         navigate: 'Gym',
//         ico: require('./../../assets/svg/GymIco.png')
//     }, {
//         background: AvisosImg,
//         title: 'Avisos',
//         navigate: 'Avisos',
//         ico: require('./../../assets/svg/AvisosIco.png')
//     }, {
//         background: ComunidadImg,
//         title: 'Comunidad',
//         navigate: 'Comunidad',
//         ico: require('./../../assets/svg/ComunidadIco.png')
//     }
// ]

const styles = StyleSheet.create({
    scrollview: {
        paddingTop: 0,
    },
    scrollViewContent: {
        paddingBottom: 10,
    },
});


const ComunidadesInfo = [
    {
        title: 'Comunidad de runners',
        description: 'Les parece juntarnos el sabado a las 10AM a trotar por la comuna?',
        img: require('../../Assets/Perfil1.png'),
        like: 50,
        disLike: 14
    },
    {
        title: 'Comunidad de runners',
        description: 'Les parece juntarnos el sabado a las 10AM a trotar por la comuna?',
        img: require('../../Assets/Perfil2.png'),
        like: 50,
        disLike: 14
    }
]

const MuralDeAvisos = [
    {
        img: require("../../Assets/Aviso1.png"),
        title: 'Paseo perros',
        owner: 'Carlos Anaya ',
        cost: 500
    },
    {
        img: require("../../Assets/Aviso2.png"),
        title: 'Estacionamiento',
        owner: 'María Campos',
        cost: 500
    },
    {
        img: require("../../Assets/Aviso3.png"),
        title: 'Refrigerador',
        owner: 'Toni Ventura',
        cost: 500
    }
]
const UltimasNoticias = [
    {
        img: require("../../Assets/image1.png"),
        owner: 'Nina Vera',
        title: 'Desayuno fácil y fit',
        comments: 20,
        likes: 5
    },
    {
        img: require("../../Assets/image2.png"),
        owner: 'Nina Vera',
        title: 'Cuidado del cuerpo',
        comments: 20,
        likes: 5
    },
    {
        img: require("../../Assets/image3.png"),
        owner: 'Nina Vera',
        title: 'Entrenar con',
        comments: 20,
        likes: 5
    }
]

const CardHomePrincipal = styled.ImageBackground`
flex:1;
width: 100px;
height: 100px;
justify-content:center;
align-items:center;
display: flex; 
flex-direction: column;
margin-right: 10px;
margin-left: 10px;
`