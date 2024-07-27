import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DateInput from '../DateInput'; 
import { formatDate } from '../../../utils/FireBaseHandler';
import RNDateTimePicker from "@react-native-community/datetimepicker";

// Mock the necessary modules
jest.mock('../../../utils/FireBaseHandler', () => ({
  formatDate: (date: Date) => {
    const year = date.getFullYear().toString();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    return year + '-' + month + '-' + day;
  },
}));

describe('DateInput', () => {
  const setTextMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with the initial date', () => {
    const { getByText, getByTestId } = render(
      <DateInput text="2022-01-01" setText={setTextMock} />
    );
    
    expect(getByText('Date:')).toBeTruthy();
    const textInput = getByTestId('date-text-input');
    expect(textInput.props.value).toBe('2022-01-01'); // The formatted date
  });

  it('opens the date picker when pressed', () => {
    const { getByTestId } = render(<DateInput text="2022-01-01" setText={setTextMock} />);
    
    const pressable = getByTestId('date-pressable');
    fireEvent.press(pressable);
    
    expect(getByTestId('date-picker')).toBeTruthy();
  });

  it('updates the date and calls setText on date change', async () => {
    const { getByTestId, queryByTestId } = render(<DateInput text="2022-01-01" setText={setTextMock} />);
    
    const pressable = getByTestId('date-pressable');
    fireEvent.press(pressable);

    const datePicker = getByTestId('date-picker');
    fireEvent(datePicker, 'onChange', {
      nativeEvent: {
        timestamp: new Date('2022-02-01').getTime()
      }
    });    
    await waitFor(() => {
      expect(setTextMock).toHaveBeenCalledWith('2022-02-01'); // The formatted date
    });

    // Confirm the date picker is closed
    expect(queryByTestId('date-picker')).toBeNull();
  });
});
