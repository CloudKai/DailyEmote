import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Profile from '../profile';
import { getDoc, updateDoc, doc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

describe('Profile Screen', () => {
  const auth = getAuth();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(<Profile />);

    // Wait for useEffect to finish
    await waitFor(() => getByText('Edit Profile'));

    expect(getByText('Edit Profile')).toBeTruthy();
    expect(getByPlaceholderText('Enter Image URL')).toBeTruthy();
    expect(getByDisplayValue('Test User')).toBeTruthy();
    expect(getByDisplayValue('test@example.com')).toBeTruthy();
  });

  it('updates profile information', async () => {
    const { getByText, getByDisplayValue, getByPlaceholderText } = render(<Profile />);

    // Wait for useEffect to finish
    await waitFor(() => getByText('Edit Profile'));

    const updateButton = getByText('Update Info');
    const nameInput = getByDisplayValue('Test User');
    const emailInput = getByDisplayValue('test@example.com');
    const passwordInput = getByPlaceholderText('Password');
    const imageUrlInput = getByPlaceholderText('Enter Image URL');

    fireEvent.changeText(nameInput, 'Updated User');
    fireEvent.changeText(emailInput, 'updated@example.com');
    fireEvent.changeText(passwordInput, 'newpassword123');
    fireEvent.changeText(imageUrlInput, 'http://test.com/updated_photo.jpg');

    await act(async () => {
      fireEvent.press(updateButton);
    });

    const currentUser = FIREBASE_AUTH.currentUser as unknown as MockedUser;

    if (currentUser) {
      expect(currentUser.updateProfile).toHaveBeenCalledWith({
        displayName: 'Updated User',
        photoURL: 'http://test.com/updated_photo.jpg',
      });
    } else {
      throw new Error('No current user');
    }

    expect(mockUpdateDoc).toHaveBeenCalledWith(expect.anything(), {
      username: 'Updated User',
      email: 'updated@example.com',
      password: 'newpassword123',
      userID: 'test-uid',
      avatar: 'http://test.com/updated_photo.jpg',
    });

    expect(currentUser.signOut).toHaveBeenCalled();
  });

  it('toggles password visibility', async () => {
    const { getByText, getByDisplayValue, getByPlaceholderText, getByTestId } = render(<Profile />);

    // Wait for useEffect to finish
    await waitFor(() => getByText('Edit Profile'));

    const passwordInput = getByPlaceholderText('Password');
    const toggleVisibilityButton = getByTestId('toggle-password-visibility');

    expect(passwordInput.props.secureTextEntry).toBeTruthy();

    fireEvent.press(toggleVisibilityButton);
    expect(passwordInput.props.secureTextEntry).toBeFalsy();

    fireEvent.press(toggleVisibilityButton);
    expect(passwordInput.props.secureTextEntry).toBeTruthy();
  });
});
