


import React, { useState, useEffect } from 'react';
import { View, List } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderSearchorWithOptions from '../../../UI/HeaderSearchorWithOptions';
import Colors from '../../../UI/Colors';
import { useWs } from '../../../Hooks/useWS';
import { ItemGrupoEntrenamiento } from './Components/ItemGrupoEntrenamiento';
import  {SafeAreaView,} from 'react-native'
export function GrupoEntramientoHome({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.Fondo1 }}>
            <View style={{ display: 'flex' }}>
                <HeaderSearchorWithOptions search navigation={navigation} />
            </View>
            <ScrollView removeClippedSubviews={true} >
                    <EntrenamientoCompoenent navigation={navigation}/>
                    <SugeridosComponent navigation={navigation}  />
            </ScrollView>
            <View style={{ flex: 0.28 }}>

            </View>
        </View>)
}

function SugeridosComponent(props) {
    const Ws = useWs()
    const [sugeridos, setSugeridos] = useState(null)
    const { navigation = [] } = props
    useEffect(() => {
        Ws.FunctionsAuth.getDataAPIGrupoEntrenamientoGetSugeridos(setSugeridos)
    }, [])
    if (sugeridos !== null)
        return <ItemGrupoEntrenamiento  Data={sugeridos} navigation={navigation} title="Sugeridos" />
    return null
}
function EntrenamientoCompoenent({ navigation }) {
    const Ws = useWs()
    const [entrenamiento, setEntrenamiento] = useState(null)
    const { FunctionsAuth = null } = Ws
    useEffect(() => {
        if (entrenamiento === null)
            FunctionsAuth.getDataAPIGrupoEntrenamientoGetEntrenamiento(setEntrenamiento)
        console.log("GEtDATA ENTRENAMIENTO")
    }, [navigation])
    if (entrenamiento !== null)
        return <ItemGrupoEntrenamiento Data={entrenamiento} navigation={navigation} title="Mis Entrenamientos" />
    return null
} 