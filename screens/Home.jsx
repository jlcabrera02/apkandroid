import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Indicators from '../components/Indicators';
import SeeCrop from '../components/SeeCrop';
import Svg, {Path} from 'react-native-svg';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.indexBox}>
        <View style={styles.optionsContainer}>
          <View>
            <TouchableOpacity
              style={styles.optionsBtn}
              onPress={() => navigation.navigate('CropInformation')}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width={30}
                height={30}>
                <Path
                  fill="#ffffff"
                  d="M384 312.7c-55.1 136.7-187.1 54-187.1 54-40.5 81.8-107.4 134.4-184.6 134.7-16.1 0-16.6-24.4 0-24.4 64.4-.3 120.5-42.7 157.2-110.1-41.1 15.9-118.6 27.9-161.6-82.2 109-44.9 159.1 11.2 178.3 45.5 9.9-24.4 17-50.9 21.6-79.7 0 0-139.7 21.9-149.5-98.1 119.1-47.9 152.6 76.7 152.6 76.7 1.6-16.7 3.3-52.6 3.3-53.4 0 0-106.3-73.7-38.1-165.2 124.6 43 61.4 162.4 61.4 162.4 .5 1.6 .5 23.8 0 33.4 0 0 45.2-89 136.4-57.5-4.2 134-141.9 106.4-141.9 106.4-4.4 27.4-11.2 53.4-20 77.5 0 0 83-91.8 172-20z"
                />
              </Svg>
            </TouchableOpacity>
            <Text>Cultivos</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.optionsBtn}
              onPress={() => navigation.navigate('BluetoothExample')}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                width={30}
                height={30}>
                <Path
                  fill="#ffffff"
                  d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"
                />
              </Svg>
            </TouchableOpacity>
            <Text>Sensor</Text>
          </View>
        </View>

        <View style={styles.indicatorsContainer} >
          {/* COMPONENTE DE LA INFORMACION DEL CULTIVO */}
          <SeeCrop />
          {/* COMPONENTE DE LA INFORMACION DEL CULTIVO */}

          {/* COMPONENTE DE INDICADORES DE TEMPERATURA Y HUMEDAD */}
          <Indicators />
          {/* COMPONENTE DE INDICADORES DE TEMPERATURA Y HUMEDAD */}
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => navigation.navigate('NewCrop')}>
          <Text style={styles.newText}>Nuevo Cultivo</Text>
        </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};
const styles = StyleSheet.create({
 
  container: {
    flex: 1,
  },
  indexBox: {
    marginTop: 55,

    margin: 35,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionsBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007335',
    width: 52,
    height: 52,
    borderRadius: 100,
  },
  indicatorsContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  newBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007335',
    width: 360,
    height: 44,
    borderRadius: 100,
  },
  newText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;
