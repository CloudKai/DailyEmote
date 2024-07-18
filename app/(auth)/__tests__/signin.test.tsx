import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInPage from '../signin';
import { FIREBASE_AUTH } from '../../../FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

describe('SignInPage', () => {
  beforeEach(() => {
    (FIREBASE_AUTH.onAuthStateChanged as jest.Mock).mockImplementation((callback) => callback(null));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId, getByPlaceholderText } = render(<SignInPage />);
    expect(getByTestId('logo')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('shows an activity indicator when loading', async () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<SignInPage />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByTestId('loginButton');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(loginButton);

    expect(getByTestId('loadingIndicator')).toBeTruthy();
  });

  it('calls signInWithEmailAndPassword on login', async () => {
    const mockSignInWithEmailAndPassword = signInWithEmailAndPassword as jest.Mock;
    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@example.com' },
    });

    const { getByTestId, getByPlaceholderText } = render(<SignInPage />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByTestId('loginButton');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
        FIREBASE_AUTH,
        'test@example.com',
        'password'
      );
    });
  });

  it('navigates to signup page on sign up link press', () => {
    const { getByTestId } = render(<SignInPage />);
    const signUpButton = getByTestId('signUpButton');

    fireEvent.press(signUpButton);

    expect(useRouter().navigate).toHaveBeenCalledWith('/signup');
  });
});
