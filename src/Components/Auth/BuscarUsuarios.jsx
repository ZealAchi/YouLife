import React, { useEffect, useState, useContext } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Container, Header, Item, Input, Icon, Button, Text, Content, List, ListItem, Left, Thumbnail, Body, Right, View } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
// import { DataContext } from '../../Context/Data.Context';
import { ActivityIndicator, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import _ from 'lodash'
import { Texto } from '../../UI/Text';
import Colors from '../../UI/Colors';
import { useWs } from '../../Hooks/useWS';
import { useUserList } from '../../Hooks/useUserList';
import { DataContext } from '../../Context/Datos.Context';

export default function SearchUsuarios(props) {
    // const {route}=props
    // const {params}=route
    // const {invitados}=params
    
    const { setUsersSelects } = useContext(DataContext)
    StatusBar.setBarStyle("light-content", true);
    const [state, setState] = useState({ loading: false, data: [], query: "" })
    const Ws = useWs()
    const UserList = useUserList()
    const {setUsersSelectsFunction}=UserList
    // const { getAllDataAPI, UserList, setUsersSelects } = useContext(DataContext)
    useEffect(() => {
        setState({ loading: true })
        Ws.FunctionsAuth.getDataApIUserList(UserList.setUserList)
        setState({ loading: false })
    }, [])
    useEffect(() => {
        setState({ data: UserList.userList })
    }, [UserList.userList])
    // useEffect(()=>{
    //     console.log(invitados,'invitados anterior')
    //     invitados.forEach(invitado => {
    //         console.log(invitado.iden_usuario, invitado.nombre,'As.',UserList)
            
    //         setUsersSelectsFunction(invitado.iden_usuario, invitado.nombre)
    //     });
    // },[])

    const handleText = (text) => {
        const formattedQuery = text.toLowerCase()
        const data = _.filter(UserList.userList, item => {
            const { nombre } = item
            if (nombre.toLowerCase().includes(formattedQuery)) {
                return true
            }
            return false
        })
        setState({ data, query: text })
    }
    const { userSelect } = UserList
    const _renderItem = ({ item, index }) => {
        const seleccionado = userSelect.invitados.filter((e) => { return e.iden_usuario === item.iden })
        return (<>
            <ListItem avatar onPress={() => { setUsersSelectsFunction(item.iden, item.nombre);/* setUsersSelects(item.iden, item.nombre); setUsersSelects(item.iden, item.nombre) */}}>
                <Left>
                    <Thumbnail source={{ uri: 'https://i.ya-webdesign.com/images/avatar-png-1.png' }} />
                    {seleccionado.length === 1 && <AntDesign color="white" name="checkcircle" size={25} style={{ position: 'absolute', top: 40, left: 42 }} />}
                </Left>
                <Body>
                    <Texto Bold colorLabel={`white`}>{item.nombre}</Texto>
                </Body>
            </ListItem></>)
    }
    const _renderFooter = () => {
        if (!state.loading) return null
        return <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
            <ActivityIndicator animating size="large" />
        </View>
    }
    const SaveUsers=()=>{
        setUsersSelects(userSelect)
        props.navigation.goBack()
    }

    return (
        <>
            <Header searchBar rounded translucent style={{ backgroundColor: Colors.Fondo1 }}>
                <MyStatusBar
                    backgroundColor="#000000"
                    barStyle="light-content"
                />
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Buscar..." onChangeText={handleText} />
                    <Icon name="ios-people" />
                </Item>
                <Button transparent>
                    <Text>{'Buscar...'}</Text>
                </Button>
            </Header>
            <Content style={{ backgroundColor: Colors.Fondo1 }}>
                <List>
                    <FlatList
                        data={state.data}
                        renderItem={_renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={_renderFooter}
                    />
                </List>
            </Content>
            <TouchableHighlight style={{ position: 'absolute', width: "100%", height: 52, top: "92%", backgroundColor: "#123", }}>
                <View style={{ flex: 1, bottom: 5, flexDirection: 'row-reverse' }}>
                    < >
                        <Ionicons onPress={() => SaveUsers()} name="ios-add-circle" color={Colors.SecondColor} size={55} style={{ bottom: 22, left: 12 }} />
                    </>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Texto size={18} colorLabel="white" note numberOfLines={1} style={{ flex: 1, alignSelf: 'center', marginLeft: 10 }}>
                            {userSelect && userSelect.invitados.map((item,i) => {
                                return<>{item.nombre} {i===0&&''} {(i===0)&&(userSelect.invitados.length>1)&&','} {i ===1&&"."}</>
                            })} 
                            {userSelect.invitados.length<1&&'No has seleccionado a un usuario.'} 
                        </Texto>
                    </View>
                </View>
            </TouchableHighlight>
        </>
    );
}
const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        backgroundColor: '#79B45D',
        height: APPBAR_HEIGHT,
    },
    content: {
        flex: 1,
        backgroundColor: '#33373B',
    },
});