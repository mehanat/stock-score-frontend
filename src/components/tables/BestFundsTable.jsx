import React from 'react';
import {useSelector} from 'react-redux';
import BestFundTableCard from '../cards/BestFundTableCard';

const BestFundsTable = ({setRatingOrder, rating}) => {
  const founds = useSelector((state) => state.funds.funds);

  return (
    <>
      <table className="table">
        <thead className="table__header">
          <tr>
            <th className="rating table__header_item" onClick={() => setRatingOrder(!rating)}>
              Rating
              <img
                src={!rating ? '/images/arrow-down.png' : '/images/arrow-up.png'}
                alt=""
                width={17}
              />
            </th>
            <th className="headFund table__header_item">Hedge Fund</th>
            <th className="asset table__header_item">Asset Value</th>
            <th className="pref table__header_item">3-Y perf</th>
            <th className="holding table__header_item">Holdings #</th>
            <th className="mainSector table__header_item">Main Sector</th>
            <th className="lastReport table__header_item">Last report</th>
          </tr>
        </thead>
        <tbody>
          {founds && founds.map((card, index) => <BestFundTableCard card={card} key={index} />)}
        </tbody>
      </table>
    </>
  );
};

export default BestFundsTable;
