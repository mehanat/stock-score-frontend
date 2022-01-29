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
        console.log('getFund , id = ' + id, res)
        setFund(res);
      })
      .catch((err) => {
        console.log(err.response);
      });

    funds
      .getAboutFund(id)
      .then((res) => {
        console.log('getAboutFund id = ' + id, res)
        // todo set year
        setAboutFund(res);
      })
      .catch((res) => {
        console.log(res.response);
      });
  };
  useEffect(() => {
    fetchFirstData();
  }, [id]);

  if (aboutFund.id) {
    console.log('aboutFund!!', aboutFund)
    const changePage = (pageSubNavbar) => {
      switch (pageSubNavbar) {
        case 'Holdings':
          return <FundFilters latestReport={aboutFund} setAboutFund = {setAboutFund} />;
        case 'Performance':
          return <Performance aboutFund={aboutFund} />;
        default:
          return <FundFilters latestReport={aboutFund} setAboutFund = {setAboutFund} />;
      }
    };

    return (
        <>
          <div className="about">
            <div className="fund__headName">
              <h1>{fund.name}</h1>
              <p>{fund.headName}</p>
            </div>
            <div className="about__fundOwner">
              <div className="about__fundOwner_photo">
                <img src={fund.headPhoto ? fund.headPhoto : ''} alt="" height="150"/>
              </div>
              <div className="about__fundOwner_bio">
                <p>{fund.description}</p>
                <div className="about__fundOwner_state">
                  <div className="rating__state state">
                    <img src="/images/state_logo.svg" alt=""/>
                    Fund Rating: <RatingCard rating={aboutFund.rating}/>
                  </div>
                  <div className="asset__state state">
                    <img src="/images/state_logo.svg" alt=""/>
                    Asset value: $ {aboutFund.totalSum ? sum(aboutFund.totalSum) : ''}
                  </div>
                  <div className="performance__state state">
                    <img src="/images/state_logo.svg" alt=""/>
                    Performance:{' '}
                    <PerformanceCard
                        yearGain={aboutFund.yearGain}
                        years3Gain={aboutFund.years3Gain}
                        years5Gain={aboutFund.years5Gain}
                        allTimeGain={aboutFund.allTimeGain}
                    />
                  </div>
                  <div className="holdings__state state">
                    <img src="/images/state_logo.svg" alt=""/>
                    Holdings #: {aboutFund.sharesCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FundSubNavbar setPage={setPageSubNavbar}/>

          {changePage(pageSubNavbar)}
        </>
    );
  }
  return null;
};

export default Fund;
