// test/setup.js
import { Alert } from 'react-native';

// ✅ MOCK: WeeklyProgress to prevent visual rendering issues during tests
jest.mock('../components/WeeklyProgress', () => 'WeeklyProgress');

// ✅ MOCK: Font loading
jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

// ✅ MOCK: App loading
jest.mock('expo-app-loading', () => 'AppLoading');

// ✅ MOCK: AsyncStorage (in-memory simulation)
jest.mock('@react-native-async-storage/async-storage', () => {
  let storage = {};
  return {
    getItem: jest.fn((key) => Promise.resolve(storage[key] || null)),
    setItem: jest.fn((key, value) => {
      storage[key] = value;
      return Promise.resolve();
    }),
    removeItem: jest.fn((key) => {
      delete storage[key];
      return Promise.resolve();
    }),
    clear: jest.fn(() => {
      storage = {};
      return Promise.resolve();
    }),
  };
});

// ✅ MOCK: Static assets & fonts
jest.mock('expo-asset');
jest.mock('@expo-google-fonts/shadows-into-light', () => ({
  ShadowsIntoLight_400Regular: 'ShadowsIntoLight_400Regular',
}));

// ✅ GLOBAL: Fake timers for time-based features (e.g. setTimeout, animations)
jest.useFakeTimers();

// ✅ MOCK: Ionicons (from @expo/vector-icons)
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, color, size }) => (
      <Text>{`[Icon name=${name} color=${color} size=${size}]`}</Text>
    ),
  };
});

jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
  const deleteBtn = buttons.find(btn => btn.text === 'Delete');
  if (deleteBtn && deleteBtn.onPress) deleteBtn.onPress();
});

// ✅ GLOBAL: Suppress act(...) warning noise
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning: An update to') &&
    args[0].includes('was not wrapped in act(...)')
  ) {
    return;
  }
  originalWarn(...args);
};

const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('not wrapped in act')
  ) return;
  originalConsoleError(...args);
};

