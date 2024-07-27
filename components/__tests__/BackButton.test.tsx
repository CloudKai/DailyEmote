import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BackButton } from '../BackButton'; 
import { useRouter } from 'expo-router';

// Mock the expo-router useRouter hook
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('BackButton', () => {
  it('renders correctly with the given name', () => {
    const { getByText } = render(<BackButton name="Test Name" />);
    expect(getByText('Test Name')).toBeTruthy();
  });

  it('calls router.back when the button is pressed', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

    const { getByTestId } = render(<BackButton name="Test Name" />);
    const button = getByTestId('back-button'); 

    fireEvent.press(button);
    expect(mockBack).toHaveBeenCalled();
  });

  it('renders the back icon correctly', () => {
    const { getByTestId } = render(<BackButton name="Test Name" />);
    const icon = getByTestId('back-icon'); 

    expect(icon).toBeTruthy();
  });
});
