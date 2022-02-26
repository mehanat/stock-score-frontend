import {useSelector} from 'react-redux';
import HoldingTableCard from '../cards/HoldingTableCard';

const HoldingTable = ({sortOrder, setSortOrder, sortColumn, setSortColumn}) => {
  const holdings = useSelector((state) => state.holdings.holdings);

  const changeSortVal = (curSortOrder, curSortColumn, columnClicked) => {
    if (curSortOrder === 'ASC') {
      if (curSortColumn === columnClicked) {
        setSortOrder('DESC')
      } else {
        setSortColumn(columnClicked)
      }
    } else {
      setSortOrder('ASC')
      if (curSortOrder !== columnClicked) {
        setSortColumn(columnClicked)
      }
    }
  }

  return (
    <>
      <table className="table">
        <thead className="table__header">
          <tr>
            <th className="security table__header_item">Security</th>
            <th
              className="portfolio table__header_item"
              onClick={() => changeSortVal(sortOrder, sortColumn, 'percOnPortfolioOrder')}
            >
              % Of Portfolio{' '}
              <img
                src={sortColumn === 'percOnPortfolioOrder' ? (sortOrder === 'DESC' ? '/images/arrow-down.png' : '/images/arrow-up.png') : ''}
                alt=""
                width={20}
              />
            </th>
            <th
              className="marketValue table__header_item"
              onClick={() => changeSortVal(sortOrder, sortColumn, 'valueOrder')}
            >
              Market Value
              <img
                src={sortColumn === 'valueOrder' ? (sortOrder === 'DESC' ? '/images/arrow-down.png' : '/images/arrow-up.png') : ''}
                alt=""
                width={20}
              />
            </th>
            <th className="action table__header_item">Action</th>
            <th className="buyPrice table__header_item">Buy Price</th>
            <th className="buyPrice__procent table__header_item"/>
            <th className="currPrice table__header_item">Curr.Price</th>
            <th className="sector table__header_item">Sector</th>
          </tr>
        </thead>
        <tbody>
          {holdings && holdings.map((card, index) => <HoldingTableCard card={card} key={index} />)}
        </tbody>
      </table>
    </>
  );
};

export default HoldingTable;
