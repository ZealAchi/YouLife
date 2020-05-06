import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { ScrollView, View, StyleSheet } from 'react-native'
import axios from "axios";
import { Texto } from '../../../UI/Text';
import HeaderSearchorWithOptions from '../../../UI/HeaderSearchorWithOptions';
import Colors from '../../../UI/Colors';
import { useWs } from '../../../Hooks/useWS';
import { useData } from '../../../Hooks/useData';
import ListGlobal from '../../../UI/GlobalList';
import * as RootNavigation from '../../../Navigations/RootNavigation';
import { Button } from '../../../UI/Button';
import ItemList from '../../../UI/Item.List';


function RenderProfesores(props) {
    const Ws = useWs()
    const { data: Profesores, setData: setProfesores } = useData()
    useEffect(() => {
        Ws.FunctionsAuth.getDataAPIProfesores(setProfesores)
    }, [])
    

    if (null === Profesores) return <></>
    return <>{Profesores && Profesores.map((item, i) => {
        return <><ItemList key={i} {...item} /></>
    })}</>
}
export function Profesores(props) {
    return (
        <View style={styles.wrapper}>
            <View style={{ flex: 1 }}>
                <HeaderSearchorWithOptions search navigation={props.navigation} />
                <ScrollView
                    style={styles.scrollview}
                    contentContainerStyle={styles.scrollViewContent}>
                    <View style={{ flexDirection: 'column', paddingLeft: 5 }}>
                        <View >
                            <Texto Bold style={{ paddingLeft: 5 }} colorLabel={Colors.TercerColor}>{'Profesores'}</Texto>
                            <View style={{ flexDirection: 'row' }}>
                                <ScrollView
                                    style={styles.scrollView}
                                    showsHorizontalScrollIndicator={false}>
                                    <RenderProfesores />
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={{
                flex: 1,
                width: '100%',
                position: 'absolute',
                bottom: 20,
                alignContent: 'center',
                alignItems: 'center'
            }}>
                <Button styleButton={{ width: '70%', borderRadius: 30 }} onPress={() => props.navigation.navigate('QuieroSerProfesor')}>
                    <Texto size={15} Bold >QUIERO SER PROFESOR</Texto>
                </Button>
            </View>
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
        paddingBottom: 80,
    },
});