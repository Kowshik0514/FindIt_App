import { View, Text, Image, Dimensions, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import FormField from '../../components/FormField';
import { useRouter } from 'expo-router';
import axios from 'axios';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import { BASE_URL } from '../../../backend/config/config';

const { width, height } = Dimensions.get('window');

const signin = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signin`, form);

      if (response.status === 200) {
        // Navigate to a new screen after successful sign-in
        Alert.alert('Success', 'Signed in successfully');
        router.push('/home');
        // Add your navigation logic here
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    } finally {

      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signinBox}>
        <Text style={styles.signinText}>Sign In</Text>
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />
        <Text style={styles.forgotPassword}>
          <Link href="/forgotpassword" style={styles.forgotPassword}>Forgot Password?</Link>
        </Text>
        <CustomButton
          title="Sign In"
          handlePress={submit}
          isLoading={isSubmitting}
        />
        <View style={styles.noAccContainer}>
          <Text style={styles.noAcc}>Don't have an account?  <Link href="/signup" style={styles.signup}>Sign Up</Link></Text>
        </View>
      </View>
      <Image
        source={require('../../assets/images/walk3.png')}
        style={[{ top: width * (-0.2), left: width * 0.79 }]}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set the background color to white
  },
  signinBox: {
    top: height * 0.28,
    left: width * 0.06,
    width: width * 0.7, // Width of the rectangular box
    height: height * 0.44, // Height of the rectangular box
    borderColor: '#ffffff', // Border color
    borderWidth: 2, // Border width
    borderRadius: 8, // Rounded corners if needed
  },
  signinText: {
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
  },
  signup: {
    color: "#3B5ED5",
    fontWeight: "900",
    fontSize: width * 0.035,
    textShadowColor: 'rgba(59, 94, 213, 0.7)', // Color of the shadow
    textShadowOffset: { width: 0.5, height: 0.5 }, // Offset of the shadow
    textShadowRadius: 1, // Blur radius of the shadow
  },
  forgotPassword: {
    color: "#3B5ED5",
    fontWeight: "bold",
    fontSize: width * 0.03,
    textShadowColor: 'rgba(59, 94, 213, 0.7)', // Color of the shadow
    textShadowOffset: { width: 0.5, height: 0.5 }, // Offset of the shadow
    textShadowRadius: 1, // Blur radius of the shadow
    marginTop: 4,
    marginLeft: width * 0.38,
  },
});

export default signin