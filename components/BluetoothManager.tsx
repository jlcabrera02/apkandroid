import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  FlatList,
} from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

const BluetoothManager = () => {
  const [isBluetoothAvailable, setIsBluetoothAvailable] = useState(false);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [pairedDevices, setPairedDevices] = useState<BluetoothDevice[]>([]);
  const [discoveredDevices, setDiscoveredDevices] = useState<BluetoothDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [targetDevice, setTargetDevice] = useState<BluetoothDevice | null>(null); // State for target device

  useEffect(() => {
    const initializeBluetooth = async () => {
      console.log('Checking Bluetooth availability and status...');
      await checkBluetoothAvailability();
      await checkBluetoothEnabled();
      await getBondedDevices();
      await getConnectedDevice(); // Check if there's a currently connected device
      await findTargetDevice("FC:E9:D8:09:E6:0C"); // Find the device with the target address
    };

    initializeBluetooth();
  }, []);

  const checkBluetoothAvailability = async () => {
    try {
      const available = await RNBluetoothClassic.isBluetoothAvailable();
      setIsBluetoothAvailable(available);
      console.log('Bluetooth available:', available);
    } catch (err) {
      console.error('Error checking Bluetooth availability:', err);
    }
  };

  const checkBluetoothEnabled = async () => {
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      setIsBluetoothEnabled(enabled);
      console.log('Bluetooth enabled:', enabled);
    } catch (err) {
      console.error('Error checking if Bluetooth is enabled:', err);
    }
  };

  const enableBluetooth = async () => {
    try {
      const enabled = await RNBluetoothClassic.requestBluetoothEnabled();
      setIsBluetoothEnabled(enabled);
      console.log('Bluetooth enabled after request:', enabled);
    } catch (err) {
      console.error('Error enabling Bluetooth:', err);
    }
  };

  const getBondedDevices = async () => {
    try {
      const devices = await RNBluetoothClassic.getBondedDevices();
      setPairedDevices(devices);
      console.log('Bonded devices:', devices);
    } catch (err) {
      console.error('Error getting bonded devices:', err);
    }
  };

  const startDiscovery = async () => {
    if (Platform.OS === 'android') {
      console.log('Requesting location permission...');
      const granted = await requestLocationPermission();
      if (!granted) return;
    }

    try {
      console.log('Starting Bluetooth discovery...');
      setIsScanning(true);
      await RNBluetoothClassic.startDiscovery();
      
      // Polling for discovered devices
      const intervalId = setInterval(async () => {
        try {
          console.log('Polling for discovered devices...');
          const devices = await RNBluetoothClassic.getBondedDevices(); // Update this line
          if (devices === null) {
            console.log('No devices found or null response.');
          } else {
            console.log('Discovered devices:', devices);
            setDiscoveredDevices(devices);
          }
        } catch (err) {
          console.error('Error getting discovered devices:', err);
        }
      }, 3000); // Poll every 3 seconds

      // Stop polling after 15 seconds
      setTimeout(() => {
        clearInterval(intervalId);
        setIsScanning(false);
      }, 15000); // Stop after 15 seconds
    } catch (err) {
      console.error('Error during Bluetooth discovery:', err);
      setIsScanning(false);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Access fine location required for discovery',
          message: 'In order to perform discovery, you must enable/allow fine location access.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      console.log('Location permission granted:', granted === PermissionsAndroid.RESULTS.GRANTED);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Error requesting location permission:', err);
      return false;
    }
  };

  const getConnectedDevice = async () => {
    try {
      const devices = await RNBluetoothClassic.getConnectedDevices();
      if (devices.length > 0) {
        setConnectedDevice(devices[0]); // Assuming the first device is the one you want
        console.log('Connected device:', devices[0]);
      } else {
        console.log('No connected devices found.');
        setConnectedDevice(null);
      }
    } catch (err) {
      console.error('Error getting connected device:', err);
    }
  };

  const findTargetDevice = async (address: string) => {
    try {
      const devices = await RNBluetoothClassic.getBondedDevices(); // Check bonded devices
      const target = devices.find(device => device.address === address);
      if (target) {
        setTargetDevice(target);
        console.log('Target device found:', target);
      } else {
        console.log('Target device not found.');
        setTargetDevice(null);
      }
    } catch (err) {
      console.error('Error finding target device:', err);
    }
  };

  const renderDevice = ({ item }: { item: BluetoothDevice }) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceText}>{item.name || 'Unknown Device'}</Text>
      <Text style={styles.deviceText}>{item.address}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Manager</Text>
      <Text style={styles.status}>Bluetooth Available: {isBluetoothAvailable ? 'Yes' : 'No'}</Text>
      <Text style={styles.status}>Bluetooth Enabled: {isBluetoothEnabled ? 'Yes' : 'No'}</Text>
      {!isBluetoothEnabled && (
        <TouchableOpacity style={styles.button} onPress={enableBluetooth}>
          <Text style={styles.buttonText}>Enable Bluetooth</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={isScanning ? undefined : startDiscovery}
        disabled={isScanning}>
        <Text style={styles.buttonText}>
          {isScanning ? 'Scanning...' : 'Start Discovery'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.subTitle}>Connected Device:</Text>
      {connectedDevice ? (
        <View style={styles.deviceContainer}>
          <Text style={styles.deviceText}>{connectedDevice.name || 'Unknown Device'}</Text>
          <Text style={styles.deviceText}>{connectedDevice.address}</Text>
        </View>
      ) : (
        <Text>No device connected</Text>
      )}
      <Text style={styles.subTitle}>Target Device:</Text>
      {targetDevice ? (
        <View style={styles.deviceContainer}>
          <Text style={styles.deviceText}>{targetDevice.name || 'Unknown Device'}</Text>
          <Text style={styles.deviceText}>{targetDevice.address}</Text>
        </View>
      ) : (
        <Text>No target device found</Text>
      )}
      <Text style={styles.subTitle}>Paired Devices:</Text>
      <FlatList
        data={pairedDevices}
        renderItem={renderDevice}
        keyExtractor={(item) => item.address}
      />
      <Text style={styles.subTitle}>Discovered Devices:</Text>
      <FlatList
        data={discoveredDevices}
        renderItem={renderDevice}
        keyExtractor={(item) => item.address}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  deviceContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  deviceText: {
    fontSize: 16,
  },
});

export default BluetoothManager;
