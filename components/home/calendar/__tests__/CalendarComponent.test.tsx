import React from 'react';
import { render } from '@testing-library/react-native';
import CalendarComponent, { CalendarComponentProps } from '../CalendarComponent'; 

jest.mock('react-native-calendars', () => {
  const React = require('react');
  const MockCalendar = (props: any) => <div {...props} />;
  return { Calendar: MockCalendar };
});

describe('CalendarComponent', () => {
  const setSelectedDateMock = jest.fn();
  const loadEntriesMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with the initial selected date', () => {
    const { getByTestId } = render(
      <CalendarComponent
        selectedDate="2022-01-01"
        setSelectedDate={setSelectedDateMock}
        loadEntries={loadEntriesMock}
        testID="calendar-component"
      />
    );

    expect(getByTestId('calendar-component')).toBeTruthy(); // Ensuring the component is rendered
  });
});
