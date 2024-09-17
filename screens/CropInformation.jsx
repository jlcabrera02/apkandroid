import BackIcon from '../components/BackIcons';
import {View, Text, StyleSheet} from 'react-native';
import SelectedCrop from '../components/SelectedCrop';
const CropInformation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.indexBox}>
        <BackIcon />
        <Text style={styles.textInformation}>Informacion adicional</Text>
        <SelectedCrop />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indexBox: {
    marginTop: 55,
    margin: 35,
  },
  textInformation: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CropInformation;
