import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, BackHandler, Alert, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { useMarkers } from './props/MarkerContext';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../backend/config/config';
const { width, height } = Dimensions.get('window');
import axios from 'axios';


const Home = () => {
  const { markers } = useMarkers();
  const [mapSize, setMapSize] = useState({ height:  height * 0.09, width: width * 0.9 });
  const [foundItems, setFoundItems] = useState(0);
  const [lostItems, setLostItems] = useState(0);
  const [foundRate, setFoundRate] = useState(0);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/sizes/foundItems`); // Example URL
      // console.log(response.data);
      setFoundItems(response.data.size); // Assuming API returns found items count
      const response2 = await axios.get(`${BASE_URL}/api/sizes/lostItems`); // Example URL
      setLostItems(response2.data.size); // Assuming API returns lost items count
      const totalLostItems = response2.data.size;
      const totalFoundItems = response.data.size;

      if (totalLostItems !== 0) {
        const rate = (totalFoundItems / (totalFoundItems+totalLostItems)) * 100;
        setFoundRate(rate);
      } else {
        setFoundRate(0); // Handle the case where foundItems is 0
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

useEffect(() => {
  fetchStatistics();
}, []);

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
  // const router = useRouter();
  const toggleMapSize = () => {
    setMapSize(prevSize => ({
      height: prevSize.height === height * 0.785 ? height * 0.09 : height * 0.785,
      width: width * 0.9,
    }));
  };
  return (
    <View style={styles.container}>
      {/* Top half of the screen */}
      <View style={styles.topSection}>
        <Image
          source={require('../../assets/images/searchLogo.png')} style={styles.logo}
        />
        <Text style={styles.topSectionText}>Find IT!</Text>
        {/* <TouchableOpacity onPress={() => {

          }}>
          <Icon name="notifications" size={28} color="#ffffff" style={styles.notf}/>
        </TouchableOpacity> */}
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
                      {index === 2 && (
                        <Image source={require('../../assets/images/lostndfound3.jpg')} style={{width: width*0.8, height: width * 0.4, borderRadius: 25,}}/>
                      )}
                      {index === 3 && (
                        <Image source={require('../../assets/images/lostndfound4.jpg')} style={{width: width*0.8, height: width * 0.4, borderRadius: 25,}}/>
                      )}
                    </View>
                )}
            />
      </View>
      <View style={styles.statistics}>
        <Text style={{fontSize: width*0.055, marginBottom: 12, marginLeft: width*0.02, textShadowColor: 'rgba(0, 0, 0, 0.4)', textShadowRadius: 3, }}>Statistics:</Text>
        <View style={styles.box1}>
          <View style={styles.box}><Text style={styles.statisticstext}>Found Items</Text><Text style={styles.statisticsno}>{foundItems}</Text></View>
          <View style={styles.box}><Text style={styles.statisticstext}>Lost Items</Text><Text style={styles.statisticsno}>{lostItems}</Text></View>
        </View>
        <View style={styles.box2}>
          <View style={styles.box}><Text style={styles.statisticstext}>Inquiries</Text><Text style={styles.statisticsno}>0</Text></View>
          <View style={styles.box}><Text style={styles.statisticstext}>Found Rate</Text><Text style={styles.statisticsno}>{foundRate.toFixed(2)}%</Text></View>
        </View>
      </View>
      
      <View style={styles.mapContainer}>
        <Text style={{fontSize: width*0.053, marginBottom: width*0.1, marginLeft: width*0.08, textShadowColor: 'rgba(0, 0, 0, 0.4)', textShadowRadius: 3, }}>Current Location:</Text>
        <View style={[styles.mapWrapper, { height: mapSize.height, width: mapSize.width }]}>
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
          <TouchableOpacity style={styles.minimizeButton} onPress={toggleMapSize}>
            {/* <Text style={styles.minimizeButtonText}>{mapSize.height === height * 0.785 ? 'v' : '^'}</Text> */}
            <Icon 
              name={mapSize.height === height * 0.785 ? "chevron-down-outline" : "chevron-up-outline"} 
              size={30} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
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
    height: width * 0.18,
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
    marginTop: width * 0.12,
  },
  statistics:{
    width: width,
    height: width * 0.75,
    backgroundColor: "white",
    marginTop: width * 0.5,
    // elevation: 10,
    paddingLeft: width*0.07,
    paddingRight: width*0.07,
    alignContent: "center",
  },
  box1:{
    flexDirection: 'row',
    height: width * 0.24, // Adjust height as needed
    justifyContent: 'space-between', // Adjusts spacing between items
    marginBottom: width*0.07,
  },
  box2:{
    flexDirection: 'row',
    height: width * 0.24, // Adjust height as needed
    justifyContent: 'space-between', // Adjusts spacing between items
  },
  box:{
    width: width * 0.4,
    backgroundColor: "#324FB2",
    elevation: 10,
    borderRadius: 15,
    justifyContent: "center",
  }, 
  statisticstext:{
    color: "white",
    fontSize: width*0.04,
    marginLeft: width*0.05,
  },
  statisticsno:{
    color: "white",
    fontWeight: "bold",
    fontSize: width*0.05,
    marginLeft: width*0.06,
  },
  mapContainer: {
    // flex: 1,
    // borderColor: 'grey',
    // borderWidth: 2,
    // margin: 20,
    // padding: 0,
    marginTop: width*0.016,
    width: width,
    height: width*0.29,
    // borderRadius: 10,
    // alignItems: "center"
  },
  mapWrapper: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: width*0.056,
    // marginRight: width*0.09,
    overflow: 'hidden', // Ensures that the MapView respects the borderRadius
    position: 'absolute', 
    bottom: 0,
  },
  map: {
    width: '100%', height: '100%'
  },
  minimizeButton: { 
    position: "absolute",
    width: width * 0.9,
    height:  height * 0.034,
    backgroundColor: "rgba(195,195,195,0.4)",
    alignItems: "center",
   },
  minimizeButtonText: { color: 'black', fontSize: 20, fontWeight: 'bold', lineHeight: 30 },
});

export default Home;
