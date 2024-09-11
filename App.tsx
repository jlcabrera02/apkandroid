// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import SelectedInformation from './screens/SelectedInformation';
import NewCrop from './screens/NewCrop';
import SeeCrop from './components/SeeCrop';
import SelectedCrop from './components/SelectedCrop';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
        <Stack.Screen name="/" component={Home} />
        <Stack.Screen name="NewCrop" component={NewCrop} />
        <Stack.Screen
          name="SelectedInformation"
          component={SelectedInformation}
        />
        <Stack.Screen name="SeeCrop" component={SeeCrop} />
        <Stack.Screen name="SelectedCrop" component={SelectedCrop} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
