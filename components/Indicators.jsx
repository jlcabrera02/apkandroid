import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

const Indicators = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const changeColor = () => {
      if (randomNumber <= 10) {
        setStatus('red');
      } else if (randomNumber >= 10 && randomNumber <= 20) {
        setStatus('yellow');
      } else {
        setStatus('green');
      }
    };
    changeColor();
  });

  const randomNumber = 10;

  /* const [randomNumber, setRandomNumber] = useState(0);

  const generateRandomNumber = () => {
    const min = 0;
    const max = 30;
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
          <View style={[styles.testColor, {backgroundColor: status}]} />
          <Text style={styles.indicator}>C°</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.textIndicator}>Humedad</Text>
        <View style={styles.containerColor}>
          <View style={[styles.testColor, {backgroundColor: status}]} />
          <Text style={styles.indicator}>{randomNumber} %</Text>
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
