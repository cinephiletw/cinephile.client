import React from 'react';
import Icon from '../images/pngegg.png';

const NavBar = (props) => {
  const navStyle = {
    position: 'fixed',
    paddingTop: '13px',
    top: '0',
    left: '0',
    width: '100%',
    height: '80px',
    backgroundColor: 'rgb(0, 0, 0)',
    dixplay: 'flex',
    alignItems: 'center',
  };
  return (
    <div>
      <div className="nav-bar" style={navStyle} />
    </div>
  );
};
export default NavBar;
