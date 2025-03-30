// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

// Mock expo-font if not done already
jest.mock('expo-font', () => ({
  useFonts: () => [true],
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));
