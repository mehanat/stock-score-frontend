import axios from 'axios';

const getSectors = async () => {
  const {data} = await axios(`${process.env.REACT_APP_API}/nsi/sectors`);
  return data;
};

const searchFound = async (e) => {
  if (e.length > 3) {
    const {data} = await axios(`${process.env.REACT_APP_API}/funds?searchStr=${e}`);
    const option = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {
        label: data[i].name,
        value: data[i].name,
      };
      option.push(obj);
    }
    return option;
  }
};
const getAssetValue = async () => {
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_API}/statistics`, [
      'TOTAL_SUM',
      'YEAR_PERF',
    ]);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
const fetchData = async ({
  ratingOrder,
  totalSumOrder,
  nameOrHeadName,
  ratingMin,
  ratingMax,
  totalSumMin,
  totalSumMax,
  yearGainMin,
  yearGainMax,
  top10SharesMin,
  top10SharesMax,
  mainSectorId,
  page,
  pageSize,
}) => {
  const {data} = await axios.post(
    `${process.env.REACT_APP_API}/funds/quartal-reports${page ? `?` : ''}${
      ratingOrder ? `ratingOrder=${ratingOrder}` : ''
    }${totalSumOrder ? `&totalSumOrder=${totalSumOrder}` : ''}${
      nameOrHeadName ? `&nameOrHeadName=${nameOrHeadName}` : ''
    }${ratingMin ? `&ratingMin=${ratingMin}` : ''}${ratingMax ? `&ratingMax=${ratingMax}` : ''}${
      totalSumMin ? `&totalSumMin=${totalSumMin}` : ''
    }${totalSumMax ? `&totalSumMax=${totalSumMax}` : ''}${
      yearGainMin ? `&yearGainMin=${yearGainMin}` : ''
    }${yearGainMax ? `&yearGainMax=${yearGainMax}` : ''}${
      top10SharesMin ? `&top10SharesMin=${top10SharesMin}` : ''
    }${top10SharesMax ? `&top10SharesMax=${top10SharesMax}` : ''}${
      mainSectorId ? `&mainSectorId=${mainSectorId}` : ''
    }`,
    {page: page, pageSize: pageSize}
  );

  return data;
};

const fetchAll = async (page, order) => {
  const {data} = await axios.post(
    `${process.env.REACT_APP_API}/funds/quartal-reports?${order ? `ratingOrder=${order}` : ''}`,
    {
      page: page,
      pageSize: 10,
    }
  );
  return data;
};

export default {
  getSectors,
  searchFound,
  getAssetValue,
  fetchData,
  fetchAll,
};
