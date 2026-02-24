import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const [text, setText] = useState('');

  const searchAddress = async () => {
    try {
      const response = await fetch(
        (`https://geocode.maps.co/search?q=${text}&api_key=699d74c82549b384173070crv554ca8`)
      );
      const data = await response.json();

      if (data.length > 0) {
        setRegion({
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1 }} region={region} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter an address"
          value={text}
          onChangeText={setText}
        />
        <Button
          title="Show address"
          onPress={searchAddress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '100%',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
  },
});