import {Pagination} from 'antd';
import React from 'react';

const Footer = ({current, total, setPage, setPageSize}) => {
  const pageSize = (current, pageSize) => {
    setPageSize(pageSize);
  };
  return (
    <>
      <div className="footer">
        <Pagination
          onChange={(e) => setPage(e)}
          onShowSizeChange={pageSize}
          current={current}
          total={total}
          defaultPageSize={10}
        />
      </div>
    </>
  );
};

export default Footer;
