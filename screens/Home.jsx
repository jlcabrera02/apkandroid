import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import Icon from '../assets/imgs/Es';
import {FadeAnimationEs} from '../hooks/FadeAnimation';
import {WS_Context} from '../providers/Websocket';
import Axios, {urlMain} from '../axios/Axios';

const Home = ({navigation}) => {
  const {stateAlarm} = useContext(WS_Context);
  const [pending, setPending] = useState(true);
  const [errorFetch, setErrorFetch] = useState(false);
  const [dataFetch, setDataFetch] = useState([]);

  const press = idES => {
    navigation.navigate('islas', {
      idES,
    });
  };

  const getDataFetch = useCallback(() => {
    setPending(true);
    Axios.get('/estaciones-servicio/estaciones')
      .then(res => {
        setDataFetch(res.data.response);
        setErrorFetch(false);
      })
      .catch(() => {
        setDataFetch([]);
        setErrorFetch(true);
      })
      .finally(() => setPending(false));
  }, []);

  useEffect(() => {
    getDataFetch();
  }, [getDataFetch]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Selecciona la estación de servicio</Text>
      {/* {!errorFetch && <Text>Error al obtener las estaciones</Text>} */}
      {errorFetch && (
        <View style={styles.containerErr}>
          <Text style={styles.textErr}>
            Error al obtener la información del servidor: {urlMain}
          </Text>
          <TouchableHighlight
            underlayColor={'rgba(165,165,165,1)'}
            style={styles.buttonTry}
            onPress={getDataFetch}
            disabled>
            <Text>Reintentar</Text>
          </TouchableHighlight>
        </View>
      )}
      {!pending ? (
        <View style={styles.estaciones}>
          {dataFetch.map(el => (
            <FadeAnimationEs
              key={el.idestacion_servicio}
              idestacion={el.idestacion_servicio}
              style={styles.container_es}
              stateAlarm={stateAlarm}>
              <TouchableHighlight
                underlayColor={'rgba(165,165,165,1)'}
                style={styles.button}
                onPress={() => press(el.idestacion_servicio)}>
                <Icon estacion={el.idestacion_servicio} />
              </TouchableHighlight>
            </FadeAnimationEs>
          ))}
        </View>
      ) : (
        <ActivityIndicator size={90} color={'#0000ff'} />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa',
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  estaciones: {
    marginTop: 60,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  container_es: {
    backgroundColor: 'rgba(190,190,190,1)',
    borderRadius: 5,
    padding: 5,
  },
  containerErr: {
    borderRadius: 5,
    padding: 5,
    marginTop: 60,
  },
  button: {
    borderRadius: 5,
    padding: 0,
  },
  textErr: {
    color: '#000',
    fontSize: 15,
    textAlign: 'center',
  },
  buttonTry: {
    marginTop: 10,
    backgroundColor: '#0d8ce9',
    color: '#000',
    width: 80,
    padding: 6,
    margin: 'auto',
    borderRadius: 5,
  },
});
