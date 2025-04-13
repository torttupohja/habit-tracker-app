// test/utils/testUtils.js
import { fireEvent, waitFor } from '@testing-library/react-native';

/**
 * Adds a habit via the input field and + button.
 * @param {RenderAPI} utils - Rendered screen utilities.
 * @param {string} habitText - Name of the habit to add.
 */
export const addHabit = async (utils, habitText) => {
  const input = utils.getByPlaceholderText('Add or edit a habit');
  fireEvent.changeText(input, habitText);

  const addButton = utils.getByTestId('add-habit-button');
  fireEvent.press(addButton);

  await waitFor(() => utils.getByText(habitText));
};

/**
 * Toggles the completion status of a habit by its text.
 * @param {RenderAPI} utils - Rendered screen utilities.
 * @param {string} habitText - Habit name to toggle.
 */
export const toggleHabit = (utils, habitText) => {
  const habitItem = utils.getByText(habitText);
  fireEvent.press(habitItem);
};

/**
 * Clicks the delete icon associated with a habit.
 * @param {RenderAPI} utils - Rendered screen utilities.
 * @param {string} habitText - Name of the habit to delete.
 */
export const deleteHabit = async (utils, habitText) => {
  const habitItem = utils.getByText(habitText);
  const trashIcons = utils.getAllByText((content) =>
    typeof content === 'string' && content.includes('trash-sharp')
  );

  // Click the trash icon next to the matching habit (assumes consistent order)
  fireEvent.press(trashIcons.find(icon => icon.parent.parent.props.children.includes(habitText)));
};

/**
 * Gets the icon element by habit ID (for status assertions).
 * @param {RenderAPI} utils - Rendered screen utilities.
 * @param {string} id - Habit ID used in testID.
 * @returns {JSX.Element}
 */
export const getHabitIconById = (utils, id) => {
  const wrapper = utils.getByTestId(`habit-icon-${id}`);
  return wrapper.props.children;
};
