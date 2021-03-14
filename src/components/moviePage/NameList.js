import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import CheckNames from './CheckNames';

// 個別電影頁的cast list，判斷如果沒有資料，回傳"無"
const NameList = (props) => {
  const { nameList } = props;
  const { mediaWidth } = props;
  // 名單
  const nameStyle = {
    base: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      fontFamily: 'THeiti Light',
    },
    mobile: {
      fontSize: '12pt',
      color: 'rgb(240, 240, 240)',
    },
    tablet: {
      fontSize: '14pt',
      color: 'rgb(220, 220, 220)',
    },
  };

  if (nameList[0] === null) {
    return (
      <h3
        style={
          mediaWidth < 600
            ? { ...nameStyle.base, ...nameStyle.mobile }
            : { ...nameStyle.base, ...nameStyle.tablet }
        }
      >
        無
      </h3>
    );
  }
  return (
    <CheckNames names={nameList} mediaWidth={mediaWidth} />
  );
};

NameList.propTypes = {
  nameList: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.string).isRequired,
    propTypes.arrayOf(propTypes.object).isRequired,
  ]).isRequired,
  mediaWidth: propTypes.number.isRequired,
};

export default NameList;
