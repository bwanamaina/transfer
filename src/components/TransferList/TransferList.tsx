import { useState } from 'react';

import List from '../List/List';
import Action from '../Action/Action';

type Item = number;

function TransferList() {
  const [rightItems, setRightItems] = useState<Item[]>([]);
  const [checkedItems, setCheckedItems] = useState<Item[]>([]);
  const [leftItems, setLeftItems] = useState<Item[]>([1, 2, 3, 4]);

  const leftCheckedItems = intersection(leftItems, checkedItems);
  const rightCheckedItems = intersection(rightItems, checkedItems);

  const leftButtonDisabled = leftCheckedItems.length === 0;
  const rightButtonDisabled = rightCheckedItems.length === 0;

  function onItemCheck(item: Item) {
    const currentIndex = checkedItems.indexOf(item);
    const newChecked = [...checkedItems];
    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedItems(newChecked);
  }

  function onTransferLeft() {
    setLeftItems([...leftItems, ...rightCheckedItems]);
    setRightItems(intersection(rightItems, rightCheckedItems, false));
    setCheckedItems(intersection(checkedItems, rightCheckedItems, false));
  }

  function onTransferRight() {
    setRightItems([...rightItems, ...leftCheckedItems]);
    setLeftItems(intersection(leftItems, leftCheckedItems, false));
    setCheckedItems(intersection(checkedItems, leftCheckedItems, false));
  }

  function intersection(arrayA: Item[], arrayB: Item[], exists = true) {
    if (!exists) {
      return arrayA.filter((value) => !arrayB.includes(value));
    }
    return arrayA.filter((value) => arrayB.includes(value));
  }

  return (
    <section className='wrapper'>
      <List items={leftItems} onItemCheck={onItemCheck} testId="source-list" />
      <Action
        onTransferLeft={onTransferLeft}
        onTransferRight={onTransferRight}
        leftButtonDisabled={leftButtonDisabled}
        rightButtonDisabled={rightButtonDisabled}
      />
      <List items={rightItems} onItemCheck={onItemCheck} testId="destination-list" />
    </section>
  );
}

export default TransferList;
