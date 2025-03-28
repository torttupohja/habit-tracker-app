// __tests__/HabitsScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import HabitsScreen from '../screens/HabitsScreen';
import { getTodayDate } from '../utils/utils';

// Optional: mock AsyncStorage to prevent side effects
jest.mock('@react-native-async-storage/async-storage', () => {
    let storage = {};
    return {
      getItem: jest.fn((key) => Promise.resolve(JSON.stringify([
        { id: '1', text: 'Drink Water', history: {} }
      ]))),
      setItem: jest.fn((key, value) => {
        storage[key] = value;
        return Promise.resolve();
      }),
      clear: jest.fn(() => {
        storage = {};
        return Promise.resolve();
      }),
    };
});  

jest.mock('../components/WeeklyProgress', () => 'WeeklyProgress');

describe('HabitsScreen', () => {
    it('renders correctly with initial elements', async () => {
        render(<HabitsScreen />);    

        await waitFor(() => {
            expect(screen.getByText('My Habits 📋')).toBeTruthy();
            expect(screen.getByPlaceholderText('Add or edit a habit')).toBeTruthy();
            expect(screen.getByTestId('add-habit-button')).toBeTruthy();
        });  
    });

    it('toggles habit completion for today', async () => {
        const { getByText, getByTestId } = render(<HabitsScreen />);
      
        // Wait for the habit to render first
        const habitItem = await waitFor(() => getByText('Drink Water'));
      
        // Now simulate the press
        fireEvent.press(habitItem);
      
        // Assert the icon name changed to completed
        const iconWrapper = getByTestId('habit-icon-1');
        const icon = iconWrapper.props.children;
        expect(icon.props.name).toBe('checkmark-circle-sharp');
      });            
});
