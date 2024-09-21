import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import data from '../cultivos.json';

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
                style={styles.btnOp}
                key={crop.id}
                onPress={() => handleNavigate(crop.id)}>
                <View style={styles.cropOption}>
                  <Image
                    source={{uri: crop.imagen}}
                    style={styles.img}
                    resizeMode="cover"
                  />
                  <View>
                    <Text style={styles.cropTitle}>{crop.label}</Text>
                  </View>
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
  },
  indexBox: {
    width: '100%',
  },
  cropContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOp: {
    alignItems: 'center',
    paddingTop:10,
    justifyContent: 'center',
  },
  cropOption: {
    marginBottom: 40,
    height: 170,
    flexBasis: '45%',
    padding: 24,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  img: {
    marginTop: 10,
    width: 106,
    height: 106,
  },
  cropTitle: {
    fontSize: 20,
    paddingTop:20,

    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 'auto',
  },
});

export default SelectedCrop;
