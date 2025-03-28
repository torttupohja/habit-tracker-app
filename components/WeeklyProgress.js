import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWeekDates } from '../utils/utils';

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
        <Text style={[styles.progressCell, styles.habitNameCell]}>Habit</Text>
        {weekDates.map(date => (
          <Text key={date} style={styles.progressCell}>
            {new Date(date).getMonth() + 1}/{new Date(date).getDate()}
          </Text>
        ))}
      </View>

      {/* Habit rows */}
      {habits.map(habit => {
        if (!habit || typeof habit !== 'object' || !habit.id || !habit.text) return null;

        return (
          <View key={habit.id} style={styles.progressRow}>
            <Text style={[styles.progressCell, styles.habitNameCell]}>{habit.text}</Text>
            {weekDates.map(date => (
              <Ionicons
                key={date}
                name={habit.history?.[date] ? 'checkmark-circle-sharp' : 'ellipse-outline'}
                size={22}
                color={habit.history?.[date] ? 'green' : 'black'}
                style={styles.progressCell}
              />
            ))}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 4,
  },
  progressCell: {
    width: 40,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 16,
    overflow: 'hidden',
  },
  habitNameCell: {
    flex: 1,
    textAlign: 'left',
    fontSize: 14,
    paddingRight: 5,
  },
});

export default WeeklyProgress;
