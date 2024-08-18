import { View, Text, StyleSheet, Animated, Easing, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
    const taglineOpacity = useRef(new Animated.Value(0)).current;
    const taglineTranslateY = useRef(new Animated.Value(20)).current;
    const router = useRouter();

    useEffect(() => {
        NavigationBar.setBackgroundColorAsync('#2E49A6');
        NavigationBar.setButtonStyleAsync('light');
        
        Animated.timing(taglineOpacity, {
            toValue: 1,
            duration: 400,
            delay: 400,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        Animated.timing(taglineTranslateY, {
            toValue: 0,
            duration: 300,
            delay: 400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();

        const timeoutId = setTimeout(() => {
            router.push('/choose');
        }, 1700);
        // const timeoutId = setTimeout(() => {
        //     router.push('/signin');
        // }, 1);

        return () => clearTimeout(timeoutId);
    }, [taglineOpacity, taglineTranslateY, router]);

    return (
        <TouchableWithoutFeedback onPress={() => router.push('/choose')}>
            
            <LinearGradient
                colors={['#1F316F', '#3B5ED5']}
                style={styles.container}
            >

            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
                <Text style={[styles.text, styles.stroke, styles.positionedText]}>Find IT!</Text>
                <Text style={[styles.text, styles.positionedText]}>Find IT!</Text>

                <Animated.View
                    style={[
                        { opacity: taglineOpacity, transform: [{ translateY: taglineTranslateY }] },
                    ]}
                >
                    <View style={styles.taglineContainer}>
                        <View style={styles.taglineContainer2}>
                            <Image
                                source={require('../assets/images/searchLogo.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.taglineText}>
                                Lost your item?
                            </Text>
                        </View>

                        <View style={styles.taglineContainer2}>
                            <Text style={styles.taglineText}>
                            {'\n'}Here's the solution
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1F316F',
        height: '100%',
    },
    positionedText: {
        marginTop: 300,
    },
    text: {
        fontFamily: 'AlmendraSC-Regular',
        fontSize: 55,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 3,
        position: 'absolute',
    },
    stroke: {
        color: 'black',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 0,
    },
    taglineContainer: {
        flexDirection: 'column', // Aligns children horizontally
        alignItems: 'center', // Centers them vertically
        marginTop: 388, // Adjust based on where you want the tagline to appear
        position: 'absolute',
    },
    taglineContainer2: {
        flexDirection: 'row', // Aligns children horizontally
        position: 'absolute',
    },
    textContainer: {
        flexDirection: 'column', // Stack the text vertically
        alignItems: 'flex-start', // Align the text to the left
    },
    icon: {
        marginRight: 12,
    },
    taglineText: {
        fontFamily: 'AllertaStencil-Regular',
        fontSize: 20,
        color: 'white',
    },
    tagline: {
        fontFamily: 'AllertaStencil-Regular',
        fontSize: 20,
        color: 'white',
        marginTop: 388,
        position: 'absolute',
    },
});