import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Space, Typography, Avatar, Dropdown, App, ConfigProvider } from 'antd';
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    message.success('Hẹn gặp lại bạn ở những vì sao!');
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
        token: {
          colorPrimary: '#a855f7',
        },
        components: {
          Menu: {
            itemBg: 'transparent',
            itemColor: '#e0e7ff',
            itemSelectedColor: '#c084fc',
            itemHoverColor: '#c084fc',
            horizontalItemSelectedColor: '#c084fc',
            itemMarginInline: 16,
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
          height: scrolled ? 72 : 85,
          background: scrolled 
            ? 'rgba(15, 23, 42, 0.85)' 
            : 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: scrolled 
            ? '0 10px 30px -10px rgba(139, 92, 246, 0.3)' 
            : 'none',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: '1px solid rgba(167, 139, 250, 0.15)',
        }}
        className="relative overflow-hidden"
      >
        {/* Background cosmic effect */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#6b21a8_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(at_bottom_left,#4c1d95_0%,transparent_60%)] pointer-events-none" />

        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-500" />
            <div 
              style={{
                background: 'linear-gradient(135deg, #6b21a8, #a855f7, #c026d3)',
                padding: '8px',
                borderRadius: '14px',
                boxShadow: '0 0 25px rgba(168, 85, 247, 0.6)'
              }}
            >
              <img 
                src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/logo.png" 
                alt="Logo" 
                style={{ width: 32, height: 32, filter: 'brightness(0) invert(1)' }} 
              />
            </div>
          </div>

          <Text className="text-2xl font-black tracking-[2px] bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent group-hover:tracking-[3px] transition-all duration-500">
            STELLAR
          </Text>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex flex-1 justify-center">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ 
              border: 'none', 
              background: 'transparent',
              fontWeight: 500,
              fontSize: '15.5px'
            }}
            className="cosmic-menu"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">
          {user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <div className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 group">
                <div className="relative">
                  <Avatar 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                    size={42}
                    style={{ 
                      border: '2.5px solid #c084fc',
                      boxShadow: '0 0 20px rgba(192, 132, 252, 0.5)'
                    }} 
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0f172a]" />
                </div>
                <div className="hidden lg:block">
                  <Text strong className="text-white text-sm block">{user.name}</Text>
                  <Text className="text-purple-300 text-xs uppercase tracking-widest">{user.role}</Text>
                </div>
                <ChevronDown size={16} className="text-purple-300 group-hover:rotate-180 transition-transform" />
              </div>
            </Dropdown>
          ) : (
            <Link to="/auth" className="hidden lg:block">
              <Button
                size="large"
                style={{
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, #8b5cf6, #d946ef)',
                  border: 'none',
                  fontWeight: 600,
                  boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
                  padding: '0 28px',
                }}
                className="hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-[0_0_40px_rgba(192,132,252,0.7)]"
              >
                Khám Phá Ngay
              </Button>
            </Link>
          )}

          {/* Mobile Toggle */}
          <Button 
            type="text" 
            icon={<MenuIcon size={26} />} 
            className="lg:hidden text-white"
            onClick={() => setVisible(true)}
          />
        </div>

        {/* MOBILE DRAWER - Cosmic Version */}
        <Drawer
          title={
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
                <img 
                  src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/logo.png" 
                  width={28} 
                  style={{ filter: 'brightness(0) invert(1)' }} 
                  alt="logo" 
                />
              </div>
              <span className="text-2xl font-black tracking-wider text-white">STELLAR</span>
            </div>
          }
          placement="right"
          onClose={() => setVisible(false)}
          open={visible}
          width={320}
          closeIcon={<X size={24} className="text-white" />}
          style={{ background: '#0f172a' }}
          className="cosmic-drawer"
        >
          {user && (
            <div className="mb-8 p-6 rounded-3xl bg-white/5 border border-white/10">
              <Space align="center" size={16}>
                <Avatar size={64} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <div>
                  <Text className="text-white text-xl font-semibold block">{user.name}</Text>
                  <Text className="text-purple-300">{user.email || user.role}</Text>
                </div>
              </Space>
            </div>
          )}

          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ border: 'none', background: 'transparent' }}
            className="text-lg text-white/90"
            onClick={() => setVisible(false)}
          />

          <div className="absolute bottom-8 left-6 right-6">
            {user ? (
              <Button 
                danger 
                block 
                size="large" 
                shape="round" 
                icon={<LogOut size={18} />}
                onClick={handleLogout}
                className="h-14 text-base"
              >
                Đăng xuất
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setVisible(false)}>
                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  shape="round"
                  className="h-14 text-base font-semibold bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  Đăng nhập / Đăng ký
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