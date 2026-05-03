import React, { useState } from 'react';
import { Card, Form, Input, Button, Tabs, Typography, App } from 'antd';
import { Mail, Lock, User, Phone, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { UserService } from '../services/api';

const { Title, Text } = Typography;
const AntCard = Card as any;

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onLogin = async (values: any) => {
    setLoading(true);
    try {
      const user = await UserService.login(values.email, values.password);
      if (user) {
        login(user);
        message.success('Đăng nhập thành công!');
        navigate(user.role === 'Admin' ? '/admin' : '/');
      } else {
        message.error('Email hoặc mật khẩu không chính xác');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi đăng nhập');
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (values: any) => {
    setLoading(true);
    try {
      const users = await UserService.getUsers();
      if (users.some(u => u.email === values.email)) {
        message.error('Email này đã được đăng ký!');
        setLoading(false);
        return;
      }

      const newUser = {
        id: `u${Date.now()}`,
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        role: 'User' as const,
      };

      await UserService.addUser(newUser);
      login(newUser);
      message.success('Đăng ký thành công!');
      navigate('/');
    } catch (error) {
      message.error('Có lỗi xảy ra khi đăng ký');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 64px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f8f9fa'
    }} className="p-4 sm:p-6">
      <AntCard style={{ width: '100%', maxWidth: 450, borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ marginBottom: 8 }}>stellarhotel</Title>
          <Text type="secondary">Chào mừng bạn đến với thiên đường nghỉ dưỡng</Text>
        </div>

        <Tabs 
          centered 
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><LogIn size={16} /> Đăng nhập</span>,
              children: (
                <Form layout="vertical" onFinish={onLogin} requiredMark={false}>
                  <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập Email' }, { type: 'email' }]}>
                    <Input prefix={<Mail size={16} color="#bfbfbf" />} placeholder="Email" size="large" />
                  </Form.Item>
                  <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                    <Input.Password prefix={<Lock size={16} color="#bfbfbf" />} placeholder="Mật khẩu" size="large" />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" block size="large" loading={loading} style={{ height: 48, borderRadius: 8 }}>
                    Đăng nhập
                  </Button>
                </Form>
              )
            },
            {
              key: '2',
              label: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><UserPlus size={16} /> Đăng ký</span>,
              children: (
                <Form layout="vertical" onFinish={onRegister} requiredMark={false}>
                  <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                    <Input prefix={<User size={16} color="#bfbfbf" />} placeholder="Họ và tên" size="large" />
                  </Form.Item>
                  <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập Email' }, { type: 'email' }]}>
                    <Input prefix={<Mail size={16} color="#bfbfbf" />} placeholder="Email" size="large" />
                  </Form.Item>
                  <Form.Item name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                    <Input prefix={<Phone size={16} color="#bfbfbf" />} placeholder="Số điện thoại" size="large" />
                  </Form.Item>
                  <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }, { min: 6 }]}>
                    <Input.Password prefix={<Lock size={16} color="#bfbfbf" />} placeholder="Mật khẩu (tối thiểu 6 ký tự)" size="large" />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" block size="large" loading={loading} style={{ height: 48, borderRadius: 8 }}>
                    Đăng ký ngay
                  </Button>
                </Form>
              )
            }
          ]}
        />
      </AntCard>
    </div>
  );
};

export default Auth;
