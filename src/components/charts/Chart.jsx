import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

const Chart = ({
  data,
  legendView,
  oneLine,
  doubleLine,
  width,
  height,
  tooltipView,
  xyView,
  cartesianView,
  firstLineKey,
  secondLineKey,
}) => {
  return (
    <LineChart width={width} height={height} data={data}>
      {legendView ? <Legend verticalAlign="top" iconType={'plainline'} iconSize={30} /> : null}
      {xyView ? (
        <>
          <XAxis dataKey="name" /> <YAxis />
        </>
      ) : null}
      {cartesianView ? <CartesianGrid strokeDasharray="2 3" /> : null}
      {tooltipView ? <Tooltip /> : null}
      {oneLine ? <Line type="monotone" dataKey={firstLineKey} /> : null}
      {doubleLine ? (
        <>
          <Line type="monotone" dataKey={firstLineKey} />
          <Line type="monotone" dataKey={secondLineKey} stroke="#df2121" />
        </>
      ) : null}
    </LineChart>
  );
};

export default Chart;
