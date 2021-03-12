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
    mobile: {
      float: 'left',
      width: '25%',
      color: `${color}`,
      fontSize: `${mediaWidth * (12 / 425)}pt`,
      fontFamily: 'Microsoft YaHei',
      fontWeight: 'bold',
      background: '#1e2126',
      borderBottom: 'solid',
      borderRight: 'none',
      borderTop: 'none',
      borderLeft: 'none',
      paddingBottom: '10px',
      boxShadow: '10px 10px 10px rgba(20, 20, 20, 0.8)',
      outline: 'none',
    },
  };
  const match = useRouteMatch();

  return (
    <Link to={`${match.url}/${buttonType}`}>
      <button
        className="button-overview"
        type="button"
        style={buttonMovieStyle.mobile}
        onMouseEnter={() => { setColor('rgb(255, 204, 0)'); }}
        onMouseLeave={() => { setColor('rgb(80, 80, 80)'); }}
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
