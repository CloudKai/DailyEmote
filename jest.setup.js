import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import { jest } from '@jest/globals';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
    push: jest.fn(),
  }),
  useFocusEffect: jest.fn((cb) => cb()),
}));

// Mock react-navigation/native
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  DrawerActions: {
    openDrawer: jest.fn(),
  },
}));

// Mock firebase/auth
jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    getAuth: jest.fn().mockReturnValue({
      currentUser: {
        uid: 'test-uid',
        email: 'test@example.com',
        photoURL: 'http://test.com/photo.jpg',
        displayName: 'Test User',
        updateProfile: jest.fn().mockResolvedValue(undefined),  
        signOut: jest.fn().mockResolvedValue(undefined),
        getIdToken: jest.fn().mockResolvedValue('fake-id-token'),
      },
      signInWithEmailAndPassword: jest.fn(),
      createUserWithEmailAndPassword: jest.fn(),
      sendEmailVerification: jest.fn(),
      reauthenticateWithCredential: jest.fn().mockResolvedValue(undefined),
      updateEmail: jest.fn().mockResolvedValue(undefined),
      updatePassword: jest.fn().mockResolvedValue(undefined),
      connectAuthEmulator: jest.fn(), 
    }),
    connectAuthEmulator: jest.fn(), 
  };
});

// Mock firebase/firestore
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
    connectFirestoreEmulator: jest.fn(), // Mock connectFirestoreEmulator if needed
  };
});

// Mock FireBaseConfig
jest.mock('./FireBaseConfig', () => ({
  FIREBASE_AUTH: {
    onAuthStateChanged: jest.fn(),
    currentUser: {
      uid: 'test-uid',
      email: 'test@example.com',
      photoURL: 'http://test.com/photo.jpg',
      displayName: 'Test User',
      updateProfile: jest.fn().mockResolvedValue(undefined), 
      signOut: jest.fn().mockResolvedValue(undefined),
      getIdToken: jest.fn().mockResolvedValue('fake-id-token'),
    },
    connectAuthEmulator: jest.fn(), // Ensure this is mocked
  },
  FIREBASE_DB: {},
}));

// Mock ProfileTab
jest.mock('./components/ProfileTab', () => {
  const { View, Text, TouchableOpacity, Image } = jest.requireActual('react-native');
  return ({ name }) => (
    <View>
      <Text>{name}</Text>
      <TouchableOpacity>
        <Image source={{ uri: 'http://test.com/photo.jpg' }} />
      </TouchableOpacity>
    </View>
  );
});

// Mock CalendarComponent
jest.mock('./components/home/calendar/CalendarComponent', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID={props.testID} />;
});

// Mock CardListComponent
jest.mock('./components/home/cardlist/CardListComponent', () => {
  const { View } = jest.requireActual('react-native');
  return (props) => <View testID={props.testID} />;
});

// Mock FireBaseHandler
jest.mock('./utils/FireBaseHandler', () => ({
  getUser: jest.fn().mockReturnValue('test-user-id'),
  readDateEntry: jest.fn(),
}));