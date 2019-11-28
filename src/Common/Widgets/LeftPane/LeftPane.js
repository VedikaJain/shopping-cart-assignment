import React from 'react';
import './LeftPane.scss';
import Hr from '../HorizontalRow/Hr';

function LeftPane(props) {
  return (
    <div className="LeftPane">
      { props.items.map((item, i) => 
        <>
          <p>{props.name}</p>
          <Hr type='greySolid'/>
        </>
      )}
    </div>
  );
}

export default LeftPane;
