import React from 'react';
import './Hr.scss';

function Hr(props) {
  return (
    <hr className={props.type==='blue'?'blue':'grey'}/>
  );
}

export default Hr;
