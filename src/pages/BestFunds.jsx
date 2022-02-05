import {AutoComplete, Button, Input, Select, Slider} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import bestFounds from '../actions/bestFounds';
import {ACTIONS} from '../redux/actionType';
import BestFundsTable from '../components/tables/BestFundsTable';
import Footer from '../components/navigation/Footer';
import BestFundSubNavbar from '../components/navigation/BestFundSubNavbar';
const {Option} = Select;

const BestFunds = ({}) => {
  const dispatch = useDispatch();
  const [foundOption, setFoundOption] = useState('');
  const [found, setFound] = useState('');
  const [rating, setRating] = useState([]);
  const [top, setTop] = useState([]);
  const [perf, setPerf] = useState([]);
  const [asset, setAsset] = useState([]);
  const [mainSector, setMainSector] = useState('');
  const [sectors, setSectors] = useState([]);
  const [assetValue, setAssetValue] = useState([]);
  const [perfValue, setPerfValue] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [ratingOrder, setRatingOrder] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const request = {
    ratingOrder: !ratingOrder ? 'DESC' : 'ASC',
    totalSumOrder: '',
    nameOrHeadName: found,
    ratingMin: rating[0],
    ratingMax: rating[1],
    totalSumMin: asset[0],
    totalSumMax: asset[1],
    yearGainMin: perf[0] / 100,
    yearGainMax: perf[1] / 100,
    top10SharesMin: top[0],
    top10SharesMax: top[1],
    mainSectorId: mainSector,
    page: page,
    pageSize: pageSize,
  };

  useEffect(() => {
    bestFounds
      .getSectors()
      .then((res) => {
        setSectors(res);
      })
      .catch((res) => {
        console.log(res);
      });

    bestFounds
      .getAssetValue()
      .then((res) => {
        const [asset, perf] = res;
        setAssetValue([asset.minValue, asset.maxValue]);
        //setPerfValue([perf.minValue * 100, perf.maxValue * 100]);
        console.log('perf', perf)
        setPerfValue({
          statisticsField: perf.statisticsField,
          minValue: perf.minValue * 100 - 1,
          maxValue: perf.maxValue * 100 + 1
        });
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  useEffect(() => {
    bestFounds
      .fetchAll(page, request.ratingOrder)
      .then((res) => {
        dispatch({type: ACTIONS.GET_ALL_FUNDS, payload: res.entries});
        setTotal(res.total);
      })
      .catch((res) => {
        console.log(res.response);
      });
  }, [page, ratingOrder]);

  const fetchFound = () => {
    bestFounds
      .fetchData(request)
      .then((res) => {
        console.log(res);
        dispatch({type: ACTIONS.GET_ALL_FUNDS, payload: res.entries});
        setTotal(res.total);
      })
      .catch((res) => {
        console.log(res.response);
      });
  };

  useEffect(() => {
    fetchFound();
  }, [page, ratingOrder]);

  const onSearch = (e) => {
    bestFounds
      .searchFound(e)
      .then((res) => {
        setFoundOption(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <>
      <BestFundSubNavbar />
      <div className="filters">
        <div className="filters__item">
          <p>Fund</p>
          <AutoComplete
            placeholder="Choose found"
            onSearch={onSearch}
            style={{width: '150px'}}
            options={foundOption}
            onChange={(e) => setFound(e)}
          />
        </div>
        <div className="filters__item">
          <p>Rating, pts</p>
          <Slider
            range
            defaultValue={[1, 100]}
            min={0}
            max={100}
            onChange={(e) => setRating(e)}
            style={{width: '133px'}}
          />
        </div>
        {assetValue[1] ? (
          <div className="filters__item">
            <p>Asset value, $bn</p>
            <Slider
              range
              defaultValue={[assetValue[0], assetValue[1]]}
              min={assetValue[0]}
              max={assetValue[1]}
              onChange={(e) => setAsset(e)}
              style={{width: '133px'}}
            />
          </div>
        ) : (
          ''
        )}
        {perfValue.maxValue ? (
          <div className="filters__item">
            <p>3-Y Perf, %</p>
            <Slider
              range
              defaultValue={[perfValue.minValue, perfValue.maxValue]}
              min={perfValue.minValue}
              max={perfValue.maxValue}
              onChange={(e) => setPerf(e)}
              style={{width: '133px'}}
            />
          </div>
        ) : null}

        <div className="filters__item">
          <p>Top-20 share, %</p>
          <Slider
            range
            defaultValue={[1, 100]}
            min={0}
            max={100}
            onChange={(e) => setTop(e)}
            style={{width: '133px'}}
          />
        </div>
        <div className="filters__item">
          <p>Main sector</p>
          <Select style={{width: '150px'}} mode="multiple" onChange={(e) => setMainSector(e)}>
            {sectors &&
              sectors.map((el) => (
                <>
                  <Option key={el.id} value={el.id}>
                    {el.name}
                  </Option>
                </>
              ))}
          </Select>
        </div>
      </div>
      <div className="btn">
        <Button type="primary" onClick={fetchFound}>
          Apply filter
        </Button>
      </div>
      <BestFundsTable rating={ratingOrder} setRatingOrder={setRatingOrder} />
      <div className="footer">
        <Footer
          current={page}
          total={total}
          request={request}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </>
  );
};

export default BestFunds;
