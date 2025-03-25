// screens/HabitsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


export default function HabitsScreen() {
  // State for storing habits and current habit input
  const [habits, setHabits] = useState([]);
  const [habitText, setHabitText] = useState('');
  const [editingHabitId, setEditingHabitId] = useState(null);

  // Load habits from AsyncStorage on component mount
  useEffect(() => {
    loadHabits();
  }, []);

  // Save habits to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Function to load habits from AsyncStorage
  const loadHabits = async () => {
    const storedHabits = await AsyncStorage.getItem('habits');
    if (storedHabits) setHabits(JSON.parse(storedHabits));
  };

  // Add a new habit or update existing habit
  const addOrUpdateHabit = () => {
    if (habitText.trim().length === 0) return;

    if (editingHabitId) {
      // Update existing habit
      setHabits(habits.map(habit => 
        habit.id === editingHabitId ? { ...habit, text: habitText } : habit
      ));
      setEditingHabitId(null);
    } else {
      // Add new habit
      setHabits([...habits, { id: Date.now().toString(), text: habitText, completed: false }]);
    }
    setHabitText('');
  };

  // Toggle habit completion status
  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  // Edit habit text
  const editHabit = (habit) => {
    setHabitText(habit.text);
    setEditingHabitId(habit.id);
  };

  // Delete habit with confirmation
  const deleteHabit = (id) => {
    Alert.alert("Delete Habit", "Are you sure you want to delete this habit?", [
      { text: "Cancel" },
      { text: "Delete", onPress: () => setHabits(habits.filter(habit => habit.id !== id)), style: 'destructive' }
    ]);
  };

  // Render habits list with edit and delete buttons
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Habits 📋</Text>

      <TextInput
        style={styles.input}
        placeholder="Add or edit a habit"
        value={habitText}
        onChangeText={setHabitText}
      />
      <Button title={editingHabitId ? "Update Habit" : "Add Habit"} onPress={addOrUpdateHabit} />

      <FlatList
        style={styles.list}
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => toggleHabit(item.id)} 
            onLongPress={() => editHabit(item)}
          >
            <View style={styles.habitRow}>
                <Ionicons
                    name={item.completed ? "checkmark-circle-sharp" : "ellipse-outline"}
                    size={24}
                    color={item.completed ? "green" : "black"}
                />
                <Text style={[styles.habit, item.completed && styles.completed]}>
                    {item.text}
                </Text>
                <TouchableOpacity onPress={() => deleteHabit(item.id)}>
                    <Ionicons name="trash-sharp" size={24} color="red" />
                </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Styles for the Habits screen
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  list: { marginTop: 20 },
  habitRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5,},
  habit: { fontSize: 18, paddingVertical: 5, flex: 1 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  delete: { fontSize: 20, paddingHorizontal: 10 },
});
