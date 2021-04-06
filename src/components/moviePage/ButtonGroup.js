import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import propTypes from 'prop-types';
import Button from './Button';

// 分頁按鈕
// 1. 簡介（doing ）
// 2. 演員名單（doing ）
// 3. 電影資訊（出版公司、導演）
// 4. 討論區 ( pending )
// 5. 訂票區 (pending)
const ButtonGroup = (props) => {
  const { mediaWidth } = props;
  const { movieId } = props;
  const buttonGroupStyle = {
    mobile: {
      marginTop: '45%',
      marginLeft: '5%',
      width: '90%',
    },
    laptopM: {
      marginTop: '25%',
      marginLeft: '35%',
      width: '60%',
    },
    laptopL: {
      marginTop: '25%',
      marginLeft: '35%',
      width: '60%',
    },
  };

  const buttonStyleObject = (_width, _buttonGroupStyle) => {
    let buttonGroup = {};
    if (_width <= 800) {
      buttonGroup = _buttonGroupStyle.mobile;
    } else if (_width > 800 && _width <= 1200) {
      buttonGroup = _buttonGroupStyle.laptopM;
    } else if (_width > 1200) {
      buttonGroup = _buttonGroupStyle.laptopL;
    }
    return buttonGroup;
  };

  const [highlight, setHighlight] = useState([0, 0, 0, 0]);

  // 當user用button進來時，會吃這邊的顏色
  const focusedButton = (type) => {
    if (type === 'content') {
      setHighlight([1, 0, 0, 0]);
    } else if (type === 'cast') {
      setHighlight([0, 1, 0, 0]);
    } else if (type === 'publish') {
      setHighlight([0, 0, 1, 0]);
    } else if (type === 'theater') {
      setHighlight([0, 0, 0, 1]);
    }
  };

  // 當user以router以連結進來時，會吃這邊的顏色
  useEffect(() => {
    const route = window.location.href.split('/')[5];
    if (route === 'content') {
      setHighlight([1, 0, 0, 0]);
    } else if (route === 'cast') {
      setHighlight([0, 1, 0, 0]);
    } else if (route === 'publish') {
      setHighlight([0, 0, 1, 0]);
    } else if (route === 'theater') {
      setHighlight([0, 0, 0, 1]);
    }
  }, []);

  return (
    <div className="button-group" style={buttonStyleObject(mediaWidth, buttonGroupStyle)}>
      <Button
        buttonName="簡介"
        mediaWidth={mediaWidth}
        movieId={movieId}
        buttonType="content"
        focusedButton={focusedButton}
        highlight={highlight}
        click={highlight[0] === 1}
      />
      <Button
        buttonName="演員"
        mediaWidth={mediaWidth}
        movieId={movieId}
        buttonType="cast"
        focusedButton={focusedButton}
        highlight={highlight}
        click={highlight[1] === 1}
      />
      <Button
        buttonName="導演"
        mediaWidth={mediaWidth}
        movieId={movieId}
        buttonType="publish"
        focusedButton={focusedButton}
        highlight={highlight}
        click={highlight[2] === 1}
      />
      <Button
        buttonName="電影院"
        mediaWidth={mediaWidth}
        movieId={movieId}
        buttonType="theater"
        focusedButton={focusedButton}
        highlight={highlight}
        click={highlight[3] === 1}
      />
    </div>
  );
};

ButtonGroup.propTypes = {
  mediaWidth: propTypes.number.isRequired,
  movieId: propTypes.string.isRequired,
};

export default ButtonGroup;
