import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.indexBox}>
        <Text style={styles.textWelcome}>Bienvenido!</Text>
        <Image source={require('../assets/imgs/logopng.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indexBox: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWelcome: {
    fontSize:60,
    marginBottom: 30,
    fontWeight: 'bold',
    color:'black'
  },
  image: {
    marginTop:100,
    width: 300,
    height: 300,
  },
});
