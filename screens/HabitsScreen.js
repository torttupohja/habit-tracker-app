// screens/HabitsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


export default function HabitsScreen() {
  // State for storing habits and current habit input
  const [habits, setHabits] = useState([]);
  const [habitText, setHabitText] = useState('');
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [weekStartDate, setWeekStartDate] = useState(null);
  
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Function to calculate week start from day 1 of entering the habit
  const getWeekDates = (startDateStr) => {
    const dates = [];
    const start = new Date(startDateStr);
  
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      dates.push(day.toISOString().split('T')[0]); // YYYY-MM-DD
    }
  
    return dates;
  };

  
  // Function to load habits from AsyncStorage
  const loadHabits = async () => {
    try {
      const storedHabits = await AsyncStorage.getItem('habits');
      const storedStartDate = await AsyncStorage.getItem('weekStartDate');
  
      if (storedHabits) setHabits(JSON.parse(storedHabits));
      if (storedStartDate) setWeekStartDate(storedStartDate);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }; 

    // Load habits and week start date when the screen first mounts
    useEffect(() => {
        loadHabits();
    }, []);

    // Save habits whenever they change
    useEffect(() => {
        AsyncStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    // Save the start of the week whenever it changes
    useEffect(() => {
        if (weekStartDate) {
        AsyncStorage.setItem('weekStartDate', weekStartDate);
        }
    }, [weekStartDate]);
    
    // If no week start date is set (first-time run), set it to today
    useEffect(() => {
        if (!weekStartDate) {
        const today = getTodayDate(); // e.g. '2024-04-01'
        setWeekStartDate(today);
        }
    }, [weekStartDate]);

    // Add a new habit or update existing habit
    const addOrUpdateHabit = () => {
        if (habitText.trim().length === 0) return;

        if (editingHabitId) {
        setHabits(habits.map(habit =>
            habit.id === editingHabitId
            ? { ...habit, text: habitText }
            : habit
        ));
        setEditingHabitId(null);
        } else {
        const newHabit = {
            id: Date.now().toString(),
            text: habitText,
            history: {} // new: empty history when added
        };
        setHabits([...habits, newHabit]);
        }

        setHabitText('');
    };

    // Toggle habit completion status
    const today = getTodayDate()
    const toggleHabit = (id) => {
        const getTodayDate = () => {
            const today = new Date();
            return today.toISOString().split('T')[0]; // format: YYYY-MM-DD
        };
    
        setHabits(habits.map(habit => {
        if (habit.id !== id) return habit;
    
        const currentStatus = habit.history?.[today] || false;
        return {
            ...habit,
            history: {
            ...habit.history,
            [today]: !currentStatus // toggle today’s status
            }
        };
        }));
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
    <FlatList
      style={styles.list}
      data={habits}
      keyExtractor={(item) => item.id}
  
      // 🧠 Header (input + button)
      ListHeaderComponent={
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>My Habits 📋</Text>
  
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Add or edit a habit"
              value={habitText}
              onChangeText={setHabitText}
            />
            <TouchableOpacity onPress={addOrUpdateHabit} style={styles.addButton}>
              <Ionicons name="add-circle" size={32} color="#2e86de" />
            </TouchableOpacity>
          </View>
        </View>
      }
  
      // 📄 Habit list items
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => toggleHabit(item.id)}
          onLongPress={() => editHabit(item)}
        >
          <View style={styles.habitRowWrapper}>
            <View style={styles.habitRow}>
              <Ionicons
                name={item.history?.[getTodayDate()] ? "checkmark-circle-sharp" : "ellipse-outline"}
                size={24}
                color={item.history?.[getTodayDate()] ? "green" : "black"}
              />
              <Text style={[styles.habit, item.history?.[getTodayDate()] && styles.completed]}>
                {item.text}
              </Text>
              <TouchableOpacity onPress={() => deleteHabit(item.id)}>
                <Ionicons name="trash-sharp" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
  
      // 📊 Weekly progress section
      ListFooterComponent={
        weekStartDate && (
          <View style={{ marginTop: 30, paddingHorizontal: 16 }}>
            <Text style={styles.title}>Weekly Progress</Text>
  
            {/* Header row */}
            <View style={styles.progressRow}>
              <Text style={[styles.progressCell, styles.habitNameCell]}>Habit</Text>
              {getWeekDates(weekStartDate).map(date => (
                <Text key={date} style={styles.progressCell}>
                  {new Date(date).getMonth() + 1}/{new Date(date).getDate()}
                </Text>
              ))}
            </View>
  
            {/* Habit rows */}
            {habits.map(habit => (
              <View key={habit.id} style={styles.progressRow}>
                <Text style={[styles.progressCell, styles.habitNameCell]}>
                  {habit.text}
                </Text>
                {getWeekDates(weekStartDate).map(date => (
                  <Ionicons
                    key={date}
                    name={habit.history?.[date] ? "checkmark-circle-sharp" : "ellipse-outline"}
                    size={24}
                    color={habit.history?.[date] ? "green" : "black"}
                    style={styles.progressCell}
                  />
                ))}
              </View>
            ))}
          </View>
        )
      }
    />
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
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // soft gray
    paddingBottom: 4,
  },  
  
  progressCell: {
    width: 36, // or try 40 if still tight
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 16, // helps squeeze it into one line
    overflow: 'hidden',
    includeFontPadding: false,
  },    
  
  habitNameCell: {
    flex: 0.8, // reduced width
    textAlign: 'left',
    fontSize: 14,
  },
  
  headerWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  habitRowWrapper: {
    paddingHorizontal: 16,
  },
  
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  
  addButton: {
    padding: 4,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  }
    
});
