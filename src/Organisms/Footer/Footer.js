import React from 'react';
import './Footer.scss';
import * as Constants from '../../global-constants';

function Footer() {
  return (
    <footer>
      {Constants.Copyright}
    </footer>
  );
};

export default Footer;
