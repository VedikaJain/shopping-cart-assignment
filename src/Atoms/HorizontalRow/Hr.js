import React from 'react';
import './Hr.scss';

function Hr({type}) {
  return (
    <hr className={'hr ' + type}/>
  );
}

export default Hr;
