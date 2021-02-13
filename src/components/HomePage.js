import React from 'react';
import NavBar from './NavBar';
import SearchBox from './SearchBox';
import Layout from './Layout';

// 首頁，react 以component 為單位往下拆分，將元件寫在/component 資料夾內再export 出來使用
// component 命名皆為大寫開頭camel 式命名
// NavBar : 首頁上方工具欄
// SearchBox : 搜尋
// Layout : 主體

const HomePage = (props) => {
  const homeClass = 'homepage';

  return (
    <div className={homeClass}>
      <NavBar />
      <SearchBox placeholder="Find some movies ..." />
      <Layout />
    </div>
  );
};

export default HomePage;
