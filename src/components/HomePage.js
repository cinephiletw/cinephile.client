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
      height: `${window.innerHeight - 50}px`,
    },
    laptop: {
      marginTop: '70px',
      height: `${window.innerHeight - 70}px`,
    },
  };

  const popularLabel = {
    base: {
      fontFamily: 'sans-serif',
      fontSize: '1.5em',
      fontWeight: '700',
      color: 'rgb(200, 200, 200)',
      marginLeft: '5%',
      height: '5px',
      width: `${mediaWidth}`,
    },
    mobile: {
      marginTop: '18px',
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
        <Popular positionV={1} />
        <Popular positionV={2} />
        <Popular positionV={3} />
        <Popular positionV={4} />
      </div>
    </div>
  );
};

export default HomePage;
