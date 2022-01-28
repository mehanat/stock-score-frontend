import React from 'react';
import {useNavigate} from 'react-router-dom';

const BestFundSubNavbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="subNavbar">
        <div className="subNavbar__item" onClick={() => navigate('/')}>
          Best funds
        </div>
        <div className="subNavbar__item">Funds sentiment</div>
        <div className="subNavbar__item">Consensus holdings </div>
        <div className="subNavbar__item">Largest buys/sells</div>
        <div className="subNavbar__item">Last 13D/13G deals</div>
      </div>
      <hr />
    </>
  );
};

export default BestFundSubNavbar;
