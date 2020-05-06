import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from '../Components/NoAuth/SignIn';
import { CreateAccount } from '../Components/NoAuth/CreateAccount';
import { RequestCode } from '../Components/NoAuth/RequestCode';
import { ScannerCode } from '../Components/NoAuth/ScannerCode.jsx';
import { ForgetPassword } from '../Components/NoAuth/ForgetPassword';

const AuthStack = createStackNavigator()

export const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{
    headerTitleAlign: 'center', headerTintColor: '#fffa', headerStyle: {
      backgroundColor: '#000',
    }
  }}>
    <AuthStack.Screen name="SignIn" component={Login} options={{ title: 'Iniciar Sesión', headerShown: false }} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} options={{ title: 'Crear una cuenta' }} />
    <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} options={{ title: 'Recuperar Cuenta' }} />
    <AuthStack.Screen name="RequestCode" component={RequestCode} options={{ title: 'Solicitar Código' }} />
    <AuthStack.Screen name="ScannerCode" component={ScannerCode} options={{ title: 'Escanear Código' }} />
  </AuthStack.Navigator>
)