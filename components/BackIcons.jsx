import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
const BackIcon = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.goBack(); // Navega hacia la pantalla anterior
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        accessibilityLabel="Go back">
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width={40}
          height={40}>
          <Path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

export default BackIcon;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 10, 
  },
});
