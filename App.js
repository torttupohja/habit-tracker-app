import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';
import HabitsScreen from './screens/HabitsScreen';

// Stack navigator setup
const Stack = createNativeStackNavigator();

const quotes = [
  "Believe you can and you're halfway there.",
  "Every day is a second chance.",
  "Small steps every day lead to big changes.",
  "Keep going, you're doing great!",
  "Consistency is key. You've got this!",
  "Every morning is a fresh start.",
  "Focus on progress, not perfection."
];

// Function to select a daily-changing quote
function getDailyQuote() {
  const today = new Date();
  const index = today.getDate() % quotes.length; // Changes daily
  return quotes[index];
}

// Home Screen Component
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🌟 Welcome to Your Habit Tracker! 🌟</Text>
      <Text style={styles.quote}>{getDailyQuote()}</Text>
      <Button
        title="Go to My Habits"
        onPress={() => navigation.navigate('Habits')}
      />
    </SafeAreaView>
  );
}

// Main App Component with Navigation
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

// Styles for Home Screen
const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20
  },
  header: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'
  },
  quote: {
    fontSize: 18, fontStyle: 'italic', textAlign: 'center', marginBottom: 30, color: '#555'
  },
});
