import React from 'react';
import propTypes from 'prop-types';

const ReleaseDate = (props) => {
  const { mediaWidth } = props;
  const { releaseDate } = props;

  const releaseStyle = {
    base: {
      position: 'absolute',
      zIndex: '3',
      color: 'rgb(160, 160, 160)',
    },
    mobile: {
      top: '0',
      left: '54%',
      fontSize: `${(20 * mediaWidth) / 600}pt`,
    },
    tablet: {
      top: '0',
      left: '51%',
      fontSize: `${20}pt`,
    },
    laptopM: {
      top: '120px',
      left: '330px',
      fontSize: `${16}pt`,
    },
    laptopL: {
      top: `${(120 / 1200) * mediaWidth}px`,
      left: `${(330 / 1200) * mediaWidth}px`,
      fontSize: `${16 + ((18 - 16) / (1400 - 1200)) * (mediaWidth - 1200)}pt`,
    },
  };
  const date = new Date(releaseDate * 1000);
  const dateString = date.toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  const styleObjects = (_mediaWidth, _releaseStyle) => {
    let release;

    if (mediaWidth <= 600) {
      release = { ..._releaseStyle.base, ..._releaseStyle.mobile };
    } else if (mediaWidth > 600 && mediaWidth <= 800) {
      release = { ..._releaseStyle.base, ..._releaseStyle.tablet };
    } else if (mediaWidth > 800 && mediaWidth <= 1200) {
      release = { ..._releaseStyle.base, ..._releaseStyle.laptopM };
    } else if (mediaWidth > 1200) {
      release = { ..._releaseStyle.base, ..._releaseStyle.laptopL };
    }
    return { release };
  };

  const releaseDateStyle = styleObjects(mediaWidth, releaseStyle);

  return (
    <h3 style={releaseDateStyle.release}>{dateString}</h3>
  );
};

ReleaseDate.propTypes = {
  mediaWidth: propTypes.number.isRequired,
  releaseDate: propTypes.number.isRequired,
};

export default ReleaseDate;
