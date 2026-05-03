import React from 'react';
import { Typography, Row, Col, DatePicker, InputNumber, Button, Card, Space } from 'antd';
import { Search, MapPin, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const AntCard = Card as any;

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section style={{ 
      position: 'relative', 
      height: '80vh', 
      minHeight: 550,
      width: '100%',
      marginBottom: 60 // Khoảng trống cho thanh search đè lên
    }}>
      {/* Background Section */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0
      }}>
        <img 
          src="https://phannguyenstudio.vn/wp-content/uploads/2020/09/chup_anh_khach_san_hoi_an_almanity_01.jpg"
          alt="Hero Background"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5))',
        }} />
      </div>