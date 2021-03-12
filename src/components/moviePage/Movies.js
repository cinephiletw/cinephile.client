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

  const checkMedia = (_width) => {
    let infoHeight = 0;
    let coverHeight = 0;
    let titleSize = 0;
    let titleTop = 0;
    let titleLeft = 0;
    let contentSize = 0;
    let contentTop = 0;
    if (_width <= 425) {
      infoHeight = (450 * _width) / 425;
      coverHeight = ((1.5 * 500) * _width) / 425;
      titleSize = (24 * _width) / 425;
      titleTop = 20;
      titleLeft = 5;
      contentTop = 57;
      contentSize = (13 / 425) * _width;
    } else if (_width <= 768 && _width > 425) {
      contentSize = 12 + ((14 - 12) / (768 - 425)) * (_width - 425);
    }
    return {
      infoHeight, coverHeight, titleSize, titleTop, titleLeft, contentTop, contentSize,
    };
  };

  const media = checkMedia(mediaWidth);
  // layout
  const moviePageStyle = {
    position: 'fixed',
    top: '0',
    width: `${mediaWidth}px`,
    height: '100%',
    left: '0px',
    backgroundColor: 'rgb(0, 0, 0)',
    overflowY: 'scroll',
    overflowX: 'hidden',
  };
  // 主容器
  const coverStyle = {
    base: {
      background: 'rgb(0, 0, 0)',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: '1',
      height: '80%',
      width: '80%',
      overflow: 'hidden',
    },
    // 螢幕寬小於550px
    mobile: {
      background: 'rgb(0, 0, 0)',
      top: '0',
      marginLeft: '0',
      right: '-17px',
      position: 'absolute',
      height: `${media.coverHeight}px`,
      display: 'flex',
      flexDirection: 'column',
      width: `${mediaWidth + 17}px`,
      overflowX: 'hidden',
      overflowY: 'scroll',
    },
    tablet: {
    },
    laptop: {
    },
  };
  // 背景照片
  const backDropStyle = {
    // 螢幕寬小於 650px
    mobile: {
      position: 'relative',
      top: '0',
      left: '0',
      height: `${(533 / 800) * mediaWidth}px`,
      width: `${mediaWidth}px`,
      zIndex: '1',
    },
  };
  // 漸層
  const transpaStyle = {
    background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1))',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '2',
    height: `${(533 / 800) * mediaWidth}px`,
    width: `${mediaWidth}px`,
  };
  // 海報
  const posterStyle = {
    // 螢幕寬小於550px
    mobile: {
      position: 'absolute',
      left: '10%',
      top: `${(533 / 800) * mediaWidth * 0.4}px`,
      borderRadius: '10px 10px 10px 10px',
      height: `${posterSize().posterHeight}px`,
      width: `${posterSize().posterWidth}px`,
      boxShadow: '20px 20px 20px rgba(20, 20, 20, 0.7)',
      zIndex: '4',
    },
  };

  // 資訊欄
  const infoStyle = {
    top: `${(533 / 800) * mediaWidth * 0.9}px`,
    position: 'absolute',
    width: `${mediaWidth * 0.9}px`,
    height: `${media.infoHeight}px`,
    left: `${mediaWidth * 0.05}px`,
    background: '#1e2126',
    boxShadow: '10px 10px 10px rgba(20, 20, 20, 0.8)',
    borderRadius: '30px 30px 30px 30px',
    zIndex: '3',
  };

  // 標題
  const titleStyle = {
    position: 'absolute',
    top: `${media.titleTop}%`,
    width: `${mediaWidth * 0.9}`,
    left: `${media.titleLeft}%`,
    zIndex: '3',
    fontSize: `${media.titleSize}pt`,
    color: 'rgb(200, 200, 200)',
    opacity: '1',
  };
  // 點擊按鈕顯示的div
  const buttonShowStyle = {
    position: 'absolute',
    top: '55%',
    marginLeft: '5%',
    marginRight: '5%',
    background: '#1e2126',
    width: '90%',
    height: `${media.infoHeight * 0.4}px`,
  };
  // 電影公司
  const companyStyle = {
    position: 'absolute',
    top: '55%',
    left: '35%',
    width: '60%',
    zIndex: '3',
    fontSize: '12.5pt',
    color: '#FFFFFF',
    opacity: '1',
  };

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
    <div style={moviePageStyle}>
      <div style={coverStyle.mobile}>
        <img src={backDropPath} alt="backdrop" style={backDropStyle.mobile} />
        <div style={transpaStyle} />
        <img src={posterPath} alt="poster" style={posterStyle.mobile} />
        <div style={infoStyle}>
          <h3 style={titleStyle}>{movieInfo.title}</h3>
          <ButtonGroup mediaWidth={mediaWidth} movieId={match.params.movieId} />
          <div style={buttonShowStyle}>
            <Switch>
              <Route
                path="/movies/:movieId/content/"
                component={() => <Content content={movieInfo.content} />}
              />
              <Route
                path="/movies/:movieId/cast/"
                component={() => <NameList nameList={castInfo} />}
              />
              <Route
                path="/movies/:movieId/publish/"
                component={() => <NameList nameList={directorInfo} />}
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
