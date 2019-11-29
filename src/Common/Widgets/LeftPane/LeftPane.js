import React from 'react';
import './LeftPane.scss';
import Hr from '../HorizontalRow/Hr';

function LeftPane(props) {
  return (
    <div className="LeftPane">
      {props.items.map((item, i) =>
        <div key={i}
          onClick={() => {
            props.selectCategory(item.id)
          }}>
          <p>{item.name}</p>
          <Hr type='greySolid' />
        </div>
      )}
    </div>
  );
}

export default LeftPane;
