import React, {useContext, useEffect, useMemo, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import {WS_Context} from '../providers/Websocket';

const FadeAnimation = props => {
  const {lastJsonMessage} = useContext(WS_Context);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animationFn = useMemo(
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
      el => el.idestacion_servicio === props.idestacion,
    );
    console.log({findAnomalyXidEs});

    animationFn.start();
    console.log('dpla');

    if (findAnomalyXidEs.length > 0) {
      animationFn.start();
    } else {
      animationFn.stop();
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

export default FadeAnimation;
