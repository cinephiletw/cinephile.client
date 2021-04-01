import React from 'react';
import PropTypes from 'prop-types';
import TheaterIcons from './TheaterIcons';

const Theater = (props) => {
  const { theaterInfo } = props;
  const { mediaWidth } = props;

  if (theaterInfo[0] === null) {
    return (
      <h3>無</h3>
    );
  }

  return (
    <div>
      {
        theaterInfo.map(
          (x) => <TheaterIcons key={x.web_name} webName={x.web_name} webURL={x.web_url} />,
        )
      }
    </div>
  );
};

Theater.propTypes = {
  theaterInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
  mediaWidth: PropTypes.number.isRequired,
};

export default Theater;
