import React from 'react';
import './LeftPane.scss';
import Hr from '../../Widgets/HorizontalRow/Hr';

function LeftPane(props) {
  return (
    <div className="LeftPane">
      {(props.items.length > 0)
          ? props.items.map((item, i) =>
              <div key={i}
                onClick={() => {
                  props.selectItem(item.id)
                }}>
                <p>{item.name}</p>
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
