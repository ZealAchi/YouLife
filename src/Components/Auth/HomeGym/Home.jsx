import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, TouchableHighlight, Platform, StatusBar, TextInput, Image } from 'react-native'
import styled from 'styled-components'
import HeaderSearchorWithOptions from '../../../UI/HeaderSearchorWithOptions';
import Colors from '../../../UI/Colors';
import { Button } from '../../../UI/Button';
import { Texto } from '../../../UI/Text';

export function HomeGym(props) {
    const { navigate } = props.navigation;
    return (
        <View style={styles.wrapper}>
            <View style={{ flex: 1 }}>
                <HeaderSearchorWithOptions navigation={props.navigation} />
                <ScrollView
                    style={styles.scrollview}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <View style={{ flex: 1, marginRight: 3, marginLeft: 3, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        <View style={{ flexDirection: 'row', paddingBottom: 2, marginTop: 15, flex: 1 }}>
                            <View style={{ flex: 1 }}><CardText ico={require('../../../Assets/menus/grupo_de_entrenamiento_icon_youtrain.png')} title={'GRUPOS DE ENTRENAMIENTO'} accion={'GrupoEntramientoHome'} navigate={navigate} /></View>
                            <View style={{ flex: 1 }}><CardText ico={require('../../../Assets/menus/maquinas_icon_youtrain.png')} title={'MÁQUINAS'} accion={'MaquinasHome'} navigate={navigate} /></View>
                            <View style={{ flex: 1 }}><CardText ico={require('../../../Assets/menus/rutinas_de_entrenamiento_icon_youtrain.png')} title={'RUTINAS'} accion={'rutinas'} navigate={navigate} /></View>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 50, paddingBottom: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <View style={{ flex: 1 }}><CardText ico={require('../../../Assets/menus/mantenciones_icon_youtrain.png')} title={'MANTENCIONES'} accion={'MantencionesHome'} navigate={navigate} /></View>
                            <View style={{ flex: 1 }}><CardText ico={require('../../../Assets/menus/profesores_icon_youtrain.png')} title={'PROFESORES'} accion={'ProfesoresHome'} navigate={navigate} /></View>
                            <View style={{ flex: 1 }}><CardText ico={require('../../../Assets/menus/blog_icon_youtrain.png')} title={'BLOG'} accion={'Blog'} navigate={navigate} /></View>
                        </View>
                    </View>
                </ScrollView>
                <Button onPress={() => { navigate('CrearEntrenamiento'); }} background={Colors.SecondColor} styleButton={{ marginLeft: '10%', marginRight: "10%", borderRadius: 50, marginBottom: 12 }} >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', position: 'absolute' }}>
                        <Texto Bold style={{ paddingRight: 12 }}>+</Texto>
                        <Texto Bold  >Crear Entrenamiento</Texto>
                    </View>
                </Button>
            </View>
        </View>
    )
}


const CardText = (props) => {
    const { navigate, accion, ico, title } = props
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <CardHomePrincipal>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View >
                        <TouchableHighlight style={{ borderRadius: 50 }} onPress={(accion === 'MaquinasHome' || 'Blog' === accion || 'ProfesoresHome' === accion || 'GrupoEntramientoHome' === accion || 'MantencionesHome' === accion) ? () => navigate(accion) : null}>
                            <Image source={ico} style={{
                                height: navigate === 'Gym' ? 5 : 115, width: navigate === 'Gym' ? 115 : 115
                            }} />
                        </TouchableHighlight>
                    </View>
                    <View style={{ width: '100%' }}>
                        <Texto fontFamily='normal' size={10} colorLabel={Colors.TercerColor} style={{ marginTop: 5, textAlign: 'center' }}>{title}</Texto>
                    </View>
                </View>
            </CardHomePrincipal>
        </View>

    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.Fondo1,
    },
    scrollview: {
        paddingTop: 0,
    },
    scrollViewContent: {
        // paddingBottom: 80,
    },
});





const CardHomePrincipal = styled.ImageBackground`
flex:1;
width: 100px;
height: 100px;
align-items:center;
`