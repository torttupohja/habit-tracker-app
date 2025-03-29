// __tests__/HabitsScreen.test.js
import React from 'react';
import { render, waitFor, screen,fireEvent, act } from '@testing-library/react-native';
import HabitsScreen from '../screens/HabitsScreen';
import { addHabit, toggleHabit } from '../test/utils/testUtils';

describe('HabitsScreen', () => {
  it('renders correctly with initial elements', async () => {
    render(<HabitsScreen />);

    await waitFor(() => {
      expect(screen.getByText('My Habits 📋')).toBeTruthy();
      expect(screen.getByPlaceholderText('Add or edit a habit')).toBeTruthy();
      expect(screen.getByTestId('add-habit-button')).toBeTruthy();
    });
  });

  it('adds a new habit and toggles it as completed', async () => {
    render(<HabitsScreen />);

    // 🧪 Add a habit
    await addHabit('Drink water');

    // 🧪 Toggle it to complete
    await toggleHabit('Drink water');

    // ✅ Check if icon switched to completed
    const iconWrapper = screen.getByTestId('habit-icon-1');
    const icon = iconWrapper.props.children;
    expect(icon.props.name).toBe('checkmark-circle-sharp');
  });

it('deletes a habit from the list', async () => {
  const { getByText, queryByText } = render(<HabitsScreen />);

    // 1️⃣ Add a habit
    await addHabit('Meditate');

    // 2️⃣ Long press to simulate entering edit/delete state
    const habitItem = await waitFor(() => getByText('Meditate'));
    act(() => {
      fireEvent(habitItem, 'longPress');
    });

    // 3️⃣ Confirm deletion (you may need to adapt this if your Alert uses custom text)
    await act(async () => {
      // simulate user pressing 'Delete' in the Alert
      await fireEvent.press(getByText('Delete'));
    });

    // 4️⃣ Confirm it was removed
    expect(queryByText('Meditate')).toBeNull();
  });
});
