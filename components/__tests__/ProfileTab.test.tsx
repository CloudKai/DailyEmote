import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProfileTab } from '../ProfileTab'; 
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

// Mock the necessary modules
jest.mock('../../FireBaseConfig', () => ({
  FIREBASE_AUTH: {
    currentUser: {
      photoURL: 'https://example.com/photo.jpg',
    },
  },
}));

jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
}));

describe('ProfileTab', () => {
  beforeEach(() => {
    const navigationMock = {
      dispatch: jest.fn(),
    };
    (useNavigation as jest.Mock).mockReturnValue(navigationMock);
  });

  it('renders correctly with the given name', () => {
    const { getByText, getByTestId } = render(
      <ProfileTab name="Test User" />
    );

    expect(getByText('Test User')).toBeTruthy();
    expect(getByTestId('profile-picture')).toBeTruthy();
  });

  it('calls onToggleDrawer when the profile picture is pressed', () => {
    const { getByTestId } = render(
      <ProfileTab name="Test User" />
    );

    fireEvent.press(getByTestId('profile-picture'));
    expect(useNavigation().dispatch).toHaveBeenCalledWith(DrawerActions.openDrawer());
  });
});
