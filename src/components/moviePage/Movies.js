import React, { useState } from 'react';
// 這是個別電影頁設計

const Movies = () => {
  const backDropPath = 'http://localhost:4000/images/backdrop/backdrop_path_320846.jpg';
  const posterPath = 'http://localhost:4000/images/poster/poster_path_320846.jpg';

  // 頁面
  const layoutStyle = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  };
  // 主容器
  const coverStyle = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: '2',
    height: '630px',
    width: '1120px',
    backgroundColor: 'rgb(10, 10, 10)',
  };
  // 背景照片
  const backDropStyle = {
    position: 'absolute',
    height: '630px',
    width: '1120px',
    zIndex: '1',
    opacity: '0.2',
  };
  // 海報
  const posterStyle = {
    position: 'absolute',
    left: '5%',
    height: '420px',
    width: '280px',
    zIndex: '3',
  };
  // 標題
  const titleStyle = {
    position: 'absolute',
    top: '10%',
    left: '35%',
    zIndex: '3',
    fontSize: '40pt',
    color: '#FFFFFF',
    opacity: '1',
  };
  // 介紹文字
  const textStyle = {
    position: 'absolute',
    top: '30%',
    left: '35%',
    width: '60%',
    zIndex: '3',
    fontSize: '13pt',
    color: '#FFFFFF',
    opacity: '1',
  };
  // 導演
  const directorStyle = {
    position: 'absolute',
    top: '45%',
    left: '35%',
    width: '60%',
    zIndex: '3',
    fontSize: '13pt',
    color: '#FFFFFF',
    opacity: '1',
  };

  // 演員陣容
  const castStyle = {
    position: 'absolute',
    top: '55%',
    left: '35%',
    width: '60%',
    zIndex: '3',
    fontSize: '13pt',
    color: '#FFFFFF',
    opacity: '1',
  };
  // 電影公司
  const companyStyle = {
    position: 'absolute',
    top: '55%',
    left: '35%',
    width: '60%',
    zIndex: '3',
    fontSize: '13pt',
    color: '#FFFFFF',
    opacity: '1',
  };

  return (
    <div style={layoutStyle}>
      <div style={coverStyle}>
        <img src={backDropPath} alt="backdrop" style={backDropStyle} />
        <img src={posterPath} alt="poster" style={posterStyle} />
        <h3 style={titleStyle}> Sky Shark</h3>
        <text style={textStyle}>{'在1967年年底，有一個孤苦伶仃的男童\n（賈瑟布魯諾 飾）來到阿拉巴馬州鄉下的迪莫波利斯鎮，\n去跟他親愛的奶奶（奧塔薇亞史班森 飾）一起住。\n男孩與奶奶遇到一群神祕、迷人卻又殘忍的女巫...'}</text>
        <text style={directorStyle}>導演：三木孝浩</text>
        <text style={castStyle}>主演：張震、張鈞甯、李銘順(Christopher Lee)、林暉閔、古斌</text>
      </div>
    </div>
  );
};

export default Movies;
