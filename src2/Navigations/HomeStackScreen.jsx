import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from "@react-navigation/stack";
import { Home } from '../Components/Auth/Home';
import { HomeGym } from '../Components/Auth/HomeGym/Home';
import { Maquinas } from '../Components/Auth/HomeGym/MaquinasHome';
import { Profesores } from '../Components/Auth/HomeGym/ProfesoresHome';
import { QuieroSerProfesor } from '../Components/Auth/HomeGym/QuieroSerProfesor';
import { Notifications } from '../Components/Auth/Notifications';
import { Blog } from '../Components/Auth/HomeGym/Blog';
import { GrupoEntramientoHome } from '../Components/Auth/HomeGym/GrupoEntramientoHome';
import { GrupoEntramientoHomeView } from '../Components/Auth/HomeGym/GrupoEntramientoHomeView';
import { Texto } from '../UI/Text';
import { Button } from '../UI/Button';
import Colors from '../UI/Colors';
import Filtro from '../Components/Auth/Filtros';
import * as RootNavigation from './RootNavigation';
import { MantencionesHome } from '../Components/Auth/HomeGym/MantencionesHome';
import { PanelAdminGeneral } from '../Components/Auth/Panel Admin General';
import { MantencionesAdminGeneral } from '../Components/Auth/Admin/MantencionesAdminGeneral';
import { CrearEntrenamiento } from '../Components/Auth/HomeGym/CrearEntrenamiento';
import SearchUsuarios from '../Components/Auth/BuscarUsuarios';

// import { HomeGymStackScreen } from './HomeGym';

const HomeStack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export const HomeStackScreen = () => (
  <HomeStack.Navigator  screenOptions={{
    title: "Gym", headerTitleAlign: 'center',
  
    headerTintColor:Colors.SecondColor,
    headerStyle: {
      backgroundColor: Colors.PrincipalColor,
    }
  }}>
    <HomeStack.Screen name="Home"  component={Home}
    options={{
      title:"Home",
      header:()=>{return null},
      transitionSpec: {
        open: config,
        close: config,
      }
    }} />
    <HomeStack.Screen name="HomeGym" component={HomeGym} options={{
      title: "Gym",
      transitionSpec: {
        open: config,
        close: config,
      }
    }} />

    {/* Routes Gym */}
    <HomeStack.Screen name="MaquinasHome" component={Maquinas} options={{
      headerRight: () => <Button
        onPress={() => {
          RootNavigation.navigate('Filtro', { type: 'Filtrar Maquinas' })
        }}
        styleButton={{ right: 12 }}
        backgroundColor="transparent"
      >
        <Ionicons name='md-menu' size={32} color={Colors.SecondColor} />
      </Button>,
      title: "Máquinas"
    }} />
    <HomeStack.Screen name="ProfesoresHome" component={Profesores} options={{headerRight: () => <Button
        onPress={() => {
          RootNavigation.navigate('Filtro', { type: 'Filtrar Profesores' })
        }}
        styleButton={{ right: 12 }}
        backgroundColor="transparent"
      >
        <Ionicons name='md-menu' size={32} color={Colors.SecondColor} />
      </Button>,
      title: "Profesores" }} />
    <HomeStack.Screen name="QuieroSerProfesor" component={QuieroSerProfesor} options={{ title: "You Train" }} />
    <HomeStack.Screen name="Notifications" component={Notifications} options={{ title: "Notificaciones" }} />
    <HomeStack.Screen name="PanelAdminGeneral" component={PanelAdminGeneral} options={{ title: "Panel Admin General" }} />
    <HomeStack.Screen name="Blog" component={Blog} options={{ title: "Blog" }} />
    <HomeStack.Screen name="GrupoEntramientoHome" component={GrupoEntramientoHome} options={{ title: "Entrenamientos" }} />
    <HomeStack.Screen name="CrearEntrenamiento" component={CrearEntrenamiento} options={{ title: "Crear Entrenamiento" }} />

    <HomeStack.Screen name="GrupoEntramientoHomeView" component={GrupoEntramientoHomeView} options={{ title: "Entrenamientos" }} />
    <HomeStack.Screen name="MantencionesHome" component={MantencionesHome} options={{ title: "Mantenciones" }} />

    {/*End Routes Gym */}
    {/* Filtros */}
    <HomeStack.Screen name="Filtro" component={Filtro} options={{ title: "Filtrar Maquinas" }} />
    {/* End Filtros */}
    {/* <HomeStack.Screen name="Details" component={Details}
      options={({route})=>({title:route.params.name})}
      /> */}
    {/* Admin */}
    <HomeStack.Screen name="MantencionesAdminGeneral" component={MantencionesAdminGeneral} options={{ title: "Mantenciones" }} />


    {/*End Admin */}
    <HomeStack.Screen name="SearchUsuarios" component={SearchUsuarios} options={{ title: "Entrenamiento" }} />
    
  </HomeStack.Navigator>
)