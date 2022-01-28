import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import FundFilters from '../filters/FundFilters';
import Performance from '../tables/Performance';

const FundSubNavbar = ({setPage}) => {
  return (
    <>
      <div className="fund_subNavbar">
        <div className="subNavbar__item" onClick={() => setPage('FundFilters')}>
          Holdings
        </div>
        <div className="subNavbar__item" onClick={() => setPage('Performance')}>
          Performance
        </div>
        <div className="subNavbar__item">Top deals</div>
        <div className="subNavbar__item">Last 13D/13G</div>
        <div className="subNavbar__item">Sector allocation</div>
        <div className="subNavbar__item">Info</div>
      </div>
      <hr />
    </>
  );
};

export default FundSubNavbar;
