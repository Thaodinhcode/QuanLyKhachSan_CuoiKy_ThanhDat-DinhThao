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

      {/* Hero Content */}
      <div style={{ 
        position: 'relative',
        height: '100%',
        maxWidth: 1200, 
        margin: '0 auto',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 24px',
        zIndex: 1
      }}>
        <div style={{ maxWidth: 800 }}>
          <Space orientation="vertical" size={16} style={{ marginBottom: 32 }}>
            <Text style={{ color: 'white', letterSpacing: 4, textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
              Chào mừng bạn đến với stellarhotel
            </Text>
            <Title style={{ color: 'white', fontSize: 'clamp(36px, 5vw, 64px)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Chạm vào bình yên <br/> tận hưởng kỳ nghỉ trọn vẹn 
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 500, display: 'block' }}>
              Tận hưởng dịch vụ đẳng cấp 5 sao và không gian hiện đại tại khách sạn ở Việt Nam.
            </Text>
          </Space>
        </div>