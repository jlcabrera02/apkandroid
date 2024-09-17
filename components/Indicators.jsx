import {View, Text, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {BluetoothContext} from '../contexts/BluetoothContext';
const Indicators = () => {
  const {receivedMessage} = useContext(BluetoothContext);

  const [humidity, setHumidity] = useState(null);
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const changeColor = () => {
      if (humedad <= 30) {
        setHumidity('red'); // Baja humedad
      } else if (humedad >= 31 && humedad <= 60) {
        setHumidity('green'); // Humedad óptima
      } else if (humedad > 60) {
        setHumidity('red'); // Alta humedad
      }
    };
    const colorTemperature = () => {
      if (randomNumber <= 30) {
        setTemperature('red'); // Baja temperatura
      } else if (randomNumber >= 33 && humedad <= 36) {
        setTemperature('yellow'); // Temperatura óptima
      } else if (randomNumber > 36) {
        setTemperature('red'); // Alta Temperatura
      }
    };

    colorTemperature();
    changeColor();
  });

  const humedad = receivedMessage;
  useEffect(() => {
    if (receivedMessage) {
      console.log('esto funciona', receivedMessage);
    }
  }, [receivedMessage]);

  const [randomNumber, setRandomNumber] = useState(0);

  const generateRandomNumber = () => {
    const min = 33;
    const max = 36;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomNumber(generateRandomNumber());
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.textIndicator}>Temperatura</Text>
        <View style={styles.containerColor}>
          <View style={[styles.testColor, {backgroundColor: temperature}]} />
          <Text style={styles.indicator}>{randomNumber} C°</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.textIndicator}>Humedad</Text>
        <View style={styles.containerColor}>
          <View style={[styles.testColor, {backgroundColor: humidity}]} />
          <Text style={styles.indicator}>{receivedMessage} %</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 170,
    height: 97,
    //    borderWidth: 1,
    marginBottom: 30,
    margin: 10,
  },
  textIndicator: {
    fontSize: 18,
    padding: 5,
  },
  containerColor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  testColor: {
    backgroundColor: 'red',
    width: 22,
    height: 22,
    borderRadius: 100,
  },
  indicator: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Indicators;
