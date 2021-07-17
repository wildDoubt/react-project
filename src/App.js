import {Layout, Menu, Breadcrumb} from 'antd';
import {Link, BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from 'react'
import ScreenRecorder from './Recorder'

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const MY_URL = "https://github.com/wildDoubt";

const MENU = [
    {
        title: 'GIF',
        icon: <PieChartOutlined/>,
    },
    {
        title: 'Option2',
        icon: <DesktopOutlined/>,
    },
    {
        title: 'User1',
        icon: <UserOutlined/>,
        submenu: ['Tom', 'Bill', 'Alex'],
    },
    {
        title: 'Team',
        icon: <TeamOutlined/>,
        submenu: ['Team1', 'Team2'],
    },
    {
        title: 'File',
        icon: <FileOutlined/>,
    },
]

const StreamPreview = ({stream}) => {
    const preview = useRef();

    useEffect(() => {
        if (preview.current && stream) {
            preview.current.srcObject = stream;
        }
    }, [stream]);

    if (!stream) {
        return <div style={{width:1520,height:680}}/>
    }
    return <video ref={preview} width={1520} height={680} autoPlay/>

}

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(MENU[0].title);
    const [currentSubMenu, setCurrentSubMenu] = useState('');

    const onCollapse = (collapsed) => {
        console.log(collapsed);
        setCollapsed(prevCollapsed => !prevCollapsed)
    }

    const {
        liveStream,
        startRecording,
        mediaBlobUrl,
        stopRecording,
        pauseRecording,
        resumeRecording,
        status,
    } = ScreenRecorder();

    const renderMediaButton = () => {
        return <>
            <br/>
            {(status==='Idle'||status==='Stopped')&&<button onClick={startRecording}>record</button>}
            {status==='Recording'&&<button onClick={pauseRecording}>pause</button>}
            {status==='Paused'&&<button onClick={resumeRecording}>resume</button>}
            {(status==='Recording'||status==='Paused')&&<button onClick={stopRecording}>stop</button>}
        </>
    }

    const renderSider = () => {
        return (
            <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
                {MENU.map((item, index) => {
                    if (item.hasOwnProperty('submenu')) {
                        return <SubMenu
                            key={index.toString()}
                            icon={item.icon}
                            title={item.title}>
                            {item.submenu.map((submenu, j) =>
                                <Menu.Item
                                    key={index.toString() + 'sub' + j}
                                    onClick={(e) => {
                                        setCurrentMenu(item.title)
                                        setCurrentSubMenu(submenu)
                                    }}
                                >
                                    <Link to={'/' + item.title + '/' + submenu}>
                                        <span>{submenu}</span>
                                    </Link></Menu.Item>)}
                        </SubMenu>
                    } else {
                        return <Menu.Item
                            key={index.toString()}
                            icon={item.icon}
                            onClick={(e) => {
                                setCurrentMenu(item.title)
                            }}>
                            <Link to={'/' + item.title}>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    }
                })}
            </Menu>
        )
    }

    return (
        <Router>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo"/>
                    {renderSider()}
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>{currentMenu}</Breadcrumb.Item>
                            <Breadcrumb.Item>{currentSubMenu}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Switch>
                            <Route exact path='/'>
                                <Redirect to={'/'+MENU[0].title}/>
                            </Route>
                            <Route path={'/'+MENU[0].title}>
                                <StreamPreview stream={liveStream}/>
                                {renderMediaButton()}
                            </Route>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Created by <a href={MY_URL}>wildDoubt</a>
                    </Footer>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;
