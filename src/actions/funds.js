import axios from 'axios';

const getFund = async (cik) => {
  const {data} = await axios(`${process.env.REACT_APP_API}/funds/${cik}/info`);
  return data;
};
const getAboutFund = async (cik) => {
  const {data} = await axios(`${process.env.REACT_APP_API}/funds/${cik}/last-report`);
  return data;
};
const getSecurity = async (q) => {
  if (q.length > 2) {
    const {data} = await axios(`${process.env.REACT_APP_API}/shares/search?searchStr=${q}`);

    const option = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {
        label: data[i].name,
        value: data[i].cusip,
      };
      option.push(obj);
    }
    return option;
  }
};
const getSecurityValue = async () => {
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_API}/statistics`, ['SHARES_VALUE']);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
const getShares = async () => {
  try {
    const {data} = await axios(`${process.env.REACT_APP_API}/shares/change_types`);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

const getAvailableQuartalsForReport = async (cik) => {
  try {
    const {data} = await axios(`${process.env.REACT_APP_API}/funds/${cik}/available-dates`);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

const getReport = async (cik) => {
  try {
    if (cik.length > 2) {
      const {data} = await axios(`${process.env.REACT_APP_API}/funds/${cik}/available-dates`);
      const [res] = data;
      const option = [
        {
          label: `${res.quartal}Q${res.year}`,
          value: res.year,
        },
      ];

      return option;
    }
  } catch (error) {
    console.log(error.response);
  }
};
const applyFilter = async (
  cik,
  percOnPortfolioOrder,
  valueOrder,
  cusip,
  percOnPortfolioMin,
  percOnPortfolioMax,
  sectorId,
  changeType,
  valueMin,
  valueMax,
  year,
  quartal,
  page
) => {
  try {
    valueOrder = valueOrder ? 'ASC' : 'DESC';
    percOnPortfolioOrder = percOnPortfolioOrder ? 'ASC' : 'DESC';
    const {data} = await axios.post(
      `${process.env.REACT_APP_API}/shares?${cik ? `cik=${cik}` : ''}${
        percOnPortfolioOrder ? `&percOnPortfolioOrder=${percOnPortfolioOrder}` : ''
      }${cusip ? `&cusip=${cusip}` : ''}${
        percOnPortfolioMin ? `&percOnPortfolioMin=${percOnPortfolioMin}` : ''
      }${percOnPortfolioMax ? `&percOnPortfolioMax=${percOnPortfolioMax}` : ''}${
        valueMin ? `&valueMin=${valueMin}` : ''
      }${valueMax ? `&valueMax=${valueMax}` : ''}${sectorId ? `&sectorId=${sectorId}` : ''}${
        changeType ? `&changeType=${changeType}` : ''
      }${quartal ? `&quartal=${quartal}` : ''}${year ? `&year=${year}` : ''}${
        valueOrder ? `&valueOrder=${valueOrder}` : ''
      }`,
      {page: page, pageSize: 10}
    );
    return data;
  } catch (error) {
    console.log('applyFilter', error.response.data);
  }
};

const firstFetchedFund = async (cik, quartal, year) => {
  try {
    const {data} = await axios.post(
      `${process.env.REACT_APP_API}/shares?cik=${cik}&quartal=${quartal}&year=${year}`,
      {page: 1, pageSize: 10}
    );
    return data;
  } catch (error) {
    console.log('firstFetchedFund', error.response);
  }
};

const getPerformance = async () => {
  const {data} = await axios(`${process.env.REACT_APP_API}/shares/sp500`);
  return data;
};

export default {
  getFund,
  getAboutFund,
  getAvailableQuartalsForReport,
  getSecurity,
  getSecurityValue,
  getShares,
  getReport,
  applyFilter,
  firstFetchedFund,
  getPerformance,
};
