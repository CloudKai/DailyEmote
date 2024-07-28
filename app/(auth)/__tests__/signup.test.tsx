import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignupPage from '../signup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    createUserWithEmailAndPassword: jest.fn(),
    updateProfile: jest.fn(),
  };
});

jest.mock('firebase/firestore', () => {
  const originalModule = jest.requireActual('firebase/firestore');
  return {
    ...originalModule,
    setDoc: jest.fn(),
    doc: jest.fn((_, path) => ({
      id: path,
    })),
  };
});

describe('SignupPage', () => {
  let mockUseRouter: any;

  beforeEach(() => {
    mockUseRouter = {
      navigate: jest.fn(),
      replace: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignupPage />);
    expect(getByPlaceholderText('Enter Username')).toBeTruthy();
    expect(getByPlaceholderText('Enter Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter Password')).toBeTruthy();
    expect(getByText('Read our')).toBeTruthy();
    expect(getByText('Terms and Conditions')).toBeTruthy();
  });

  it('shows an activity indicator when loading', async () => {
    const { getByTestId, getByPlaceholderText, getByText, getByRole } = render(<SignupPage />);
    const emailInput = getByPlaceholderText('Enter Email');
    const passwordInput = getByPlaceholderText('Enter Password');
    const usernameInput = getByPlaceholderText('Enter Username');
    const checkbox = getByRole('checkbox');
    const signUpButton = getByText('Sign Up');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent(checkbox, 'onValueChange', true);
    fireEvent.press(signUpButton);

    expect(getByTestId('loadingIndicator')).toBeTruthy();
  });

  it('handles signup correctly', async () => {
    const mockCreateUser = createUserWithEmailAndPassword as jest.Mock;
    mockCreateUser.mockResolvedValue({
      user: { uid: '123', email: 'test@example.com' },
    });

    const { getByPlaceholderText, getByText, getByRole } = render(<SignupPage />);
    const usernameInput = getByPlaceholderText('Enter Username');
    const emailInput = getByPlaceholderText('Enter Email');
    const passwordInput = getByPlaceholderText('Enter Password');
    const checkbox = getByRole('checkbox');
    const signUpButton = getByText('Sign Up');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent(checkbox, 'onValueChange', true);
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith(
        expect.any(Object), // auth instance
        'test@example.com',
        'password'
      );
      expect(updateProfile).toHaveBeenCalled();
      expect(setDoc).toHaveBeenCalled();
      expect(mockUseRouter.replace).toHaveBeenCalledWith('/signin');
    });
  });

  it('navigates to terms and conditions page on link press', () => {
    const { getByText } = render(<SignupPage />);
    const tncLink = getByText('Terms and Conditions');

    fireEvent.press(tncLink);

    expect(mockUseRouter.navigate).toHaveBeenCalledWith('/tnc');
  });
});
