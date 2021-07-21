import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import AppFooter from './view/App/AppFooter';
import AppHeader from './view/App/AppHeader';
import AppContent from './view/App/AppContent';

import { DEFAULT_MENU } from './Data/Menu';

const MY_URL = 'https://github.com/wildDoubt';

function App() {
  const [currentMenu, setCurrentMenu] = useState(DEFAULT_MENU);
  const [currentSubMenu, setCurrentSubMenu] = useState('');

  return (
    <Router>
      <Layout className="layout">
        <AppHeader
          setCurrentMenu={setCurrentMenu}
          setCurrentSubMenu={setCurrentSubMenu}
        />
        <AppContent
          currentSubMenu={currentMenu}
          currentMenu={currentSubMenu}
        />
        <AppFooter url={MY_URL} />
      </Layout>
    </Router>
  );
}

export default App;
