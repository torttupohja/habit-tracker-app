import { fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';

/**
 * Adds a habit via the input and + button.
 */
export const addHabit = async (utils, habitText) => {
  const input = utils.getByPlaceholderText('Add or edit a habit');
  fireEvent.changeText(input, habitText);

  const addButton = utils.getByTestId('add-habit-button');
  fireEvent.press(addButton);

  await waitFor(() => utils.getByText(habitText));

  // extract icon testID dynamically
  const allIcons = utils.queryAllByTestId(/^habit-icon-/);
  const matchingIcon = allIcons.find(icon => {
    const parent = icon.parent?.parent?.parent;
    return parent?.findByText && parent.findByText(habitText);
  });

  return { habitText };
};

/**
 * Toggles a habit by name.
 */
export const toggleHabit = (utils, habitName) => {
  const habitItem = utils.getByText(habitName);
  fireEvent.press(habitItem);
};

/**
 * Retrieves habit icon testID wrapper.
 */
export const getHabitIconById = (getByTestId, id) => {
  const iconWrapper = getByTestId(`habit-icon-${id}`);
  return iconWrapper.props.children;
};
