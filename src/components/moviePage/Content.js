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
      width: '100%',
      zIndex: '3',
      fontFamily: 'THeiti Light',
      opacity: '1',
    },
    mobile: {
      color: 'rgb(240, 240, 240)',
      fontSize: '12pt',
    },
    tablet: {
      color: 'rgb(220, 220, 220)',
      fontSize: '14pt',
    },
  };

  return (
    <h1
      style={
        mediaWidth < 600
          ? { ...contentStyle.base, ...contentStyle.mobile }
          : { ...contentStyle.base, ...contentStyle.tablet }
      }
    >
      {content}
    </h1>
  );
};

Content.propTypes = {
  content: PropTypes.string.isRequired,
  mediaWidth: PropTypes.string.isRequired,
};

export default Content;
