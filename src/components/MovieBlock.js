import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MovieBlock = (props) => {
  const { img_type } = props;
  const { id } = props;
  const { movieCount } = props;
  const { posterSize } = props;
  const { clickCount } = props;
  const imagePath = `http://localhost:4000/images/poster/${img_type}_path_${String(id)}.jpg`;
  const history = useHistory();
  const [touch, setTouch] = useState(false);

  const posterStyle = {
    base: {
      borderRadius: '10px 10px 10px 10px',
    },
    unTouch: {
      height: `${posterSize[0]}px`,
      width: `${posterSize[1]}px`,
    },
    touch: {
      height: `${posterSize[0]}`,
      width: `${posterSize[1]}`,
    },
  };
  const buttonStyle = {
    base: {
      position: 'relative',
      marginRight: '5px',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 'none',
      borderRadius: '10px 10px 10px 10px',
      backgroundColor: 'rgb(20, 20, 20)',
      border: 'none',
      cursor: 'pointer',
      transition: 'left 0.5s',
      left: `${0 - (movieCount * (posterSize[1] + 5)) * clickCount}px`,
      padding: '0px 0px 0px 0px',
    },
    unTouch: {
      marginTop: '0px',
      height: `${posterSize[0]}px`,
      width: `${posterSize[1]}px`,
    },
    touch: {
      marginTop: '0px',
      height: `${posterSize[0]}px`,
      width: `${posterSize[1]}px`,
    },
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
    <button
      onClick={() => history.push(route)}
      onMouseEnter={() => setTouch(true)}
      onMouseLeave={() => setTouch(false)}
      className="submmit-movies"
      type="button"
      style={
        touch
          ? { ...buttonStyle.base, ...buttonStyle.touch }
          : { ...buttonStyle.base, ...buttonStyle.unTouch }
      }
    >
      <img
        src={imagePath}
        alt="592350.jpg"
        style={
          touch
            ? { ...posterStyle.base, ...posterStyle.touch }
            : { ...posterStyle.base, ...posterStyle.unTouch }
        }
      />
    </button>
  );
};

MovieBlock.propTypes = {
  img_type: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  movieCount: propTypes.number.isRequired,
  posterSize: propTypes.arrayOf(propTypes.number.isRequired).isRequired,
  clickCount: propTypes.number.isRequired,
};

export default MovieBlock;
