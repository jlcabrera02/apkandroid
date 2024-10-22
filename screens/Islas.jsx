import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Axios from '../axios/Axios';
import SvgIsla from '../assets/imgs/Svgisla';

const Islas = ({navigation, route}) => {
  const {idES} = route.params;
  const [pending, setPending] = useState(true);
  const [errorFetch, setErrorFetch] = useState(false);
  const [islasData, setDataIslas] = useState([]);

  const getDataIslas = useCallback(() => {
    setPending(true);
    Axios.get('/liquidacion/islas/' + idES)
      .then(res => {
        setDataIslas(res.data.response);
        setErrorFetch(false);
      })
      .catch(() => {
        setDataIslas(true);
        setErrorFetch(true);
      })
      .finally(() => setPending(false));
  }, [idES]);

  useEffect(getDataIslas, [getDataIslas]);

  console.log(islasData.length);

  return (
    <View style={styles.container}>
      {/* <TouchableHighlight>navigation</TouchableHighlight> */}
      <Text>El id de la estacion de servicio es: {idES}</Text>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.containerIsla}>
            {islasData.map(isla => (
              <View key={isla.idisla}>
                <SvgIsla size={200} nisla={isla.nisla} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  containerIsla: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 35,
  },
});

export default Islas;
