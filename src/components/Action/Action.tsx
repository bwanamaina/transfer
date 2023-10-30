interface IProps {
  onTransferLeft: () => void;
  onTransferRight: () => void;
  leftButtonDisabled: boolean;
  rightButtonDisabled: boolean;
}

function Action({
  onTransferLeft,
  onTransferRight,
  leftButtonDisabled,
  rightButtonDisabled,
}: IProps) {
  return (
    <div className='button-wrapper'>
      <button
        onClick={onTransferRight}
        data-testid='left-button'
        disabled={leftButtonDisabled}
      >
        &gt;
      </button>
      <button
        onClick={onTransferLeft}
        data-testid='right-button'
        disabled={rightButtonDisabled}
      >
        &lt;
      </button>
    </div>
  );
}

export default Action;
