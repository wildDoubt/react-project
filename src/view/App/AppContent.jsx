import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DEFAULT_MENU } from '../../dummyData/Menu';
import GIFMaker from '../GIF-Maker/GIFMaker';

const AppContent = ({ currentMenu, currentSubMenu }) => (
  <Layout.Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{currentMenu}</Breadcrumb.Item>
      <Breadcrumb.Item>{currentSubMenu}</Breadcrumb.Item>
    </Breadcrumb>
    <Switch>
      <Route exact path="/">
        <Redirect to={DEFAULT_MENU} />
      </Route>
      <Route path={`/${DEFAULT_MENU}`}>
        <GIFMaker />
      </Route>
    </Switch>
  </Layout.Content>
);

AppContent.propTypes = {
  currentMenu: PropTypes.string.isRequired,
  currentSubMenu: PropTypes.string.isRequired,
};

export default AppContent;
