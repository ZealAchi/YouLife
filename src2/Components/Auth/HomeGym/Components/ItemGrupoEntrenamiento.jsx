import React, { useEffect, useContext, useState } from 'react';
import {
    StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator
    , TouchableOpacity
} from 'react-native'

import { Image } from 'react-native-elements';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Texto } from '../../../../UI/Text';
import { useData } from '../../../../Hooks/useData';
import { useWs } from '../../../../Hooks/useWS';
import { useTime } from '../../../../Hooks/useTime';
// import { DataContext } from '../../../../../Context/Data.Context';


export const ItemGrupoEntrenamiento = (props) => {
    const { Data = [], navigation, title } = props
    if (Data === null)
        return null
    const handleLoadMore = (e) => { console.log(e) }
    const isLoading = false
    return (
        <SafeAreaView style={{ marginBottom: 12 }}>
            {title !== 'PrincipalHome' ? <Texto Bold colorLabel="white">{title}</Texto> : null}
            <View style={{ alignItems: 'center' }}>
                <FlatList
                    data={Data}
                    horizontal={title === 'PrincipalHome' ? true : false}
                    renderItem={(item, i) => <Item key={i} {...item} title={title} navigation={navigation} />}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={<FooterList isLoading={isLoading} />}
                    keyExtractor={(item, index) => index.toString()}
                    maxToRenderPerBatch={12}
                />
            </View>
        </SafeAreaView>
    )

}

const Item = function (props) {
    const { title = '', navigation } = props

    const { iden } = props.item


    // const validation1=((lun===1&&mar===1)||(mie===1&&jue===1)||((lun===1&&jue===1)||(mie===1&&lun===1)))
    // const validation2=((lun===1&&mar===1&&mier==1)||(lun===1&&mar===1&&jue===1)||(lun===1&&mie===1&&jue===1)||(mar===1||mier===1||juev===1))

    const DiasSemana = {
        lun : props.item.lun,
        mar : props.item.mar,
        mie : props.item.mie,
        jue : props.item.jue,
        vie : props.item.vie,
        sab : props.item.sab,
        dom : props.item.dom
    }
    


    return (
        title !== 'PrincipalHome' ? <TouchableOpacity onPress={() => {
            navigation.navigate('GrupoEntramientoHomeView', {
                EntrenamientoID: iden,
                TipoEntrenamiento: title,
                DiasSemana:DiasSemana
            })
        }}>
            <Content {...props} />
        </TouchableOpacity> : <Content {...props} />

    )


}

