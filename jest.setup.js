import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@firebase/auth', () => ({
  ...jest.requireActual('@firebase/auth'),
  getReactNativePersistence: () => console.debug('Initialized persistence ...'),
}));

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

global.performance = require('perf_hooks').performance;
