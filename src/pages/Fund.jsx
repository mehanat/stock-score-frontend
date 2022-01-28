import {Select} from 'antd';
import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import funds from '../actions/funds';
import PerformanceCard from '../components/cards/card-actions/PerformanceCard';
import RatingCard from '../components/cards/card-actions/RatingCard';
import FundFilters from '../components/filters/FundFilters';
import FundSubNavbar from '../components/navigation/FundSubNavbar';
import Performance from '../components/tables/Performance';
import {sum} from '../constants';

const {Option} = Select;
const Fund = () => {
  const {id} = useParams();
  const [fund, setFund] = useState({});
  const [aboutFund, setAboutFund] = useState({});
  const [pageSubNavbar, setPageSubNavbar] = useState('');

  const fetchFirstData = () => {
    funds
      .getFund(id)
      .then((res) => {
        setFund(res);
      })
      .catch((err) => {
        console.log(err.response);
      });

    funds
      .getAboutFund(id)
      .then((res) => {
        setAboutFund(res);
      })
      .catch((res) => {
        console.log(res.response);
      });
  };
  useEffect(() => {
    fetchFirstData();
  }, [id]);

  const changePage = (pageSubNavbar) => {
    switch (pageSubNavbar) {
      case 'Holdings':
        return <FundFilters />;
      case 'Performance':
        return <Performance aboutFund={aboutFund} />;
      default:
        return <FundFilters />;
    }
  };
  const ar = {
    cik: 1067983,
    name: 'BERKSHIRE HATHAWAY INC',
    headName: 'Warren Buffett',
    description:
      'Berkshire Hathaway is an American holding company controlled by billionaire Warren Buffett. It was founded in 1955. The headquarters is located in Omaha',
    headPhoto: '',
  };
  console.log(fund, 'fund ');
  console.log(aboutFund, 'Aboutfund ');

  return (
    <>
      <div className="about">
        <div className="fund__headName">
          <h1>{fund.name}</h1>
          <p>{fund.headName}</p>
        </div>
        <div className="about__fundOwner">
          <div className="about__fundOwner_photo">
            <img src={fund.headPhoto ? fund.headPhoto : ''} alt="" width="100" />
          </div>
          <div className="about__fundOwner_bio">
            <p>{fund.description}</p>
            <div className="about__fundOwner_state">
              <div className="rating__state state">
                <img src="/images/state_logo.svg" alt="" />
                Fund Rating: <RatingCard rating={aboutFund.rating} />
              </div>
              <div className="asset__state state">
                <img src="/images/state_logo.svg" alt="" />
                Asset value: $ {aboutFund.totalSum ? sum(aboutFund.totalSum) : ''}
              </div>
              <div className="performance__state state">
                <img src="/images/state_logo.svg" alt="" />
                Performance:{' '}
                <PerformanceCard
                  yearGain={aboutFund.yearGain}
                  years3Gain={aboutFund.years3Gain}
                  years5Gain={aboutFund.years5Gain}
                  allTimeGain={aboutFund.allTimeGain}
                />
              </div>
              <div className="holdings__state state">
                <img src="/images/state_logo.svg" alt="" />
                Holdings #: {aboutFund.sharesCount}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FundSubNavbar setPage={setPageSubNavbar} />

      {changePage(pageSubNavbar)}
    </>
  );
};

export default Fund;
