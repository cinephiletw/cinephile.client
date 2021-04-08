import React from 'react';
import propTypes from 'prop-types';

const Genre = (props) => {
  const { mediaWidth } = props;
  const { genre } = props;

  const genreTextStyle = {
    base: {
      position: 'absolute',
      zIndex: '3',
      color: 'rgb(160, 160, 160)',
      fontFamily: 'sans-serif',
    },
    mobile: {
      top: `${(80 * mediaWidth) / 600}px`,
      left: '54%',
      fontSize: `${(14 * mediaWidth) / 600}pt`,
    },
    tablet: {
      top: `${49}px`,
      left: '61%',
      fontSize: `${12}pt`,
    },
    laptopM: {
      top: '121.5px',
      left: '430px',
      fontSize: `${12}pt`,
    },
    laptopL: {
      top: `${(121 / 1200) * mediaWidth}px`,
      left: `${(430 / 1200) * mediaWidth}px`,
      fontSize: `${12 + ((14 - 12) / (1400 - 1200)) * (mediaWidth - 1200)}pt`,
    },
  };

  const handleStyle = (_mediaWidth, _genreTextStyle) => {
    let genreText;

    if (mediaWidth <= 600) {
      genreText = { ..._genreTextStyle.base, ..._genreTextStyle.mobile };
    } else if (mediaWidth > 600 && mediaWidth <= 800) {
      genreText = { ..._genreTextStyle.base, ..._genreTextStyle.tablet };
    } else if (mediaWidth > 800 && mediaWidth <= 1200) {
      genreText = { ..._genreTextStyle.base, ..._genreTextStyle.laptopM };
    } else if (mediaWidth > 1200) {
      genreText = { ..._genreTextStyle.base, ..._genreTextStyle.laptopL };
    }
    return { genreText };
  };

  const genreStyle = handleStyle(mediaWidth, genreTextStyle);
  return (
    <h3 style={genreStyle.genreText}>{genre}</h3>
  );
};

Genre.propTypes = {
  mediaWidth: propTypes.number.isRequired,
  genre: propTypes.string.isRequired,
};

export default Genre;
