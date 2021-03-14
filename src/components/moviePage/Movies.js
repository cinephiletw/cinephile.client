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
  const { mediaWidth } = useViewport();
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
    height: '100%',
    left: '0px',
    backgroundColor: 'rgb(0, 0, 0)',
    overflowX: 'hidden',
  };

  // 主容器
  const coverStyle = {
    base: {
      top: '0',
      marginLeft: '0',
      background: 'rgb(0, 0, 0)',
      right: '-17px',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
      overflowY: 'scroll',
    },
    mobile: {
      height: '100%',
      width: `${mediaWidth + 17}px`,
    },
    tablet: {
      height: `${(533 / 800) * mediaWidth * 1.6}px`,
      width: `${mediaWidth + 17}px`,
    },
    laptop: {
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
  };

  // 海報
  const posterStyle = {
    base: {
      position: 'absolute',
      boxShadow: '20px 20px 20px rgba(20, 20, 20, 0.7)',
      borderRadius: '10px 10px 10px 10px',
      zIndex: '4',
    },
    mobile: {
      left: '10%',
      top: `${(533 / 800) * mediaWidth * 0.4}px`,
      width: `${(200 / 550) * mediaWidth}px`,
      height: `${(300 / 550) * mediaWidth}px`,
    },
    tablet: {
      left: `${600 * 0.1 + ((mediaWidth - 600) / 2)}px`,
      top: `${(533 / 800) * 600 * 0.6 + ((mediaWidth - 600) / 2)}px`,
      width: `${(200 / 550) * 600}px`,
      height: `${(300 / 550) * 600}px`,
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
      top: '20%',
      width: `${250}px`,
      left: '50%',
      fontSize: `${26}pt`,
    },
  };

  // 點擊按鈕顯示的div
  const buttonShowStyle = {
    base: {
      overflowY: 'scroll',
      position: 'absolute',
    },
    mobile: {
      top: '55%',
      marginLeft: '5%',
      marginRight: '5%',
      width: '90%',
      height: `${((450 * mediaWidth) / 500) * 0.4}px`,
      background: '#1e2126',
    },
    tablet: {
      top: '55%',
      marginLeft: '5%',
      marginRight: '5%',
      width: '90%',
      height: `${((450 * 600) / 500) * 0.4}px`,
      background: 'rgb(15, 15, 15)',
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
  ) => {
    let cover = {};
    let backdrop = {};
    let transpa = {};
    let poster = {};
    let info = {};
    let title = {};
    let buttonShow;
    if (_width <= 600) {
      cover = { ..._coverStyle.base, ..._coverStyle.mobile };
      backdrop = { ..._backDropStyle.base, ..._backDropStyle.mobile };
      transpa = { ..._transpaStyle.base, ..._transpaStyle.mobile };
      poster = { ..._posterStyle.base, ..._posterStyle.mobile };
      info = { ..._infoStyle.base, ..._infoStyle.mobile };
      title = { ..._titleStyle.base, ..._titleStyle.mobile };
      buttonShow = { ..._buttonShowStyle.base, ..._buttonShowStyle.mobile };
    } else if (_width <= 800 && _width > 600) {
      cover = { ..._coverStyle.base, ..._coverStyle.tablet };
      backdrop = { ..._backDropStyle.base, ..._backDropStyle.tablet };
      transpa = { ..._transpaStyle.base, ..._transpaStyle.tablet };
      poster = { ..._posterStyle.base, ..._posterStyle.tablet };
      info = { ..._infoStyle.base, ..._infoStyle.tablet };
      title = { ..._titleStyle.base, ..._titleStyle.tablet };
      buttonShow = { ..._buttonShowStyle.base, ..._buttonShowStyle.tablet };
    }
    return {
      cover, backdrop, transpa, poster, info, title, buttonShow,
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
    <div style={layoutStyle}>
      <div style={moviePageStyle.cover}>
        <img src={backDropPath} alt="backdrop" style={moviePageStyle.backdrop} />
        <div style={moviePageStyle.transpa} />
        <img src={posterPath} alt="poster" style={moviePageStyle.poster} />
        <div style={moviePageStyle.info}>
          <h3 style={moviePageStyle.title}>{movieInfo.title}</h3>
          <ButtonGroup mediaWidth={mediaWidth} movieId={match.params.movieId} />
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
