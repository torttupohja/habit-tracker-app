import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';
import HabitsScreen from './screens/HabitsScreen';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🌟 Welcome to Your Habit Tracker! 🌟</Text>
      <Text style={styles.quote}>
        "Every day is a new beginning. Take a deep breath and start again."
      </Text>
      <Button
        title="Go to My Habits"
        onPress={() => navigation.navigate('Habits')}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Habits" component={HabitsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20
  },
  header: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'
  },
  quote: {
    fontSize: 16, fontStyle: 'italic', textAlign: 'center', marginBottom: 30
  },
});


