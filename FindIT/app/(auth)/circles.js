import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const Circles = () => {
  return (
    <>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />
      <View style={[styles.circle, styles.circle4]} />
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: 'rgba(59, 94, 213, 0.76)',
  },
  circle1: {
    top: height * (-0.02),
    left: width * (-0.18),
  },
  circle2: {
    top: height * (-0.10),
    left: width * 0.05,
  },
  circle3: {
    top: height * 0.9,
    left: width * 0.46,
  },
  circle4: {
    top: height * 0.82,
    left: width * 0.7,
  },
});

export default Circles;
