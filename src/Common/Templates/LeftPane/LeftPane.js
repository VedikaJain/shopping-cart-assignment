import React from 'react';
import './LeftPane.scss';
import Hr from '../../Widgets/HorizontalRow/Hr';

function LeftPane({items, selectItem}) {
  const [selectedItem, setSelectedItem] = React.useState('');

  React.useEffect(() => {
    selectItem(selectedItem);
  }, [selectedItem, selectItem]);

  return (
    <nav className="LeftPane" aria-label='Categories'>
      {(items.length > 0)
        ? items.map((item, i) =>
          <div key={i}
            className={(selectedItem === item.id) ? 'selectedItem' : ''}
            onClick={
              () => (selectedItem === item.id)
                ? setSelectedItem('')
                : setSelectedItem(item.id)
            }>
            <p className={(selectedItem === item.id) ? 'selectedText' : ''}>
              {item.name}
            </p>
            <Hr type='greySolid' />
          </div>
        )
        : <span className='noCategoriesFound'>
          Sorry, there are no available categories at the moment!
            </span>
      }
    </nav>
  );
}

export default LeftPane;
