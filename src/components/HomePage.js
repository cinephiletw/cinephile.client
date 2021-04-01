import React from 'react';
import NavBar from './NavBar';
import MovieBar from './MovieBar';
import HomePageLabel from './HomePageLabel';
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

  const bottomStyle = {
    marginBottom: '1150px',
    height: '50px',
    color: 'rgb(0, 0, 0)',
    width: '100%',
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
        <MovieBar positionV={1} movieBarType="hot" />
        <MovieBar positionV={2} movieBarType="popular" />
        <MovieBar positionV={3} movieBarType="coming" />
        <div style={bottomStyle} />
      </div>
    </div>
  );
};

export default HomePage;
