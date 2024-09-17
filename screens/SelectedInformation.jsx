import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackIcon from '../components/BackIcons';
import data from '../cultivos.json';

const SelectedInformation = () => {
  const [cropData, setCropData] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  console.log();

  useEffect(() => {
    // obtengo el dato seleccionado para cultivos
    const {selectedInformation} = route.params || {};
    if (selectedInformation) {
      try {
        const parsedData = JSON.parse(selectedInformation);
        setCropData(parsedData);
      } catch (error) {
        console.error('Error parsing selected data:', error);
      }
    }
  }, [route.params]);

  const getTipsDetails = () => {
    if (cropData && cropData.tips) {
      return cropData.tips
        .map(tipId => {
          const tip = data.tips.find(item => item.id === tipId);
          return tip ? {id: tip.id, title: tip.title, tip: tip.tip} : null;
        })
        .filter(tip => tip !== null);
    }
    return [];
  };

  return (
    <View style={styles.container}>
      <BackIcon />
      <View style={styles.indexBox}>
        <View style={styles.labelContainer}>
          <Text style={styles.title}>{cropData?.label}</Text>

          {cropData && cropData.imagen && (
            <Image
              source={{uri: cropData.imagen}}
              style={styles.img}
              resizeMode="cover"
            />
          )}
        </View>

        <ScrollView>
          {getTipsDetails().map((tip, index) => (
            <View key={index} style={styles.tipContainer}>
              <Text style={styles.tipTitle}>
                {index + 1}. {tip.title}
              </Text>
              <Text style={styles.tipTip}>{tip.tip}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectedInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indexBox: {
    marginLeft: 30,
    marginRight: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  tipContainer: {
    margin: 10,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tipTip: {
    fontSize: 16,
    textAlign: 'justify',
  },
});
