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
  // maxHeight 是海報在1024px 以上最大高度
  // maxHeight * 0.9 為768px 以下最大高度
  // close 的高度為maxHeight( or maxHeight * 0.9) * 0.85
  const mediaCheck = (width, maxHeight) => {
    let ans;
    let transAns;
    const secondHeight = maxHeight * 0.9;
    if (width <= 425) {
      ans = width * ((secondHeight) / 425);
      transAns = width * 0.13;
    } else if (width <= 600 && width > 425) {
      ans = secondHeight * 0.7 + ((secondHeight * 0.3) / 175) * (width - 425);
      transAns = width * 0.08;
    } else if (width <= 800 && width > 600) {
      ans = secondHeight * 0.73 + ((secondHeight * 0.27) / 200) * (width - 600);
      transAns = width * 0.075;
    } else if (width <= 1000 && width > 800) {
      ans = secondHeight * 0.8 + ((secondHeight * 0.2) / 200) * (width - 800);
      transAns = width * 0.063;
    } else if (width <= 1200 && width > 1000) {
      ans = secondHeight * 0.85 + ((secondHeight * 0.15) / 200) * (width - 1000);
      transAns = maxHeight * (2 / 3) * 0.3;
    } else {
      ans = (maxHeight + 20) * 0.85 + (((maxHeight + 20) * 0.15) / 200) * (width - 1200);
      transAns = maxHeight * (2 / 3) * 0.3;
    }
    return { ans, transAns };
  };
  const checkMediaOpen = mediaCheck(mediaWidth, 310);
  const mediaHeightOpen = checkMediaOpen.ans;
  const transWidthOpen = checkMediaOpen.transAns;
  const checkMediaClose = mediaCheck(mediaWidth, 280);
  const mediaHeightClose = checkMediaClose.ans;
  const transWidthClose = checkMediaOpen.transAns;

  const popularStyle = {
    position: 'absolute',
    marginTop: `${positionV}`,
    marginLeft: `${mediaWidth * 0.03}px`,
    marginRight: `${mediaWidth * 0.03 + 17}px`,
    width: `${mediaWidth * 0.94 + 17}px`,
    height: `${mediaHeightOpen}px`,
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
    height: `${mediaHeightOpen}px`,
    width: `${transWidthOpen}px`,
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
    width: `${mediaWidth * 0.05}px`,
  };

  // react 中props 所傳的參數是唯讀，要寫可變參數要使用 useState 用法為
  // 宣告const [state, setState] = useState('state起始值')
  // state 為參數useState 為設定起始值
  // 要變更state 直接使用 setState()
  const [popularData, setPopularData] = useState([0]);
  const [move, setMove] = useState(0);

  const closeSize = [
    `${mediaHeightClose}px`,
    `${mediaHeightClose * (2 / 3)}px`,
    `${(mediaHeightOpen - mediaHeightClose) / 2}px`,
  ];
  const openSize = [
    `${mediaHeightOpen}px`,
    `${mediaHeightOpen * (2 / 3)}px`,
    '0px',
  ];

  const handleClick = () => {
    if (move <= 10 * document.body.clientWidth) {
      setMove(move + document.body.clientWidth * 0.94 - document.body.clientWidth * 0.94 * 0.06);
    }
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
    <div className="popular-movies" style={popularStyle}>
      <div className="transparent" style={transpaStyle}>
        <button type="button" style={clickStyle} onClick={handleClick}>
          <div>
            <FontAwesomeIcon icon={faAngleDoubleRight} style={iconStyle} />
          </div>
        </button>
      </div>
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
  );
};
// Eslint 建議使用props 時要用propTypes 限制傳入資料型態

Popular.propTypes = {
  positionV: propTypes.string.isRequired,
};
export default Popular;
