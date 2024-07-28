import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TitleInput from '../TitleInput'; 

describe('TitleInput', () => {
  const setTextMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with the initial text', () => {
    const { getByText, getByPlaceholderText } = render(
      <TitleInput text="Initial title" setText={setTextMock} />
    );

    expect(getByText('Title:')).toBeTruthy();
    const textInput = getByPlaceholderText('Title');
    expect(textInput.props.value).toBe('Initial title');
  });

  it('calls setText when the text input value changes', () => {
    const { getByPlaceholderText } = render(
      <TitleInput text="" setText={setTextMock} />
    );

    const textInput = getByPlaceholderText('Title');
    fireEvent.changeText(textInput, 'New title');

    expect(setTextMock).toHaveBeenCalledWith('New title');
  });
});
