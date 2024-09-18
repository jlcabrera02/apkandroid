import React, {useContext} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import BackIcon from '../components/BackIcons';
import Indicators from '../components/Indicators';
import {BluetoothContext} from '../contexts/BluetoothContext';
const BluetoothExample = () => {
  const {devices, connectedDevice, connectToDevice} =
    useContext(BluetoothContext);

  return (
    <View style={styles.container}>
      <BackIcon />
      <View style={styles.indexBox}>
        <Text>Dispositivos emparejados:</Text>
        <View style={styles.dpVinculo}>
          <FlatList
            data={devices}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View>
                <Text>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => connectToDevice(item)}
                  style={styles.btnVincular}>
                  <Text>Vincular</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {connectedDevice && (
          <View>
            <Text>Conectado a: {connectedDevice.name}</Text>
          </View>
        )}

        <Indicators  />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
    margin: 35,
  },
  dpVinculo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 200,
    width: 400,
  },
  btnVincular: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    width: 300,
    height: 40,
    borderRadius: 20,
  },
});

export default BluetoothExample;
