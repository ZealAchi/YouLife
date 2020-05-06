import React from 'react'
import { Texto } from "../../../UI/Text"
import { View } from 'native-base'
import HeaderSearchorWithOptions from '../../../UI/HeaderSearchorWithOptions'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { ImageBackground } from 'react-native'
import { Card } from 'react-native-elements'
import { CardItem } from 'native-base'
export const MantencionesAdminGeneral=({navigation})=>{
    const handleLoadMore = (e) => { console.log(e) }
    const isLoading = false

    return (
        <View style={{ flex: 1, backgroundColor: '#dfdfdfdf' }}>    
            <HeaderSearchorWithOptions placeholder='Buscar Solicitudes'search navigation={navigation} />
            <View style={{ flex: 1 }}>
                <ScrollView>
                <ItemMantencion/>
                {/* <FlatList
                    data={[i]}
                    renderItem={<ItemMantencion/>}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={<FooterList isLoading={isLoading} />}
                /> */}
                </ScrollView>
            </View>
        </View>)
}


function ItemMantencion() {
    return (

        <Card
            containerStyle={{
                padding: 0,
                margin: 10,
                flex: 1,
                height: 64,
                borderRadius: 15,
            }}
        ><TouchableOpacity onPress={()=>{
            alert("HOla")
        }}><View>
            <View style={{ flexDirection: 'row' }}>
                <ImageBackground style={{ flex: 1, borderRadius: 15, margin: -1.3, height: 64 }} borderBottomLeftRadius={15} borderTopLeftRadius={15} source={require('../../../Assets/Lugar1.png')}>
                    <></>
                </ImageBackground>
                <CardItem style={{ justifyContent: 'flex-end', paddingLeft: 5, borderRadius: 15, flex: 2.1 }}>
                    <View style={{ justifyContent: 'space-between', flex: 1, marginLeft: 15, justifyContent: 'center' }}>
                        <Texto size={'15'} fontFamily='normal'>{'Las Condes'}</Texto>
                    </View>
                </CardItem>
                <CardItem style={{ borderRadius: 15, flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <View>
                        <View>
                            <Texto style={{}} size='9'>{'8/2/2019'}</Texto>
                        </View>
                        <View style={{marginTop:3}}>
                            <Texto style={{}} size='9' colorLabel='red'>{'PENDIENTE'}</Texto>
                        </View>
                    </View>
                </CardItem>
            </View>
            </View>
            </TouchableOpacity>
        </Card>

        
    )
}