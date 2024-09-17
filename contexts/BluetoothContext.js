import React, { createContext, useState, useEffect } from 'react';
import BluetoothClassic from 'react-native-bluetooth-classic';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Alert, Linking, Platform } from 'react-native';

export const BluetoothContext = createContext();

export const BluetoothProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const result = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
        if (result !== RESULTS.GRANTED) {
          Alert.alert(
            'Permisos de Bluetooth Necesarios',
            'Para usar esta aplicación, debes habilitar Bluetooth en la configuración de tu dispositivo.',
            [
              {
                text: 'Ir a Configuración',
                onPress: () => {
                  if (Platform.OS === 'ios') {
                    Linking.openURL('App-Prefs:root=Bluetooth');
                  } else {
                    Linking.openSettings();
                  }
                },
              },
              {
                text: 'Cancelar',
                onPress: () => console.log('Cancelado por el usuario'),
                style: 'cancel',
              },
            ],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.error('Error solicitando permisos:', error);
      }
    };

    const listPairedDevices = async () => {
      try {
        const pairedDevices = await BluetoothClassic.getBondedDevices();
        setDevices(pairedDevices);
      } catch (error) {
        console.error('Error listando dispositivos emparejados:', error);
      }
    };

    requestPermissions();
    listPairedDevices();
  }, []);

  const connectToDevice = async (device) => {
    try {
      const connected = await BluetoothClassic.connectToDevice(device.id);
      if (connected) {
        setConnectedDevice(device);
        Alert.alert('Conectado', `Conectado a ${device.name}`);
      } else {
        Alert.alert('Error', 'No se pudo conectar al dispositivo. Intente de nuevo');
      }
    } catch (error) {
      console.error('Error conectando al dispositivo:', error);
      Alert.alert('Error', 'No se pudo conectar al dispositivo. Intente de nuevo');
    }
  };

  useEffect(() => {
    const readData = async () => {
      if (connectedDevice) {
        try {
          let message = await connectedDevice.read();
          if (message) {
            message = message.trim();
            if (message !== '' && message !== ' ') {
              setReceivedMessage(message);
            }
          }
        } catch (error) {
          console.error('Error leyendo el mensaje:', error);
        }
      }
    };

    if (connectedDevice) {
      const interval = setInterval(readData, 1000); 
      return () => clearInterval(interval);
    }
  }, [connectedDevice]);

  return (
    <BluetoothContext.Provider
      value={{
        devices,
        connectedDevice,
        connectToDevice,
        receivedMessage,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};
