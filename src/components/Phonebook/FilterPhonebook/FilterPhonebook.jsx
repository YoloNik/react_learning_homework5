import React, { memo } from 'react';
import PropTypes from 'prop-types';

const style = {
  width: '50%',
  height: '30px',
  border: '1px',
  borderRadius: '16px',
  backgroundColor: '#E8EDE7',
  paddingLeft: '10px',
};

function FilterPhonebook({ filterValue, onChange }) {
  return (
    <>
      <p>Find contacts by name</p>
      <form>
        <input
          style={{ ...style }}
          placeholder="Search contact"
          type="text"
          name="filter"
          value={filterValue}
          onChange={onChange}
        />
      </form>
    </>
  );
}

export default memo(FilterPhonebook);

FilterPhonebook.prototype = {
  filterValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
