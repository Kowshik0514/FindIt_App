import { View, Text, Image, Dimensions, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import FormField from '../../components/FormField';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { Link } from 'expo-router';
import { BASE_URL } from '../../backend/config/config';

const { width, height } = Dimensions.get('window');

const signup = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    phoneno: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {


    setIsSubmitting(true);
    // console.log("abc")
    try {
      // console.log("2");
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, form);

      if (response.status === 201) {

        Alert.alert('Success', 'Account created successfully');
        router.push('/signin');

        // Add your navigation logic here to sign-in page
      }
    } catch (error) {
      console.log(error);
      console.error('Signup Error:', error);  // Log the error
      // res.status(500).json({ error: 'Internal Server Error' });
      Alert.alert('Error', 'Error signing up');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signupBox}>
        <Text style={styles.signupText}>Sign Up</Text>
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
        />
        <FormField
          title="Phone Number"
          value={form.phoneno}
          handleChangeText={(e) => setForm({ ...form, phoneno: e })}
          keyboardType="phone-number"
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />

        <CustomButton
          title="Sign Up"
          handlePress={submit}
          isLoading={isSubmitting}
        />
        <View style={styles.noAccContainer}>
          <Text style={styles.noAcc}>Have an account already?  <Link href="/signin" style={styles.signin}>Sign In</Link></Text>
        </View>
      </View>
      <Image
        source={require('../../assets/images/walk3.png')}
        style={[{ top: width * (-0.4), left: width * 0.79 }]}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set the background color to white
  },
  signupBox: {
    top: height * 0.22,
    left: width * 0.06,
    width: width * 0.7, // Width of the rectangular box
    height: height * 0.536, // Height of the rectangular box
    borderColor: '#ffffff', // Border color
    borderWidth: 2, // Border width
    borderRadius: 8, // Rounded corners if needed
  },
  signupText: {
    fontFamily: 'AllertaStencil-Regular',
    fontSize: width * 0.07,
    color: "#3B5ED5",
    marginLeft: 18,
    marginTop: 15,
    textShadowColor: 'rgba(59, 94, 213, 0.7)', // Set the color of the stroke
    textShadowOffset: { width: 1, height: 1 }, // Adjust the offset to control the stroke's appearance
    textShadowRadius: 1, // Adjust the radius to control the blur effect
  },
  noAcc: {
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    // fontSize: 0,
    marginBottom: 10,
  },
  signin: {
    color: "#3B5ED5",
    fontWeight: "900",
    fontSize: width * 0.035,
    textShadowColor: 'rgba(59, 94, 213, 0.7)', // Color of the shadow
    textShadowOffset: { width: 0.5, height: 0.5 }, // Offset of the shadow
    textShadowRadius: 1, // Blur radius of the shadow
  },
});

export default signup