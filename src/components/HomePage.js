import React from 'react';
import NavBar from './NavBar';
import Popular from './Popular';
import useViewport from '../hooks/useViewport';

// 首頁，react 以component 為單位往下拆分，將元件寫在/component 資料夾內再export 出來使用
// component 命名皆為大寫開頭camel 式命名
// NavBar : 首頁上方工具欄
// SearchBox : 搜尋

const HomePage = (props) => {
  const { mediaWidth } = useViewport();
  const homeStyle = {
    position: 'fixed',
    top: '0',
    width: `${mediaWidth}px`,
    height: '100%',
    // 隱藏卷軸-17像素
    left: '0px',
    right: '-17px',
    backgroundColor: 'rgb(20, 20, 20)',
    overflowY: 'scroll',
  };

  return (
    <div className="layout" style={homeStyle}>
      <NavBar />
      <Popular positionV="80px" />
      <Popular positionV="480px" />
      <Popular positionV="880px" />
      <Popular positionV="1280px" />
    </div>
  );
};

export default HomePage;
