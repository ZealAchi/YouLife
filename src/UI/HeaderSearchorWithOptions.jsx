import React from 'react'
import { View,TouchableOpacity , Platform, TextInput, Image } from 'react-native'


export default function HeaderSearchorWithOptions({ search, navigation, placeholder }) {
    return (<View style={{ height: 86 }}>
        <View style={{ flexDirection: 'row', padding: 10, borderColor: 'transparent', marginHorizontal: 20, shadowOffset: { width: 0, marginHorizontal: 0 }, marginTop: Platform.OS == 'android' ? 30 : null }}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image source={require('../Assets/IconPerson.png')} style={{
                    height: 25, width: 25,
                }} />
            </TouchableOpacity>
            {search &&
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={placeholder ? placeholder : "¿Qué estás buscando?"}
                    placonsoleceholderTextColor="grey"
                    style={{
                        flex: 1, left: 15, borderWidth: 1, borderColor: 'transparent', borderRadius: 20, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.32,
                        shadowRadius: 5.46,
                        elevation: 9,  backgroundColor: 'white', textAlign: 'center'
                    }}
                />}
        </View>
    </View>)
}