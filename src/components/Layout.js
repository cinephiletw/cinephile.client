import React from 'react';
import Popular from './Popular';

// Layout.js 是首頁主體，在這裏call Popular (未來會寫成general 的海報區塊)，一個popular 是首頁中的一條分類列表

const Layout = (props) => {
  const layoutStyle = {
    position: 'fixed',
    top: '80px',
    width: '100%',
    height: '90%',
    // 隱藏卷軸-17像素
    right: '-17px',
    backgroundColor: 'rgb(20, 20, 20)',
    overflowY: 'scroll',
    display: 'flex',
  };

  return (
    <div className="layout" style={layoutStyle}>
      <Popular positionV="80px" />
      <Popular positionV="480px" />
      <Popular positionV="880px" />
      <Popular positionV="1280px" />
    </div>
  );
};

export default Layout;
