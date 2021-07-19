import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import MENU from '../../Data/Menu';
import logo from '../../logo.png';

// eslint-disable-next-line react/prop-types
const AppHeader = ({ setCurrentMenu, setCurrentSubMenu }) => (
  <Layout.Header>
    <img
      className="logo"
      alt="{my_logo}"
      src={logo}
      style={{
        float: 'left',
        width: '120px',
        height: '31px',
        margin: '16px 24px 16px 0',
        background: 'rgba(255, 255, 255, 0.3)',
      }}
    />
    <Menu theme="dark" mode="horizontal">
      {MENU.map((item, index) => {
        const key = index + 1;
        return (
          <Menu.Item
            key={key}
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
  </Layout.Header>
);

export default AppHeader;
