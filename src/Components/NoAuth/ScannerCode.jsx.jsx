
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../UI/Colors';
import { Texto } from '../../UI/Text';
import { Button} from '../../UI/Button';
import { SafeAreaView } from 'react-native';
import { RNCamera } from 'react-native-camera';

export function ScannerCode() {
  const [scanned,setScanned]=useState(false)
  const PendingView = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Texto>Esperando...</Texto>
    </View>
  );


  return (<SafeAreaView style={{ flex: 1 }}>
    <RNCamera googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.DATA_MATRIX} style={{
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    }}
      onBarCodeRead={(e) => {alert(`tipo:${e.type}, dato:${e.data}`);console.log(e.type,e.data)}}
      androidCameraPermissionOptions={{
        title: 'Permiso para usar la cámara',
        message: 'Necesitamos su permiso para usar su cámara',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
    >
      {({ camera, status }) => {
        if (status !== 'READY') return <PendingView />;
        return (
            <Button Bold styleButton={{ width:'80%',marginLeft: '10%', marginRight: '10%', marginBottom: '10%' }} label="ACEPTAR"background="#D6EA5F" onPress={() => setScanned(false)} />
        );
      }}
    </RNCamera>
  </SafeAreaView>)
}


