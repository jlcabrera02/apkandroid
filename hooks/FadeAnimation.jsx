import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Animated,
  Easing,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {WS_Context} from '../providers/Websocket';

export const FadeAnimationEs = props => {
  const {lastJsonMessage} = useContext(WS_Context);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animationFn = useCallback(
    () =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]),
      ),
    [fadeAnim],
  );

  useEffect(() => {
    const findAnomalyXidEs = props.stateAlarm.filter(
      el => el.isla.idestacion_servicio === props.idestacion,
    );

    if (findAnomalyXidEs.length > 0) {
      animationFn().start();
    } else {
      animationFn().stop();
    }
  }, [props.stateAlarm, props.idestacion, animationFn, lastJsonMessage]);

  const interpolated = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(190,190,190,1)', 'rgba(220, 53, 69,1)'],
  });

  return (
    <Animated.View
      style={{
        ...props.style,
        backgroundColor: interpolated,
      }}>
      {props.children}
    </Animated.View>
  );
};

export const FadeAnimationIsla = props => {
  const {lastJsonMessage, apagarAlarma} = useContext(WS_Context);
  const [anomaly, setAnomaly] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animationFn = useCallback(
    () =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]),
      ),
    [fadeAnim],
  );

  useEffect(() => {
    const findAnomalyXidIsla = props.stateAlarm.filter(
      el => el.idisla === props.idisla,
    );

    animationFn().start();
    if (findAnomalyXidIsla.length > 0) {
      animationFn().start();
      setAnomaly(true);
    } else {
      animationFn().stop();
      setAnomaly(false);
    }
  }, [props.stateAlarm, props.idisla, animationFn, lastJsonMessage]);

  const interpolated = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(190,190,190,1)', 'rgba(220, 53, 69,1)'],
  });

  const alertOptions = () => {
    if (anomaly) {
      Alert.alert(`Isla ${props.nisla}`, 'con anomalía ⚠️', [
        {
          text: 'Parar el pánico',
          onPress: () => apagarAlarma(props.idisla),
        },
        {
          text: 'Cerrar',
          cancelacancelable: true,
        },
      ]);
    } else {
      Alert.alert(`Isla ${props.nisla}`, 'Sin ninguna anomalía', [
        {
          text: 'Cerrar',
          cancelacancelable: true,
        },
      ]);
    }
  };

  // const offBtn = () =>

  return (
    <Animated.View
      style={{
        ...props.style,
        backgroundColor: interpolated,
      }}>
      <TouchableHighlight
        underlayColor={'rgba(165,165,165,1)'}
        style={styles.isla}
        onPress={alertOptions}>
        {props.children}
      </TouchableHighlight>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  isla: {
    // backgroundColor: 'rgba(190,190,190,1)',
    borderRadius: 5,
    padding: 5,
  },
});
