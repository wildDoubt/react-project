import {
  DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,
} from '@ant-design/icons';

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

export { DEFAULT_MENU };
export default MENU;
