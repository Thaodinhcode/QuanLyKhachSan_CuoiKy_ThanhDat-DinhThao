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