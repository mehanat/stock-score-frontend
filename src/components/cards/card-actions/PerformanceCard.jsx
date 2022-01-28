import {Select} from 'antd';
import {useEffect, useMemo, useState} from 'react';
import {countProcent} from '../../../constants';
const {Option} = Select;
const PerformanceCard = ({yearGain, years3Gain, years5Gain, allTimeGain}) => {
  const [perfSelect, setPerfSelect] = useState(1);
  let perf;

  if (perfSelect == 1 && yearGain) {
    perf = yearGain;
  }
  if (perfSelect == 3) {
    perf = years3Gain;
  }
  if (perfSelect == 5) {
    perf = years5Gain;
  }
  if (perfSelect == 'allTime') {
    perf = allTimeGain;
  }

  const setValue = (e) => {
    setPerfSelect(e);
  };

  return (
    <>
      <Select onChange={setValue} placeholder="1 year" bordered={false}>
        <Option value={1}>1year</Option>
        <Option value={3}>3year</Option>
        <Option value={5}>5year</Option>
        <Option value={'allTime'}>all time</Option>
      </Select>
      {yearGain ? `${countProcent(perf)}%` : ''}
    </>
  );
};

export default PerformanceCard;
