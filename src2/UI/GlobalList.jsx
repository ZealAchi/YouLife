import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import { Image } from "react-native-elements";
import { Texto } from "./Text";





export default function ListGlobal(props) {
    const { isLoading, handleLoadMore, onPress } = props;
    const global = [props]
    return (
        <>
            <SafeAreaView style={styles.container}>

                {global ? (
                    <FlatList
                        data={global}
                        renderItem={global => (
                            <Global global={global} />
                        )}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}

                        ListFooterComponent={<FooterList isLoading={isLoading} />}
                    />
                ) : (
                        <View style={styles.loaderGlobal}>
                            <ActivityIndicator size="large" />
                            <Text>Cargando Maquinas</Text>
                        </View>
                    )}
            </SafeAreaView>
        </>
    );
}

function Global(props) {
    const { global } = props;
    const { nombre, img, onPress } = global.item;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.viewGlobal}>
                <View style={styles.viewGlobalImage}>
                    <Image
                        resizeMode={nombre === 'Multifuncional' ? "stretch" : 'cover'}
                        source={{ uri: img }}
                        borderRadius={10}
                        containerStyle={styles.imageGlobal}
                        style={styles.imageGlobal}
                        PlaceholderContent={<ActivityIndicator color="white" />}
                    />
                </View>
                <View style={{ flex: 1.5, justifyContent: 'center', borderLeftWidth: 2 }}>
                    <View style={{ paddingLeft: 8 }}>
                        <Texto fontFamily='normal' size={14}>{nombre}</Texto>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function FooterList(props) {
    const { isLoading } = props;

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return <></>
}



const styles = StyleSheet.create({
    loading: {
        marginTop: 20,
        alignItems: "center"
    },
    viewGlobal: {
        flexDirection: "row",
        margin: 10,
        backgroundColor: '#ffffff',
        width: 228,
        flex: 1,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    viewGlobalImage: {
        marginRight: 15,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    imageGlobal: {
        width: 80,
        height: 80,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,

        borderLeftWidth: 1,
        // resizeMode: '',
    },
    globalName: {
        fontWeight: "bold"
    },
    globalAddress: {
        paddingTop: 2,
        color: "grey"
    },
    globalDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300
    },
    loaderGlobal: {
        marginTop: 10,
        marginBottom: 10
    },
    notFoundRestuants: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center"
    }
});