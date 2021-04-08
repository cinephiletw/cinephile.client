import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Exist = (props) => {
  const history = useHistory();
  const { mediaWidth } = props;

  const buttonStyle = {
    base: {
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0',
      alignItems: 'center',
      position: 'absolute',
      zIndex: '3',
      background: 'rgba(0, 0, 0, 0)',
    },
    mobile: {
      height: `${(30 / 600) * mediaWidth}px`,
      width: `${(30 / 600) * mediaWidth}px`,
      top: `${(20 / 600) * mediaWidth}px`,
      right: `${(40 / 600) * mediaWidth}px`,
    },
    mobileL: {
      height: `${30}px`,
      width: `${30}px`,
      top: `${20 + ((60 - 20) / (700 - 600)) * (mediaWidth - 600)}px`,
      right: `${40 + ((80 - 40) / (700 - 600)) * (mediaWidth - 600)}px`,
    },
    tablet: {
      height: `${25}px`,
      width: `${25}px`,
      top: `${20 + ((50 - 20) / (800 - 700)) * (mediaWidth - 700)}px`,
      right: `${40 + ((60 - 40) / (800 - 700)) * (mediaWidth - 700)}px`,
    },
    laptopM: {
      height: `${25}px`,
      width: `${25}px`,
      top: `${20}px`,
      right: `${37 + ((230 - 37) / (1200 - 800)) * (mediaWidth - 800)}px`,
    },
    laptopL: {
      height: `${25}px`,
      width: `${25}px`,
      top: `${20}px`,
      right: `${19}%`,
    },
  };

  const iconStyle = {
    base: {
      color: '#FFFFFF',
    },
    mobile: {
      height: `${(30 / 600) * mediaWidth}px`,
      width: `${(30 / 600) * mediaWidth}px`,
    },
    mobileL: {
      height: '30px',
      width: '30px',
    },
    tablet: {
      height: '25px',
      width: '25px',
    },
    laptopM: {
      height: '25px',
      width: '25px',
    },
    laptopL: {
      height: '25px',
      width: '25px',
    },
  };

  const styleObjects = (_mediaWidth, _buttonStyle, _iconStyle) => {
    let button;
    let icon;

    if (_mediaWidth <= 600) {
      button = { ..._buttonStyle.base, ..._buttonStyle.mobile };
      icon = { ..._iconStyle.base, ..._iconStyle.mobile };
    } else if (_mediaWidth <= 700 && _mediaWidth > 600) {
      button = { ..._buttonStyle.base, ..._buttonStyle.mobileL };
      icon = { ..._iconStyle.base, ..._iconStyle.mobileL };
    } else if (_mediaWidth <= 800 && _mediaWidth > 700) {
      button = { ..._buttonStyle.base, ..._buttonStyle.tablet };
      icon = { ..._iconStyle.base, ..._iconStyle.tablet };
    } else if (_mediaWidth <= 1200 && _mediaWidth > 800) {
      button = { ..._buttonStyle.base, ..._buttonStyle.laptopM };
      icon = { ..._iconStyle.base, ..._iconStyle.laptopM };
    } else if (_mediaWidth > 1200) {
      button = { ..._buttonStyle.base, ..._buttonStyle.laptopL };
      icon = { ..._iconStyle.base, ..._iconStyle.laptopL };
    }
    return { button, icon };
  };

  const existStyle = styleObjects(mediaWidth, buttonStyle, iconStyle);

  return (
    <button type="button" style={existStyle.button} onClick={() => history.push('/')}>
      <FontAwesomeIcon icon={faTimes} style={existStyle.icon} />
    </button>
  );
};

Exist.propTypes = {
  mediaWidth: propTypes.number.isRequired,
};
export default Exist;
