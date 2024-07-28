import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomDrawerContent from '../CustomDrawerContent'; // Adjust the import based on your file structure
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock the necessary modules
jest.mock('../../FireBaseConfig', () => ({
  FIREBASE_AUTH: {
    currentUser: {
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      signOut: jest.fn(),
    },
  },
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

jest.mock('@react-navigation/drawer', () => ({
  DrawerContentScrollView: ({ children }: any) => <>{children}</>,
  DrawerItem: ({ label, onPress, icon, labelStyle, testID }: any) => (
    <div onClick={onPress} style={labelStyle} data-testid={testID}>
      {label}
      {icon && icon({ focused: false, color: 'black', size: 20 })}
    </div>
  ),
  DrawerItemList: (props: any) => <div {...props} />,
}));

describe('CustomDrawerContent', () => {
  beforeAll(() => {
    (useSafeAreaInsets as jest.Mock).mockReturnValue({ top: 10, bottom: 10 });
  });

  it('renders correctly with user information', () => {
    const { getByText, getByTestId } = render(<CustomDrawerContent />);

    expect(getByText('Test User')).toBeTruthy();
    expect(getByTestId('user-avatar')).toBeTruthy();
  });
});
