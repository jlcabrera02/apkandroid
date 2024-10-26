import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Axios from '../axios/Axios';
import SvgIsla from '../assets/imgs/Svgisla';
import {FadeAnimationIsla} from '../hooks/FadeAnimation';
import {WS_Context} from '../providers/Websocket';

const Islas = ({navigation, route}) => {
  const {stateAlarm} = useContext(WS_Context);
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

  useEffect(() => getDataIslas(), [getDataIslas]);

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <ScrollView>
        <View>
          <Text
            style={{
              ...styles.textBlack,
              ...styles.textBold,
              ...styles.textCenter,
              ...styles.textXl,
            }}>
            Islas GDL{idES}
          </Text>
        </View>
        <View style={{...styles.container}}>
          {/* <TouchableHighlight>navigation</TouchableHighlight> */}
          <Text>El id de la estacion de servicio es: {idES}</Text>
          <View style={styles.containerIsla}>
            {!pending ? (
              islasData.map(isla => (
                <FadeAnimationIsla
                  key={isla.idisla}
                  idisla={isla.idisla}
                  nisla={isla.nisla}
                  stateAlarm={stateAlarm}>
                  <SvgIsla size={200} nisla={isla.nisla} />
                </FadeAnimationIsla>
              ))
            ) : (
              <ActivityIndicator size={90} color={'#0000ff'} />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  containerIsla: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15,
    flexWrap: 'wrap',
    margin: 35,
  },
  AnimationBackgroud: {
    borderRadius: 5,
    padding: 0,
  },
  isla: {
    // backgroundColor: 'rgba(190,190,190,1)',
    borderRadius: 5,
    padding: 5,
  },
  textBlack: {
    color: '#000',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
  textXl: {
    marginVertical: 5,
    fontSize: 20,
  },
});

export default Islas;
