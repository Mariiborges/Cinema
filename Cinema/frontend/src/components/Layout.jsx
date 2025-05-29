import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index';
import { Button, Layout } from 'antd';
import MenuLateral from './MenuLateral';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header, Sider } = Layout;

function AppLayout(props) {

    const [collapsed, setCollapsed] = useState(false);

    return (
     <>
    <Layout>
      <Header style={{ padding: 0, background: '#141414' }}>
        <Button type='text' className="toggle" onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
      </Header>
      <Layout>
        <Sider className="sidebar" collapsed={collapsed} collapsible trigger={null}>
          <MenuLateral />
        </Sider>
        <main className="content">{props.children}</main>
      </Layout>
    </Layout>

     </>
    );
  }
  export default AppLayout;