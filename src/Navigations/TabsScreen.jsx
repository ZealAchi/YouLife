import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { HomeStackScreen } from './HomeStackScreen';
import { Image, Dimensions } from 'react-native';
import Colors from '../UI/Colors';



const Tabs = createMaterialBottomTabNavigator();

export const TabsScreen = () => (
    <Tabs.Navigator
    labeled={true}
    x
        screenOptions={({ route }) => ({
            tabBarLabel:"asd",
            tabBarIcon: (props) => {
                const { focused, color, size } = props
                // console.log(color,'Ag COlor :v')
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused ? require('../Assets/Home.png') : require('../Assets/Home.png')
                } else if (route.name === 'Comunidad') {
                    iconName = focused ? require('../Assets/Comunidad.png') : require('../Assets/Comunidad.png');
                } else if (route.name === 'Avisos') {
                    iconName = focused ? require('../Assets/Avisos.png') : require('../Assets/Avisos.png');
                } else if (route.name === 'Salas') {
                    iconName = focused ? require('../Assets/Salas.png') : require('../Assets/Salas.png');
                } else if (route.name === 'Pagos') {
                    iconName = focused ? require('../Assets/Pagos.png') : require('../Assets/Pagos.png');
                }
                // You can return any component that you like here!
                return <Image source={iconName} style={{
                    height: 24, width: 24, tintColor: color
                }} />;
            },
        })}
        initialRouteName="Home"
        activeColor={Colors.SecondColor}
        inactiveColor="#f0edf6"
        barStyle={{ backgroundColor: '#000000' }}
        style={{
            // backgroundColor: '#000000',
            borderTopColor: 0,
            shadowOffset: { width: 5, height: 3 },
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 5
        }}
    >
        <Tabs.Screen name="Home" component={HomeStackScreen} options={{
            tabBarLabel: "Home",
            tabBarColor: Colors.PrincipalColor,
            // tabBarIcon: (props) => {
            //     console.log(props)
            //     return( <Image source={require('./../Assets/Salas.png')} style={{
            //         height: 24, width: 24, tintColor: props.tintColor
            //     }} />)
            // }
        }} />
        <Tabs.Screen name="Comunidad" component={HomeStackScreen} options={{ tabBarLabel: "Comunidad" }} />
        <Tabs.Screen name="Avisos" component={HomeStackScreen} options={{ tabBarLabel: "Avisos" }} />
        <Tabs.Screen name="Salas" component={HomeStackScreen} options={{ tabBarLabel: "Salas" }} />
        <Tabs.Screen name="Pagos" component={HomeStackScreen} options={{ tabBarLabel: "Pagos" }} />
        {/* <Tabs.Screen name="Buscar" component={SearchStackScreen}/>
        <Tabs.Screen name="Historial" component={HomeStackScreen} options={{tabBarLabel:"Historial",tabBarColor:"green"}}/> */}
    </Tabs.Navigator>
)