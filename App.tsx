// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import SelectedInformation from './screens/SelectedInformation';
import NewCrop from './screens/NewCrop';
import SeeCrop from './components/SeeCrop';
import SelectedCrop from './components/SelectedCrop';
import BluetoothExample from './screens/BluetoothExample';
import {BluetoothProvider} from './contexts/BluetoothContext';
import Welcome from './screens/Welcome';
import CropInformation from './screens/CropInformation';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <BluetoothProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="welcome"
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="/" component={Home} />

          <Stack.Screen name="NewCrop" component={NewCrop} />
          <Stack.Screen
            name="SelectedInformation"
            component={SelectedInformation}
          />
          <Stack.Screen name="SeeCrop" component={SeeCrop} />
          <Stack.Screen name="SelectedCrop" component={SelectedCrop} />
          <Stack.Screen name="CropInformation" component={CropInformation} />
          <Stack.Screen name="BluetoothExample" component={BluetoothExample} />
        </Stack.Navigator>
      </NavigationContainer>
    </BluetoothProvider>
  );
}

export default App;
