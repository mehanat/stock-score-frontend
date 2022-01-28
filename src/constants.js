export const sum = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const countProcent = (x) => {
  return (x * 100).toFixed(1);
};
