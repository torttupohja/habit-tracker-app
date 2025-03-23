// screens/HabitsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HabitsScreen() {
  const [habits, setHabits] = useState([]);
  const [habitText, setHabitText] = useState('');

  // Load habits from AsyncStorage when the component mounts
  useEffect(() => {
    loadHabits();
  }, []);

  // Save habits every time they change
  useEffect(() => {
    AsyncStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const loadHabits = async () => {
    const storedHabits = await AsyncStorage.getItem('habits');
    if (storedHabits) setHabits(JSON.parse(storedHabits));
  };

  const addHabit = () => {
    if (habitText.trim().length === 0) return;
    setHabits([...habits, { id: Date.now().toString(), text: habitText, completed: false }]);
    setHabitText('');
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Habits 📋</Text>

      <TextInput
        style={styles.input}
        placeholder="Add a new habit"
        value={habitText}
        onChangeText={setHabitText}
      />
      <Button title="Add Habit" onPress={addHabit} />

      <FlatList
        style={styles.list}
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleHabit(item.id)}>
            <Text style={[styles.habit, item.completed && styles.completed]}>
              {item.completed ? '✅' : '🔲'} {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  list: { marginTop: 20 },
  habit: { fontSize: 18, paddingVertical: 5 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
});
