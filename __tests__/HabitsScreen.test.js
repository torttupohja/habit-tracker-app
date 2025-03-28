// __tests__/HabitsScreen.test.js
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import HabitsScreen from '../screens/HabitsScreen';

// Optional: mock AsyncStorage to prevent side effects
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

it('renders correctly with initial elements', async () => {
  render(<HabitsScreen />);    

  await waitFor(() => {
    expect(screen.getByText('My Habits 📋')).toBeTruthy();
    expect(screen.getByPlaceholderText('Add or edit a habit')).toBeTruthy();
    expect(screen.getByTestId('add-habit-button')).toBeTruthy();
  });  
});
