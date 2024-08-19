import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, BackHandler, Alert, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { useMarkers } from './props/MarkerContext';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-reanimated-carousel';
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
        <Image
          source={require('../../assets/images/searchLogo.png')} style={styles.logo}
        />
        <Text style={styles.topSectionText}>Find IT!</Text>
        <TouchableOpacity onPress={() => Alert.alert('Notifications Icon Pressed')}>
          <Icon name="notifications" size={28} color="#ffffff" style={styles.notf}/>
        </TouchableOpacity>
      </View>

      <View style={styles.carousel}>
      <Carousel
                loop
                width={width * 0.81}
                height={width * 0.41}
                autoPlay={true}
                data={[...new Array(4).keys()]}
                scrollAnimationDuration={700}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderColor: "#3B5ED5",
                            borderRadius: 25,
                            borderWidth: 3,
                            justifyContent: 'center',
                            alignItems: "center"
                        }}
                    >
                      {index === 0 && (
                        <Image source={require('../../assets/images/lostndfound.webp')} style={{width: width*0.8, height: width * 0.4, borderRadius: 25,}}/>
                      )}
                      {index === 1 && (
                        <Image source={require('../../assets/images/lostndfound2.jpg')} style={{width: width*0.8, height: width * 0.4, borderRadius: 25,}}/>
                      )}
                    </View>
                )}
            />
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topSection: {
    height: width * 0.16,
    width: width,
    backgroundColor: "#2E48A4",
    borderColor: "#1F316F",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  topSectionText: {
    color: 'white',
    marginLeft: 15,
    fontFamily: "AlmendraSC-Regular",
    fontSize: width * 0.08,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
  },
  logo: {
    marginLeft:  18,
  },
  notf: {
    marginTop: 2,
    marginLeft:  width * 0.45,
  },
  carousel: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: width * 0.16,
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
