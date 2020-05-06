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
import  * as RootNavigation  from '../../../Navigations/RootNavigation';


function RenderMaquinas(props) {
    // const { ShowMessageModal } = useContext(ContextMessage)
    const { img, nombre } = props
    
    return (<>
    <ListGlobal img={img} nombre={nombre} onPress={() => {RootNavigation.navigate('Modal',{
                type:'ViewMaquinas',
                data:{...props} 
            })}} />
        
    </>)
}
export function Maquinas(props) {
    // const { Categorias } = useContext(LoadDataUtilContext)
    const Ws = useWs()
    const { data: Maquinas, setData: setMaquinas } = useData()
    useEffect(() => {
        Ws.FunctionsAuth.getDataAPITipoMAquinas(setMaquinas)
    }, [])
    return (
        <View style={styles.wrapper}>
            <View style={{ flex: 1 }}>
                <HeaderSearchorWithOptions search navigation={props.navigation} />
                <ScrollView
                    style={styles.scrollview}
                    contentContainerStyle={styles.scrollViewContent}>
                    <View style={{ flexDirection: 'column', paddingLeft: 5 }}>
                        {/* <FlatList
                            data={Maquinas}
                            renderItem={({ item }) => {console.log(item);return<Texto>{'item.key'}</Texto>}} /> */}

                        {Maquinas&&Maquinas.map((item, i) => {
                            return (
                                <View key={i}>
                                    <Texto fontFamily='normal' style={{ paddingLeft: 5 }} colorLabel={Colors.TercerColor}>{item.nombre}</Texto>
                                    <View style={{ flexDirection: 'row' }}>
                                        <ScrollView
                                            style={styles.scrollView}
                                            contentContainerStyle={{ paddingRight: 30 }}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}>
                                            <></>
                                            <TipoMaquinas {...item} categoria={item.nombre} iden={item.iden} />
                        {/* <TipoMaquinas tipo={item.iden} /> */}
                        
                                        </ScrollView>
                                    </View>
                                </View>
                            )
                        })} 
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
function TipoMaquinas(props) {
    const { categoria, iden } = props
    const Ws = useWs()
    const { data: Maquinas, setData: setMaquinas } = useData()
    useEffect(() => {
        Ws.FunctionsAuth.getDataAPIMAquinas(setMaquinas,iden)
    }, [])
    return (<>
        {Maquinas && Maquinas.map((item, i) => {
            return (
                <RenderMaquinas key={i} {...item} categoria={categoria} />
            )
        })}
    </>)
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