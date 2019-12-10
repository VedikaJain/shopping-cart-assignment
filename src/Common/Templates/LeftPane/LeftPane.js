import React from 'react';
import './LeftPane.scss';
import Hr from '../../Widgets/HorizontalRow/Hr';

function LeftPane({ items, selectItem }) {
  const [selectedItem, setSelectedItem] = React.useState('');

  React.useEffect(() => {
    selectItem(selectedItem);
  }, [selectedItem, selectItem]);

  return (
    <div className="LeftPane" role="tablist" aria-label='Categories'>
      {(items.length > 0)
        ? items.map((item, i) =>
          <div key={i}
            id={(selectedItem === item.id) ? 'selectedCategory' : ''}
            role='tab' tabIndex='0' aria-label={item.name}
            aria-controls='Products'
            aria-selected={(selectedItem === item.id) ? true : false}
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
    </div>
  );
}

export default LeftPane;
