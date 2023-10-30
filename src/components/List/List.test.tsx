import { fireEvent, render, screen } from '@testing-library/react';

import List from './List';

describe('List', function () {
  const props = {
    testId: 'list',
    items: [1, 2, 3, 4, 5],
    onItemCheck: jest.fn(),
  };
  const { queryByText, getByText } = screen;

  beforeEach(function () {
    render(<List {...props} />);
  });

  it('renders all list items', function () {
    props.items.forEach(function (item) {
      expect(queryByText(item)).toBeInTheDocument();
    });
  });

  it('calls onItemCheck prop when item is clicked', function () {
    props.items.forEach(function (item) {
      fireEvent.click(getByText(item));

      expect(props.onItemCheck).toHaveBeenCalledWith(item, expect.anything());
    });
  });
});
