// __tests__/HabitsScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import HabitsScreen from '../screens/HabitsScreen';

describe('HabitsScreen', () => {
  it('renders correctly with initial elements', () => {
    const { getByText, getByPlaceholderText } = render(<HabitsScreen />);

    // Check if title is displayed
    expect(getByText('My Habits 📋')).toBeTruthy();

    // Check if the input is present
    expect(getByPlaceholderText('Add or edit a habit')).toBeTruthy();

    // Check if Add Habit button exists
    expect(getByText('Add Habit')).toBeTruthy();
  });
});
