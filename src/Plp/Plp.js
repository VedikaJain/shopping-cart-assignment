import React from 'react';
import './Plp.scss';
import LeftPane from '../Common/Widgets/LeftPane/LeftPane';
import Products from '../Common/Widgets/Products/Products';

function Plp() {
  return (
    <div className="Plp">
      <LeftPane></LeftPane>
      <Products></Products>
    </div>
  );
}

export default Plp;
