import React, { useState, useEffect } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import MovieBlock from './MovieBlock';

const Popular = (props) => {
  // 使用props 傳入值，要先宣告
  const { positionV } = props;
  const popularStyle = {
    position: 'absolute',
    top: `${positionV}`,
    marginLeft: '3%',
    marginRight: '3%',
    width: '94%',
    height: '320px',
    backgroundColor: 'rgb(20, 20, 20)',
    borderRadius: '30px 30px 30px 30px',
    overflowX: 'scroll',
    display: 'flex',
    flexDirection: 'row',
  };

  // react 中props 所傳的參數是唯讀，要寫可變參數要使用 useState 用法為
  // 宣告const [state, setState] = useState('state起始值')
  // state 為參數useState 為設定起始值
  // 要變更state 直接使用 setState()
  const [popularData, setPopularData] = useState([0]);

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
      const idList = Object.values(popularMovies.popularData).map((item) => (item.id));
      setPopularData(idList);
    };
    fetchData();
  }, []);

  return (
    <div className="popular-movies" style={popularStyle}>
      { popularData.slice(5).map((item) => (
        <MovieBlock img_type="poster" key={item} id={item} />
      ))}
    </div>
  );
};
// Eslint 建議使用props 時要用propTypes 限制傳入資料型態

Popular.propTypes = {
  positionV: propTypes.string.isRequired,
};
export default Popular;
