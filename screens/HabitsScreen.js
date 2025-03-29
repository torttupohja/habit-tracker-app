// screens/HabitsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { getTodayDate, getWeekDates } from '../utils/utils';
import WeeklyProgress from '../components/WeeklyProgress';
import BackgroundWrapper from '../components/BackgroundWrapper';
import styles from './HabitsScreenStyles';

export default function HabitsScreen() {
  const [habits, setHabits] = useState([]);
  const [habitText, setHabitText] = useState('');
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [weekStartDate, setWeekStartDate] = useState(null);

  const today = getTodayDate();
  
  // ❗Uncomment this ONLY if you need to reset storage for testing
  // useEffect(() => {
  //   AsyncStorage.clear().then(() => {
  //     console.log("🧹 Cleared all storage");
  //   });
  // }, []);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const storedHabits = await AsyncStorage.getItem('habits');
      const storedStartDate = await AsyncStorage.getItem('weekStartDate');

      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      }

      if (storedStartDate) {
        setWeekStartDate(storedStartDate);
        console.log("✅ Loaded saved weekStartDate:", storedStartDate);
      } else {
        const today = getTodayDate();
        setWeekStartDate(today);
        await AsyncStorage.setItem('weekStartDate', today);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    if (habits.length > 0) {
      AsyncStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits]);

  useEffect(() => {
    if (weekStartDate) {
      AsyncStorage.setItem('weekStartDate', weekStartDate);
    }
  }, [weekStartDate]);

  const addOrUpdateHabit = () => {
    if (habitText.trim().length === 0) return;

    if (editingHabitId) {
      setHabits(habits.map(habit =>
        habit.id === editingHabitId ? { ...habit, text: habitText } : habit
      ));
      setEditingHabitId(null);
    } else {
      const newHabit = {
        id: Date.now().toString(),
        text: habitText,
        history: {}
      };
      setHabits([...habits, newHabit]);
    }

    setHabitText('');
  };

  const toggleHabit = (id) => {
    const today = getTodayDate(); // fresh every time

    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;

      const currentStatus = habit.history?.[today] || false;

      return {
        ...habit,
        history: {
          ...habit.history,
          [today]: !currentStatus
        }
      };
    }));
  };

  const editHabit = (habit) => {
    setHabitText(habit.text);
    setEditingHabitId(habit.id);
  };

  const deleteHabit = (id) => {
    Alert.alert("Delete Habit", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => setHabits(habits.filter(habit => habit.id !== id)),
        style: 'destructive'
      }
    ]);
  };

  if (!weekStartDate) return null; // don't render until it's ready

  return (
    <BackgroundWrapper>
      <FlatList
        keyboardShouldPersistTaps="handled"
        style={styles.list}
        data={habits}
        keyExtractor={(item) => item.id}
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
              <TouchableOpacity
                onPress={addOrUpdateHabit}
                testID="add-habit-button"
                style={styles.addButton}
              >
                <Ionicons name="add-circle" size={32} color="#2e86de" />
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={({ item }) => {
            console.log("🧪 Habit being rendered:", item.text, item.history);
          
            return (
              <TouchableOpacity
                onPress={() => toggleHabit(item.id)}
                onLongPress={() => editHabit(item)}
              >
                <View style={styles.habitRowWrapper}>
                  <View style={styles.habitRow}>
                    <View testID={`habit-icon-${item.id}`}>
                      <Ionicons
                        name={item.history?.[today] ? 'checkmark-circle-sharp' : 'ellipse-outline'}
                        size={24}
                        color={item.history?.[today] ? 'green' : 'black'}
                      />
                    </View>
                    <Text style={[styles.habit, item.history?.[today] && styles.completed]}>
                      {item.text}
                    </Text>
                    <TouchableOpacity onPress={() => deleteHabit(item.id)}>
                      <Ionicons name="trash-sharp" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
        }}          

        ListFooterComponent={
          <WeeklyProgress habits={habits} weekStartDate={weekStartDate} />
        }
      />
    </BackgroundWrapper>
  );
}
