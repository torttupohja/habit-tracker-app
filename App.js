import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { ShadowsIntoLight_400Regular } from '@expo-google-fonts/shadows-into-light';

import HabitsScreen from './screens/HabitsScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    ShadowsIntoLight_400Regular,
  });

  const preloadAssets = async () => {
    await Asset.loadAsync([require('./assets/backgrounds/blue_background.jpg')]);
  };

  if (!isReady || !fontsLoaded) {
    return (
      <AppLoading
        startAsync={preloadAssets}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Habits" component={HabitsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
