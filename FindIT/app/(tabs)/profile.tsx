import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, BackHandler, Alert } from 'react-native';
const { width, height } = Dimensions.get('window');

const ProfilePage = () => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => router.push('/choose'),
      }
    ]);
    return true;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/profile.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Akash</Text>
        <Text style={styles.profileEmail}>aaku@gmail.com</Text>
      </View>

      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.infoLabel}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.infoLabel}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.infoLabel}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem} onPress={handleLogout}>
          <Text style={styles.infoLabel}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2E48A4',
    height: width * 0.17,
    justifyContent: "center",
    // padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    zIndex:15
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  infoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  infoItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 18,
    color: '#333',
  },
});

export default ProfilePage;