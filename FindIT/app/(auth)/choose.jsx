import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
const { width, height } = Dimensions.get('window');

const Choose = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/home');
  };
  return (
    <SafeAreaView style={styles.container}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
        <View style={[styles.circle, styles.circle4]} />
        <Button title="Go to Tabs" onPress={handleNavigate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set the background color to white
  },
  circle: {
    position: 'absolute',
    width: width * 0.5, // 50% of screen width
    height: width * 0.5, // 50% of screen width
    borderRadius: width * 0.25, // Half of width for a perfect circle
    backgroundColor: 'rgba(59, 94, 213, 0.5)',
  },
  circle1: {
    top: -95,
    left: 25,
  },
  circle2: {
    top: -235,
    left: -75,
  },
  circle3: {
    top: 350,
    left: 190,
  },
  circle4: {
    top: 90,
    // left: 295,
    left: width*0.7,
  },
});

export default Choose;