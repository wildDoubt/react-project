import React from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DEFAULT_MENU } from '../../dummyData/Menu';
import GIFMaker from '../GIF-Maker/GIFMaker';

const AppContent = () => (
  <Layout.Content style={{
    padding: '0 50px',
    minHeight: '280px',
  }}
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
