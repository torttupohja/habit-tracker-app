import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react-native';
import HabitsScreen from '../screens/HabitsScreen';
import { addHabit, toggleHabit } from '../test/utils/testUtils';

describe('HabitsScreen', () => {
  const renderHabitsScreen = async () => {
    let utils;
    await waitFor(() => {
      utils = render(<HabitsScreen />);
    });
    return utils;
  };

  it('renders correctly with initial elements', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = await renderHabitsScreen();

    await waitFor(() => {
      expect(getByText('My Habits 📋')).toBeTruthy();
      expect(getByPlaceholderText('Add or edit a habit')).toBeTruthy();
      expect(getByTestId('add-habit-button')).toBeTruthy();
    });
  });

  it('adds and toggles a habit', async () => {
    const utils = await renderHabitsScreen();
    const habitName = `Drink Water ${Date.now()}`;
  
    await addHabit(utils, habitName);
  
    const habitItem = utils.getByText(habitName);
    fireEvent.press(habitItem);
  
    // ✅ Simpler: just check if the completed icon exists
    expect(utils.getByText('[Icon name=checkmark-circle-sharp color=#FFD700 size=24]')).toBeTruthy();
  });  

  it('deletes a habit from the list', async () => {
    const utils = await renderHabitsScreen();
    const habitName = `Meditate ${Date.now()}`;
  
    await addHabit(utils, habitName);
  
    const habitText = await waitFor(() => utils.getByText(habitName));
    expect(habitText).toBeTruthy();
  
    // 🔍 Find the habit ID from the testID on the icon wrapper
    const iconWrapper = utils.getByText(habitName).parent.parent;
    const testID = iconWrapper.find(child =>
      child.props?.testID?.startsWith('habit-icon-')
    )?.props?.testID;
  
    const habitId = testID?.replace('habit-icon-', '');
  
    expect(habitId).toBeTruthy();
  
    // 🗑️ Press the delete button
    const deleteBtn = utils.getByTestId(`delete-habit-${habitId}`);
    fireEvent.press(deleteBtn);
  
    // ✅ Confirm it's deleted (Alert mock already presses 'Delete')
    await waitFor(() => {
      expect(utils.queryByText(habitName)).toBeNull();
    });
  });  
});
