import React from 'react';
import NavBar from './NavBar';
import Popular from './Popular';
import useViewport from '../hooks/useViewport';

// 首頁，react 以component 為單位往下拆分，將元件寫在/component 資料夾內再export 出來使用
// component 命名皆為大寫開頭camel 式命名
// NavBar : 首頁上方工具欄
// SearchBox : 搜尋

const HomePage = (props) => {
  const { mediaWidth, mediaHeight } = useViewport();
  const homeStyle = {
    position: 'fixed',
    top: '0',
    width: `${mediaWidth}px`,
    height: '100%',
    // 隱藏卷軸-17像素
    left: '0px',
    backgroundColor: 'rgb(20, 20, 20)',
    overflowY: 'hidden',
  };

  const homeMovieStyle = {
    base: {
      position: 'fixed',
      width: `${mediaWidth + 17}px`,
      overflowY: 'scroll',
      right: '-17px',
      display: 'flex',
    },
    mobile: {
      marginTop: '50px',
      height: `${mediaHeight - 50}px`,
    },
    laptop: {
      marginTop: '70px',
      height: `${mediaHeight - 70}px`,
    },
  };

  const popularLabel = {
    base: {
      fontFamily: 'sans-serif',
      fontSize: '1.5em',
      fontWeight: '700',
      color: 'rgb(200, 200, 200)',
      marginLeft: '6%',
      height: '5px',
    },
    mobile: {
      marginTop: '20px',
    },
  };

  return (
    <div className="layout" style={homeStyle}>
      <NavBar />
      <div
        className="homePageMovieBlock"
        style={
          mediaWidth < 1024
            ? { ...homeMovieStyle.base, ...homeMovieStyle.mobile }
            : { ...homeMovieStyle.base, ...homeMovieStyle.laptop }
        }
      >
        <h2 style={{ ...popularLabel.base, ...popularLabel.mobile }}>現正熱映中</h2>
        <Popular positionV="50px" />
        <Popular positionV="480px" />
        <Popular positionV="880px" />
        <Popular positionV="1280px" />
      </div>
    </div>
  );
};

export default HomePage;
