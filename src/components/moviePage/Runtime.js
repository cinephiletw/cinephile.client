import React from 'react';
import propTypes from 'prop-types';

const Runtime = (props) => {
  const { mediaWidth } = props;
  const { runtime } = props;

  const blockStyle = {
    base: {
      position: 'absolute',
      zIndex: '3',
      border: '1px #FFCC00 solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mobile: {
      top: '12%',
      left: '54%',
      height: `${(30 * mediaWidth) / 600}px`,
      width: `${(60 * mediaWidth) / 600}px`,
    },
    tablet: {
      top: '12%',
      left: '51%',
      height: `${25}px`,
      width: `${50}px`,
    },
    laptopM: {
      top: '138px',
      left: '255px',
      height: `${30}px`,
      width: `${55}px`,
    },
    laptopL: {
      top: `${(138 / 1200) * mediaWidth}px`,
      left: `${(255 / 1200) * mediaWidth}px`,
      height: `${(30 / 1200) * mediaWidth}px`,
      width: `${(55 / 1200) * mediaWidth}px`,
    },
  };

  const textStyle = {
    base: {
      position: 'relative',
      zIndex: '3',
      color: 'rgb(160, 160, 160)',
    },
    mobile: {
      top: '0',
      fontSize: `${(14 * mediaWidth) / 600}pt`,
    },
    tablet: {
      top: '0',
      fontSize: `${12}pt`,
    },
    laptopM: {
      top: '0',
      fontSize: `${14}pt`,
    },
    laptopL: {
      top: '0',
      fontSize: `${14 + ((16 - 14) / (1400 - 1200)) * (mediaWidth - 1200)}pt`,
    },
  };

  const minStyle = {
    base: {
      position: 'relative',
      zIndex: '3',
      color: 'rgb(160, 160, 160)',
    },
    mobile: {
      top: '0',
      fontSize: `${(14 * mediaWidth) / 600}pt`,
    },
    tablet: {
      top: '0',
      fontSize: `${12}pt`,
    },
    laptopM: {
      top: '0',
      fontSize: `${12}pt`,
    },
    laptopL: {
      top: '0',
      fontSize: `${14 + ((16 - 14) / (1400 - 1200)) * (mediaWidth - 1200)}pt`,
    },
  };

  const handleStyle = (_mediaWidth, _textStyle, _blockStyle, _minStyle) => {
    let runtimeText;
    let block;
    let min;

    if (mediaWidth <= 600) {
      runtimeText = { ..._textStyle.base, ..._textStyle.mobile };
      block = { ..._blockStyle.base, ..._blockStyle.mobile };
      min = { ..._minStyle.base, ..._minStyle.mobile };
    } else if (mediaWidth > 600 && mediaWidth <= 800) {
      runtimeText = { ..._textStyle.base, ..._textStyle.tablet };
      block = { ..._blockStyle.base, ..._blockStyle.tablet };
      min = { ..._minStyle.base, ..._minStyle.tablet };
    } else if (mediaWidth > 800 && mediaWidth <= 1200) {
      runtimeText = { ..._textStyle.base, ..._textStyle.laptopM };
      block = { ..._blockStyle.base, ..._blockStyle.laptopM };
      min = { ..._minStyle.base, ..._minStyle.laptopM };
    } else if (mediaWidth > 1200) {
      runtimeText = { ..._textStyle.base, ..._textStyle.laptopL };
      block = { ..._blockStyle.base, ..._blockStyle.laptopL };
      min = { ..._minStyle.base, ..._minStyle.laptopL };
    }
    return { runtimeText, block, min };
  };

  const runtimeStyle = handleStyle(mediaWidth, textStyle, blockStyle, minStyle);
  return (
    <div style={runtimeStyle.block}>
      <h3 style={runtimeStyle.runtimeText}>120</h3>
      <h3 style={runtimeStyle.min}>m</h3>
    </div>
  );
};

Runtime.propTypes = {
  mediaWidth: propTypes.number.isRequired,
  runtime: propTypes.number.isRequired,
};

export default Runtime;
