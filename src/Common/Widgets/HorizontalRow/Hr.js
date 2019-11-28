import React from 'react';
import './Hr.scss';

function Hr(props) {
  let hrType = 'blue';
  switch(props.type) {
    case 'blue': hrType = 'blue'; break;
    case 'grey': hrType = 'grey'; break;
    case 'greySolid': hrType = 'greySolid'; break;
  }
  return (
    <hr className={hrType}/>
  );
}

export default Hr;
