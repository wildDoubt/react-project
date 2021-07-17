import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const AppFooter = ({ url }) => (
  <Layout.Footer style={{ textAlign: 'center' }}>
    Created by
    <a href={url}> wildDoubt</a>
  </Layout.Footer>
);

AppFooter.propTypes = {
  url: PropTypes.string.isRequired,
};

export default AppFooter;
