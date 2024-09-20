import React, {useContext} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import BackIcon from '../components/BackIcons';
import Indicators from '../components/Indicators';
import {BluetoothContext} from '../contexts/BluetoothContext';
import Svg, {Path} from 'react-native-svg';
import ToggleButton from '../components/ToggleButton';

const BluetoothExample = () => {
  const {devices, connectedDevice, connectToDevice} =
    useContext(BluetoothContext);

  return (
    <View style={styles.container}>
      <View style={styles.BluetoothEnabled}>
        <BackIcon />
        <ToggleButton />
      </View>

      <View style={styles.connectedContainer}>
        <Text style={styles.textConnected}>
          CONECTADO A:{' '}
          {connectedDevice && (
            <Text style={styles.textConnectedName}>{connectedDevice.name}</Text>
          )}
        </Text>
      </View>
      <View style={styles.indexBox}>
        <View style={styles.dpVinculo}>
          <FlatList
            data={devices}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.devicesContainer}>
                <TouchableOpacity
                  onPress={() => connectToDevice(item)}
                  style={styles.btnVincular}>
                  <Svg viewBox="0 0 320 512" width={30} height={30}>
                    <Path d="M196.5 260l92.6-103.3L143.1 0v206.3l-86.1-86.1-31.4 31.4 108.1 108.4L25.6 368.4l31.4 31.4 86.1-86.1L145.8 512l148.6-148.6-97.9-103.3zm40.9-103l-50 50-.3-100.3 50.3 50.3zM187.4 313l50 50-50.3 50.3 .3-100.3z" />
                  </Svg>
                  <Text style={styles.textName}>{item.name}</Text>

                  <Svg viewBox="0 0 320 512" width={30} height={30}>
                    <Path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                  </Svg>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* <Indicators /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BluetoothEnabled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
    margin: 35,
  },
  connectedContainer: {
    paddingTop: 55,

    padding: 16,
  },
  textConnected: {
    fontWeight: 'bold',
  },
  textConnectedName: {
    alignItems: 'center',
    fontWeight: 'normal',
  },

  dpVinculo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 600,
    width: 400,
  },
  devicesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  btnVincular: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: 330,
    height: 70,
  },

  textName: {
    paddingLeft: 20,
  },
});

export default BluetoothExample;
