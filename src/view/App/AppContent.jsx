import React from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DEFAULT_MENU } from '../../Data/Menu';
import GIFMaker from '../GIF-Maker/GIFMaker';

const AppContent = () => (
  <Layout.Content
    className="layout-content"
  >
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

export default AppContent;
