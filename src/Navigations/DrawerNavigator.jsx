import React, { useContext } from 'react'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { TabsScreen } from './TabsScreen'
import { Texto } from '../UI/Text';
import { Image, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { View, List, ListItem, Content, Left, Body, Text, Separator } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useWs } from '../Hooks/useWS';
import { DataContext } from '../Context/Datos.Context';


const Drawer = createDrawerNavigator()
export const DrawerScreen = () => (
    <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
        <Drawer.Screen name="Home" component={TabsScreen} />
        {/* <Drawer.Screen name="Notifications" component={NotificationScreen} /> */}
        {/* <Drawer.Screen name="Profile" component={ProfileStackScreen}/> */}
    </Drawer.Navigator>
)


function DrawerMenu(props) {
    const { icon, title, navigation } = props
    return (
        <ListItem avatar noBorder style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}
            onPress={() => navigation()}>
            <Left style={{ alignContent: 'center', alignItems: 'center' }}>
                <Image source={icon} style={{
                    height: 25, width: 22, marginTop: -5
                }} />
            </Left>
            <Body>
                <Texto size={14}>{title}</Texto>
            </Body>
        </ListItem>
    )
}


function Menu(props) {
    const Ws = useWs()
    const Context=useContext(DataContext)
    // console.log(Context)
    return (<SafeAreaView>
        <ScrollView style={{}}>
            <List style={{}}>
                <Content >
                    <Content style={{ backgroundColor: 'rgba(000, 000, 000, 0.8)' }}>
                        <List>
                            <ListItem avatar noBorder >
                                <Left>
                                    <Image source={require('../Assets/IconPerson.png')} style={{
                                        height: 33, width: 33
                                    }} />
                                </Left>
                                <Body>
                                    <Texto size={16} colorLabel="#fff">{'data.nombre'}</Texto>
                                    <Texto size={14} colorLabel="#fff">Admin</Texto>
                                </Body>
                            </ListItem>
                        </List>
                    </Content>
                    <Content >
                        
                        <DrawerMenu icon={require('../Assets/User.png')} title="Mi Perfil" navigation={() => props.navigation.navigate('Home')} />
                        <DrawerMenu icon={require('../Assets/Notificaciones.png')} title="Notificaciones" navigation={() => props.navigation.navigate('Notifications')} />
                        <DrawerMenu icon={require('../Assets/MetodoPago.png')} title="Método de pago" navigation={() => props.navigation.navigate('Home')} />
                        <DrawerMenu icon={require('../Assets/PanelAdminGeneral.png')} title="Panel de admin. general" navigation={() => props.navigation.navigate('PanelAdminGeneral')} />
                        <DrawerMenu icon={require('../Assets/PanelAdminEdificio.png')} title="Panel de admin. edificio" navigation={() => props.navigation.navigate('Home')} />
                        <DrawerMenu icon={require('../Assets/Preguntas.png')} title="Mi Perfil" navigation={() => props.navigation.navigate('Preguntas')} />
                        <DrawerMenu icon={require('../Assets/Contacto.png')} title="Contacto" navigation={() => props.navigation.navigate('Home')} />
                    </Content>
                </Content>
                <Separator style={{ backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#c4c4c4', height: 1 }} />
            </List>
        </ScrollView>
        <List>
            <DrawerMenu icon={require('../Assets/CerrarSesion.png')} title="Cerrar sesión" navigation={() => { Ws.FunctionsNoAuth.signOut() }} />
        </List>
    </SafeAreaView>)
}