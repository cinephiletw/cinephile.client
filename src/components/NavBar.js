import React from 'react';
import Icon from '../images/pngegg.png';
import useViewport from '../hooks/useViewport';
import SearchBox from './SearchBox';

const NavBar = (props) => {
  const { mediaWidth } = useViewport();
  const navStyle = {
    backgroundColor: 'rgb(0, 0, 0)',
    position: 'fixed',
    width: '100%',
    top: '0',
    left: '0',
    height: '50px',
  };

  return (
    <div>
      <div className="nav-bar" style={navStyle}>
        <SearchBox placeholder="Find some movies ..." />
      </div>
    </div>
  );
};
export default NavBar;
