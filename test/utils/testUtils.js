import { fireEvent, waitFor } from '@testing-library/react-native';

/**
 * Adds a habit via the input and + button.
 */
export const addHabit = async ({ getByPlaceholderText, getByTestId }, habitName) => {
  const input = getByPlaceholderText('Add or edit a habit');
  fireEvent.changeText(input, habitName);

  const addButton = getByTestId('add-habit-button');
  fireEvent.press(addButton);

  // wait for it to be added
  await waitFor(() => getByPlaceholderText('Add or edit a habit'));
};

/**
 * Toggles a habit by name.
 */
export const toggleHabit = (getByText, habitName) => {
  const habitItem = getByText(habitName);
  fireEvent.press(habitItem);
};

/**
 * Retrieves habit icon testID wrapper.
 */
export const getHabitIconById = (getByTestId, id) => {
  const iconWrapper = getByTestId(`habit-icon-${id}`);
  return iconWrapper.props.children;
};
