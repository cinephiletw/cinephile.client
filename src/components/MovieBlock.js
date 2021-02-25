import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MovieBlock = (props) => {
  const { img_type } = props;
  const { id } = props;
  const imagePath = `http://localhost:4000/images/poster/${img_type}_path_${String(id)}.jpg`;
  const [width, setWidth] = useState('160px');
  const [height, setHeight] = useState('240px');
  const [marginTop, setMarginTop] = useState('31px');

  const posterStyle = {
    height: `${height}`,
    width: `${width}`,
    borderRadius: '10px 10px 10px 10px',
  };
  const buttonStyle = {
    marginTop: `${marginTop}`,
    marginRight: '30px',
    height: `${height}`,
    width: `${width}`,
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    borderRadius: '10px 10px 10px 10px',
    backgroundColor: 'rgb(20, 20, 20)',
    border: 'none',
    cursor: 'pointer',
  };

  const iconStyle = {
    padding: '0px 0px 0px 0px',
    margin: '5px 5px 5px 3px',
    display: 'flex',
    width: '25px',
    height: '25px',
    backgroundColor: 'alpha',
    border: 'none',
    color: 'white',
    size: 'xs',
  };

  const mouseEnter = () => {
    setWidth('200px');
    setHeight('300px');
    setMarginTop('10px');
    console.log('mouse enter');
  };

  const mouseLeave = () => {
    setWidth('160px');
    setHeight('240px');
    setMarginTop('31px');
    console.log('mouse enter');
  };

  const route = `/movies/${id}`;
  // 因上層使用useEffect 前會先render 一次，此時海報資料還沒進來，先給個loading icon 等待useEffect 執行
  // not loaded yet
  if (id === 0) {
    return (
      <div className="loading" style={buttonStyle}>
        <div className="col-6">
          <FontAwesomeIcon icon={faSpinner} style={iconStyle} />
        </div>
      </div>
    );
  }
  // image loaded
  return (
    <Link to={route}>
      <button
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        className="submmit-movies"
        type="button"
        style={buttonStyle}
      >
        <img src={imagePath} alt="592350.jpg" style={posterStyle} />
      </button>
    </Link>
  );
};

MovieBlock.propTypes = {
  img_type: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
};

export default MovieBlock;
