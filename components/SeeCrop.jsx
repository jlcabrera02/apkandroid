import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';

const SeeCrop = () => {
  const route = useRoute();
  const {selectedData} = route.params || {};
  const [cropData, setCropData] = useState(null);

  useEffect(() => {
    if (selectedData) {
      try {
        const parsedData = JSON.parse(selectedData);
        setCropData(parsedData);
      } catch (error) {
        console.error('Error parsing selected data:', error);
      }
    }
  }, [selectedData]);

  return (
    <View>
      <View style={styles.indexBox}>
        {cropData && cropData.imagen && (
          <Image
            source={{uri: cropData.imagen}}
            style={styles.img}
            resizeMode="cover"
          />
        )}
        <View style={styles.imgLine} />
        <Text style={styles.textCultivo}>
          {cropData?.label || 'Seleccione un cultivo'}
        </Text>
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
  imgLine: {
    opacity: 0.2,
    width: 320,
    borderBottomWidth: 2,
    borderBottomColor: '#85878b',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.0,
    shadowRadius: 10,
    elevation: 5,
  },
  img: {
    width: 300,
    height: 350,
  },
  textCultivo: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SeeCrop;
