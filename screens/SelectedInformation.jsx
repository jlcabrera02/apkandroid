import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import BackIcon from '../components/BackIcons';
import data from '../cultivos.json';
import Svg, {Path} from 'react-native-svg';

const SelectedInformation = () => {
  const [cropData, setCropData] = useState(null);
  const route = useRoute();
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

  const OpenURLButton = ({url}) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`No se puede abrir la URL: ${url}`);
      }
    }, [url]);
    return (
      <View>
        <TouchableOpacity onPress={handlePress} style={styles.btnUrl}>
          <Text style={styles.textWeb}>Mas informacion...</Text>
        </TouchableOpacity>
      </View>
    );
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

        <ScrollView style={styles.ScrollView}>
          {getTipsDetails().map((tip, index) => (
            <View key={index} style={styles.tipContainer}>
              <Text style={styles.tipTitle}>
                {index + 1}. {tip.title}
              </Text>
              <Text style={styles.tipTip}>{tip.tip}</Text>
            </View>
          ))}

          <Text style={styles.textClimatic}>
            Condiciones climaticas optimas
          </Text>
          <View style={styles.components}>
            <View style={styles.indicadorContainer}>
              <View style={styles.dataIndicador}>
                <View style={styles.dataH}>
                  <Text style={styles.textData}>{cropData?.tmin}C°</Text>
                  <Text style={styles.textData}>a</Text>

                  <Text style={styles.textData}>{cropData?.tmax}C°</Text>
                </View>
                <View>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width={30}
                    height={30}>
                    <Path d="M224 0c13.3 0 24 10.7 24 24l0 46.1 23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-57 57 0 76.5 66.2-38.2 20.9-77.8c3.4-12.8 16.6-20.4 29.4-17s20.4 16.6 17 29.4L373 142.2l37.1-21.4c11.5-6.6 26.2-2.7 32.8 8.8s2.7 26.2-8.8 32.8L397 183.8l31.5 8.4c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17l-77.8-20.9L272 256l66.2 38.2 77.8-20.9c12.8-3.4 26 4.2 29.4 17s-4.2 26-17 29.4L397 328.2l37.1 21.4c11.5 6.6 15.4 21.3 8.8 32.8s-21.3 15.4-32.8 8.8L373 369.8l8.4 31.5c3.4 12.8-4.2 26-17 29.4s-26-4.2-29.4-17l-20.9-77.8L248 297.6l0 76.5 57 57c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-23-23 0 46.1c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-46.1-23 23c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l57-57 0-76.5-66.2 38.2-20.9 77.8c-3.4 12.8-16.6 20.4-29.4 17s-20.4-16.6-17-29.4L75 369.8 37.9 391.2c-11.5 6.6-26.2 2.7-32.8-8.8s-2.7-26.2 8.8-32.8L51 328.2l-31.5-8.4c-12.8-3.4-20.4-16.6-17-29.4s16.6-20.4 29.4-17l77.8 20.9L176 256l-66.2-38.2L31.9 238.6c-12.8 3.4-26-4.2-29.4-17s4.2-26 17-29.4L51 183.8 13.9 162.4c-11.5-6.6-15.4-21.3-8.8-32.8s21.3-15.4 32.8-8.8L75 142.2l-8.4-31.5c-3.4-12.8 4.2-26 17-29.4s26 4.2 29.4 17l20.9 77.8L200 214.4l0-76.5L143 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23L200 24c0-13.3 10.7-24 24-24z" />
                  </Svg>
                </View>
              </View>
              <View style={styles.dataIndicador}>
                <View style={styles.dataH}>
                  <Text style={styles.textData}>{cropData?.hmin}%</Text>
                  <Text style={styles.textData}>a</Text>
                  <Text style={styles.textData}>{cropData?.hmax}%</Text>
                </View>

                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  width={30}
                  height={30}>
                  <Path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z" />
                </Svg>
              </View>
            </View>

            <View style={styles.containerUrl}>
              <Svg
                style={styles.svgWeb}
                width={30}
                height={30}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <Path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5l0 39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9l0 39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7l0-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1L257 256c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
              </Svg>
              <OpenURLButton url="https://agrotechweb.netlify.app/" />
            </View>
          </View>
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
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  ScrollView: {
    marginBottom: 100,
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
  indicadorContainer: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textClimatic: {
    paddingTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataIndicador: {
    width: 150,
    height: 150,
    borderWidth: 4,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  },
  dataH: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textData: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  btnUrl: {
    flexDirection: 'row',
    justifyContent: '',
    alignItems: 'center',
    marginBottom: 40,
  },
  containerUrl: {
    flexDirection: 'row',
  },
  textWeb: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
  },
  svgWeb: {
    marginRight: 20,
    paddingRight: 10,
  },
});
