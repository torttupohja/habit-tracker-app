// screens/HabitsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { getTodayDate, getWeekDates } from '../utils/utils';
import WeeklyProgress from '../components/WeeklyProgress';
import BackgroundWrapper from '../components/BackgroundWrapper';
import styles from '../styles/HabitsScreenStyles';
import habitColors from '../constants/colors';

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
            id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
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
                <Ionicons name="add-circle" size={32} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={({ item, index }) => {
            const colors = habitColors[index % habitColors.length];
            const isCompleted = item.history?.[today];
          
            return (
              <TouchableOpacity
                onPress={() => toggleHabit(item.id)}
                onLongPress={() => editHabit(item)}
              >
                <View style={[styles.habitRowWrapper, { backgroundColor: colors.faded }]}>
                  <View style={styles.habitRow}>
                    <View testID={`habit-icon-${item.id}`}>
                      <Ionicons
                        name={isCompleted ? 'checkmark-circle-sharp' : 'ellipse-outline'}
                        size={24}
                        color={isCompleted ? colors.bright : 'black'}
                      />
                    </View>
                    <Text style={[styles.habit, isCompleted && styles.completed]}>
                      {item.text}
                    </Text>
                    <TouchableOpacity
                        testID={`delete-habit-${item.id}`}
                        onPress={() => deleteHabit(item.id)}
                    >
                        <Ionicons name="trash-sharp" size={24} color="#56bcf7" />
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
