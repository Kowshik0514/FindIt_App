import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, BackHandler, Alert } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { useMarkers } from './props/MarkerContext';
import { useFocusEffect } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const Home = () => {
  const { markers } = useMarkers();

  // Coordinates for IIT Tirupati
  const handleBackPress = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {
        text: 'cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp(),
      }
    ]);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    }
  }, []);
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
        >
          {/* Marker for IIT Tirupati */}
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

          {/* Markers added through the Found section */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title="Found Item"
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  topSection: {
    flex: 1, // Adjust as needed
  },
  mapContainer: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 5,
    margin: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Home;
