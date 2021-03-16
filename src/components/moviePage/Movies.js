import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import useViewport from '../../hooks/useViewport';
import ButtonGroup from './ButtonGroup';
import Content from './Content';
import NameList from './NameList';

// 這是個別電影頁設計

const Movies = (props) => {
  // 參數網址
  const { match } = props;
  const { mediaWidth, mediaHeight } = useViewport();
  const [movieInfo, setMovieInfo] = useState([{ title: 'loading', content: 'loading' }]);
  const [castInfo, setCastInfo] = useState([null]);
  const [directorInfo, setDirectorInfo] = useState([null]);
  const backDropPath = `http://localhost:4000/images/backdrop/image_path_${match.params.movieId}/${match.params.movieId}_0.jpg`;
  const posterPath = `http://localhost:4000/images/poster/poster_path_${match.params.movieId}.jpg`;

  const posterSize = () => {
    const posterWidth = (200 / 550) * mediaWidth;
    const posterHeight = (300 / 550) * mediaWidth;
    return { posterWidth, posterHeight };
  };

  // layout
  const layoutStyle = {
    position: 'fixed',
    top: '0',
    width: `${mediaWidth}px`,
    height: `${mediaHeight}px`,
    left: '0px',
    backgroundColor: 'rgb(0, 0, 0)',
    overflowX: 'hidden',
  };

  // 主容器
  const coverStyle = {
    base: {
      background: 'rgb(0, 0, 0)',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
    },
    mobile: {
      height: '100%',
      width: `${mediaWidth + 17}px`,
      top: '0',
      marginLeft: '0',
      right: '-17px',
      overflowY: 'scroll',
    },
    tablet: {
      height: `${(533 / 800) * mediaWidth * 2.2}px`,
      width: `${mediaWidth + 17}px`,
      top: '0',
      marginLeft: '0',
      right: '-17px',
      overflowY: 'scroll',
    },
    laptopM: {
      height: `${533}px`,
      width: `${mediaWidth + 17}px`,
      right: '-17px',
      top: `${(mediaHeight - 533) / 2}px`,
      overflowY: 'scroll',
    },
    laptopL: {
      width: `${mediaWidth + 17}px`,
      height: `${(533 / 1200) * mediaWidth}px`,
      top: `${(mediaHeight - (533 / 1200) * mediaWidth) / 2}px`,
      right: '-17px',
      overflowY: 'scroll',
    },
  };

  // 背景照片
  const backDropStyle = {
    base: {
      position: 'relative',
      zIndex: '1',
    },
    mobile: {
      top: '0',
      left: '0',
      height: `${(533 / 800) * mediaWidth}px`,
      width: `${mediaWidth}px`,
    },
    tablet: {
      top: `${(mediaWidth - 600) / 2}px`,
      left: `${(mediaWidth - 600) / 2}px`,
      height: `${(533 / 800) * 600}px`,
      width: `${600}px`,
    },
    laptopM: {
      height: '533px',
      width: '800px',
      left: `${((mediaWidth - 800) / 2)}px`,
    },
    laptopL: {
      top: '0',
      height: `${(533 / 1200) * mediaWidth}px`,
      width: `${(800 / 1200) * mediaWidth}px`,
      left: `${(mediaWidth - (800 / 1200) * mediaWidth) / 2}px`,
    },
  };

  // 漸層
  const transpaStyle = {
    base: {
      background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1))',
      position: 'absolute',
      zIndex: '2',
    },
    mobile: {
      top: '0',
      left: '0',
      height: `${(533 / 800) * mediaWidth}px`,
      width: `${mediaWidth}px`,
    },
    tablet: {
      top: `${(mediaWidth - 600) / 2}px`,
      left: `${(mediaWidth - 600) / 2}px`,
      height: `${(533 / 800) * 600}px`,
      width: `${600}px`,
    },
    laptopM: {
      height: '533px',
      width: '800px',
      left: `${((mediaWidth - 800) / 2)}px`,
    },
    laptopL: {
      height: `${(533 / 1200) * mediaWidth}px`,
      width: `${(800 / 1200) * mediaWidth}px`,
      left: `${(mediaWidth - (800 / 1200) * mediaWidth) / 2}px`,
    },
  };

  // 海報
  const posterStyle = {
    base: {
      position: 'absolute',
      borderRadius: '10px 10px 10px 10px',
      zIndex: '4',
    },
    mobile: {
      boxShadow: '20px 20px 20px rgba(20, 20, 20, 0.7)',
      left: '10%',
      top: `${(533 / 800) * mediaWidth * 0.4}px`,
      width: `${(200 / 550) * mediaWidth}px`,
      height: `${(300 / 550) * mediaWidth}px`,
    },
    tablet: {
      boxShadow: '20px 20px 20px rgba(20, 20, 20, 0.7)',
      left: `${600 * 0.1 + ((mediaWidth - 600) / 2)}px`,
      top: `${(533 / 800) * 600 * 0.6 + ((mediaWidth - 600) / 2)}px`,
      width: `${(200 / 550) * 600}px`,
      height: `${(300 / 550) * 600}px`,
    },
    laptopM: {
      boxShadow: '30px 30px 30px rgba(0, 0, 0, 0.9)',
      left: `${((mediaWidth - 800) / 2) + 70}px`,
      top: `${140}px`,
      height: '300px',
      width: '200px',
    },
    laptopL: {
      boxShadow: '30px 30px 30px rgba(0, 0, 0, 0.9)',
      left: `${(((1 - 800 / 1200) * mediaWidth) / 2) + (70 / 1200) * mediaWidth}px`,
      top: `${(140 / 1200) * mediaWidth}px`,
      height: `${(300 / 1200) * mediaWidth}px`,
      width: `${(200 / 1200) * mediaWidth}px`,
    },
  };

  // 資訊欄
  const infoStyle = {
    base: {
      position: 'absolute',
      borderRadius: '30px 30px 30px 30px',
      zIndex: '3',
    },
    mobile: {
      top: `${(533 / 800) * mediaWidth * 0.9}px`,
      width: `${mediaWidth * 0.9}px`,
      height: `${(450 * mediaWidth) / 500}px`,
      left: `${mediaWidth * 0.05}px`,
      background: '#1e2126',
      boxShadow: '10px 10px 10px rgba(20, 20, 20, 0.8)',
    },
    tablet: {
      top: `${(533 / 800) * 600 * 0.9 + ((mediaWidth - 600) / 2)}px`,
      width: `${600 * 0.9}px`,
      height: `${(450 * 600) / 500}px`,
      left: `${600 * 0.05 + ((mediaWidth - 600) / 2)}px`,
      background: 'rgb(15, 15, 15)',
    },
    laptopM: {
      width: `${700}px`,
      height: '450px',
      left: `${((mediaWidth - 800) / 2) + 50}px`,
      top: '80px',
      background: 'rgba(0, 0, 0, 0.4)',
    },
    laptopL: {
      width: `${(700 / 1200) * mediaWidth}px`,
      height: `${(450 / 1200) * mediaWidth}px`,
      left: `${(((1 - 800 / 1200) * mediaWidth) / 2) + (50 / 1200) * mediaWidth}px`,
      top: `${(80 / 1200) * mediaWidth}px`,
      background: 'rgba(0, 0, 0, 0.4)',
    },
  };

  // 標題
  const titleStyle = {
    base: {
      position: 'absolute',
      zIndex: '3',
      color: 'rgb(200, 200, 200)',
      opacity: '1',
    },
    mobile: {
      top: '20%',
      width: `${mediaWidth * 0.9}px`,
      left: '5%',
      fontSize: `${(24 * mediaWidth) / 425}pt`,
    },
    tablet: {
      top: '15%',
      width: `${250}px`,
      left: '50%',
      fontSize: `${26}pt`,
    },
    laptopM: {
      top: '20px',
      width: '70%',
      left: '250px',
      fontSize: `${26}pt`,
    },
    laptopL: {
      top: `${(20 / 1200) * mediaWidth}px`,
      width: '70%',
      left: `${(250 / 1200) * mediaWidth}px`,
      fontSize: `${26 + ((30 - 26) / (1400 - 1200)) * (mediaWidth - 1200)}pt`,
    },
  };

  // 用來遮住卷軸
  const hideScrollStyle = {
    // height 為資訊欄的0.4 倍
    // width 為資訊欄的0.5 倍
    base: {
      overflowX: 'hidden',
      overflowY: 'hidden',
      position: 'absolute',
      padding: '0px, 0px, 0px, 0px',
    },
    mobile: {
      top: '55%',
      left: `${mediaWidth * 0.05 * 0.9}px`,
      width: `${mediaWidth * 0.9 * 0.9}px`,
      height: `${((450 * mediaWidth) / 500) * 0.4}px`,
      background: '#1e2126',
    },
    tablet: {
      top: '55%',
      left: `${600 * 0.05 * 0.9}px`,
      width: `${600 * 0.9 * 0.9}px`,
      height: `${((450 * 600) / 500) * 0.4}px`,
      background: 'rgb(15, 15, 15)',
    },
    laptopM: {
      top: '45%',
      left: '260px',
      width: `${800 * 0.5}px`,
      height: `${((450 * 600) / 500) * 0.4}px`,
      background: 'rgba(15, 15, 15, 0)',
    },
    laptopL: {
      top: '45%',
      left: `${(260 / 1200) * mediaWidth}px`,
      width: `${(800 / 1200) * mediaWidth * 0.5}px`,
      height: `${(450 / 1200) * mediaWidth * 0.4}px`,
      background: 'rgba(15, 15, 15, 0)',
    },
  };

  // 點擊按鈕顯示的div
  const buttonShowStyle = {
    // height 為資訊欄的0.4 倍
    // width 為資訊欄的0.5 倍
    base: {
      overflowY: 'scroll',
      overflowX: 'hidden',
      position: 'absolute',
    },
    mobile: {
      top: '0',
      right: '-17px',
      width: `${mediaWidth * 0.9 * 0.9 + 17}px`,
      height: `${((450 * mediaWidth) / 500) * 0.4}px`,
      background: '#1e2126',
    },
    tablet: {
      top: '0',
      right: '-17px',
      width: `${600 * 0.9 * 0.9 + 17}px`,
      height: `${((450 * 600) / 500) * 0.4}px`,
      background: 'rgb(15, 15, 15)',
    },
    laptopM: {
      top: '0',
      right: '-17px',
      width: `${800 * 0.5 + 17}px`,
      height: `${((450 * 600) / 500) * 0.4}px`,
      background: 'rgba(15, 15, 15, 0)',
    },
    laptopL: {
      top: '0',
      right: '-17px',
      width: `${(800 / 1200) * mediaWidth * 0.5 + 17}px`,
      height: `${(450 / 1200) * mediaWidth * 0.4}px`,
      background: 'rgba(15, 15, 15, 0)',
    },
  };

  const styleObjects = (
    _width,
    _coverStyle,
    _backDropStyle,
    _transpaStyle,
    _posterStyle,
    _infoStyle,
    _titleStyle,
    _buttonShowStyle,
    _hideScrollStyle,
  ) => {
    let cover = {};
    let backdrop = {};
    let transpa = {};
    let poster = {};
    let info = {};
    let title = {};
    let buttonShow = {};
    let hideScroll = {};
    if (_width <= 600) {
      cover = { ..._coverStyle.base, ..._coverStyle.mobile };
      backdrop = { ..._backDropStyle.base, ..._backDropStyle.mobile };
      transpa = { ..._transpaStyle.base, ..._transpaStyle.mobile };
      poster = { ..._posterStyle.base, ..._posterStyle.mobile };
      info = { ..._infoStyle.base, ..._infoStyle.mobile };
      title = { ..._titleStyle.base, ..._titleStyle.mobile };
      buttonShow = { ..._buttonShowStyle.base, ..._buttonShowStyle.mobile };
      hideScroll = { ..._hideScrollStyle.base, ..._hideScrollStyle.mobile };
    } else if (_width <= 800 && _width > 600) {
      cover = { ..._coverStyle.base, ..._coverStyle.tablet };
      backdrop = { ..._backDropStyle.base, ..._backDropStyle.tablet };
      transpa = { ..._transpaStyle.base, ..._transpaStyle.tablet };
      poster = { ..._posterStyle.base, ..._posterStyle.tablet };
      info = { ..._infoStyle.base, ..._infoStyle.tablet };
      title = { ..._titleStyle.base, ..._titleStyle.tablet };
      buttonShow = { ..._buttonShowStyle.base, ..._buttonShowStyle.tablet };
      hideScroll = { ..._hideScrollStyle.base, ..._hideScrollStyle.tablet };
    } else if (_width <= 1200 && _width > 800) {
      cover = { ..._coverStyle.base, ..._coverStyle.laptopM };
      backdrop = { ..._backDropStyle.base, ..._backDropStyle.laptopM };
      transpa = { ..._transpaStyle.base, ..._transpaStyle.laptopM };
      poster = { ..._posterStyle.base, ..._posterStyle.laptopM };
      info = { ..._infoStyle.base, ..._infoStyle.laptopM };
      title = { ..._titleStyle.base, ..._titleStyle.laptopM };
      buttonShow = { ..._buttonShowStyle.base, ..._buttonShowStyle.laptopM };
      hideScroll = { ..._hideScrollStyle.base, ..._hideScrollStyle.laptopM };
    } else if (_width > 1200) {
      cover = { ..._coverStyle.base, ..._coverStyle.laptopL };
      backdrop = { ..._backDropStyle.base, ..._backDropStyle.laptopL };
      transpa = { ..._transpaStyle.base, ..._transpaStyle.laptopL };
      poster = { ..._posterStyle.base, ..._posterStyle.laptopL };
      info = { ..._infoStyle.base, ..._infoStyle.laptopL };
      title = { ..._titleStyle.base, ..._titleStyle.laptopL };
      buttonShow = { ..._buttonShowStyle.base, ..._buttonShowStyle.laptopL };
      hideScroll = { ..._hideScrollStyle.base, ..._hideScrollStyle.laptopL };
    }
    return {
      cover, backdrop, transpa, poster, info, title, buttonShow, hideScroll,
    };
  };

  const moviePageStyle = styleObjects(
    mediaWidth,
    coverStyle,
    backDropStyle,
    transpaStyle,
    posterStyle,
    infoStyle,
    titleStyle,
    buttonShowStyle,
    hideScrollStyle,
  );

  // 接API 取得電影資訊
  const fetchMoviesData = () => (
    axios.get(`http://localhost:4000/moviePages/movies/${match.params.movieId}`)
      .then((res) => (res.data))
      .catch((error) => { console.log(error); })
  );

  useEffect(() => {
    const fetchData = async () => {
      const [movieData] = await Promise.all([
        fetchMoviesData(),
      ]);
      setMovieInfo(movieData.data[0]);
      setCastInfo(movieData.data[0].cast);
      setDirectorInfo(movieData.data[0].director);
    };
    fetchData();
  }, []);

  return (
    <div className="movie-page-layout" style={layoutStyle}>
      <div className="movie-page-cover" style={moviePageStyle.cover}>
        <img className="backdrop-img" src={backDropPath} alt="backdrop" style={moviePageStyle.backdrop} />
        <div className="movie-page-cover" style={moviePageStyle.transpa} />
        <img src={posterPath} alt="poster" style={moviePageStyle.poster} />
        <div style={moviePageStyle.info}>
          <h3 style={moviePageStyle.title}>{movieInfo.title}</h3>
          <ButtonGroup mediaWidth={mediaWidth} movieId={match.params.movieId} />
          <div style={moviePageStyle.hideScroll}>
            <div style={moviePageStyle.buttonShow}>
              <Switch>
                <Route
                  path="/movies/:movieId/content/"
                  component={() => <Content content={movieInfo.content} mediaWidth={mediaWidth} />}
                />
                <Route
                  path="/movies/:movieId/cast/"
                  component={() => <NameList nameList={castInfo} mediaWidth={mediaWidth} />}
                />
                <Route
                  path="/movies/:movieId/publish/"
                  component={() => <NameList nameList={directorInfo} mediaWidth={mediaWidth} />}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Movies.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Movies;
