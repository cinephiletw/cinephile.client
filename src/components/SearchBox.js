/* eslint react/forbid-prop-types: 0 */

import React, { useState, useRef } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useViewport from '../hooks/useViewport';

const SearchBox = (props) => {
  const { mediaWidth } = useViewport();

  const searchStyle = {
    base: {
      left: '15%',
      position: 'fixed',
      padding: '0px 30px 0px 20px',
      backgroundColor: 'rgb(35, 35, 35)',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '40px 40px 40px 40px',
      border: 'solid',
      borderColor: 'white',
      borderWidth: 'thin',
      outline: 'none',
      caretColor: 'rgb(220, 220, 220)',
      color: 'rgb(220, 220, 220)',
      textAlign: 'start',
    },
    open: {
      width: `${mediaWidth * 0.5}px`,
      transition: 'width 0.2s, opacity 0.2s',
      opacity: '1',
    },
    close: {
      fontSize: '20',
      width: '0',
      transition: 'width 0.2s, opacity 0.2s 0.2s',
      opacity: '0',
    },
    mobile: {
      top: '12px',
      fontSize: '18',
      height: '26px',
    },
    laptop: {
      top: '17px',
      fontSize: '22',
      height: '36px',
    },
  };

  const buttonStyle = {
    base: {
      position: 'fixed',
      background: 'rgba(0, 0, 0, 0)',
      transition: 'margin-left 0.2s',
      border: 'none',
      outline: 'none',
    },
    open: {
      marginLeft: `${mediaWidth * 0.5 + 15}px`,
    },
    close: {
      marginLeft: '0',
    },
    mobile: {
      top: '15px',
      left: '15%',
    },
    laptop: {
      top: '22px',
      left: '14%',
    },
  };

  const iconStyle = {
    base: {
      color: 'rgb(220, 220, 220)',
    },
    mobile: {
      height: '20px',
      width: '20px',
    },
    laptop: {
      height: '25px',
      width: '25px',
    },
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

  const mediaSearch = (_width) => {
    if (_width < 1024) {
      return { ...searchStyle.base, ...searchStyle.mobile };
    }
    return { ...searchStyle.base, ...searchStyle.laptop };
  };

  const mediaButton = (_width) => {
    if (_width < 1024) {
      return { ...buttonStyle.base, ...buttonStyle.mobile };
    }
    return { ...buttonStyle.base, ...buttonStyle.laptop };
  };

  return (
    <form onSubmit={handleSubmmit}>
      <input
        style={
          open
            ? { ...mediaSearch(mediaWidth), ...searchStyle.open }
            : { ...mediaSearch(mediaWidth), ...searchStyle.close }
        }
        name="search"
        className="SearchBox"
        value={searchText}
        placeholder={placeholder}
        onChange={handleChange}
        ref={searchInput}
        onBlur={() => { setOpen(!open); }}
      />
      <button
        type="button"
        onClick={handleClick}
        style={
          open
            ? { ...mediaButton(mediaWidth), ...buttonStyle.open }
            : { ...mediaButton(mediaWidth), ...buttonStyle.close }
        }
        disabled={open}
      >
        <div>
          <FontAwesomeIcon
            icon={faSearch}
            style={
              mediaWidth < 1024
                ? { ...iconStyle.base, ...iconStyle.mobile }
                : { ...iconStyle.base, ...iconStyle.laptop }
            }
          />
        </div>
      </button>
    </form>
  );
};

SearchBox.propTypes = {
  placeholder: propTypes.any.isRequired,
};

export default SearchBox;
