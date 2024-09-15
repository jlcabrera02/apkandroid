import React from 'react';
import {View, Text,TouchableOpacity, StyleSheet} from 'react-native';
import Indicators from '../components/Indicators';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el conjunto de iconos

import SeeCrop from '../components/SeeCrop';
const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.indexBox}>
        <View style={styles.optionsContainer}>
          <View>
              <TouchableOpacity style={styles.optionsBtn} onPress={()=>navigation.navigate('SelectedCrop')} >
                <MaterialCommunityIcons
                  name="tree-outline"
                  size={32}
                  color="white"
                />
              </TouchableOpacity>
            <Text>Cultivos</Text>
          </View>
          <View>
          <TouchableOpacity style={styles.optionsBtn} onPress={()=>navigation.navigate('BluetoothExample')} >
                <MaterialCommunityIcons
                  name="tree-outline"
                  size={32}
                  color="white"
                />
              </TouchableOpacity>
            <Text>Sensor</Text>
          </View>
        </View>

        {/* COMPONENTE DE LA INFORMACION DEL CULTIVO */}
        <SeeCrop />
        {/* COMPONENTE DE LA INFORMACION DEL CULTIVO */}


        {/* COMPONENTE DE INDICADORES DE TEMPERATURA Y HUMEDAD */}
        <Indicators />
        {/* COMPONENTE DE INDICADORES DE TEMPERATURA Y HUMEDAD */}


        
          <TouchableOpacity style={styles.newBtn} onPress={()=>navigation.navigate('NewCrop')}>
            <Text style={styles.newText}>Nuevo Cultivo</Text>
          </TouchableOpacity>
      
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionsBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007335",
    width: 52,
    height: 52,
    borderRadius: 100,
  },
  newBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007335",
    width: 360,
    height: 44,
    borderRadius: 100,
  },
  newText: {
    color: "white",
    fontSize: 16,
  },
});

export default Home;
