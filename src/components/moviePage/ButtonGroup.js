import React, { useState } from 'react';
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
    marginTop: '45%',
    marginLeft: '5%',
    width: '90%',
  };

  return (
    <div className="button-group" style={buttonGroupStyle}>
      <Button buttonName="簡介" mediaWidth={mediaWidth} movieId={movieId} buttonType="content" />
      <Button buttonName="演員" mediaWidth={mediaWidth} movieId={movieId} buttonType="cast" />
      <Button buttonName="出版" mediaWidth={mediaWidth} movieId={movieId} buttonType="publish" />
      <Button buttonName="電影院" mediaWidth={mediaWidth} movieId={movieId} buttonType="theater" />
    </div>
  );
};

ButtonGroup.propTypes = {
  mediaWidth: propTypes.number.isRequired,
  movieId: propTypes.string.isRequired,
};

export default ButtonGroup;
