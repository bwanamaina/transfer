interface IProps {
  testId: string;
  items: number[];
  onItemCheck: (item: number) => void;
}

function List({ testId, items, onItemCheck }: IProps) {
  return (
    <ul data-testid={testId} className='list'>
      {items.map(function (item) {
        const id = `item-${item}`;
        return (
          <li key={item} onClick={onItemCheck.bind(null, item)}>
            <label htmlFor={id} >
              <input id={id} type='checkbox' />
              {item}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export default List;
