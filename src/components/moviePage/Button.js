import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

const Button = (props) => {
  const [color, setColor] = useState('rgb(80, 80, 80)');
  const { buttonName } = props;
  const { mediaWidth } = props;
  const { movieId } = props;
  const { buttonType } = props;

  const buttonMovieStyle = {
    base: {
      float: 'left',
      width: '25%',
      color: `${color}`,
      fontFamily: 'Microsoft YaHei',
      fontWeight: 'bold',
      borderBottom: 'solid',
      borderRight: 'none',
      borderTop: 'none',
      borderLeft: 'none',
      paddingBottom: '3px',
      outline: 'none',
    },
    mobile: {
      background: '#1e2126',
      boxShadow: '10px 10px 10px rgba(20, 20, 20, 0.8)',
      fontSize: '12pt',
    },
    tablet: {
      background: 'rgb(15, 15, 15)',
      boxShadow: '10px 10px 10px rgba(20, 20, 20, 0.8)',
      fontSize: '12pt',
    },
    laptopM: {
      background: 'rgba(15, 15, 15, 0)',
      fontSize: '12pt',
    },
    laptopL: {
      background: 'rgba(15, 15, 15, 0)',
      fontSize: '14pt',
    },
  };

  const buttonMovieObject = (_width, _buttonMovieStyle) => {
    let buttonMovie = {};
    if (_width <= 600) {
      buttonMovie = { ..._buttonMovieStyle.base, ..._buttonMovieStyle.mobile };
    } else if (_width <= 800 && _width > 600) {
      buttonMovie = { ..._buttonMovieStyle.base, ..._buttonMovieStyle.tablet };
    } else if (_width > 800 && _width <= 1200) {
      buttonMovie = { ..._buttonMovieStyle.base, ..._buttonMovieStyle.laptopM };
    } else if (_width > 1200) {
      buttonMovie = { ..._buttonMovieStyle.base, ..._buttonMovieStyle.laptopL };
    }
    return buttonMovie;
  };
  const match = useRouteMatch();

  return (
    <Link to={`${match.url}/${buttonType}`}>
      <button
        className="button-overview"
        type="button"
        style={buttonMovieObject(mediaWidth, buttonMovieStyle)}
        onFocus={() => { setColor('rgb(255, 204, 0)'); }}
        onBlur={() => { setColor('rgb(80, 80, 80)'); }}
      >
        {buttonName}
      </button>
    </Link>
  );
};

Button.propTypes = {
  mediaWidth: propTypes.number.isRequired,
  buttonName: propTypes.string.isRequired,
  buttonType: propTypes.string.isRequired,
  movieId: propTypes.string.isRequired,
};

export default Button;
