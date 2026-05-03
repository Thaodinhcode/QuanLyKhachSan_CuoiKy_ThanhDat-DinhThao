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

        {/* Search Bar - Positioned Absolute at Bottom Center */}
        <div style={{
          position: window.innerWidth > 768 ? 'absolute' : 'relative', // Mobile thì không dùng absolute
          bottom: window.innerWidth > 768 ? -40 : 0,
          left: window.innerWidth > 768 ? '50%' : 'auto',
          transform: window.innerWidth > 768 ? 'translateX(-50%)' : 'none',
          width: window.innerWidth > 768 ? 'calc(100% - 48px)' : '100%',
          maxWidth: 1100,
          zIndex: 10,
          marginTop: window.innerWidth > 768 ? 0 : 32, // Tạo khoảng cách trên mobile
        }} className="hero-search-wrapper">
          <AntCard 
            style={{ 
              borderRadius: 20, 
              boxShadow: '0 30px 60px rgba(0,0,0,0.15)', 
              border: 'none',
              background: '#ffffff',
            }}
            styles={{ body: { padding: '12px' } }}
          >
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={10}>
                <div 
                  style={{ 
                    textAlign: 'left', 
                    padding: '8px 16px', 
                    borderRadius: 12, 
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }} 
                  className="hover:bg-gray-50 flex flex-col"
                  onClick={() => {
                    const picker = document.querySelector('.hero-range-picker input') as HTMLInputElement;
                    if (picker) picker.click();
                  }}
                >
                  <Space style={{ marginBottom: 4 }}>
                    <Calendar size={14} color="#eb2f96" />
                    <Text strong style={{ fontSize: 12, textTransform: 'uppercase', color: '#999', letterSpacing: 1 }}>Thời gian nhận/trả phòng</Text>
                  </Space>
                  <RangePicker 
                    className="hero-range-picker"
                    variant="borderless"
                    style={{ width: '100%', fontSize: 16, fontWeight: 500 }} 
                    placeholder={['Nhận phòng', 'Trả phòng']} 
                    allowClear={false}
                  />
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div 
                  style={{ 
                    textAlign: 'left', 
                    padding: '8px 16px', 
                    borderRadius: 12,
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }} 
                  className="search-divider hover:bg-gray-50 flex flex-col md:border-l md:border-gray-100"
                  onClick={() => {
                    const input = document.querySelector('.hero-guest-input input') as HTMLInputElement;
                    if (input) input.focus();
                  }}
                >
                  <Space style={{ marginBottom: 4 }}>
                    <Users size={14} color="#eb2f96" />
                    <Text strong style={{ fontSize: 12, textTransform: 'uppercase', color: '#999', letterSpacing: 1 }}>Số khách</Text>
                  </Space>
                  <InputNumber 
                    className="hero-guest-input"
                    min={1} 
                    max={10} 
                    defaultValue={1} 
                    variant="borderless"
                    style={{ width: '100%', fontSize: 16, fontWeight: 500 }} 
                  />
                </div>
              </Col>
              <Col xs={24} md={8}>
                <Button 
                  type="primary" 
                  size="large" 
                  block 
                  icon={<Search size={20} />}
                  onClick={() => navigate('/rooms')}
                  style={{ 
                    height: 64, 
                    borderRadius: 14, 
                    background: '#eb2f96', 
                    borderColor: '#eb2f96', 
                    fontWeight: 700,
                    fontSize: 16,
                    boxShadow: '0 8px 20px rgba(235, 47, 150, 0.3)'
                  }}
                >
                  TÌM PHÒNG NGAY
                </Button>
              </Col>
            </Row>
          </AntCard>
        </div>
      </div>
    </section>
  );
};

export default Hero;
