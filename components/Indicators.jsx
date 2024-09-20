import {View, Text, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {BluetoothContext} from '../contexts/BluetoothContext';
const Indicators = () => {
  const {soilMoisture, temperature, humidity} = useContext(BluetoothContext);
  console.log(soilMoisture, temperature, humidity);

  const [changeHumidity, setHumidity] = useState(null);
  const [changeTemperature, setTemperature] = useState(null);

  useEffect(() => {
    const colorHumidity = () => {
      if (soilMoisture <= 30) {
        setHumidity('red'); // Baja humedad
      } else if (soilMoisture >= 31 && soilMoisture <= 60) {
        setHumidity('green'); // Humedad óptima
      } else if (soilMoisture > 60) {
        setHumidity('red'); // Alta humedad
      }
    };
    const colorTemperature = () => {
      if (temperature <= 30) {
        setTemperature('red'); // Baja temperatura
      } else if (temperature >= 33 && temperature <= 36) {
        setTemperature('yellow'); // Temperatura óptima
      } else if (temperature > 36) {
        setTemperature('red'); // Alta Temperatura
      }
    };

    colorTemperature();
    colorHumidity();
  });

  useEffect(() => {
    if (soilMoisture) {
    }
  }, [soilMoisture]);

  /*const [randomNumber, setRandomNumber] = useState(0);

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
*/
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.textIndicator}>Temperatura</Text>
        <View style={styles.containerColor}>
          <View style={[styles.testColor, {backgroundColor: changeTemperature}]} />
          <Text style={styles.indicator}>{temperature} C°</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.textIndicator}>Humedad</Text>
        <View style={styles.containerColor}>
          <View style={[styles.testColor, {backgroundColor: changeHumidity}]} />
          <Text style={styles.indicator}>{soilMoisture} %</Text>
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
