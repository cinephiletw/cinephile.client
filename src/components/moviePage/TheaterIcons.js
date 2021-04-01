import React from 'react';
import PropTypes from 'prop-types';

const TheaterIcons = (props) => {
  const { webName } = props;
  const { webURL } = props;

  const theaterStyle = {
    color: '#FFFFFF',
  };
  const theaterButtonStyle = {
    backgroundColor: 'rgb(0, 0, 0)',
  };

  const handleClick = () => {
    window.open(webURL);
  };

  const path = `http://localhost:4000/icons/${webName}.png`;

  return (
    <button type="button" style={theaterButtonStyle} onClick={handleClick}>
      <img src={path} alt={webName} />
    </button>
  );
};

TheaterIcons.propTypes = {
  webURL: PropTypes.string.isRequired,
  webName: PropTypes.string.isRequired,
};

export default TheaterIcons;
