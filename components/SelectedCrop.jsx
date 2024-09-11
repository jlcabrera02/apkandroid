import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Importa useNavigation

import data from '../cultivos.json'

const SelectedCrop = () => {
  const [cultivos, setCultivos] = useState([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    if (data && data.cultivos) {
      setCultivos(data.cultivos);
    }
  }, []);

  const handleNavigate = cropId => {
    const selectedInformation = cultivos.find(item => item.id === cropId);
    navigation.navigate('SelectedInformation', {
      selectedInformation: JSON.stringify(selectedInformation),
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.indexBox}>
          <View style={styles.cropContainer}>
            {cultivos.map(crop => (
              <TouchableOpacity
                key={crop.id}
                onPress={() => handleNavigate(crop.id)}>
                <View style={styles.cropOption}>
                  <Image
                    source={{uri: crop.imagen}}
                    style={styles.img}
                    resizeMode="cover"
                  />
                  <Text style={styles.cropTitle}>{crop.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexBox: {
    marginTop: 64,
    width: '100%',
  },
  cropContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cropOption: {
    marginBottom: 32,
    height: 146,
    flexBasis: '45%',
    padding: 24,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  img: {
    marginTop: 20,
    width: 106,
    height: 106,
    borderRadius: 100,
  },
  cropTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    marginRight: 'auto',
  },
});

export default SelectedCrop;
