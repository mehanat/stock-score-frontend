import {countProcent, sum} from '../../constants';
import ActionCard from './card-actions/ActionCard';
import BuyPrice from './card-actions/BuyPrice';

const HoldingTableCard = ({card}) => {
  return (
    <tr className="card__body" key={card.id}>
      <td className="security card__item">
        <div className="securityBox">
          <div className="securityBox__left">
            <div className="logo">
              <img src={card.shares.logo} alt="" style={{width: '30px'}} />
            </div>
          </div>
          <div className="securityBox__right">
            <div className="name">
              <span>{card.shares.name}</span>
              <span>{card.shares.companyName}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="portfolio card__item">{countProcent(card.portfolioPercentage)}%</td>
      <td className="marketValue card__item">${sum(card.markerValue)}</td>
      <td className="action card__item">
        <ActionCard
          title={card.changeType.title}
          increasePercentage={card.increasePercentage}
          increaseAbsolute={card.increaseAbsolute}
        />
      </td>
      <td className="buyPrice card__item">
        ${card.buyPrice}
        <BuyPrice
          className="buyPrice_proc"
          title={card.changeType.title}
          actualPrice={card.shares.actualPrice}
          buyPrice={card.buyPrice}
        />
      </td>
      <td className="currPrice card__item">${card.shares.actualPrice}</td>
      <td className="sector card__item">{card.shares.sector ? card.shares.sector.name : '-'}</td>
    </tr>
  );
};
export default HoldingTableCard;
