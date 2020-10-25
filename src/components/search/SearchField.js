import React from 'react';

const SearchFiled = ({ searchfield, searchChange }) => {
  return (
    <div className='pa2'>
      <input
        className=''
        type='search'
        placeholder='search robots'
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;