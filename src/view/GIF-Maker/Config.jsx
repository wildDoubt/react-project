import React from 'react';
import { Checkbox } from 'antd';

const config = ({ setDownload }) => {
  const onChange = (e) => {
    setDownload(e.target.checked);
  };

  return (
    <>
      <Checkbox onChange={onChange}>download</Checkbox>
    </>
  );
};

export default config;
