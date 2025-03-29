import React from 'react';
import styles from './HomeScreenStyles';
import BackgroundWrapper from '../components/BackgroundWrapper';
import quotes from '../quotes';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';

function getDailyQuote() {
  const today = new Date();
  const index = today.getDate() % quotes.length;
  return quotes[index];
}

export default function HomeScreen({ navigation }) {
    return (
      <BackgroundWrapper>
        <SafeAreaView style={styles.container}>
          {/* Wrap welcome message in its own box higher up */}
          <View style={styles.topSpacing}>
            <Text style={styles.header}>🌞 Welcome to Your Habit Tracker!</Text>
          </View>

          {/* Centered quote */}
          <View style={styles.centeredQuoteBox}>
            <View style={styles.quoteCard}>
              <Text style={styles.quote}>{getDailyQuote()}</Text>
            </View>

            {/* Button right below */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Habits')}>
              <Text style={styles.buttonText}>Go to My Habits</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </BackgroundWrapper>
    );
  }  
