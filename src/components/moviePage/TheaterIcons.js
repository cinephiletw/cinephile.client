import React from 'react';
import PropTypes from 'prop-types';
import useViewport from '../../hooks/useViewport';

const TheaterIcons = (props) => {
  const { webName } = props;
  const { webURL } = props;
  const { mediaWidth } = useViewport();

  const theaterButtonStyle = {
    base: {
      backgroundColor: 'rgb(0, 0, 0)',
      borderRadius: '20px 20px 20px 20px',
      cursor: 'pointer',
      border: '1px #FFFFFF solid',
      borderColor: '#FFFFFF',
      outline: 'none',
    },
    mobile: {
      height: '50px',
      widht: '125px',
      marginTop: '20px',
      marginRight: '5px',
    },
    laptop: {
      height: '60px',
      width: '150px',
      marginTop: '20px',
      marginRight: '5px',
    },
  };

  const imgStyle = {
    base: {
      marginTop: '3px',
    },
    mobile: {
      height: '40px',
    },
    laptop: {
      height: '50px',
    },
  };

  const styleObjects = (_theaterButtonStyle, _imgStyle, _mediaWidth) => {
    let theaterButton;
    let img;
    if (_mediaWidth <= 400) {
      theaterButton = { ..._theaterButtonStyle.base, ..._theaterButtonStyle.mobile };
      img = { ..._imgStyle.base, ..._imgStyle.mobile };
    } else {
      theaterButton = { ..._theaterButtonStyle.base, ..._theaterButtonStyle.laptop };
      img = { ..._imgStyle.base, ..._imgStyle.laptop };
    }
    return { theaterButton, img };
  };

  const handleClick = () => {
    window.open(webURL);
  };

  const path = `http://localhost:4000/icons/${webName}.png`;

  const theaterStyle = styleObjects(theaterButtonStyle, imgStyle, mediaWidth);

  return (
    <button type="button" style={theaterStyle.theaterButton} onClick={handleClick}>
      <img src={path} alt={webName} style={theaterStyle.img} />
    </button>
  );
};

TheaterIcons.propTypes = {
  webURL: PropTypes.string.isRequired,
  webName: PropTypes.string.isRequired,
};

export default TheaterIcons;