const Content = (props) => {
    const { title = '', navigation,DiasSemana } = props
    const { estado, iden_condominio,horario,horario_final, img, descripcion, iden_profesor, iden, iden_tipo, iden_usuario, max, min, nombre, token, total, onPress = () => { alert(iden) } } = props.item
    const lun = props.item.lun
    const mar = props.item.mar
    const mie = props.item.mie
    const jue = props.item.jue
    const vie = props.item.vie
    const sab = props.item.sab
    const dom = props.item.dom

    const UT = useTime()
    const getDia = UT.FunctionsTime.getDayName();


    var validarDia = {
        lun: (lun === 1 ? 'lun' : '' === getDia) === false ? '' : 'lun',
        mar: (mar === 1 ? 'mar' : '' === getDia) === false ? '' : 'mar',
        mie: (mie === 1 ? 'mie' : '' === getDia) === false ? '' : 'mie',
        jue: (jue === 1 ? 'jue' : '' === getDia) === false ? '' : 'jue',
        vie: (vie === 1 ? 'vie' : '' === getDia) === false ? '' : 'vie',
        sab: (sab === 1 ? 'sab' : '' === getDia) === false ? '' : 'sab',
        dom: (dom === 1 ? 'dom' : '' === getDia) === false ? '' : 'dom',
    }
    var Arreglo = []

        if (validarDia['lun'] !== '') {
            if (getDia.toLocaleUpperCase() === 'lun'.toLocaleUpperCase()) {
                Arreglo.push('lun')
            }
        }
        if (validarDia['mar'] !== '') {
            if (getDia.toLocaleUpperCase() === 'mar'.toLocaleUpperCase()) {
                Arreglo.push('mar')
            }
        }
        if (validarDia['mie'] !== '') {
            if (getDia.toLocaleUpperCase() === 'mie'.toLocaleUpperCase()) {
                Arreglo.push('mie')
            }
        }
        if (validarDia['jue'] !== '') {
            if (getDia.toLocaleUpperCase() === 'jue'.toLocaleUpperCase()) {
                Arreglo.push('jue')
            }
        }
        if (validarDia['vie'] !== '') {
            if (getDia.toLocaleUpperCase() === 'lun'.toLocaleUpperCase()) {
                Arreglo.push('vie')
            }
        }
        if (validarDia['sab'] !== '') {
            if (getDia.toLocaleUpperCase() === 'sab'.toLocaleUpperCase()) {
                Arreglo.push('sab')
            }
        }
        if (validarDia['dom'] !== '') {
            if (getDia.toLocaleUpperCase() === 'dom'.toLocaleUpperCase()) {
                Arreglo.push('dom')

            }
        }
        const InicioHoraCadena = horario.split(":", 3);
        const InicioHoraFinal = InicioHoraCadena[0] 
        const InicioMinutosFinal = InicioHoraCadena[1]

        const FinalHoraCadena = horario_final.split(":", 3);
        const FinalHoraFinal = FinalHoraCadena[0]
        const FinalMinutosFinal = FinalHoraCadena[1]
        
        

    return (
        <View style={[styles.viewItem, title === 'PrincipalHome' && { width: 222 }, { display: 'flex' }]}>
            <View style={{ flex: 1.2, height: 80, display: 'flex' }}>
                <Image
                    borderBottomLeftRadius={50}
                    borderTopLeftRadius={50}
                    resizeMode="center"
                    source={{ uri: img, cache: 'only-if-cached' }}
                    style={{ height: 80, width: 80, }}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
            <View style={{ flex: title === 'PrincipalHome' ? 1.8 : 2.4, flexDirection: 'row', display: 'flex' }}>
                <View style={{ flex: title === 'PrincipalHome' ? 1 : 2, justifyContent: 'center' }}>
                    <Texto Bold size={13}>{nombre}</Texto>
                    {title === 'PrincipalHome' ? <View style={{ flex: 0.86, }}>


                        {title !== 'Sugeridos' ? <View style={{}}>
                            <Texto Bold size={9}>
                                {lun === 1 ? 'Lu' : ''}
                                {((lun === 1) && (mar === 1 || mie === 1 || jue === 1)) ? '-' : ''}
                                {mar === 1 ? 'Ma' : ''}
                                {(mie === 1 || jue === 1) && mar == 1 ? '-' : ''}
                                {mie === 1 ? 'Mi' : ''}
                                {(jue !== 0 && (mie === 1 || mar === 1)) ? '-' : ''}
                                {jue === 1 ? 'Ju' : ''}
                            </Texto>
                            <Texto Bold size={9} style={[(lun === 1 || mie === 1 || mar === 1 || lun === 1) ? null : { bottom: 12 }]}>
                                {vie === 1 ? 'Vi' : ''}
                                {((vie === 1) && sab === 1 || dom === 1) ? '-' : ''}
                                {sab === 1 ? 'Sa' : ''}
                                {((sab === 1 || vie === 1) && 0 !== dom) ? '-' : ''}
                                {dom === 1 ? 'Dom' : ''}
                            </Texto></View> : <></>}
                    </View> : <Texto size={11}>{descripcion}</Texto>}
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <AnimatedCircularProgress
                        size={56}
                        width={3}
                        tintColor="#09D8D2"
                        rotation={0}
                        fill={(total * 100) / max}

                        backgroundColor="#3d5875">
                        {
                            () => (
                                <View style={{justifyContent:'center',alignContent:'center'}}>
                                    <Texto size={9} style={{ color: "#09D8D2",textAlign:'center' }}>{`${total}/${max && max}`}</Texto>
                                    <Texto size={10} style={{textAlign:'center'}}>{
                                    `${InicioHoraFinal}:${InicioMinutosFinal}`
                                    }</Texto>
                                    <Texto size={10} style={{textAlign:'center'}}>{`${FinalHoraFinal}:${FinalMinutosFinal}`}
                                    {/* {Arreglo[0]=='lun'?'Hoy':lun === 1?'Lun':''}
                                    {((lun === 1) && (mar === 1 || mie === 1 || jue === 1 || vie === 1 || sab === 1 || dom === 1)) ? ' - ' : ''}
                                    {Arreglo[0]=='mar'?'Hoy':mar === 1?'Mar':''}
                                    {(mie === 1 || jue === 1 || vie === 1 || sab === 1 || dom === 1) && mar == 1 ? ' - ' : ''}
                                    {Arreglo[0]=='mier'?'Hoy':mie === 1?'Mie':''}
                                    {(mie === 1 && (jue === 1 || vie === 1 || sab === 1 || dom === 1)) ? ' - ' : ''}
                                    {Arreglo[0]=='jue'?'Hoy':jue === 1?'Sab':''}
                                    {(jue === 1 && (vie === 1 || sab === 1 || dom === 1)) ? ' - ' : ''}
                                    {Arreglo[0]=='vie'?'Hoy':vie === 1?'Vie':''}
                                    {((vie === 1) && sab === 1 || dom === 1) ? ' - ' : ''}
                                    {Arreglo[0]=='sab'?'Hoy':sab === 1?'Sab':''}
                                    {((sab === 1) && 0 !== dom) ? ' - ' : ''}
                                    {Arreglo[0]=='dom'?'Hoy':dom === 1?'Dom':''} */}
                                    </Texto>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
            </View>
            {title !== 'PrincipalHome' ? <View style={{ flex: title === 'PrincipalHome' ? 0.77 : 0.86, alignItems: 'center', justifyContent: 'center' }}>
                <AntDesign name="checkcircle" size={26} color={title !== 'Sugeridos' ? 'green' : '#e9e9e9'} />
                <Texto Bold size={7}>{title === 'Sugeridos' ? 'INSCRIBIRSE' : 'INSCRIPTO'}</Texto>
                {title !== 'Sugeridos' ? <View style={{}}>
                    <Texto Bold size={9} textAlign='center'>
                        {lun === 1 ? 'Lu' : ''}
                        {((lun === 1) && (mar === 1 || mie === 1 || jue === 1)) ? '-' : ''}
                        {mar === 1 ? 'Ma' : ''}
                        {(mie === 1 || jue === 1) && mar == 1 ? '-' : ''}
                        {mie === 1 ? 'Mi' : ''}
                        {(jue !== 0 && (mie === 1 || mar === 1)) ? '-' : ''}
                        {jue === 1 ? 'Ju' : ''}

                        {/* { validation1&&((vie === 1)!==(sab===1||dom===1)) ? '-' : ''}
                            { validation1&&((vie === 1)!==(sab===1||dom===1)) ? 'Vi' : ''}
                            { validation1&&((vie !== 1)!==(sab===1||dom===1)) ? '-' : ''}
                            { validation1&&((vie !== 1)!==(sab===1||dom===1)) ? 'Sab' : ''}
                            { validation1&&((vie !== 1)!==(sab===1||dom===1)) ? '-' : ''}
                            { validation1&&((vie !== 1)!==(sab===1||dom===1)) ? 'Dom' : ''} */}
                    </Texto>

                    <Texto Bold size={9} textAlign='center' style={[(lun === 1 || mie === 1 || mar === 1 || lun === 1) ? null : { bottom: 12 }]}>
                        {vie === 1 ? 'Vi' : ''}
                        {((vie === 1) && sab === 1 || dom === 1) ? '-' : ''}
                        {sab === 1 ? 'Sa' : ''}
                        {((sab === 1 || vie === 1) && 0 !== dom) ? '-' : ''}
                        {dom === 1 ? 'Dom' : ''}

                    </Texto></View> : <></>}
            </View> : null}
        </View>
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
    viewItem: {
        flexDirection: "row",
        margin: 10,
        backgroundColor: '#ffffff',
        width: 322,
        flex: 1,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
});