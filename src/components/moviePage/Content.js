import React from 'react';
import PropTypes from 'prop-types';

const Content = (props) => {
  const { content } = props;
  const { mediaWidth } = props;

  // 介紹文字
  const contentStyle = {
    base: {
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '3',
      fontFamily: 'THeiti Light',
      opacity: '1',
    },
    mobile: {
      color: 'rgb(240, 240, 240)',
      fontSize: '12pt',
      width: `${mediaWidth * 0.9 * 0.9}px`,
    },
    tablet: {
      color: 'rgb(220, 220, 220)',
      fontSize: '14pt',
      width: `${600 * 0.9 * 0.9}px`,
    },
    laptopM: {
      color: 'rgb(220, 220, 220)',
      fontSize: '14pt',
      width: `${800 * 0.5}px`,
    },
    laptopL: {
      color: 'rgb(220, 220, 220)',
      fontSize: '14pt',
      width: `${(800 / 1200) * mediaWidth * 0.5}px`,
    },
  };

  const mediaContent = (_width, _contentStyle) => {
    let cont = {};
    if (_width <= 600) {
      cont = { ..._contentStyle.base, ..._contentStyle.mobile };
    } else if (_width <= 800 && _width > 600) {
      cont = { ..._contentStyle.base, ..._contentStyle.tablet };
    } else if (_width <= 1200 && _width > 800) {
      cont = { ..._contentStyle.base, ..._contentStyle.laptopM };
    } else if (_width > 1200) {
      cont = { ..._contentStyle.base, ..._contentStyle.laptopL };
    }
    return cont;
  };

  return (
    <h1 style={mediaContent(mediaWidth, contentStyle)}>
      {content}
    </h1>
  );
};

Content.propTypes = {
  content: PropTypes.string.isRequired,
  mediaWidth: PropTypes.string.isRequired,
};

export default Content;
