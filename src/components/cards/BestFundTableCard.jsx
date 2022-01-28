import React, {useRef} from 'react';
import {useEffect} from 'react';
import {useCallback} from 'react';
import Chart from '../charts/Chart';
import {useNavigate} from 'react-router-dom';
import {sum} from '../../constants';
import RatingCard from './card-actions/RatingCard';
import SectorCard from './card-actions/SectorCard';
import {useState} from 'react';

const BestFundTableCard = ({card}) => {
  const navigte = useNavigate();

  const calc = useCallback(() => {
    const result = card.history.map((el) => {
      return {
        name: el[0],
        value: el[1],
      };
    });
    return result;
  }, [card]);

  return (
    <>
      <tr className="card__body" key={card.id} onClick={() => navigte(`fund/${card.fund.cik}`)}>
        <td className="rating card__item">
          <div>
            <RatingCard rating={card.rating} />
          </div>
        </td>
        <td className="headFund card__item">
          <div className="headFund__body">
            <span>{card.fund.name}</span>
            <span className="fundName">{card.fund.headName}</span>
          </div>
        </td>
        <td className="asset card__item">${sum(card.totalSum)}</td>
        <td className="pref card__item">
          {card.history ? (
            <Chart width={200} height={50} oneLine={true} data={card.history.map(h => {
              return {name: h[0], value: h[1]}
            })} firstLineKey={'value'} />
          ) : null}
        </td>
        <td className="holding card__item">{card.sharesCount}</td>
        <td className="mainSector card__item">
          <div className="mainSectorCard">
            <div className="mainSector__left">
              <SectorCard mainSector={card.mainSector.name} />
            </div>
            <div className="mainSector__right">{card.mainSector ? card.mainSector.name : '-'}</div>
          </div>
        </td>
        <td className="lastReport card__item">{`${card.quartal}Q${card.year}`}</td>
      </tr>
    </>
  );
};

export default BestFundTableCard;
