import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Home from '../home';
import { readDateEntry } from '../../../../utils/FireBaseHandler';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useFocusEffect: jest.fn(),
}));

jest.mock('../../../../components/ProfileTab', () => 'ProfileTab');
jest.mock('../../../../components/home/calendar/CalendarComponent', () => 'CalendarComponent');
jest.mock('../../../../components/home/cardlist/CardListComponent', () => 'CardListComponent');
jest.mock('../../../../utils/FireBaseHandler', () => ({
  getUser: jest.fn().mockReturnValue('test-user-id'),
  readDateEntry: jest.fn(),
}));

describe('Home Screen', () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const { getByText, getByTestId } = render(<Home />);
    expect(getByTestId('CalendarComponent')).toBeTruthy();
    expect(getByText('Select a date to view entries')).toBeTruthy();
  });

  it('loads entries on date selection', async () => {
    const mockEntries = [
      { id: '1', title: 'Test Entry 1' },
      { id: '2', title: 'Test Entry 2' },
    ];
    (readDateEntry as jest.Mock).mockResolvedValue(mockEntries);

    const { getByText, getByTestId } = render(<Home />);

    await act(async () => {
      fireEvent(getByTestId('CalendarComponent'), 'onDayPress', { dateString: '2023-07-20' });
    });

    await waitFor(() => expect(getByText('Test Entry 1')).toBeTruthy());

    expect(getByText('Test Entry 1')).toBeTruthy();
    expect(getByText('Test Entry 2')).toBeTruthy();
  });

  it('navigates to view entry on entry click', async () => {
    const mockEntries = [
      { id: '1', title: 'Test Entry 1' },
      { id: '2', title: 'Test Entry 2' },
    ];
    (readDateEntry as jest.Mock).mockResolvedValue(mockEntries);

    const { getByText, getByTestId } = render(<Home />);

    await act(async () => {
      fireEvent(getByTestId('CalendarComponent'), 'onDayPress', { dateString: '2023-07-20' });
    });

    await waitFor(() => expect(getByText('Test Entry 1')).toBeTruthy());

    await act(async () => {
      fireEvent.press(getByText('Test Entry 1'));
    });

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '../../(others)/viewEntryFull',
      params: { id: '1' },
    });
  });
});
