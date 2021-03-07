import React, { useState, useEffect } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MovieBlock from './MovieBlock';
import useViewport from '../hooks/useViewport';

const Popular = (props) => {
  // 使用props 傳入值，要先宣告
  const { positionV } = props;
  const { mediaWidth } = useViewport();

  // 判斷分類電影匡在不同裝置的高度
  // width 是瀏覽器尺寸
  // maxPosterWidth 是海報最大寬度
  const mediaCheck = (width, maxPosterWidth) => {
    let currentPosterWidth;
    let movieCount;
    if (width <= 425) {
      currentPosterWidth = width * ((maxPosterWidth) / 425);
      movieCount = 2;
    } else if (width <= 650 && width > 425) {
      currentPosterWidth = maxPosterWidth * 0.7 + ((maxPosterWidth * 0.3) / 225) * (width - 425);
      movieCount = 3;
    } else if (width <= 850 && width > 650) {
      currentPosterWidth = maxPosterWidth * 0.8 + ((maxPosterWidth * 0.2) / 200) * (width - 650);
      movieCount = 4;
    } else if (width <= 1050 && width > 850) {
      currentPosterWidth = maxPosterWidth * 0.8 + ((maxPosterWidth * 0.2) / 200) * (width - 850);
      movieCount = 5;
    } else if (width <= 1300 && width > 1050) {
      currentPosterWidth = maxPosterWidth * 0.9 + ((maxPosterWidth * 0.1) / 250) * (width - 1050);
      movieCount = 6;
    } else {
      currentPosterWidth = (maxPosterWidth + 20) * 0.85;
      currentPosterWidth += ((maxPosterWidth * 0.15) / 200) * (width - 1300);
      movieCount = 7;
    }
    return { currentPosterWidth, movieCount };
  };
  const checkMediaOpen = mediaCheck(mediaWidth, 310);
  const mediaHeightOpen = checkMediaOpen.currentPosterWidth;
  const checkMediaClose = mediaCheck(mediaWidth, 180);
  const mediaHeightClose = checkMediaClose.currentPosterWidth;
  const popularWidth = (mediaHeightClose + 5) * checkMediaClose.movieCount - 5;

  const homePageMovieStyle = {
    position: 'absolute',
    left: '0',
    marginTop: `${(positionV - 1) * mediaHeightOpen + positionV * 60}px`,
    height: `${mediaHeightClose * (3 / 2)}px`,
    width: `${mediaWidth}px`,
  };
  const popularStyle = {
    position: 'absolute',
    marginLeft: `${(mediaWidth - popularWidth) / 2}px`,
    marginRight: `${((mediaWidth - popularWidth) / 2) + 17}px`,
    width: `${popularWidth}px`,
    height: `${mediaHeightClose * (3 / 2)}px`,
    backgroundColor: 'rgb(20, 20, 20)',
    borderRadius: '10px 10px 10px 10px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    scrollbarColor: 'rgb(0, 0, 0)',
  };

  const transpaStyle = {
    background: 'linear-gradient(90deg, rgba(18, 18, 18, 0), rgba(18, 18, 18, 1))',
    position: 'absolute',
    display: 'flex',
    zIndex: '3',
    right: '0px',
    top: '0px',
    height: `${mediaHeightClose * (3 / 2)}px`,
    width: `${(mediaWidth - popularWidth) / 2}px`,
    overflow: 'hidden',
    borderRadius: '10px 0px 0px 10px',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const clickStyle = {
    position: 'absolute',
    right: '0px',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',

  };

  const iconStyle = {
    color: 'rgb(220, 220, 220)',
    height: '40px',
    width: `${(mediaWidth - popularWidth) / 4}px`,
  };

  // react 中props 所傳的參數是唯讀，要寫可變參數要使用 useState 用法為
  // 宣告const [state, setState] = useState('state起始值')
  // state 為參數useState 為設定起始值
  // 要變更state 直接使用 setState()
  const [popularData, setPopularData] = useState([0]);
  const [move, setMove] = useState(0);

  const closeSize = [
    `${mediaHeightClose * (3 / 2)}px`,
    `${mediaHeightClose}px`,
    `${0}px`,
  ];
  const openSize = [
    `${mediaHeightClose * (3 / 2)}px`,
    `${mediaHeightClose}px`,
    `${0}px`,
  ];

  const handleNext = () => {
    setMove(move + popularWidth + 5);
  };

  // axios 是RESTful API 的使用方法用法如 fetchPopularMovies()
  const fetchPopularMovies = () => (
    axios.get('http://localhost:4000/popularMovies')
      .then((res) => (res.data))
      .catch((error) => { console.log(error); })
  );

  // useEffect 為設定頁面起始，在render 執行
  useEffect(() => {
    const fetchData = async () => {
      const [popularMovies] = await Promise.all([
        fetchPopularMovies(),
      ]);
      const idList = Object.values(popularMovies.popularData).map((item) => (item.movie_id));
      setPopularData(idList);
    };
    fetchData();
  }, []);

  return (
    <div className="home-page-movies" style={homePageMovieStyle}>
      <div className="transparent" style={transpaStyle}>
        <button type="button" style={clickStyle} onClick={handleNext}>
          <div>
            <FontAwesomeIcon icon={faAngleDoubleRight} style={iconStyle} />
          </div>
        </button>
      </div>
      <div className="popular-movies" style={popularStyle}>
        { popularData.map((item) => (
          <MovieBlock
            img_type="poster"
            key={item}
            id={item}
            move={move}
            closeSize={closeSize}
            openSize={openSize}
          />
        ))}
      </div>
    </div>
  );
};
// Eslint 建議使用props 時要用propTypes 限制傳入資料型態

Popular.propTypes = {
  positionV: propTypes.number.isRequired,
};
export default Popular;
