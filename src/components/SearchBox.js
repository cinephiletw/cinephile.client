/* eslint react/forbid-prop-types: 0 */

import React, { useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

const SearchBox = (props) => {
  const { placeholder } = props;
  const [searchText, setSearchText] = useState('');
  const [resData, setResData] = useState('');

  const handleSubmmit = (event) => {
    event.preventDefault();
    console.log(searchText);
    axios.get(`http://localhost:4000/${searchText}`)
      .then((res) => { setResData(res.data); })
      .catch((error) => { console.error(error); });
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const search = {
    top: '22px',
    position: 'fixed',
    marginLeft: '15%',
    marginRight: '30%',
    padding: '0px 30px 0px 20px',
    fontSize: 20,
    height: '36px',
    width: '25%',
    backgroundColor: 'rgb(35, 35, 35)',
    dixplay: 'flex',
    alignItems: 'center',
    borderRadius: '40px 40px 40px 40px',
    border: 'solid',
    borderColor: 'white',
    borderWidth: 'thin',
    outline: 'none',
    caretColor: '#FFFFFF',
    color: '#FFFFFF',
  };

  const lyrics = {
    marginTop: '5%',
    fontSize: 30,
    color: '#FFFFFF',
    whiteSpace: 'pre-line',
  };

  return (
    <div>
      <form onSubmit={handleSubmmit}>
        <input
          style={search}
          name="search"
          className="SearchBox"
          value={searchText}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </form>
      <h1 style={lyrics}>{resData}</h1>
    </div>
  );
};

SearchBox.propTypes = {
  placeholder: propTypes.any.isRequired,
};

export default SearchBox;
