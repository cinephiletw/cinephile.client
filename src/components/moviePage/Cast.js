import React from 'react';
import PropTypes from 'prop-types';
import NameList from './NameList';

const Cast = (props) => {
  const { castInfo } = props;

  return (
    <NameList nameList={castInfo} />
  );
};

Cast.propTypes = {
  castInfo: PropTypes.string.isRequired,
};

export default Cast;
