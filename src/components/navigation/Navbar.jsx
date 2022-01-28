import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const [navState, setNavState] = useState('funds');
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar">
        <div className="navbar__logo">
          <img src="/images/nav_logo.svg" alt="" />
        </div>
        <div className="navbar__list">
          <div
            className={`navbar__list_item ${navState == 'home' ? 'current' : ''}`}
            onClick={() => setNavState('home')}
          >
            Home
          </div>
          <div
            className={`navbar__list_item ${navState == 'stockScore' ? 'current' : ''}`}
            onClick={() => setNavState('stockScore')}
          >
            StockScore{' '}
          </div>
          <div
            className={`navbar__list_item ${navState == 'funds' ? 'current' : ''}`}
            onClick={() => {
              navigate('/');

              setNavState('funds');
            }}
          >
            Funds
          </div>
          <div
            className={`navbar__list_item ${navState == 'analysts' ? 'current' : ''}`}
            onClick={() => setNavState('analysts')}
          >
            Analysts
          </div>
          <div
            className={`navbar__list_item ${navState == 'insiders' ? 'current' : ''}`}
            onClick={() => setNavState('insiders')}
          >
            Insiders{' '}
          </div>
          <div
            className={`navbar__list_item ${navState == 'other' ? 'current' : ''}`}
            onClick={() => setNavState('other')}
          >
            Other
          </div>
        </div>
        <div className="navbar__login">
          <span></span>
          <img src="/images/nav_login.svg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
