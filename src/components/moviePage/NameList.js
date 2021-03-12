import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import CheckNames from './CheckNames';

// 個別電影頁的cast list，判斷如果沒有資料，回傳"無"
const NameList = (props) => {
  const { nameList } = props;
  // 名單
  const nameStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    fontSize: '12pt',
    fontFamily: 'THeiti Light',
    color: 'rgb(240, 240, 240)',
  };

  if (nameList[0] === null) {
    return (
      <h3 style={nameStyle}>無</h3>
    );
  }
  return (
    <CheckNames names={nameList} />
  );
};

NameList.propTypes = {
  nameList: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.string).isRequired,
    propTypes.arrayOf(propTypes.object).isRequired,
  ]).isRequired,
};

export default NameList;
