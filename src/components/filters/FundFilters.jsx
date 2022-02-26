import React from 'react';
import {AutoComplete, Button, Select, Slider} from 'antd';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import funds from '../../actions/funds';
import bestFounds from '../../actions/bestFounds';
import HoldingTable from '../tables/HoldingTable';
import Footer from '../navigation/Footer';
import {ACTIONS} from '../../redux/actionType';
const {Option} = Select;

const FundFilters = ({latestReport}) => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [fund, setFund] = useState({});
  const [pageSize, setPageSize] = useState(10)
  //const [aboutFund, setAboutFund] = useState({});
  const [security, setSecurity] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [sectors, setSectors] = useState();
  const [securityValue, setSecurityValue] = useState([]);
  const [shares, setShares] = useState('');
  const [reportPeriod, setReportPeriod] = useState(`${latestReport.quartal}Q${latestReport.year}`);
  const [securityOption, setSecurityOption] = useState([]);
  const [securityValueOption, setSecurityValueOption] = useState({});
  const [sectorsValue, setSectorsValue] = useState('');
  const [sharesValue, setSharesValue] = useState([]);
  const [availableQuartals, setAvailableQuartals] = useState([]);
  const [reportOption, setReportOption] = useState('');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [sortColumn, setSortColumn] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);


  const fetchFund = () => {
    console.log('fetchFund', latestReport)
    funds
      .applyFilter(
          latestReport.cik,
        sortOrder,
        sortColumn,
        security,
        portfolio[0],
        portfolio[1],
        sectors,
        shares,
        securityValue[0],
        securityValue[1],
        reportPeriod,
        page,
        pageSize
      )
      .then((res) => {
        console.log('applyFilter', res)
        dispatch({type: ACTIONS.GET_ALL_HOLDINGS, payload: res.entries});
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    funds
      .firstFetchedFund(latestReport.cik, latestReport.quartal, latestReport.year)
      .then((res) => {
        dispatch({type: ACTIONS.GET_ALL_HOLDINGS, payload: res?.entries});
        setTotal(res?.total);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [latestReport]);

  useEffect(() => {
    funds
      .getSecurityValue()
      .then((res) => {
        const [data] = res;
        setSecurityValueOption(data);
      })
      .catch((res) => {
        console.log(res);
      });
    bestFounds
      .getSectors()
      .then((res) => {
        setSectorsValue(res);
      })
      .catch((res) => {
        console.log(res);
      });
    funds
      .getShares()
      .then((res) => {
        setSharesValue(res);
      })
      .catch((res) => {
        console.log(res);
      });
    funds
        .getAvailableQuartalsForReport(latestReport.cik)
        .then((res) => {
          setAvailableQuartals(res);
        })
        .catch((res) => {
          console.log(res);
        });
  }, []);

  const serachSecurity = (e) => {
    funds
      .getSecurity(e)
      .then((res) => {
        setSecurityOption(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    fetchFund();
  }, [page, sortOrder, sortColumn, reportPeriod]);

  return (
    <div>
      <div className="filters">
        <div className="filters__item">
          <p>Security</p>
          <AutoComplete
            placeholder="Name or ticker"
            onSearch={serachSecurity}
            style={{width: '150px'}}
            options={securityOption}
            mode="multiple"
            onChange={(e) => setSecurity(e)}
          />
        </div>
        <div className="filters__item">
          <p>% of portfolio</p>
          <Slider
            range
            defaultValue={[1, 100]}
            min={0}
            max={100}
            onChange={(e) => setPortfolio(e)}
            style={{width: '133px'}}
          />
        </div>
        {securityValueOption.maxValue ? (
          <div className="filters__item">
            <p>Security value, $</p>
            <Slider
              range
              defaultValue={[securityValueOption.minValue, securityValueOption.maxValue]}
              min={securityValueOption.minValue}
              max={securityValueOption.maxValue}
              onChange={(e) => setSecurityValue(e)}
              style={{width: '133px'}}
            />
          </div>
        ) : (
          ''
        )}

        <div className="filters__item">
          <p>Security sector</p>
          <Select
            placeholder="Choose sector"
            style={{width: '150px'}}
            mode="multiple"
            onChange={(e) => setSectors(e)}
          >
            {sectorsValue &&
              sectorsValue.map((el) => (
                <>
                  <Option key={el.id} value={el.id}>
                    {el.name}
                  </Option>
                </>
              ))}
          </Select>
        </div>
        <div className="filters__item">
          <p>Share change type</p>
          <Select
            style={{width: '150px'}}
            placeholder="Choose type"
            mode="multiple"
            onChange={(e) => setShares(e)}
          >
            {sharesValue &&
              sharesValue.map((el, index) => (
                <>
                  <Option key={index} value={el.name}>
                    {el.title}
                  </Option>
                </>
              ))}
          </Select>
        </div>
        <div className="filters__item">
          <p>Report date</p>
            <Select
                style={{width: '150px'}}
                placeholder="Choose period"
                defaultValue={reportPeriod}
                mode="multiple"
                onChange={(e) => {
                    console.log('setReportPeriod', e)
                    //setReportPeriod(e)
                    if (e) {
                        setReportPeriod(e);
                    }
                }}
            >
            {availableQuartals &&
            availableQuartals.map((el, index) => (
                <>
                  <Option key={index} value={`${el.quartal}Q${el.year}`}>
                    {el.quartal}Q{el.year}
                  </Option>
                </>
            ))}
          </Select>
        </div>
      </div>
      <div className="btn">
        <Button type="primary" onClick={fetchFund}>
          Apply filter
        </Button>
      </div>
      <HoldingTable
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
      />
      <div className="footer">
        <Footer current={page} total={total} setPage={setPage} setPageSize={setPageSize}/>
      </div>
    </div>
  );
};

export default FundFilters;
