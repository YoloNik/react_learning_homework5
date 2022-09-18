import React from 'react';
import './RegBtn.css';

import PropTypes from 'prop-types';
import { memo } from 'react';

function RegBtn({ handleClick, type, name, children, className }) {
  return (
    <button name={name} onClick={handleClick} type={type} className={className}>
      {children}
    </button>
  );
}

export default memo(RegBtn);

RegBtn.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  handleClick: PropTypes.func,
};
