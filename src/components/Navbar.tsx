import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Space, Typography, Avatar, Dropdown, App, Divider, ConfigProvider } from 'antd';
import { Menu as MenuIcon, User as UserIcon, LogOut, X, ChevronDown } from 'lucide-react';
import { useUser } from '../context/UserContext';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { message } = App.useApp();

  // Hiệu ứng đổi màu khi scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    message.success('Hẹn gặp lại bạn sớm!');
    navigate('/');
    setVisible(false);
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + href);
    }
    setVisible(false);
  };

  const menuItems = [
    { key: '/', label: <Link to="/">Trang chủ</Link> },
    { key: 'about', label: <a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>Giới thiệu</a> },
    { key: 'services', label: <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>Dịch vụ</a> },
    { key: 'rooms', label: <Link to="/rooms">Phòng nghỉ</Link> },
    { key: 'contact', label: <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>Liên hệ</a> },
    ...(user?.role === 'User' ? [{ key: '/my-bookings', label: <Link to="/my-bookings">Đơn đặt</Link> }] : []),
    ...(user?.role === 'Admin' ? [{ key: '/admin', label: <Link to="/admin">Quản trị</Link> }] : []),
  ];

  const userMenuItems = [
    { key: 'profile', icon: <UserIcon size={16} />, label: 'Hồ sơ cá nhân' },
    { type: 'divider' },
    { key: 'logout', icon: <LogOut size={16} />, label: 'Đăng xuất', danger: true, onClick: handleLogout },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemBg: 'transparent',
            itemColor: '#4b5563',
            itemSelectedColor: '#eb2f96',
            itemHoverColor: '#eb2f96',
            horizontalItemSelectedColor: '#eb2f96',
            itemMarginInline: 12,
          },
        },
      }}
    >
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5%',
          height: scrolled ? 70 : 80,
          background: scrolled ? 'rgba(255, 255, 255, 0.85)' : '#ffffff',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.05)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #f0f0f0',
        }}
      >
        {/* LOGO SECTION */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #eb2f96 0%, #722ed1 100%)',
            padding: '6px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <img 
              src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/logo.png" 
              alt="Logo" 
              style={{ width: 28, height: 28, filter: 'brightness(0) invert(1)' }} 
            />
          </div>
          <Text style={{ 
            fontSize: '20px', 
            fontWeight: 800, 
            letterSpacing: '1px',
            background: 'linear-gradient(90deg, #1f2937, #4b5563)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            STELLAR
          </Text>
        </Link>

        {/* DESKTOP MENU */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }} className="hidden lg:flex">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ border: 'none', minWidth: '500px', justifyContent: 'center', fontWeight: 500 }}
          />
        </div>

        {/* RIGHT SIDE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
              <div style={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '4px 12px',
                borderRadius: '50px',
                background: '#f9fafb',
                transition: 'all 0.3s'
              }} className="hover:bg-gray-100 hidden lg:flex">
                <Avatar 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" // Avatar ngẫu nhiên đẹp hơn
                  style={{ border: '2px solid #eb2f96' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text strong style={{ fontSize: '13px', lineHeight: 1.2 }}>{user.name}</Text>
                  <Text type="secondary" style={{ fontSize: '10px', textTransform: 'uppercase' }}>{user.role}</Text>
                </div>
                <ChevronDown size={14} color="#9ca3af" />
              </div>
            </Dropdown>
          ) : (
            <div className="hidden lg:block">
              <Link to="/auth">
                <Button 
                  type="primary" 
                  size="large"
                  style={{ 
                    borderRadius: '12px', 
                    background: 'linear-gradient(90deg, #eb2f96 0%, #f759ab 100%)',
                    border: 'none',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px 0 rgba(235, 47, 150, 0.39)'
                  }}
                >
                  Đăng nhập
                </Button>
              </Link>
            </div>
          )}

          {/* MOBILE TOGGLE */}
          <Button 
            type="text" 
            icon={<MenuIcon size={24} />} 
            className="lg:hidden" 
            onClick={() => setVisible(true)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        </div>

        {/* MOBILE DRAWER */}
        <Drawer
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ background: '#eb2f96', padding: 4, borderRadius: 8 }}>
                <img src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/logo.png" width={20} style={{ filter: 'brightness(0) invert(1)' }} alt="logo" />
              </div>
              <span style={{ fontWeight: 800 }}>STELLAR</span>
            </div>
          }
          placement="right"
          onClose={() => setVisible(false)}
          open={visible}
          width={300}
          closeIcon={<X size={20} />}
        >
          {user && (
            <div style={{ 
              background: '#f9fafb', 
              padding: '20px', 
              borderRadius: '16px', 
              marginBottom: '24px',
              border: '1px solid #f0f0f0'
            }}>
              <Space align="center" size={12}>
                <Avatar size={54} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" style={{ border: '2px solid #eb2f96' }} />
                <div>
                  <Text strong style={{ fontSize: '17px' }}>{user.name}</Text>
                  <br />
                  <Text type="secondary">{user.email || user.role}</Text>
                </div>
              </Space>
            </div>
          )}

          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ border: 'none', fontSize: '16px' }}
            onClick={() => setVisible(false)}
          />

          <div style={{ position: 'absolute', bottom: 30, left: 24, right: 24 }}>
            {user ? (
              <Button danger block size="large" shape="round" icon={<LogOut size={18} />} onClick={handleLogout}>
                Đăng xuất
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setVisible(false)}>
                <Button type="primary" block size="large" shape="round" style={{ background: '#eb2f96', border: 'none' }}>
                  Đăng nhập ngay
                </Button>
              </Link>
            )}
          </div>
        </Drawer>
      </Header>
    </ConfigProvider>
  );
};

export default Navbar;