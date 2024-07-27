import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DescriptionInput from '../DescriptionInput'; 

describe('DescriptionInput', () => {
  const setTextMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with the initial text', () => {
    const { getByText, getByPlaceholderText } = render(
      <DescriptionInput text="Initial text" setText={setTextMock} />
    );

    expect(getByText('Description:')).toBeTruthy();
    const textInput = getByPlaceholderText('Enter how you are feeling here');
    expect(textInput.props.value).toBe('Initial text');
  });

  it('calls setText when the text input value changes', () => {
    const { getByPlaceholderText } = render(
      <DescriptionInput text="" setText={setTextMock} />
    );

    const textInput = getByPlaceholderText('Enter how you are feeling here');
    fireEvent.changeText(textInput, 'New description text');

    expect(setTextMock).toHaveBeenCalledWith('New description text');
  });
});
