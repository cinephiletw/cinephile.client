import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import CheckNames from './CheckNames';

// 個別電影頁的cast list，判斷如果沒有資料，回傳"無"
const NameList = (props) => {
  const { nameList } = props;
  const { height } = props;
  const { titleType } = props;
  // 演員標題
  const nameTitleStyle = {
    position: 'absolute',
    top: `${height}%`,
    left: '35%',
    width: '8%',
    zIndex: '3',
    fontSize: '12pt',
    fontFamily: 'THeiti Light',
    color: 'rgb(200, 200, 200)',
    opacity: '1',
  };

  // 演員陣容
  const nameStyle = {
    position: 'absolute',
    top: `${height}.1%`,
    left: '42%',
    width: '55%',
    zIndex: '3',
    fontSize: '12pt',
    fontFamily: 'THeiti Light',
    color: '#FFFFFF',
    opacity: '1',
  };

  if (nameList[0] === null) {
    return (
      <div>
        <h3 style={nameStyle}>無</h3>
        <h3 style={nameTitleStyle}>{titleType}</h3>
      </div>
    );
  }
  return (
    <div>
      <CheckNames names={nameList} height={height} />
      <h3 style={nameTitleStyle}>{titleType}</h3>
    </div>
  );
};

NameList.propTypes = {
  nameList: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.string).isRequired,
    propTypes.arrayOf(propTypes.object).isRequired,
  ]).isRequired,
  height: propTypes.string.isRequired,
  titleType: propTypes.string.isRequired,
};

export default NameList;
