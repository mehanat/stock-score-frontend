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

const FundFilters = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [fund, setFund] = useState({});
  const [aboutFund, setAboutFund] = useState({});
  const [security, setSecurity] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [sectors, setSectors] = useState();
  const [securityValue, setSecurityValue] = useState([]);
  const [shares, setShares] = useState('');
  const [report, setReport] = useState('');
  const [securityOption, setSecurityOption] = useState([]);
  const [securityValueOption, setSecurityValueOption] = useState({});
  const [sectorsValue, setSectorsValue] = useState('');
  const [sharesValue, setSharesValue] = useState([]);
  const [reportOption, setReportOption] = useState('');
  const [portflioOrder, setPortflioOrder] = useState(false);
  const [marketOrder, setMarketOrder] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const fetchFund = () => {
    console.log('fetchFund', fund)
    console.log('report', report)
    funds
      .applyFilter(
        fund.cik,
        portflioOrder,
        marketOrder,
        security,
        portfolio[0],
        portfolio[1],
        sectors,
        shares,
        securityValue[0],
        securityValue[1],
        report[1],
        report[0],
        page
      )
      .then((res) => {
        dispatch({type: ACTIONS.GET_ALL_HOLDINGS, payload: res.entries});
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const getFund = useCallback((id) => {
    funds
      .getFund(id)
      .then((res) => {
        setFund(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const getAbout = useCallback((id) => {
    funds
      .getAboutFund(id)
      .then((res) => {
        setAboutFund(res);
        const op = [
          {
            label: `${res.quartal}Q${res.year}`,
            value: [res.quartal, res.year],
          },
        ];
        setReportOption(op);
      })
      .catch((res) => {
        console.log(res.response);
      });
  }, []);

  useEffect(() => {
    getFund(id);
    getAbout(id);
  }, [id]);

  useEffect(() => {
    funds
      .firstFetchedFund(fund.cik, aboutFund.quartal, aboutFund.year)
      .then((res) => {
        dispatch({type: ACTIONS.GET_ALL_HOLDINGS, payload: res.entries});
        setTotal(res.total);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [aboutFund]);

  useEffect(() => {
    funds
      .getSecurityValue()
      .then((res) => {
        const [data] = res;
        console.log(data, 'data');
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

  const serachReport = (e) => {
    funds
      .getReport(e)
      .then((res) => {
        setReportOption(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    fetchFund();
  }, [page, portflioOrder, marketOrder]);

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
          <AutoComplete
            onSearch={serachReport}
            style={{width: '150px'}}
            options={reportOption}
            mode="multiple"
            onChange={(e) => setReport(e)}
          />
        </div>
      </div>
      <div className="btn">
        <Button type="primary" onClick={fetchFund}>
          Apply filter
        </Button>
      </div>
      <HoldingTable
        portflioOrder={portflioOrder}
        setPortflioOrder={setPortflioOrder}
        markerOrder={marketOrder}
        setMarketOrder={setMarketOrder}
      />
      <div className="footer">
        <Footer current={page} total={total} setPage={setPage} />
      </div>
    </div>
  );
};

export default FundFilters;
