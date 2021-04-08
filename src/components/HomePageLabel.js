import React from 'react';
import propTypes from 'prop-types';

const HomePageLabel = (props) => {
  const { labelType } = props;
  const { mediaWidth } = props;
  const labelStyle = {
    base: {
      fontFamily: 'sans-serif',
      fontWeight: '700',
      color: 'rgb(200, 200, 200)',
      height: '5px',
      width: `${mediaWidth}`,
    },
    mobile: {
      fontSize: '1.5em',
      marginTop: '15px',
      marginLeft: '6%',
    },
    laptopM: {
      fontSize: '1.8em',
      marginTop: '30px',
      marginLeft: `${3 + (5 / (1300 - 1050)) * (mediaWidth - 1050)}%`,
    },
    laptopL: {
      fontSize: '1.8em',
      marginTop: '30px',
      marginLeft: '3%',
    },
  };

  const labelRWD = (_mediaWidth, _labelStyle) => {
    let style = {};
    if (_mediaWidth <= 1050) {
      style = { ..._labelStyle.base, ..._labelStyle.mobile };
    } else if (_mediaWidth > 1050 && _mediaWidth <= 1300) {
      style = { ..._labelStyle.base, ..._labelStyle.laptopM };
    } else if (_mediaWidth > 1300) {
      style = { ..._labelStyle.base, ..._labelStyle.laptopL };
    }
    return style;
  };

  const labelText = (_labelType) => {
    let text;
    if (_labelType === 'popular') {
      text = '熱門電影';
    } else if (_labelType === 'hot') {
      text = '現正熱映';
    } else if (_labelType === 'coming') {
      text = '即將上映';
    }
    return text;
  };

  return (
    <h2 style={labelRWD(mediaWidth, labelStyle)}>{labelText(labelType)}</h2>
  );
};

HomePageLabel.propTypes = {
  labelType: propTypes.string.isRequired,
  mediaWidth: propTypes.number.isRequired,
};

export default HomePageLabel;
