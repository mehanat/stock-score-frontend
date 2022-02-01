import React, {useCallback, useEffect, useState} from 'react';
import Chart from '../charts/Chart';

const Charts = ({history, name}) => {
  const [chartData, setChartData] = useState([]);
  console.log('history', history)
/*  const calc = useCallback(
    (array) => {
      const calcResult = array.map((el, i, arr) => {
        let a = arr[0][1];
        const result = Number((((el[1] - a) / a) * 100).toFixed(1));
        return result;
      });
      return calcResult;
    },
    [history, sp]
  );
  const calcSp = useCallback(
    (arr) => {
      const result = arr.map((el) => {
        return [`${el.year}Q${el.quartal}`, el.value];
      });
      return result;
    },
    [sp]
  );*/
  useEffect(() => {
/*    const his = calc(history);
    const sphi = calcSp(sp);
    const spa = calc(sphi);*/

    const result = history.fundHistory.map((el, i) => {
      return {name: el.period, value: el.value, sp: history.sp500[i]?.value};/*
      return {name: el.period, value: (el.value * 100).toFixed(1), sp: (history.sp500[i]?.value * 100)?.toFixed(1)};*/
    });

    setChartData(result);
  }, []);

  return (
    <div>
      <Chart
        width={1200}
        height={400}
        data={chartData}
        tooltipView={true}
        cartesianView={true}
        doubleLine={true}
        xyView={true}
        firstLineKey={'value'}
        secondLineKey={'sp'}
        legendView={true}
      />
      {/* <LineChart
        width={1200}
        height={400}
        data={[
          {name: '2018Q1', pv: 200, uv: 400},
          {name: '2019Q2', pv: 300, uv: 500},
          {name: '2020Q3', pv: 100, uv: 400},
          {name: '2021Q4', pv: 500, uv: 700},
          {name: '2022Q1', pv: 200, uv: 400},
          {name: '2023Q2', pv: 700, uv: 900},
        ]}
      >
        <Legend verticalAlign="top" iconType="plainline" iconSize={30} />
        <CartesianGrid strokeDasharray="2 3" />
        <Tooltip />
        <XAxis dataKey="name" />
        <YAxis />
        <Line type="monotone" dataKey="pv" stroke="#df2121" />
        <Line type="monotone" dataKey="uv" />
      </LineChart> */}
    </div>
  );
};

export default Charts;
