import React, {createContext, useState, useEffect} from 'react';
import BluetoothClassic from 'react-native-bluetooth-classic';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Alert, Linking, Platform} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const BluetoothContext = createContext();

export const BluetoothProvider = ({children}) => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false); // Estado para Bluetooth

  // Función para habilitar Bluetooth y listar dispositivos emparejados
  
  const checkBluetoothEnabled = async () => {
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      setBluetoothEnabled(enabled); // Actualizar el estado inmediatamente
      if (!enabled) {
        await RNBluetoothClassic.requestBluetoothEnabled();
        // Vuelve a comprobar si el Bluetooth está habilitado
        const newEnabled = await RNBluetoothClassic.isBluetoothEnabled();
        setBluetoothEnabled(newEnabled); // Actualizar el estado con el nuevo valor
      }
      await listPairedDevices();
    } catch (error) {
      console.error('Bluetooth Classic no está disponible en este dispositivo.');
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
                text: 'Aceptar',
                onPress: () => console.log('Cancelado por el usuario'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        } else {
          await checkBluetoothEnabled();
        }
      } catch (error) {
        console.error('Error solicitando permisos:', error);
      }
    };

    requestPermissions();
  }, []);

  const connectToDevice = async device => {
    try {
      const connected = await BluetoothClassic.connectToDevice(device.id);
      if (connected) {
        setConnectedDevice(device);
        Alert.alert('Conectado', `Conectado a ${device.name}`);
      } else {
        Alert.alert(
          'Error',
          'No se pudo conectar al dispositivo. Intente de nuevo.',
        );
      }
    } catch (error) {
      console.error('Error conectando al dispositivo:', error);
      Alert.alert(
        'Error',
        'No se pudo conectar al dispositivo. Intente de nuevo.',
      );
    }
  };

  const disconnectDevice = async () => {
    if (connectedDevice) {
      try {
        await BluetoothClassic.disconnect();
        setConnectedDevice(null);
        Alert.alert('Desconectado', 'Desconectado del dispositivo.');
      } catch (error) {
        console.error('Error desconectando el dispositivo:', error);
      }
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
              const [temp, hum, soilMoist] = message.split(',').map(Number);
              setTemperature(temp);
              setHumidity(hum);
              setSoilMoisture(soilMoist);
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
        disconnectDevice,
        receivedMessage,
        temperature,
        humidity,
        soilMoisture,
        bluetoothEnabled,
        checkBluetoothEnabled,
      }}>
      {children}
    </BluetoothContext.Provider>
  );
};
