import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {  TextInput, Image, FlatList } from 'react-native';
// Adjust the import path as needed

interface LostItem {
  id: string;
  description: string;
  location: string;
  contact: string;
}

const initialLostItems: LostItem[] = [
  { id: '1', description: 'Red Backpack', location: 'Food Court', contact: '123-456-7890' },
  { id: '2', description: 'Blue Water Bottle', location: 'Lecture Hall Complex', contact: '987-654-3210' },
  // Add more items as needed
];

const App: React.FC = () => {
  const [isLostTabVisible, setIsLostTabVisible] = useState<boolean>(false);
  const [lostItems, setLostItems] = useState<LostItem[]>(initialLostItems);

  const openLostTab = () => {
    setIsLostTabVisible(true);
  };

  const closeLostTab = () => {
    setIsLostTabVisible(false);
  };

  const addLostItem = (item: Omit<LostItem, 'id'>) => {
    setLostItems((prevItems) => [...prevItems, { ...item, id: (prevItems.length + 1).toString() }]);
  };

  return (
    <View style={styles.container_app}>
      <View style={styles.lostItemListContainer}>
        <FlatList
          data={lostItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.lostItem}>
              <Text style={styles.lostItemText}>Description: {item.description}</Text>
              <Text style={styles.lostItemText}>Location: {item.location}</Text>
              <Text style={styles.lostItemText}>Contact: {item.contact}</Text>
            </View>
          )}
          contentContainerStyle={styles.lostItemList}
        />
      </View>

      <TouchableOpacity onPress={openLostTab} style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={isLostTabVisible}
        animationType="slide"
        onRequestClose={closeLostTab}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <LostTab onClose={() => { closeLostTab(); /* Call addLostItem with actual data */ }} />
        </View>
      </Modal>
    </View>
  );
};


const locations = ["food court", "Lecture Hall Complex", "Indoor Stadium"];



const LostTab = ({ onClose }: { onClose: () => void }) => {
  const [itemDescription, setItemDescription] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleLocationChange = (text: string) => {
    setQuery(text);
    setLocation(text);
    if (text === '') {
      setFilteredLocations([]);
    } else {
      setFilteredLocations(locations.filter(location => location.toLowerCase().includes(text.toLowerCase())));
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setQuery(selectedLocation);
    setFilteredLocations([]);
  };

  const handleShowConfirmation = () => {
    setIsConfirmationModalVisible(true);
  };

  const handleConfirmSubmit = () => {
    console.log('Item Description:', itemDescription);
    console.log('Location:', location);
    console.log('Contact:', contact);
    console.log('Photo URI:', photo);

    // Reset form fields
    setItemDescription('');
    setLocation('');
    setContact('');
    setPhoto(null);

    // Close the LostTab
    onClose();
    setIsConfirmationModalVisible(false);
  };

  const handleCancelSubmit = () => {
    setIsConfirmationModalVisible(false);
  };

  const handleSubmit = () => {
    if (!itemDescription || !contact || !photo) {
      alert('Please fill out all fields and upload a photo.');
      return;
    }

    handleShowConfirmation();
  };

  const handleReset = () => {
    setItemDescription('');
    setLocation('');
    setContact('');
    setPhoto(null);
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report Lost Item</Text>
      
      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Text style={styles.uploadText}>Upload Photo</Text>
      </TouchableOpacity>
      
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
      
      <TextInput
        style={styles.input}
        placeholder="Item Description"
        value={itemDescription}
        onChangeText={setItemDescription}
        placeholderTextColor="#6EACDA"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={query}
        onChangeText={handleLocationChange}
        placeholderTextColor="#6EACDA"
      />
      
      {filteredLocations.length > 0 && (
        <FlatList
          data={filteredLocations}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleLocationSelect(item)} style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsContainer}
        />
      )}
      
      <TextInput
        style={styles.input}
        placeholder="Contact Information"
        value={contact}
        onChangeText={setContact}
        placeholderTextColor="#6EACDA"
      />
      
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReset} style={styles.fabMinus}>
        <Text style={styles.fabText}>-</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        visible={isConfirmationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancelSubmit}
      >
        <View style={styles.confirmationModalContainer}>
          <View style={styles.confirmationModalContent}>
            <Text style={styles.confirmationModalText}>Are you sure you want to submit?</Text>
            <View style={styles.confirmationModalButtons}>
              <TouchableOpacity onPress={handleConfirmSubmit} style={styles.confirmationButton}>
                <Text style={styles.confirmationButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancelSubmit} style={styles.confirmationButton}>
                <Text style={styles.confirmationButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1F316F',
    alignItems: 'center',
  },
  container_app: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
  uploadButton: {
    backgroundColor: '#3B5ED5',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: 129,
  },
  uploadText: {
    color: '#FFF',
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: '#6EACDA',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#FFF',
    backgroundColor: '#03346E',
    borderRadius: 5,
    width: '70%',
  },
  suggestionsContainer: {
    maxHeight: 150,
    marginBottom: 15,
    backgroundColor: '#03346E',
    borderRadius: 5,
    width: '100%',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6EACDA',
  },
  suggestionText: {
    color: '#FFF',
  },
  submitButton: {
    backgroundColor: '#3B5ED5',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    width: 65,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3B5ED5',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10, // Higher Z index
  },
  fabText: {
    color: '#FFF',
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  lostItemListContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  lostItemList: {
    paddingVertical: 10,
  },
  lostItem: {
    backgroundColor: '#03346E',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    borderColor: '#6EACDA',
    borderWidth: 1,
  },
  lostItemText: {
    color: '#FFF',
    fontSize: 16,
  },
  confirmationModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  confirmationModalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  confirmationModalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  confirmationModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  confirmationButton: {
    backgroundColor: '#3B5ED5',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  confirmationButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  fabMinus: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#D53B3B', // Red color for the minus button
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Higher Z index to ensure it is on top
  },
});


export default App;