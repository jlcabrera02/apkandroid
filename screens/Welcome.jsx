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
        <Text style={styles.textWelcome}>AGROTECH</Text>
        <Image
          source={{
            uri: 'https://st.depositphotos.com/1169502/2025/v/950/depositphotos_20257115-stock-illustration-abstract-eco-green-plant-with.jpg',
          }}
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
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 300,
  },
});
