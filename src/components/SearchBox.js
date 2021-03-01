/* eslint react/forbid-prop-types: 0 */

import React, { useState, useRef } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBox = (props) => {
  const openStyle = {
    top: '22px',
    position: 'fixed',
    marginLeft: '15%',
    marginRight: '30%',
    padding: '0px 30px 0px 20px',
    fontSize: '18',
    height: '36px',
    width: '300px',
    maxWidth: '300px',
    transition: 'max-width 0.2s, opacity 0.2s',
    backgroundColor: 'rgb(35, 35, 35)',
    dixplay: 'flex',
    alignItems: 'center',
    borderRadius: '40px 40px 40px 40px',
    border: 'solid',
    borderColor: 'white',
    borderWidth: 'thin',
    outline: 'none',
    caretColor: 'rgb(220, 220, 220)',
    color: 'rgb(220, 220, 220)',
    opacity: '1',
  };

  const closeStyle = {
    top: '22px',
    position: 'fixed',
    marginLeft: '15%',
    marginRight: '30%',
    padding: '0px 30px 0px 20px',
    fontSize: '20',
    height: '36px',
    maxWidth: '0',
    transition: 'max-width 0.2s, opacity 0.2s 0.2s',
    opacity: '0',
    backgroundColor: 'rgb(35, 35, 35)',
    dixplay: 'flex',
    alignItems: 'center',
    borderRadius: '40px 40px 40px 40px',
    border: 'solid',
    borderColor: 'white',
    borderWidth: 'thin',
    outline: 'none',
    caretColor: 'rgb(220, 220, 220)',
    color: 'rgb(220, 220, 220)',
  };

  const buttonOpenStyle = {
    top: '22px',
    position: 'fixed',
    marginLeft: '36%',
    background: 'rgba(0, 0, 0, 0)',
    height: '40px',
    width: '40px',
    transition: 'margin-left 0.2s',
    border: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  };

  const buttonCloseStyle = {
    top: '22px',
    position: 'fixed',
    marginLeft: '15%',
    background: 'rgba(0, 0, 0, 0)',
    height: '40px',
    width: '40px',
    transition: 'margin-left 0.2s',
    border: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  };

  const iconStyle = {
    color: 'rgb(220, 220, 220)',
    height: '25px',
    width: '25px',
  };

  const { placeholder } = props;
  const [searchText, setSearchText] = useState('');
  const [resData, setResData] = useState('');
  const [open, setOpen] = useState(false);

  // 用useRef 去抓input，再用focus 實現點擊search icon 展開後點進input
  // 在input tag 中加入 onBlur 實現點擊其他元素後收回search bar
  const searchInput = useRef(null);

  const handleSubmmit = (event) => {
    event.preventDefault();
    console.log(searchText);
    axios.get(`http://localhost:4000/${searchText}`)
      .then((res) => { setResData(res.data); })
      .catch((error) => { console.error(error); });
  };

  const handleClick = (event) => {
    searchInput.current.focus();
    setOpen(!open);
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmmit}>
        <input
          style={open ? openStyle : closeStyle}
          name="search"
          className="SearchBox"
          value={searchText}
          placeholder={placeholder}
          onChange={handleChange}
          ref={searchInput}
          onBlur={() => { setOpen(!open); }}
        />
      </form>
      <button
        type="button"
        onClick={handleClick}
        style={open ? buttonOpenStyle : buttonCloseStyle}
        disabled={open}
      >
        <div className="col-6">
          <FontAwesomeIcon
            icon={faSearch}
            style={iconStyle}
          />
        </div>
      </button>
    </div>
  );
};

SearchBox.propTypes = {
  placeholder: propTypes.any.isRequired,
};

export default SearchBox;
