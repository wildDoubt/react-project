import {
  Layout, Menu, Breadcrumb, Button,
} from 'antd';
import {
  Link, BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import ScreenRecorder from './Recorder';
import StreamPreview from './StreamPreview';

const {
  Header, Content, Footer, Sider,
} = Layout;
const { SubMenu } = Menu;
const MY_URL = 'https://github.com/wildDoubt';
const DEFAULT_MENU = 'GIF-Maker';
const MENU = [
  {
    title: DEFAULT_MENU,
    icon: <PieChartOutlined />,
  },
  {
    title: 'Option2',
    icon: <DesktopOutlined />,
  },
  {
    title: 'User1',
    icon: <UserOutlined />,
    submenu: ['Tom', 'Bill', 'Alex'],
  },
  {
    title: 'Team',
    icon: <TeamOutlined />,
    submenu: ['Team1', 'Team2'],
  },
  {
    title: 'File',
    icon: <FileOutlined />,
  },
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(MENU[0].title);
  const [currentSubMenu, setCurrentSubMenu] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [download, setDownload] = useState(false);

  const onCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const {
    liveStream,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
  } = ScreenRecorder({ downloadable: false });

  const renderMediaButton = () => (
    <>
      <br />
      {(status === 'Idle' || status === 'Stopped') && <Button onClick={startRecording}>record</Button>}
      {status === 'Recording' && <Button onClick={pauseRecording}>pause</Button>}
      {status === 'Paused' && <Button onClick={resumeRecording}>resume</Button>}
      {(status === 'Recording' || status === 'Paused') && <Button onClick={stopRecording}>stop</Button>}
    </>
  );

  const renderSider = () => (
    <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
      {MENU.map((item, index) => {
        if ('submenu' in item) {
          return (
            <SubMenu
              key={index.toString()}
              icon={item.icon}
              title={item.title}
            >
              {item.submenu.map((submenu) => (
                <Menu.Item
                  onClick={() => {
                    setCurrentMenu(item.title);
                    setCurrentSubMenu(submenu);
                  }}
                >
                  <Link to={`/${item.title}/${submenu}`}>
                    <span>{submenu}</span>
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
          );
        }
        return (
          <Menu.Item
            key={index.toString()}
            icon={item.icon}
            onClick={() => {
              setCurrentMenu(item.title);
              setCurrentSubMenu('');
            }}
          >
            <Link to={`/${item.title}`}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          {renderSider()}
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{currentMenu}</Breadcrumb.Item>
              <Breadcrumb.Item>{currentSubMenu}</Breadcrumb.Item>
            </Breadcrumb>
            <Switch>
              <Route exact path="/">
                <Redirect to={DEFAULT_MENU} />
              </Route>
              <Route path={`/${DEFAULT_MENU}`}>
                {StreamPreview({ stream: liveStream })}
                {renderMediaButton()}
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Created by
            {' '}
            <a href={MY_URL}>wildDoubt</a>
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
