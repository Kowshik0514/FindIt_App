import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const Home = () => {
  // Coordinates for IIT Tirupati
  const initialRegion = {
    latitude: 13.7149, // Center of IIT Tirupati
    longitude: 79.5920, // Center of IIT Tirupati
    latitudeDelta: 0.05, // Adjust as needed
    longitudeDelta: 0.05, // Adjust as needed
  };

  const borderCoordinates = [
    { latitude: 13.719214, longitude: 79.584405 }, // nw
    { latitude: 13.720713, longitude: 79.595285 }, // ne
    { latitude: 13.705720, longitude: 79.597564 }, // se
    { latitude: 13.706365, longitude: 79.586295 }, // sw
    // { latitude: 13.706365, longitude: 79.5 }, // Close the loop
  ];

  return (
    <View style={styles.container}>
      {/* Top half of the screen */}
      <View style={styles.topSection}>
        {/* Other content can be added here */}
      </View>
      
      {/* Bottom half with the map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          mapType="satellite" // Set to satellite view
          // Focus on IIT Tirupati
        >
          <Marker
            coordinate={{
              latitude: 13.7149,
              longitude: 79.5920,
            }}
            title="IIT Tirupati"
            description="Indian Institute of Technology Tirupati."
          />
          
          {/* Polygon to create a border around IIT Tirupati */}
          <Polygon
            coordinates={borderCoordinates}
            strokeColor="#FF0000" // Border color
            strokeWidth={2} // Border width
            fillColor="rgba(255,0,0,0.1)" // Optional: fill color with transparency
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    flex: 1, // Adjust as needed
  },
  mapContainer: {
    flex: 1,
    borderColor:'grey',
    borderWidth: 5,
    margin:20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Home;
