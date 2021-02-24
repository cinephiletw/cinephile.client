import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

// 中英文都有：中文名(英文名)
// 只有英文：英文名
// 只有中文：中文名
const CheckNames = (props) => {
  const { names } = props;
  const nameList = [];

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

  let i = 0;

  for (i; i < names.length; i += 1) {
    if ('name_tw' in names[i] && 'name_en' in names[i]) {
      nameList.push(` ${names[i].name_tw}( ${names[i].name_en} )`);
    } else if ('name_tw' in names[i] && !('name_en' in names[i])) {
      nameList.push(` ${names[i].name_tw}`);
    } else if (!('name_tw' in names[i]) && 'name_en' in names[i]) {
      nameList.push(` ${names[i].name_en}`);
    } else {
      // pass
    }
  }

  return (
    <div>
      <h3 style={castStyle}>{nameList.join('、')}</h3>
    </div>
  );
};

CheckNames.propTypes = {
  names: propTypes.arrayOf(propTypes.object).isRequired,
};

export default CheckNames;
