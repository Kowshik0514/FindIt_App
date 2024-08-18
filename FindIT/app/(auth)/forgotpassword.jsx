import { View, Text, Image, Dimensions, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

const forgotpassword = () => {
  const [form, setForm] = useState({
    phoneno: '',
    otp: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.forPassBox}>
        <Text style={styles.forPassText}>Forgot Password?</Text>
        <FormField 
          title = "Registered Phone Number"
          value={form.phoneno}
          handleChangeText={(e) => setForm({ ...form, phoneno: e})}
          keyboardType="phone-number"
        />



        {/* **************OTP FIELD************** */}

        {/* <FormField 
            title="Enter OTP"
            value={form.otp}
            handleChangeText={(e) => setForm({ ...form, otp: e })}
            keyboardType="numeric"
        /> */}
        {/* <Text style={styles.resend}>
          <Link href="/forgotpassword" style={styles.resend}>Resend Otp?</Link>
        </Text> */}

        {/* **************OTP FIELD************** */}



        <CustomButton 
          title="Send OTP"
        //   title={otpSent ? "Verify OTP" : "Send OTP"} 
          handlePress={submit}
          isLoading={isSubmitting}
        />
        <View style={styles.remAccContainer}>
          <Text style={styles.remAcc}>Remember Password?  <Link href="/signin" style={styles.signin}>Sign In</Link></Text>
        </View>
      </View>
        <Image
          source={require('../../assets/images/walk3.png')}
          style={[{ top: width * (-0.29), left: width * 0.79 }]}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set the background color to white
  },
  forPassBox:{
    top: height*0.28,
    left: width*0.06,
    width: width * 0.7, // Width of the rectangular box
    height: height * 0.48, // Height of the rectangular box
    borderColor: '#ffffff', // Border color
    borderWidth: 2, // Border width
    borderRadius: 8, // Rounded corners if needed
  },
  forPassText: {
    fontFamily: 'AllertaStencil-Regular',
    fontSize: width*0.07,
    color: "#3B5ED5",
    marginLeft: 18,
    marginTop: 15,
    textShadowColor: 'rgba(59, 94, 213, 0.7)', // Set the color of the stroke
    textShadowOffset: { width: 1, height: 1 }, // Adjust the offset to control the stroke's appearance
    textShadowRadius: 1, // Adjust the radius to control the blur effect
  },
  remAccContainer: {
    width: width * 0.6,
    height: width * 0.1,
    borderColor: '#ffffff',
    borderWidth: 2, // Border width
    // marginTop: 300,
    marginLeft: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  remAcc: {
    // position: "absolute",
    fontFamily: 'OpenSans-Regular',
    textAlign: "center",
  },
  signin: {
    color: "#3B5ED5",
    fontWeight: "900",
    fontSize: width * 0.035,
    textShadowColor: 'rgba(59, 94, 213, 0.7)', // Color of the shadow
    textShadowOffset: { width: 0.5, height: 0.5 }, // Offset of the shadow
    textShadowRadius: 1, // Blur radius of the shadow
  },
  resend: {
    color: "#3B5ED5",
    fontWeight: "bold",
    fontSize: width * 0.036,
    marginTop: 4,
    marginLeft: width * 0.43,
    textShadowColor: 'rgba(59, 94, 213, 0.7)', // Color of the shadow
    textShadowOffset: { width: 0.5, height: 0.5 }, // Offset of the shadow
    textShadowRadius: 1, // Blur radius of the shadow
  }
});

export default forgotpassword