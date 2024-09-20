import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../components/BackIcons';
import data from '../cultivos.json';
const NewCrop = () => {
  const [cultivos, setCultivos] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (data && data.cultivos) {
      setCultivos(data.cultivos);
    }
  }, []);

  const handleNavigate = () => {
    const selectedData = cultivos.find(item => item.id === value);
    navigation.navigate('/', {
      selectedData: JSON.stringify(selectedData),
    }); // Navega a la pantalla deseada
  };

  return (
    <View style={styles.container}>
      <BackIcon />
      <View style={styles.indexBox}>
        {/* 
        {sensor.map(datos => (
          <View style={styles.sensor} key={datos.id}>
            <Text>{datos.nombre}</Text>
            <Text>{datos.tipo}</Text>
          </View>
        ))} */}
      </View>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'white'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={cultivos}
        search
        maxHeight={300}
        labelField="label"
        valueField="id"
        placeholder={!isFocus && !value ? 'Seleccione un cultivo' : '...'}
        searchPlaceholder="Buscar..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.id);
          setIsFocus(false);
        }}
      />
      <View style={styles.btnNewContainer}>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={handleNavigate}
          disabled={!value}>
          <Text style={styles.newText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 35,
  },
  indexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
    margin: 35,
  },
  sensor: {
    marginTop: 40,
    width: 300,
    height: 140,
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#1E1E1E',
  },
  btnNewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 510,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  newBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007335',
    width: 360,
    height: 44,
    borderRadius: 100,
    marginTop: 'auto',
  },
  newText: {
    color: 'white',
    fontSize: 16,
  },
});

export default NewCrop;
