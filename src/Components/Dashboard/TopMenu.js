import React from 'react';
import logoutImg from '../../img/logout.svg';

var Boolean = false;

function contentDb(left, width) {
  document.querySelector('.menu-dashboard').style.display = left;
  Boolean=!Boolean
}
function showAdmin() {
  if (Boolean) {
    contentDb("none","100%")
  }
  else {
    contentDb("block","80%")
  }
}

const logOut = () => {
  sessionStorage.removeItem('userData')
  window.location.pathname = ('/')
}

const TopMenu = () => {
  return(
    <header className="header-dashboard">
      <span className="header-dashboard__logo">
        <a href="#" onClick={(e) => {
          e.preventDefault();
          showAdmin();
        }}>Admin</a>
      </span>
      <span className="header-dashboard__logout">
        <img src={logoutImg} alt="logo" onClick={logOut}/>
      </span>
    </header>
  )
}

export default TopMenu;