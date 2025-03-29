import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

export default function BackgroundWrapper({ children }) {
  return (
    <ImageBackground
      source={require('../assets/backgrounds/blue_background.jpg')} // change path if needed
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.85)', // subtle white overlay
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
