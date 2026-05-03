import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider, Typography, App as AntApp } from 'antd';
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
        <Content>
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
          colorPrimary: '#eb2f96',
          borderRadius: 4,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        components: {
          Layout: {
            headerBg: '#ffffff',
            bodyBg: '#ffffff',
          },
          Table: {
            headerBg: '#fafafa',
            headerColor: 'rgba(0, 0, 0, 0.45)',
            headerBorderRadius: 0,
          },
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
