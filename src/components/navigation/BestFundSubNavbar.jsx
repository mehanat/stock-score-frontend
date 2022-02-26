import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const BestFundSubNavbar = () => {
  const [navState, setNavState] = useState('bestfunds')
  const navigate = useNavigate();

  return (
    <>
      <div className="subNavbar">
        <div className={`subNavbar__item ${navState == 'bestfunds' ? 'current' : ''}`} 
        onClick={() => {navigate('/')
         setNavState('bestfunds')}}>
          Best funds
        </div>
        <div className={`subNavbar__item ${navState == 'fundsentiment' ? 'current' : ''}`} 
        onClick={() => {
         setNavState('fundsentiment')}}
         >Funds sentiment</div>
        <div className={`subNavbar__item ${navState == 'consensus' ? 'current' : ''}`} 
        onClick={() => {
         setNavState('consensus')}}
         >Consensus holdings </div>
        <div className={`subNavbar__item ${navState == 'largest' ? 'current' : ''}`} 
        onClick={() => {
         setNavState('largest')}}
         >Largest buys/sells</div>
        <div className={`subNavbar__item ${navState == 'last' ? 'current' : ''}`} 
        onClick={() => {
         setNavState('last')}}
         >Last 13D/13G deals</div>
      </div>
      <hr />
    </>
  );
};

export default BestFundSubNavbar;
