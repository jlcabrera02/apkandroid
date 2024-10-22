// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Islas from './screens/Islas';
import Home from './screens/Home';
import Websocket from './providers/Websocket';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Websocket>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="/"
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f45fa11e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="/" component={Home} />
          <Stack.Screen name="islas" component={Islas} />

          {/* <Stack.Screen name="NewCrop" component={NewCrop} />
        <Stack.Screen
          name="SelectedInformation"
          component={SelectedInformation}
        />
        <Stack.Screen name="SeeCrop" component={SeeCrop} />
        <Stack.Screen name="SelectedCrop" component={SelectedCrop} />
        <Stack.Screen name="CropInformation" component={CropInformation} />
        <Stack.Screen name="BluetoothExample" component={BluetoothExample} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Websocket>
  );
}

export default App;
