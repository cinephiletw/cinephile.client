import React, { useState, useEffect } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MovieBlock from './MovieBlock';
import HomePageLabel from './HomePageLabel';
import useViewport from '../hooks/useViewport';

const MovieBar = (props) => {
  // 使用props 傳入值，要先宣告
  const { positionV } = props;
  const { movieBarType } = props;
  const { mediaWidth } = useViewport();

  // react 中props 所傳的參數是唯讀，要寫可變參數要使用 useState 用法為
  // 宣告const [state, setState] = useState('state起始值')
  // state 為參數useState 為設定起始值
  // 要變更state 直接使用 setState()
  const [movieBarData, setMovieBarData] = useState([0]);
  const [clickCount, setClickCount] = useState(0);

  // 判斷分類電影匡在不同裝置的高度
  // width 是瀏覽器尺寸
  // maxPosterWidth 是海報最大寬度
  const mediaCheck = (width, maxPosterWidth) => {
    let currentPosterWidth;
    let movieCount;
    let labelHeight;
    if (width <= 425) {
      currentPosterWidth = width * ((maxPosterWidth) / 425);
      movieCount = 2;
      labelHeight = 60;
    } else if (width <= 650 && width > 425) {
      currentPosterWidth = maxPosterWidth * 0.7 + ((maxPosterWidth * 0.3) / 225) * (width - 425);
      movieCount = 3;
      labelHeight = 60;
    } else if (width <= 850 && width > 650) {
      currentPosterWidth = maxPosterWidth * 0.8 + ((maxPosterWidth * 0.2) / 200) * (width - 650);
      movieCount = 4;
      labelHeight = 60;
    } else if (width <= 1050 && width > 850) {
      currentPosterWidth = maxPosterWidth * 0.8 + ((maxPosterWidth * 0.2) / 200) * (width - 850);
      movieCount = 5;
      labelHeight = 60;
    } else if (width <= 1300 && width > 1050) {
      currentPosterWidth = maxPosterWidth * 0.9 + ((maxPosterWidth * 0.1) / 250) * (width - 1050);
      movieCount = 6;
      labelHeight = 100;
    } else {
      currentPosterWidth = (maxPosterWidth + 20) * 0.85;
      currentPosterWidth += ((maxPosterWidth * 0.15) / 200) * (width - 1300);
      movieCount = 7;
      labelHeight = 100;
    }
    return { currentPosterWidth, movieCount, labelHeight };
  };

  const checkMedia = mediaCheck(mediaWidth, 180);
  const posterWidth = checkMedia.currentPosterWidth;
  const labelH = checkMedia.labelHeight;
  const movieBarWidth = (posterWidth + 5) * checkMedia.movieCount - 5;

  const homePageMovieStyle = {
    position: 'absolute',
    left: '0',
    marginTop: `${(positionV - 1) * posterWidth * (3 / 2) + (positionV - 1) * labelH}px`,
    height: `${posterWidth * (3 / 2) + labelH}px`,
    width: `${mediaWidth}px`,
  };

  const movieBarStyle = {
    position: 'absolute',
    marginLeft: `${(mediaWidth - movieBarWidth) / 2}px`,
    marginRight: `${((mediaWidth - movieBarWidth) / 2) + 17}px`,
    top: `${labelH}px`,
    width: `${movieBarWidth}px`,
    height: `${posterWidth * (3 / 2)}px`,
    backgroundColor: 'rgb(20, 20, 20)',
    borderRadius: '10px 10px 10px 10px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    scrollbarColor: 'rgb(0, 0, 0)',
  };

  const transpaStyle = {
    base: {
      background: 'linear-gradient(90deg, rgba(18, 18, 18, 0), rgba(18, 18, 18, 1))',
      position: 'absolute',
      zIndex: '3',
      top: `${labelH}px`,
      height: `${posterWidth * (3 / 2)}px`,
      width: `${(mediaWidth - movieBarWidth) / 2}px`,
      overflow: 'hidden',
      borderRadius: '10px 0px 0px 10px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    next: {
      display: `${
        checkMedia.movieCount * (clickCount + 1) >= movieBarData.length
          ? 'none'
          : 'flex'
      }`,
      right: '0px',
    },
    pre: {
      display: `${clickCount > 0 ? 'flex' : 'none'}`,
      left: '0px',
    },
  };

  const clickStyle = {
    base: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
    },
    next: {
      right: '0px',
    },
    pre: {
      left: '0px',
    },
  };

  const iconStyle = {
    base: {
      color: 'rgb(220, 220, 220)',
      height: '40px',
      width: `${(mediaWidth - movieBarWidth) / 4}px`,
    },
    next: {
      transform: 'rotate(0deg)',
    },
    pre: {
      transform: 'rotate(180deg)',
    },
  };

  const posterSize = [
    posterWidth * (3 / 2),
    posterWidth,
  ];

  const handleNext = () => {
    setClickCount(clickCount + 1);
  };

  const handlePre = () => {
    setClickCount(clickCount - 1);
  };

  // axios 是RESTful API 的使用方法用法如 fetchPopularMovies()
  const fetchMovieBarMovies = () => (
    axios.get(`http://localhost:4000/${movieBarType}Movies`)
      .then((res) => (res.data))
      .catch((error) => { console.log(error); })
  );

  // useEffect 為設定頁面起始，在render 執行
  useEffect(() => {
    const fetchData = async () => {
      const [movieBarMovies] = await Promise.all([
        fetchMovieBarMovies(),
      ]);
      let idList;
      if (movieBarType === 'popular') {
        idList = Object.values(movieBarMovies.popularData).map((item) => (item.movie_id));
      } else if (movieBarType === 'hot') {
        idList = Object.values(movieBarMovies.hotData).map((item) => (item.movie_id));
      } else if (movieBarType === 'coming') {
        idList = Object.values(movieBarMovies.comingData).map((item) => (item.movie_id));
      }
      setMovieBarData(idList);
    };
    fetchData();
  }, []);

  return (
    <div className="home-page-movies" style={homePageMovieStyle}>
      <HomePageLabel labelType={movieBarType} mediaWidth={mediaWidth} />
      <div
        className="next-transparent"
        style={{ ...transpaStyle.base, ...transpaStyle.next }}
      >
        <button
          className="next-button"
          type="button"
          style={{ ...clickStyle.base, ...clickStyle.next }}
          onClick={handleNext}
        >
          <div>
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              style={{ ...iconStyle.base, ...iconStyle.next }}
            />
          </div>
        </button>
      </div>
      <div className="movie-bar-movies" style={movieBarStyle}>
        { movieBarData.map((item) => (
          <MovieBlock
            img_type="poster"
            key={item}
            id={item}
            movieCount={checkMedia.movieCount}
            posterSize={posterSize}
            clickCount={clickCount}
          />
        ))}
      </div>
      <div
        className="pre-transparent"
        style={{ ...transpaStyle.base, ...transpaStyle.pre }}
      >
        <button
          className="pre-button"
          type="button"
          style={{ ...clickStyle.base, ...clickStyle.pre }}
          onClick={handlePre}
        >
          <div>
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              style={{ ...iconStyle.base, ...iconStyle.pre }}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
// Eslint 建議使用props 時要用propTypes 限制傳入資料型態

MovieBar.propTypes = {
  positionV: propTypes.number.isRequired,
  movieBarType: propTypes.string.isRequired,
};
export default MovieBar;
