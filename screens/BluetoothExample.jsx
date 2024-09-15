import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import BluetoothClassic from 'react-native-bluetooth-classic';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const BluetoothExample = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const result = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
        if (result !== RESULTS.GRANTED) {
          Alert.alert('Permisos de Bluetooth', 'Los permisos de Bluetooth son necesarios para el funcionamiento de esta aplicación.');
        }
      } catch (error) {
        console.error('Error solicitando permisos:', error);
      }
    };

    requestPermissions();

    const listPairedDevices = async () => {
      try {
        const pairedDevices = await BluetoothClassic.getBondedDevices(); // Verifica la documentación de la biblioteca
        setDevices(pairedDevices);
      } catch (error) {
        console.error('Error listando dispositivos emparejados:', error);
      }
    };

    listPairedDevices();
  }, []);

  const connectToDevice = async (device) => {
    try {
      const connected = await BluetoothClassic.connectToDevice(device.id);
      if (connected) {
        setConnectedDevice(device);
        Alert.alert('Conectado', `Conectado a ${device.name}`);
      } else {
        Alert.alert('Error', 'No se pudo conectar al dispositivo.');
      }
    } catch (error) {
      console.error('Error conectando al dispositivo:', error);
      Alert.alert('Error', 'No se pudo conectar al dispositivo.');
    }
  };

  const sendMessage = async () => {
  if (connectedDevice) {
    try {
      // Envía el mensaje al dispositivo conectado
      await connectedDevice.write('DISPOSITIVO CONECTADO Y ENVIANDO DATOS AL ESP32', 'utf-8');
      console.log('Mensaje enviado correctamente');
    } catch (error) {
      console.error('Error enviando mensaje:', error);
    }
  } else {
    console.warn('No hay ningún dispositivo conectado.');
  }
};

const [receivedMessage, setReceivedMessage] = useState("");

const readData = async () => {  
    if (connectedDevice) {
      try {
        //const available = await selectedDevice.available();
        //if (available>1){
          let message = await connectedDevice.read();
          if(message){
            message = message.trim();
            if (message !== "" && message !== " "){
              if(receivedMessage.length>300){
                setReceivedMessage("");
              }
              setReceivedMessage(receivedMessage => receivedMessage + message +"\n" );
            }
          }
      //  }
      } catch (error) {
        //console.log("isConnected",isConnected);
        //console.log("selectedDevice",selectedDevice);
        console.error('Error reading message:', error);
      }
    }
  }
  console.log(receivedMessage);
  
  


  return (
    <View>
      <Text>Dispositivos emparejados:</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Conectar" onPress={() => connectToDevice(item)} />
          </View>
        )}
      />
      {connectedDevice && (
        <View>
          <Text>Conectado a: {connectedDevice.name}</Text>
          <Button title="Enviar Mensaje" onPress={readData} />
          <Text>{message}</Text>
        </View>
      )}
                <Text>{receivedMessage}</Text>

    </View>
  );
};

export default BluetoothExample;
