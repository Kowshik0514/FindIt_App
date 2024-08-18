import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Image, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Choose = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState(1);
  const opacity = new Animated.Value(1);
  const [buttonClicked, setButtonClicked] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentView(1); // Reset view to 1 when the component gains focus
    }, [])
  );
  
  const handleSignInClick = () => {
    setButtonClicked('signin');
    handleNavigate(2); // Proceed to the next view
  };
  
  const handleSignUpClick = () => {
    setButtonClicked('signup');
    handleNavigate(2); // Proceed to the next view
  };
  




  // *****************GOOGLE SIGN IN********************** Refer Line 94
  const googleSignIn = () => {

  };
  // *****************GOOGLE SIGN IN**********************





  const handleNavigate = (view) => {
    setCurrentView(view); // Directly set the current view without animation
  };

  useEffect(() => {
    if (currentView === 2) {
      const timer = setTimeout(() => {
        handleNavigate(3); // Automatically navigate to view 3 after 300ms
      }, 100);
      return () => clearTimeout(timer);
    }
    if (currentView === 3) {
      const timer = setTimeout(() => {
        handleNavigate(4); // Automatically navigate to view 3 after 300ms
      }, 100);
      return () => clearTimeout(timer);
    }
    if (currentView === 4) {
      const timer = setTimeout(() => {
        handleNavigate(5); // Automatically navigate to view 3 after 300ms
      }, 100);
      return () => clearTimeout(timer);
    }
    if (currentView === 5) {
      const timer = setTimeout(() => {
        if (buttonClicked === 'signin') {
          router.push('/signin');
        } else if (buttonClicked === 'signup') {
          router.push('/signup');
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentView,  buttonClicked]);

  const renderContent = () => {
    if (currentView === 1) {
      return (
        <>
          <Image
            source={require('../../assets/images/walk1.png')}
            style={[{ top: height * 0.35, left: width * 0.05 }]}
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: "#1F316F" }]} onPress={handleSignInClick}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#3B5ED5" }]} onPress={handleSignUpClick}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#ffffff" }]} onPress={googleSignIn}>
            <Image style={styles.google} source={require('../../assets/images/google.png')} />
            <Text style={[styles.buttonText, {color: "black"}]}>Sign In</Text>
          </TouchableOpacity>
        </>
      );
    } else if (currentView === 2) {
      return (
        <>
          <View style={{ zIndex: 2 }}>
            <Image
              source={require('../../assets/images/walk2.png')}
              style={[{ top: height * 0.35, left: width * 0.185 }]}
            />
          </View>
          {/* <View style={[styles.whiteMask1, { zIndex: 1 }]} /> */}
          <TouchableOpacity style={[styles.button, { backgroundColor: "#1F316F" }]}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#3B5ED5" }]}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#ffffff" }]}>
            <Image style={styles.google} source={require('../../assets/images/google.png')} />
            <Text style={[styles.buttonText, {color: "black"}]}>Sign In</Text>
          </TouchableOpacity>
        </>
      );
    } else if (currentView === 3) {
      return (
        <>
          <View style={{ zIndex: 2 }}>
            <Image
              source={require('../../assets/images/walk1.png')}
              style={[{ top: height * 0.35, left: width * 0.32 }]}
            />
          </View>
          <View style={[styles.whiteMask2, { zIndex: 1 }]} />
            <TouchableOpacity style={[styles.button, { backgroundColor: "#1F316F" }]}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#3B5ED5",  }]}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#ffffff" }]}>
              <Image style={styles.google} source={require('../../assets/images/google.png')} />
              <Text style={[styles.buttonText, {color: "black"}]}>Sign In</Text>
            </TouchableOpacity>
        </>
      );
    } else if (currentView === 4) {
      return (
        <>
          <View style={{ zIndex: 2 }}>
            <Image
              source={require('../../assets/images/walk2.png')}
              style={[{ top: height * 0.35, left: width * 0.46 }]}
            />
          </View>
          <View style={[styles.whiteMask3, { zIndex: 1 }]} />
            <TouchableOpacity style={[styles.button, { backgroundColor: "#1F316F" }]}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#3B5ED5" }]}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#ffffff" }]}>
              <Image style={styles.google} source={require('../../assets/images/google.png')} />
              <Text style={[styles.buttonText, {color: "black"}]}>Sign In</Text>
          </TouchableOpacity>
        </>
      );
    } else if (currentView === 5) {
      return (
        <>
          <View style={{ zIndex: 2 }}>
            <Image
              source={require('../../assets/images/walk1.png')}
              style={[{ top: height * 0.35, left: width * 0.73 }]}
            />
          </View>
          <View style={[styles.whiteMask4, { zIndex: 1 }]} />
            <TouchableOpacity style={[styles.button, { backgroundColor: "#1F316F" }]}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#3B5ED5" }]}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#ffffff" }]}>
              <Image style={styles.google} source={require('../../assets/images/google.png')} />
              <Text style={[styles.buttonText, {color: "black"}]}>Sign In</Text>
            </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Animated.View style={[{ opacity }]}>
            {renderContent()}
        </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set the background color to white
  },
  button: {
    height: height*0.075,
    width: width*0.5,
    top: height*0.06,
    left: width*0.37,
    marginBottom: 25,
    borderRadius: 40,
    elevation: 7,
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontFamily: 'AllertaStencil-Regular',
    fontSize: width*0.06,
    color: "white",
  },
  whiteMask2: {
    position: 'absolute',
    top: height * 0.35,
    left: width * 0.16, // Adjust to cover left side of buttons
    width: width * 0.28, // Adjust width to cover the left side
    height: height * 0.75, // Match button height
    backgroundColor: 'white',
  },
  whiteMask3: {
    position: 'absolute',
    top: height * 0.35,
    left: width * 0.16, // Adjust to cover left side of buttons
    width: width * 0.4, // Adjust width to cover the left side
    height: height * 0.75, // Match button height
    backgroundColor: 'white',
  },
  whiteMask4: {
    position: 'absolute',
    top: height * 0.35,
    left: width * 0.28, // Adjust to cover left side of buttons
    width: width * 0.6, // Adjust width to cover the left side
    height: height * 0.75, // Match button height
    backgroundColor: 'white',
  },
  google: {
    height: width * 0.075,
    width: width * 0.075,
    marginRight: 10,
  }
});

export default Choose;