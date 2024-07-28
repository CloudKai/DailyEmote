import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HeaderComponent from '../HeaderComponent'; // Adjust the import based on your file structure
import { colors } from '../../styleSheets/Styles';

// Mock the colors if needed
jest.mock('../../styleSheets/Styles', () => ({
  colors: {
    gray: 'gray',
  },
}));

describe('HeaderComponent', () => {
  it('renders correctly with the given title', () => {
    const { getByText } = render(
      <HeaderComponent title="Test Title" goBack={() => {}} />
    );

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('calls goBack when the back button is pressed', () => {
    const mockGoBack = jest.fn();
    const { getByTestId } = render(
      <HeaderComponent title="Test Title" goBack={mockGoBack} />
    );

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });
});
