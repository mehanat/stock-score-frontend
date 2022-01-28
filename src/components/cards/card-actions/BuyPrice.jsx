import {countProcent} from '../../../constants';

const BuyPrice = ({title, actualPrice, buyPrice}) => {
  let color;
  let sign;
  if (title === 'Sold out' || title === 'Decrease') {
    color = 'red_title';
    if (title > 0) {
      sign = '-';
    }
  }
  if (title === 'Increase' || title === 'New purchase' || title == 'No change') {
    color = 'green_title';
    if (title > 0) {
      sign = '+';
    }
  }
  const result = ((actualPrice - buyPrice) / buyPrice).toFixed(3);
  return (
    <div className={`${color} buyPrice_proc`}>
      {sign}
      {countProcent(result)}%
      <img className="arrow" src="/images/right-arrow.png" alt="" width={20} />
    </div>
  );
};

export default BuyPrice;
