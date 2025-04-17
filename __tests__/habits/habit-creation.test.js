import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HabitsScreen from '../../screens/HabitsScreen';
import { addHabit } from '../../test/utils/testUtils';

describe('Habit Creation', () => {
  const renderHabitsScreen = async () => {
    let utils;
    await waitFor(() => {
      utils = render(<HabitsScreen />);
    });
    return utils;
  };

  it('adds a new habit and displays it in the list', async () => {
    const utils = await renderHabitsScreen();

    const habitText = `Drink Water ${Date.now()}`; // 🆕 unique habit each time
    await addHabit(utils, habitText);

    // ✅ Assert that new habit appears on the screen
    expect(utils.getByText(habitText)).toBeTruthy();
  });
});
