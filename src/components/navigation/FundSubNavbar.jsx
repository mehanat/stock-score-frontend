import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import FundFilters from '../filters/FundFilters';
import Performance from '../tables/Performance';

const FundSubNavbar = ({setPage}) => {
  const [navState, setNavState] = useState('holdings')
  return (
    <>
      <div className="fund_subNavbar">
        <div className={`subNavbar__item ${navState == 'holdings' ? 'current' : ''}`}  onClick={() => {setPage('FundFilters')
        setNavState('holdings')}}>
          Holdings
        </div>
        <div className={`subNavbar__item ${navState == 'performance' ? 'current' : ''}`}  onClick={() => {setPage('Performance')
        setNavState('performance')
        }}>
          Performance
        </div>
        <div className={`subNavbar__item ${navState == 'deals' ? 'current' : ''}`} 
        onClick={() => {
          setNavState('deals')
        }}
        >Top deals</div>
        <div className={`subNavbar__item ${navState == 'last' ? 'current' : ''}`} 
        onClick={() => {
          setNavState('last')
        }}
        >Last 13D/13G</div>
        <div className={`subNavbar__item ${navState == 'sector' ? 'current' : ''}`} 
        onClick={() => {
          setNavState('sector')
        }}
        >Sector allocation</div>
        <div className={`subNavbar__item ${navState == 'info' ? 'current' : ''}`} 
        onClick={() => {
          setNavState('info')
        }}
        >Info</div>
      </div>
      <hr />
    </>
  );
};

export default FundSubNavbar;
