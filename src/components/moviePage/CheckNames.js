import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// 中英文都有：中文名(英文名)
// 只有英文：英文名
// 只有中文：中文名
const CheckNames = (props) => {
  const { names } = props;
  const { mediaWidth } = props;
  const nameList = [];

  // 演員陣容
  const castStyle = {
    base: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '90%',
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
    <h3
      style={
        mediaWidth < 600
          ? { ...castStyle.base, ...castStyle.mobile }
          : { ...castStyle.base, ...castStyle.tablet }
      }
    >
      {nameList.join('、')}
    </h3>
  );
};

CheckNames.propTypes = {
  names: PropTypes.arrayOf(PropTypes.object).isRequired,
  mediaWidth: PropTypes.number.isRequired,
};

export default CheckNames;
