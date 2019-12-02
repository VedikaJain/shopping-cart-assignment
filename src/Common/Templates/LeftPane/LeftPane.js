import React from 'react';
import './LeftPane.scss';
import Hr from '../../Widgets/HorizontalRow/Hr';

function LeftPane(props) {
  return (
    <div className="LeftPane">
      {props.items.map((item, i) =>
        <div key={i}
          onClick={() => {
            props.selectItem(item.id)
          }}>
          <p>{item.name}</p>
          <Hr type='greySolid' />
        </div>
      )}
    </div>
  );
}

export default LeftPane;
