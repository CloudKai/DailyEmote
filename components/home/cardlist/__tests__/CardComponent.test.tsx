import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardComponent from '../CardComponent'; // adjust the import path as necessary
import { entryData } from '../../../../utils/FireBaseHandler';

// Mock data
const mockItem: entryData = {
  userid: 'user1',
  id: 'entry1',
  title: 'Test Entry',
  isHappy: true,
  year: 2023,
  month: 7,
  day: 27,
  textEntry: 'This is a test entry text.',
};

// Mock function
const mockGotoViewEntry = jest.fn();

describe('CardComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    const { getByText, getByTestId } = render(
      <CardComponent item={mockItem} gotoViewEntry={mockGotoViewEntry} />
    );

    // Check if the title and text entry are rendered
    expect(getByTestId('card-title-entry1').props.children).toBe('Test Entry');
    expect(getByTestId('card-text-entry1').props.children).toBe('This is a test entry text.');
  });

  it('triggers gotoViewEntry function when pressed', () => {
    const { getByTestId } = render(
      <CardComponent item={mockItem} gotoViewEntry={mockGotoViewEntry} />
    );

    // Fire press event
    fireEvent.press(getByTestId('card-entry1'));

    // Check if the function is called with the correct id
    expect(mockGotoViewEntry).toHaveBeenCalledWith('entry1');
  });
});
