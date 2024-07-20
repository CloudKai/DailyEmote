import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import { mockFirebase } from 'firestore-jest-mock';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    getAuth: () => ({
      currentUser: {
        uid: 'test-uid',
        email: 'test@example.com',
        photoURL: 'http://test.com/photo.jpg',
        displayName: 'Test User',
        updateProfile: jest.fn().mockResolvedValue(undefined),
        signOut: jest.fn().mockResolvedValue(undefined),
      },
      signInWithEmailAndPassword: jest.fn(),
      createUserWithEmailAndPassword: jest.fn(),
      sendEmailVerification: jest.fn(),
    }),
  };
});

jest.mock('firebase/firestore', () => {
  const originalModule = jest.requireActual('firebase/firestore');
  return {
    ...originalModule,
    doc: jest.fn((_, path) => ({
      id: path,
    })),
    getDoc: jest.fn(async (doc) => {
      return {
        exists: () => true,
        data: () => ({
          avatar: 'http://test.com/photo.jpg',
          username: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        }),
        get: (field) => {
          const data = {
            avatar: 'http://test.com/photo.jpg',
            username: 'Test User',
            email: 'test@example.com',
            password: 'password123',
          };
          return data[field];
        },
      };
    }),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
  };
});

jest.mock('./FireBaseConfig', () => ({
  FIREBASE_AUTH: {
    onAuthStateChanged: jest.fn(),
  },
  FIREBASE_DB: {},
}));

// Set up firestore-jest-mock
mockFirebase({
  database: {
    users: [
      {
        id: 'test-uid',
        avatar: 'http://test.com/photo.jpg',
        username: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      },
    ],
  },
});
