import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');

const CustomButton = ({title, handlePress, isLoading}) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
        style={[
            styles.button,
            isLoading && styles.buttonLoading, // Apply the loading style when isLoading is true
          ]}
        >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Set the background color to white
        alignItems: "center",
      },
    button:{
        backgroundColor: "#3B5ED5",
        borderRadius: 30,
        width: width * 0.3, // Width of the rectangular box
        height: width * 0.15, // Height of the rectangular box
        justifyContent: "center", // Center the text vertically
        alignItems: "center", // Center the text horizontally
        marginTop: 40,
        elevation: 9,
    },
    buttonLoading: {
        opacity: 0.5, // Reduce opacity to indicate the loading state
    },
    buttonText:{
        fontFamily: 'OpenSans-Regular',
        color: "white",
        fontSize: width*0.048,
    }
});


export default CustomButton