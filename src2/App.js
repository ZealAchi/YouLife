import React from 'react';
import {LoaderIcon, LoaderScreen} from './Loader';
import LoadingContext from './Context/Load.Context';
import {RootStackScreen} from './Navigations';
import {NavigationContainer} from '@react-navigation/native';
import VariablesContext from './Context/Variables.Context';
import {navigationRef} from './Navigations/RootNavigation';
import DataContext from './Context/Datos.Context';
import NotificationsContext from './Context/Notifications.Context';
import {Platform, StatusBar, View, StyleSheet} from 'react-native';

function App() {
  StatusBar.setBarStyle('light-content', true);
  console.disableYellowBox = ['Remote debugger'];

  return (
    <DataContext>
      <LoadingContext>
        <VariablesContext>
          <NotificationsContext>
            <NavigationContainer ref={navigationRef}>
              <MyStatusBar backgroundColor="#000000" barStyle="light-content" />
              <RootStackScreen />
            </NavigationContainer>
            <LoaderIcon animationType="fade" />
            <LoaderScreen />
          </NotificationsContext>
        </VariablesContext>
      </LoadingContext>
    </DataContext>
  );
}

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
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
export default App;
