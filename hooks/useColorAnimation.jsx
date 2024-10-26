import {useRef, useMemo, useEffect, useState} from 'react';
import {Animated} from 'react-native';

const useColorAnimation = color => {
  const anim = useMemo(() => new Animated.Value(0), []);
  const [finished, setFinished] = useState(true);
  const currentColor = useRef(color);
  const nextColor = useMemo(() => color, [color]);

  const animColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [currentColor.current, nextColor],
  });
  console.log('gei');

  useEffect(() => {
    setFinished(false);
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: false,
    }).start(() => {
      currentColor.current = nextColor;
      setFinished(true);
    });
  }, [color, anim, nextColor]);

  return [animColor, finished];
};

export default useColorAnimation;
