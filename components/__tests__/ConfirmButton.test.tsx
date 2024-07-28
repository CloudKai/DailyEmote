import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ConfirmButton from '../ConfirmButton'; // Adjust the import based on your file structure
import { Text, Pressable } from 'react-native';

// Mock the styles and colors
jest.mock('../../styleSheets/Styles', () => ({
  colors: {
    button: 'skyblue',
  },
  styles: {
    whiteText: {
      color: '#fff',
    },
  },
}));

describe('ConfirmButton', () => {
  it('renders correctly with the given title', () => {
    const { getByText } = render(
      <ConfirmButton handlePress={() => {}} title="Confirm" />
    );

    const buttonText = getByText('Confirm');
    expect(buttonText).toBeTruthy();
  });

  it('calls handlePress when the button is pressed', () => {
    const mockHandlePress = jest.fn();
    const { getByText } = render(
      <ConfirmButton handlePress={mockHandlePress} title="Confirm" />
    );

    const button = getByText('Confirm');
    fireEvent.press(button);

    expect(mockHandlePress).toHaveBeenCalled();
  });

  it('applies the correct styles', () => {
    const { getByText, getByTestId } = render(
      <ConfirmButton handlePress={() => {}} title="Confirm" />
    );

    const buttonText = getByText('Confirm');
    const button = getByTestId('confirm-button');

    expect(button.props.style).toEqual(
      expect.objectContaining({
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        alignContent: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: 'skyblue',
      })
    );

    expect(buttonText.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: '#fff',
        }),
        expect.objectContaining({
          alignSelf: 'center',
        }),
      ])
    );
  });
});
