import React from 'react';
import PropTypes from 'prop-types';

const Content = (props) => {
  const { content } = props;

  // 介紹文字
  const contentStyle = {
    position: 'absolute',
    top: '0',
    width: '100%',
    zIndex: '3',
    fontSize: '12pt',
    fontFamily: 'THeiti Light',
    color: 'rgb(240, 240, 240)',
    opacity: '1',
  };

  return (
    <h1 style={contentStyle}>
      {content}
    </h1>
  );
};

Content.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Content;
