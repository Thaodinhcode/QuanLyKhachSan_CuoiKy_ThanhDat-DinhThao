import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider, App as AntApp } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import MyBookings from './pages/MyBookings';
import AppFooter from './components/AppFooter';
import { UserProvider, useUser } from './context/UserContext';

const { Content } = Layout;

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();
  if (loading) return null;
  return user?.role === 'Admin' ? children : <Navigate to="/" />;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();
  if (loading) return null;
  return user ? children : <Navigate to="/auth" />;
};

function AppContent() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar />
        <Content style={{ backgroundColor: '#000000' }}> {/* Đặt nền Content màu tối */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
        </Content>
        <AppFooter />
      </Layout>
    </Router>
  );
}

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Màu tím chủ đạo theo phong cách Stellar Luxury
          colorPrimary: '#a347ff', 
          colorInfo: '#a347ff',
          borderRadius: 8,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          
          // Chuyển sang Dark Mode nhẹ cho các thành phần hệ thống
          colorBgBase: '#0a0a0a',
          colorTextBase: '#ffffff',
        },
        components: {
          Layout: {
            headerBg: 'rgba(0, 0, 0, 0.85)', // Header tối và hơi trong suốt
            bodyBg: '#000000',
            footerBg: '#0a0a0a',
          },
          Button: {
            colorPrimary: 'linear-gradient(90deg, #7e22ce 0%, #a855f7 100%)', // Nút bấm Gradient tím
            algorithm: true, // Bật tính năng nhận diện gradient
            controlHeight: 40,
            fontWeight: 600,
          },
          Table: {
            headerBg: '#1f1f1f',
            headerColor: '#ffffff',
            headerBorderRadius: 4,
            colorBgContainer: '#141414',
            colorText: '#e5e5e5',
          },
          Menu: {
            darkItemBg: 'transparent',
            darkItemSelectedBg: '#a347ff',
          }
        },
      }}
    >
      <AntApp>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </AntApp>
    </ConfigProvider>
  );
}