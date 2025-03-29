import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWeekDates } from '../utils/utils';
import habitColors from '../constants/colors';
import styles from '../styles/WeeklyProgressStyles';

const WeeklyProgress = ({ habits = [], weekStartDate }) => {
  if (!Array.isArray(habits) || !weekStartDate || habits.length === 0) {
    return null;
  }
  const weekDates = getWeekDates(weekStartDate); 

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Weekly Progress</Text>

      {/* Header row */}
      <View style={styles.progressRow}>
      <Text style={[styles.progressCell, styles.habitNameCell]}>
        Habit
      </Text>
        {getWeekDates(weekStartDate).map(date => {
          return (
            <Text
              key={date}
              style={styles.progressCell}
              numberOfLines={1}
              ellipsizeMode="clip"
            >
              {date.slice(5).replace('-', '/')}
            </Text>
          );
        })}
      </View>


      {/* Habit rows */}
      {habits.map((habit, index) => {
        const colors = habitColors[index % habitColors.length];

        return (
          <View
            key={habit.id}
            style={[
              styles.progressRow,
              { backgroundColor: colors.faded }, // faded row color
            ]}
          >
            <Text style={[styles.progressCell, styles.habitNameText]}>
              {habit.text}
            </Text>
            {weekDates.map((date) => (
              <Ionicons
                key={date}
                name={habit.history?.[date] ? 'checkmark-circle-sharp' : 'ellipse-outline'}
                size={30}
                color={habit.history?.[date] ? colors.bright : 'black'}
                style={[styles.progressCell, styles.iconCell]}
              />
            ))}
          </View>
        );
      })}
    </View>
  );
};

export default WeeklyProgress;
