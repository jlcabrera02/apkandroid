import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import { BluetoothContext } from '../contexts/BluetoothContext';
import Svg, { Path } from 'react-native-svg';

const ToggleButton = () => {
  const { bluetoothEnabled, checkBluetoothEnabled } = useContext(BluetoothContext);
  const [isOn, setIsOn] = useState(bluetoothEnabled);

  const handleToggle = () => {
    if (!isOn) {
      checkBluetoothEnabled(); 
    } else {
      Alert.alert(
        'Desactivación del Bluetooth no permitida',
        'No es posible desactivar el Bluetooth mientras la aplicación está en uso. Por favor, cierre la aplicación si desea desactivar el Bluetooth.',
        [{ text: 'Aceptar' }],
        { cancelable: false },
      );
    }
  };

  useEffect(() => {
    setIsOn(bluetoothEnabled); 
  }, [bluetoothEnabled]);

  return (
    <View style={styles.checkBluetoothEnabled}>
      <Text style={styles.textBluetooth}>Bluetooth</Text>
      <TouchableOpacity
        style={[styles.button, isOn ? styles.buttonOn : styles.buttonOff]}
        onPress={handleToggle}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width={30}
          height={30}>
          <Path
            d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 224c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
            fill="#ffffff"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  checkBluetoothEnabled: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textBluetooth: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingRight: 15,
  },
  buttonOn: {
    backgroundColor: 'green',
  },
  buttonOff: {
    backgroundColor: 'red',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ToggleButton;
