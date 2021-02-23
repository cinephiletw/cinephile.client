import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import CheckNames from './CheckNames';

// 個別電影頁的cast list，判斷如果沒有資料，回傳"無"
const CastList = (props) => {
  const { castList } = props;
  // 演員標題
  const castTitleStyle = {
    position: 'absolute',
    top: '50%',
    left: '35%',
    width: '8%',
    zIndex: '3',
    fontSize: '12pt',
    fontFamily: 'THeiti Light',
    color: 'rgb(200, 200, 200)',
    opacity: '1',
  };

  // 演員陣容
  const castStyle = {
    position: 'absolute',
    top: '50.1%',
    left: '42%',
    width: '55%',
    zIndex: '3',
    fontSize: '12pt',
    fontFamily: 'THeiti Light',
    color: '#FFFFFF',
    opacity: '1',
  };

  if (castList[0] === null) {
    return (
      <div>
        <h3 style={castStyle}>無</h3>
        <h3 style={castTitleStyle}>演員陣容：</h3>
      </div>
    );
  }
  return (
    <div>
      <CheckNames names={castList} />
      <h3 style={castTitleStyle}>演員陣容：</h3>
    </div>
  );
};

CastList.propTypes = {
  castList: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.string).isRequired,
    propTypes.arrayOf(propTypes.object).isRequired,
  ]).isRequired,
};

export default CastList;
