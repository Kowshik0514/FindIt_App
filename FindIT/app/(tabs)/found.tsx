import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useMarkers } from './props/MarkerContext'; // Adjust path as needed

const Found = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const { addMarker } = useMarkers();

  const handleAddMarker = () => {
    // Set location to some values, or use device location
    addMarker(location);
  };

  return (
    <View style={styles.container}>
      <Text>Add a Marker</Text>
      <Button title="Add Marker" onPress={handleAddMarker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Found;
