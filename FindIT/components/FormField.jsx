import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
const { width, height } = Dimensions.get('window');

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
    <View>
      <View style={styles.credBox}><TextInput
          style={styles.input}
          placeholder={title}
          value= {value}
          onChangeText={handleChangeText}
          secureTextEntry={title==='Password' && !showPassword}
        />

        {title==='Password' && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                <Image source={!showPassword ? require('../assets/images/showPass.png') : require('../assets/images/hidePass.png')}
                style={styles.eye} resizeMode='contain'/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        flex: 1,
        marginLeft: 18,
        color: "black",
    },
    credBox: {
        width: width * 0.68, // Width of the rectangular box
        height: width * 0.15, // Height of the rectangular box
        backgroundColor: "rgba(59, 94, 213, 0.1)",
        // borderColor: "black",
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: 20,
        flexDirection: 'row', // Align children horizontally
        alignItems: 'center',
    },
    eye: {
        height: 20,
        width: 20,
        marginRight: 15,
    },
});

export default FormField