import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import MENU from '../../dummyData/Menu';

// eslint-disable-next-line react/prop-types
const AppSider = ({ setCurrentMenu, setCurrentSubMenu }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const renderSider = () => (
    <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
      {MENU.map((item, index) => {
        if ('submenu' in item) {
          return (
            <Menu.SubMenu
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
            </Menu.SubMenu>
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
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      {renderSider()}
    </Layout.Sider>
  );
};

export default AppSider;
