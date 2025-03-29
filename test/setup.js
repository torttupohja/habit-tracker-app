// test/setup.js

// ✅ MOCK: WeeklyProgress to prevent visual rendering issues during tests
jest.mock('../components/WeeklyProgress', () => 'WeeklyProgress');

// ✅ MOCK: Font loading
jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

// ✅ MOCK: App loading (optional but common)
jest.mock('expo-app-loading', () => 'AppLoading');

// ✅ MOCK: Silence common react-native animation warnings
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// ✅ MOCK: AsyncStorage with in-memory implementation
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

// ✅ MOCK: expo-asset and fonts
jest.mock('expo-asset');
jest.mock('@expo-google-fonts/shadows-into-light', () => ({
  ShadowsIntoLight_400Regular: 'ShadowsIntoLight_400Regular',
}));

// ✅ Optional: Use fake timers if using setTimeout, animations, or similar
beforeAll(() => {
  jest.useFakeTimers();
});

// ✅ Optional: Suppress specific warnings during tests
const originalWarn = console.warn;
beforeAll(() => {
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
});
