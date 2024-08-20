import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Image, TouchableOpacity, FlatList, Dimensions, Modal, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker, Polygon, Region } from 'react-native-maps';
import { useMarkers } from './props/MarkerContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or use any other icon library
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import axios from 'axios';
const screenWidth = Dimensions.get('window').width;
import { BASE_URL } from '../../backend/config/config';

const predefinedLocations = [
  { label: "South Campus Main Gate Security", latitude: 13.705928, longitude: 79.594460 },
  { label: "LHC Security", latitude: 13.714702, longitude: 79.590886 },
  { label: "AB1 Security", latitude: 13.715526, longitude: 79.591662 },
  { label: "AB2 Security", latitude: 13.716160, longitude: 79.591192 },
  { label: "Hostel Malhar Security", latitude: 13.717884, longitude: 79.587598 },
  { label: "Hostel DES Security", latitude: 13.717822, longitude: 79.586838 },
  { label: "Administrative Building Security", latitude: 13.714395, longitude: 79.593813 },
];

const borderCoordinates = [
  { latitude: 13.719214, longitude: 79.584405 },
  { latitude: 13.720713, longitude: 79.595285 },
  { latitude: 13.705720, longitude: 79.597564 },
  { latitude: 13.706365, longitude: 79.586295 },
];
const validateContactNumber = (number: string) => {
  const regex = /^[0-9]+$/;
  return regex.test(number);
};
const CustomButton = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.circleButton} onPress={onPress}>
      <Icon name="filter-list" size={24} color="" />
    </TouchableOpacity>
  );
};
const Lost = () => {
  const navigation = useNavigation();
  const [itemDescription, setItemDescription] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState(predefinedLocations[0]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control date picker visibility
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState<{ name: string; description: string; url: string; location: string; contact: string; date: string; }[]>([]);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [mapSize, setMapSize] = useState({ height: 100, width: screenWidth * 0.5 });
  const [showAllItems, setShowAllItems] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { addMarker } = useMarkers();
  const mapRef = useRef<MapView>(null);
  const [contactNumber, setContactNumber] = useState<string>('');
  const [contactError, setContactError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ name: string; description: string; url: string; location: string; contact: string; date: string } | null>(null);
  const [isFullImageVisible, setIsFullImageVisible] = useState(false);
  const [base64Url, setBase64Url] = useState("a");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/lost_items`); // Adjust the endpoint as needed
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error); // Log the error
        Alert.alert('Error', 'Failed to load items. Please try again later.'); // Show a user-friendly message
      }
    };

    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/lost_items`); // Update URL based on your server
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }
  const handleViewFullImage = () => {
    setIsFullImageVisible(true);
  };

  const handleCloseFullImage = () => {
    setIsFullImageVisible(false);
  };
  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      base64: true,
      quality: 0.4,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setImageUri(result.assets[0].uri);
      const a = `data:image/jpeg;base64,${result.assets[0].base64}`;  // Proper string interpolation
      setBase64Url(a);
      // setImage(base64Url);
      // console.log("Base64 URL:", a);
    }
  };

  const handleAddMarker = async () => {
    if (!itemName.trim()) {
      alert('Please enter item name');
      return;
    }
    if (!itemDescription.trim()) {
      Alert.alert("Error", "Please enter a description for the found item.");
      return;
    }
    if (!contactNumber.trim()) {
      Alert.alert("Error", "Please enter a contact number for the found item.");
    }
    if (!validateContactNumber(contactNumber)) {
      Alert.alert("Invalid contact number. Please enter a valid number.");
      return;
    }
    if (!imageUri) {
      Alert.alert("Error", "Please select an image for the found item.");
      return;
    }
    if (!selectedDate) {
      Alert.alert("Error", "Please select a date for the found item.");
    }
    setContactError(null); // Clear any previous error
    try {
      await axios.post(`${BASE_URL}/api/lost_items`, { // Update URL based on your server
        name: itemName,
        description: itemDescription,
        url: base64Url || '',
        location: selectedLocation.label,
        contact: contactNumber,
        date: selectedDate.toLocaleDateString()
      });
      setItems([...items, { name: itemName, description: itemDescription, url: imageUri || '', location: selectedLocation.label, contact: contactNumber, date: selectedDate.toLocaleDateString() }]);

      addMarker({
        coordinate: {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
        name: itemName,
        description: itemDescription,
        imageUri: imageUri || '',
        contact: contactNumber,
      });

      Alert.alert("Success", "Marker added for the found item!");
      setItemName('');
      setItemDescription('');
      setImageUri(null);
      setContactNumber('');
      setShowForm(false);
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert("Error", "Failed to add marker. Please try again.");
    }
  };

  const onRegionChange = (region: Region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    const bounds = {
      north: Math.max(...borderCoordinates.map(coord => coord.latitude)),
      south: Math.min(...borderCoordinates.map(coord => coord.latitude)),
      east: Math.max(...borderCoordinates.map(coord => coord.longitude)),
      west: Math.min(...borderCoordinates.map(coord => coord.longitude)),
    };

    const newLatitude = Math.max(bounds.south + latitudeDelta / 2, Math.min(bounds.north - latitudeDelta / 2, latitude));
    const newLongitude = Math.max(bounds.west + longitudeDelta / 2, Math.min(bounds.east - longitudeDelta / 2, longitude));
    const newLatitudeDelta = Math.min(latitudeDelta, bounds.north - bounds.south);
    const newLongitudeDelta = Math.min(longitudeDelta, bounds.east - bounds.west);

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: newLatitude,
        longitude: newLongitude,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      }, 500);
    }
  };

  const renderItem = ({ item }: { item: { name: string; url: string; description: string; location: string; contact: string; date: string; } }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => setSelectedItem(item)}
    >
      {item.url ? <Image source={{ uri: item.url }} style={styles.itemImage} /> : null}
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const toggleMapSize = () => {
    setMapSize(prevSize => ({
      height: prevSize.height === 300 ? 100 : 300,
      width: prevSize.width === screenWidth * 0.9 ? screenWidth * 0.5 : screenWidth * 0.9,
    }));
  };

  const handleLocationPress = (location: string) => {
    setActiveLocation(location);
  };

  const handleShowAllItems = () => {
    if (showAllItems) {
      setModalVisible(true); // Show the modal to select a location
    } else {
      setShowAllItems(false);
      setActiveLocation(null); // Clear the location filter
    }
  };

  const handleLocationSelect = (location: string) => {
    setActiveLocation(location);
    setShowAllItems(false); // Show only items at the selected location
    setModalVisible(false); // Close the modal
  };
  return (
    <View style={styles.container}>
      {/* {!showForm && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )} */}
      {showForm ? (
        <View style={styles.formContainer}>
          <Text style={styles.header}>Add a Lost Item</Text>
          {/* <Text>Name of item</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Name of the item"
            value={itemName}
            onChangeText={setItemName}
          />
          {/* <Text>Description</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Describe the item"
            value={itemDescription}
            onChangeText={setItemDescription}
          />
          {/* <Text>Contact Number</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
          <Text>Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              value={selectedDate ? selectedDate.toDateString() : ''}
              editable={false}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Text>Submit to Location</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedLocation}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedLocation(itemValue)}
            >
              {predefinedLocations.map((location, index) => (
                <Picker.Item key={index} label={location.label} value={location} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Upload an Image</Text>
          </TouchableOpacity>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          <TouchableOpacity style={styles.button} onPress={handleAddMarker}>
            <Text style={styles.buttonText}>Add Marker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setShowForm(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            numColumns={2}
            data={showAllItems ? items : items.filter(item => item.location === activeLocation)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={<Text style={styles.header}>Lost Items {activeLocation ? `at ${activeLocation}` : ''}</Text>}
            ListFooterComponent={<View style={{ height: screenWidth * 0.36 }} />}
            contentContainerStyle={styles.listContent}
          />

          <CustomButton
            // title={showAllItems ? "Show Items by Location" : "Show All Items"}
            title="Show Items by Location"
            onPress={() => {
              // if (showAllItems) {
              setModalVisible(true);
              // }
              // else {
              //   setShowAllItems(true);
              //   setActiveLocation(null); // Reset location filter
              // }
            }}

          />
        </View>
      )}

      {!showForm && (
        <View style={[styles.mapContainer, { height: mapSize.height, width: mapSize.width }]}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: 13.714702,
              longitude: 79.590886,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            mapType="satellite"
            onRegionChangeComplete={onRegionChange}
          >
            {predefinedLocations.map((location, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title={location.label}
                onPress={() => handleLocationPress(location.label)}
              >
                <View style={styles.customMarker}>
                  <Text style={styles.customMarkerText}>📍</Text>
                </View>
              </Marker>
            ))}
            <Polygon
              coordinates={borderCoordinates}
              strokeColor="green"
              strokeWidth={2}
              fillColor="rgba(94, 72, 255, 0.08)"
            />
          </MapView>
          <TouchableOpacity style={styles.minimizeButton} onPress={toggleMapSize}>
            <Text style={styles.minimizeButtonText}>{mapSize.height === 300 ? '-' : '+'}</Text>
          </TouchableOpacity>
        </View>
      )}
      {!showForm ? (
        <TouchableOpacity style={styles.floatingButton} onPress={() => setShowForm(true)}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      ) :
        <TouchableOpacity style={styles.floatingButton} onPress={() => setShowForm(false)}>
          <Text style={styles.floatingButtonText}>-</Text>
        </TouchableOpacity>
      }

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Location</Text>
            <Pressable
              style={styles.modalOption}
              onPress={() => {
                setShowAllItems(true); // Show all items
                setActiveLocation(null); // Clear location filter
                setModalVisible(false); // Close the modal
              }}
            >
              <Text>All Locations</Text>
            </Pressable>
            {predefinedLocations.map((location, index) => (
              <Pressable
                key={index}
                style={styles.modalOption}
                onPress={() => handleLocationSelect(location.label)}
              >
                <Text>{location.label}</Text>
              </Pressable>
            ))}
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {selectedItem && (
        <Modal
          transparent={true}
          visible={!!selectedItem}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.viewFullImageIcon}
                onPress={handleViewFullImage}
              >
                <Icon name="zoom-in" size={30} color="#333" />
              </TouchableOpacity>
              <Image source={{ uri: selectedItem.url }} style={styles.modalImage} />
              <View style={styles.modalDetailsContainer1}>
                <View style={styles.modalDetail1}>
                  <Text style={styles.modalDetailLabel1}>Description:</Text>
                  <Text style={styles.modalDetailText1}>{selectedItem.description}</Text>
                </View>
                <View style={styles.modalDetail1}>
                  <Text style={styles.modalDetailLabel1}>Location:</Text>
                  <Text style={styles.modalDetailText1}>{selectedItem.location}</Text>
                </View>
                <View style={styles.modalDetail1}>
                  <Text style={styles.modalDetailLabel1}>Contact:</Text>
                  <Text style={styles.modalDetailText1}>{selectedItem.contact}</Text>
                </View>
                <View style={styles.modalDetail1}>
                  <Text style={styles.modalDetailLabel1}>Date:</Text>
                  <Text style={styles.modalDetailText1}>{selectedItem.date}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setSelectedItem(null)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {selectedItem && isFullImageVisible && (
        <Modal
          transparent={true}
          visible={isFullImageVisible}
          animationType="fade"
        >
          <View style={styles.fullImageModalContainer}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={handleCloseFullImage}
            >
              <Icon name="close" size={30} color="#fff" />
            </TouchableOpacity>
            <Image source={{ uri: selectedItem.url }} style={styles.fullImage} />
          </View>
        </Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: { position: 'absolute', top: 10, left: 10, backgroundColor: '#FF6347', borderRadius: 5, padding: 10 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  header: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', padding: 10, backgroundColor: '#3B5ED5', borderRadius: 10, borderColor: 'black', borderWidth: 1 },
  input: { height: 40, borderColor: 'grey', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 6, },
  picker: { height: 50, marginBottom: 10, borderWidth: 1, borderColor: 'red', paddingHorizontal: 10 },
  mapContainer: { position: 'absolute', bottom: 80, left: 20, width: '90%', borderRadius: 10, overflow: 'hidden' },
  map: { width: '100%', height: '100%' },
  image: { width: 100, height: 100, marginTop: 10, marginBottom: 10 },
  itemContainer: { flex: 1, flexDirection: 'column', margin: 10, backgroundColor: '#f9f9f9', borderRadius: 8, padding: 15, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, width: (screenWidth / 2) - 30, },
  itemImage: { width: '100%', height: 100, marginBottom: 10, borderRadius: 8 },
  floatingButton: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#2B449A', borderRadius: 50, width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
  floatingButtonText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  minimizeButton: { position: 'absolute', top: 10, right: 10, backgroundColor: 'white', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
  minimizeButtonText: { color: 'black', fontSize: 20, fontWeight: 'bold', lineHeight: 30 },
  customMarker: { backgroundColor: 'white', padding: 5, borderRadius: 15, borderColor: '#000', borderWidth: 1 },
  customMarkerText: { fontSize: 20 },
  formContainer: { marginBottom: 20, padding: 20, backgroundColor: '#f9f9f9', borderRadius: 10, borderWidth: 1, borderColor: '#ddd', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
  listContainer: { flex: 1 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  modalOption: { paddingVertical: 10, width: '100%', alignItems: 'center' },
  listContent: { paddingHorizontal: 10, },
  button: { backgroundColor: '#3B5ED5', padding: 10, borderRadius: 5, marginVertical: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', },
  modalImage: { width: '100%', height: 200, marginBottom: 10 },
  modalContent1: { width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, },
  modalHeader1: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#333', },
  modalImage1: { width: '100%', height: 200, borderRadius: 10, marginBottom: 15, },
  modalDetailsContainer1: { width: '100%', paddingHorizontal: 10, marginBottom: 15, },
  modalDetail1: { marginBottom: 10, },
  modalDetailLabel1: { fontSize: 16, fontWeight: 'bold', color: '#555', },
  modalDetailText1: { fontSize: 16, color: '#333', },
  fullImageModalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', },
  fullImage: { width: '90%', height: '80%', resizeMode: 'contain', },
  closeIcon: { position: 'absolute', top: 20, right: 20, zIndex: 1, },
  viewFullImageIcon: { position: 'absolute', top: 20, right: 20, backgroundColor: 'white', zIndex: 1, borderRadius: 20 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, height: 50, textAlignVertical: 'center' },
  circleButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, borderWidth: 1, borderColor: 'grey', },

});

export default Lost;
