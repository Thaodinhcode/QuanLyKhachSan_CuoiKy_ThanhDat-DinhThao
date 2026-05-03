import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Space, Typography, Avatar, Dropdown, App, Divider } from 'antd';
import { Menu as MenuIcon, User as UserIcon, LogOut, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { message } = App.useApp();

  const handleLogout = () => {
    logout();
    message.success('Đã đăng xuất');
    navigate('/');
    setVisible(false);
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/' + href);
    }
    setVisible(false);
  };

  const menuItems = [
    { key: '/', label: <Link to="/">Trang chủ</Link> },
    { key: 'about', label: <a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>Giới thiệu</a> },
    { key: 'services', label: <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>Dịch vụ</a> },
    { key: 'explore', label: <a href="#explore" onClick={(e) => handleAnchorClick(e, '#explore')}>Khám phá</a> },
    { key: 'contact', label: <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>Liên hệ</a> },
    { key: '/rooms', label: <Link to="/rooms">Phòng nghỉ</Link> },
    ...(user?.role === 'User' ? [{ key: '/my-bookings', label: <Link to="/my-bookings">Đơn đặt của tôi</Link> }] : []),
    ...(user?.role === 'Admin' ? [{ key: '/admin', label: <Link to="/admin">Trang quản trị</Link> }] : []),
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserIcon size={16} />,
      label: 'Hồ sơ cá nhân',
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogOut size={16} />,
      label: 'Đăng xuất',
      danger: true,
      onClick: handleLogout
    },
  ];

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 20px',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      height: 64
    }}>
      {/* Left side: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/logo.png" 
            alt="Stellar Hotel Logo"
            style={{ width: 32, height: 32, marginRight: 8, objectFit: 'contain' }} 
          />
          <Text strong style={{ 
            color: '#000', 
            fontSize: 'clamp(14px, 4vw, 18px)', // Responsive font size
            letterSpacing: -0.5,
            whiteSpace: 'nowrap'
          }}>
            STELLARHOTEL
          </Text>
        </Link>
      </div>

      {/* Center: Desktop Menu */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0 }}>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ border: 'none', width: '100%', justifyContent: 'center' }}
          className="hidden lg:flex"
        />
      </div>