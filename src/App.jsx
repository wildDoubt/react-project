import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState } from 'react';
import AppFooter from './view/App/AppFooter';
import AppSider from './view/App/AppSider';
import { DEFAULT_MENU } from './dummyData/Menu';
import AppHeader from './view/App/AppHeader';
import AppContent from './view/App/AppContent';

const MY_URL = 'https://github.com/wildDoubt';

function App() {
  const [currentMenu, setCurrentMenu] = useState(DEFAULT_MENU);
  const [currentSubMenu, setCurrentSubMenu] = useState('');

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <AppSider
          setCurrentMenu={setCurrentMenu}
          setCurrentSubMenu={setCurrentSubMenu}
        />
        <Layout className="site-layout">
          <AppHeader />
          <AppContent currentSubMenu={currentMenu} currentMenu={currentSubMenu} />
          <AppFooter url={MY_URL} />
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
