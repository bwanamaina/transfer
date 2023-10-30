import { screen, render, fireEvent } from '@testing-library/react';

import Action from './Action';

describe('Action component', function () {
  const props = {
    onTransferLeft: jest.fn(),
    leftButtonDisabled: false,
    onTransferRight: jest.fn(),
    rightButtonDisabled: false,
  };
  const { getByTestId } = screen;

  it('renders the component with left button disabled', function () {
    const newProps = {
      ...props,
      leftButtonDisabled: true,
    };

    render(<Action {...newProps} />);

    const leftButton = getByTestId('left-button');
    const rightButton = getByTestId('right-button');

    expect(leftButton).toBeDisabled();
    expect(rightButton).toBeEnabled();
  });

  it('renders the component with right button disabled', function () {
    const newProps = {
      ...props,
      rightButtonDisabled: true,
    };

    render(<Action {...newProps} />);

    const leftButton = getByTestId('left-button');
    const rightButton = getByTestId('right-button');

    expect(leftButton).toBeEnabled();
    expect(rightButton).toBeDisabled();
  });

  it('calls onTransferRight when left button is clicked', function () {
    render(<Action {...props} />);

    const leftButton = getByTestId('left-button');

    fireEvent.click(leftButton);

    expect(props.onTransferRight).toHaveBeenCalled();
  });

  it('calls onTransferLeft when right button is clicked', function () {
    render(<Action {...props} />);

    const rightButton = getByTestId('right-button');

    fireEvent.click(rightButton);

    expect(props.onTransferLeft).toHaveBeenCalled();
  });
});
