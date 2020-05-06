import React from 'react'
import { View, ImageBackground } from 'react-native'
import styled from 'styled-components'
import Colors from '../UI/Colors'
export function ScreenContainer({ children }) {
  return (<Container style={{ flex: 1, opacity: 1 }} blurRadius={2} resizeMode="cover" source={require('./../Assets/youtrain1.png')}>
    <View style={{ backgroundColor: 'rgba(0,0,0, 0.60)', flex: 1 }}>
      {children}
    </View>
  </Container>)
}
export const ScreenContainerAuth = ({ children }) => (
  <View style={{ flex: 1, backgroundColor: Colors.Fondo1 }}>{children}</View>
)

const Container = styled(ImageBackground)`
  flex:1;
  `
