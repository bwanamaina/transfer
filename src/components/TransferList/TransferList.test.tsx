import { render, screen, within, fireEvent } from '@testing-library/react';

import TransferList from './TransferList';

describe('TransferList', function () {
  const { getByText, getByTestId } = screen;

  beforeEach(function () {
    render(<TransferList />);
  });

  it('renders two lists and a button', function () {
    const sourceList = getByTestId('source-list');
    const leftButton = getByTestId('left-button');
    const rightButton = getByTestId('right-button');
    const destinationList = getByTestId('destination-list');

    expect(sourceList).toBeInTheDocument();
    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(destinationList).toBeInTheDocument();
  });

  it('transfers items from source list to destination list when button is clicked', function () {
    const leftButton = getByTestId('left-button');
    const sourceList = getByTestId('source-list');
    const rightButton = getByTestId('right-button');
    const destinationList = getByTestId('destination-list');

    const sourceItems = [1, 2];
    const destinationItems = [3, 4];

    sourceItems.forEach(function (item) {
      const listItem = getByText(item);
      fireEvent.click(listItem);
    });

    fireEvent.click(leftButton);

    sourceItems.forEach(function (item) {
      const listItem = within(sourceList).queryByText(item);
      expect(listItem).not.toBeInTheDocument();
    });

    destinationItems.forEach(function (item) {
      const listItem = getByText(item);
      fireEvent.click(listItem);
    });

    fireEvent.click(rightButton);

    destinationItems.forEach(function (item) {
      const listItem = within(destinationList).queryByText(item);
      expect(listItem).not.toBeInTheDocument();
    });

    sourceItems.concat(destinationItems).forEach(function (item) {
      const listItem = getByText(item);
      expect(listItem).toBeInTheDocument();
    });
  });
});
