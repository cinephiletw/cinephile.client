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
  const { width } = useViewport();

  const testStyle = {
    display: 'none',
  };

  const popularStyle = {
    position: 'absolute',
    top: `${positionV}`,
    marginLeft: '3%',
    marginRight: '3%',
    width: '94%',
    height: '320px',
    backgroundColor: 'rgb(20, 20, 20)',
    borderRadius: '30px 30px 30px 30px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    scrollbarColor: 'rgb(0, 0, 0)',
  };

  const transpaStyle = {
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
    position: 'absolute',
    display: 'flex',
    zIndex: '3',
    right: '0px',
    top: '31px',
    height: '245px',
    width: '6%',
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
    width: '25px',
  };

  // react 中props 所傳的參數是唯讀，要寫可變參數要使用 useState 用法為
  // 宣告const [state, setState] = useState('state起始值')
  // state 為參數useState 為設定起始值
  // 要變更state 直接使用 setState()
  const [popularData, setPopularData] = useState([0]);
  const [move, setMove] = useState(0);

  // axios 是RESTful API 的使用方法用法如 fetchPopularMovies()
  const fetchPopularMovies = () => (
    axios.get('http://localhost:4000/popularMovies')
      .then((res) => (res.data))
      .catch((error) => { console.log(error); })
  );

  const handleClick = () => {
    if (move <= 10 * document.body.clientWidth) {
      setMove(move + document.body.clientWidth * 0.94 - document.body.clientWidth * 0.94 * 0.06);
    }
  };

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
        <MovieBlock img_type="poster" key={item} id={item} move={move} />
      ))}
    </div>
  );
};
// Eslint 建議使用props 時要用propTypes 限制傳入資料型態

Popular.propTypes = {
  positionV: propTypes.string.isRequired,
};
export default Popular;
