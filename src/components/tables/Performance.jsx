import {useEffect, useState} from 'react';
import funds from '../../actions/funds';
import Charts from '../cards/Charts';

const Performance = ({aboutFund}) => {
  const [history, setHistory] = useState();
  useEffect(() => {
    funds
      .getPerformance(aboutFund.cik)
      .then((res) => {
        setHistory(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  let color;
  if (aboutFund.yearGain > 0) {
    color = 'green_title';
  } else {
    color = 'red_title';
  }
  if (history) {
    console.log('history loaded', history)
    return (
        <>
          {aboutFund.years5Gain ? (
              <div className="performance__history">
                <h2>History Performance</h2>
                <div className="history__items">
                  <div className={`history__item `}>
                    1-year Performance:{' '}
                    <span className={`${color}`}>{aboutFund.yearGain.toFixed(1)}%</span>
                  </div>
                  <div className={`history__item `}>
                    3-year Performance:{' '}
                    <span className={`${color}`}>{aboutFund.years3Gain.toFixed(1)}%</span>
                  </div>
                  <div className={`history__item `}>
                    5-year Performance:{' '}
                    <span className={`${color}`}>{aboutFund.years5Gain.toFixed(1)}%</span>
                  </div>
                  <div className={`history__item `}>
                    Alltime Performance:{' '}
                    <span className={`${color}`}>{aboutFund.allTimeGain.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
          ) : (
              ''
          )}

          <div className="chart">
            <Charts history={history} name={aboutFund.fund.name}/>
          </div>
        </>
    );
  } else {
    return null;
  }
};

export default Performance;
