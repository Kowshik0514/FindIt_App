import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const Explore = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true} // Customize visibility of vertical scroll indicator
      showsHorizontalScrollIndicator={false} // Customize visibility of horizontal scroll indicator
    >
      <View style={styles.innerContainer}>
        <Text style={styles.text}>
          fbdbbd
        </Text>
      </View>
    </ScrollView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensures the ScrollView takes up the full height of its content
    backgroundColor: '#fff',
    padding: 16, // Optional padding around content
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24, // Increase the font size for better visibility
    fontWeight: 'bold', // Optional: make the text bold
    color: '#333', // Optional: set a color for the text
    textAlign: 'center', // Optional: center align the text
  },
});
