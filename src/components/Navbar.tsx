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