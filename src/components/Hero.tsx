import React from 'react';
import { Typography, Row, Col, DatePicker, InputNumber, Button, Card, Space } from 'antd';
import { Search, Users, Calendar, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const AntCard = Card as any;

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section style={{ 
      position: 'relative', 
      height: '100vh', 
      minHeight: 720,
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Cosmic Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img 
          src="https://phannguyenstudio.vn/wp-content/uploads/2020/09/chup_anh_khach_san_hoi_an_almanity_01.jpg"
          alt="Stellar Resort"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            filter: 'brightness(0.7) contrast(1.15)'
          }}
        />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(30,17,51,0.92) 55%, rgba(15,23,42,0.95) 100%)',
          zIndex: 1
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 25% 30%, rgba(139,92,246,0.45) 0%, transparent 55%)',
          zIndex: 2
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 75% 65%, rgba(236,72,153,0.35) 0%, transparent 55%)',
          zIndex: 2
        }} />
      </div>

      {/* Hero Content */}
      <div style={{ 
        position: 'relative',
        height: '100%',
        maxWidth: 1280, 
        margin: '0 auto',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 24px',
        zIndex: 3
      }}>
        <div style={{ maxWidth: 820 }}>
          <Space direction="vertical" size={20}>
            <div className="flex items-center gap-3">
              <Sparkles size={32} style={{ color: '#c084fc' }} />
              <Text style={{ 
                color: '#c4b5fd', 
                letterSpacing: '6px', 
                textTransform: 'uppercase', 
                fontWeight: 700,
                fontSize: '15px'
              }}>
                STELLAR LUXURY RESORT
              </Text>
            </div>

            <Title style={{ 
              color: 'white', 
              fontSize: 'clamp(42px, 6.5vw, 74px)', 
              margin: 0, 
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: '-0.04em'
            }}>
              Chạm vào bầu trời<br />
              <span style={{
                background: 'linear-gradient(90deg, #e0bbff, #c084fc, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Tận hưởng thiên đường
              </span>
            </Title>

            <Text style={{ 
              color: '#e0e7ff', 
              fontSize: '19px', 
              maxWidth: 520,
              opacity: 0.95
            }}>
              Không gian nghỉ dưỡng giữa dải Ngân Hà. 
              Nơi mỗi khoảnh khắc đều trở nên kỳ diệu và đẳng cấp.
            </Text>
          </Space>
        </div>
      </div>

      {/* SEARCH CARD - ĐÃ NÂNG CẤP */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 48px)',
        maxWidth: 1100,
        zIndex: 20,           // Tăng z-index để tránh bị che
      }} className="hidden md:block">
        
        <AntCard 
          style={{ 
            borderRadius: 28, 
            boxShadow: '0 40px 90px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(192, 132, 252, 0.35)',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(24px)',
            overflow: 'hidden'
          }}
          styles={{ body: { padding: '12px' } }}
        >
          <Row gutter={[12, 12]} align="middle">
            
            {/* Nhận - Trả phòng */}
            <Col xs={24} md={10}>
              <div 
                style={{ 
                  padding: '18px 24px', 
                  borderRadius: 20,
                  transition: 'all 0.4s',
                  cursor: 'pointer'
                }} 
                className="hover:bg-slate-50 flex flex-col group"
                onClick={() => {
                  const picker = document.querySelector('.hero-range-picker input') as HTMLInputElement;
                  picker?.click();
                }}
              >
                <Space style={{ marginBottom: 8 }}>
                  <Calendar size={20} color="#7c3aed" />
                  <Text strong style={{ 
                    fontSize: 13.5, 
                    textTransform: 'uppercase', 
                    color: '#64748b', 
                    letterSpacing: 1.5 
                  }}>
                    Nhận phòng — Trả phòng
                  </Text>
                </Space>
                <RangePicker 
                  className="hero-range-picker"
                  variant="borderless"
                  style={{ 
                    width: '100%', 
                    fontSize: 17.5, 
                    fontWeight: 600, 
                    color: '#1e2937',
                    padding: 0
                  }} 
                  placeholder={['Ngày nhận phòng', 'Ngày trả phòng']} 
                  allowClear={false}
                  suffixIcon={null}
                />
              </div>
            </Col>

            {/* Số khách */}
            <Col xs={24} md={7}>
              <div 
                style={{ 
                  padding: '18px 24px', 
                  borderRadius: 20,
                  transition: 'all 0.4s',
                  cursor: 'pointer'
                }} 
                className="hover:bg-slate-50 flex flex-col group md:border-l md:border-gray-200"
                onClick={() => {
                  const input = document.querySelector('.hero-guest-input input') as HTMLInputElement;
                  input?.focus();
                }}
              >
                <Space style={{ marginBottom: 8 }}>
                  <Users size={20} color="#7c3aed" />
                  <Text strong style={{ 
                    fontSize: 13.5, 
                    textTransform: 'uppercase', 
                    color: '#64748b', 
                    letterSpacing: 1.5 
                  }}>
                    Số lượng khách
                  </Text>
                </Space>
                <InputNumber 
                  className="hero-guest-input"
                  min={1} 
                  max={20} 
                  defaultValue={2} 
                  variant="borderless"
                  style={{ 
                    width: '100%', 
                    fontSize: 17.5, 
                    fontWeight: 600, 
                    color: '#1e2937',
                    padding: 0
                  }} 
                />
              </div>
            </Col>

            {/* Button Tìm kiếm */}
            <Col xs={24} md={7}>
              <Button 
                type="primary" 
                size="large" 
                block 
                icon={<Search size={24} />}
                onClick={() => navigate('/rooms')}
                style={{ 
                  height: 78, 
                  borderRadius: 20, 
                  background: 'linear-gradient(90deg, #6d28d9, #c026d3)',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '17.5px',
                  boxShadow: '0 20px 40px rgba(109, 40, 217, 0.45)',
                }}
                className="hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-[0_25px_50px_rgba(139,92,246,0.6)]"
              >
                KHÁM PHÁ NGAY
              </Button>
            </Col>
          </Row>
        </AntCard>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden px-6 mt-10 pb-10">
        <AntCard 
          style={{ 
            borderRadius: 24, 
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            border: '1px solid rgba(192,132,252,0.3)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* Mobile search content - Bạn có thể copy style desktop vào đây nếu cần */}
          <p className="text-center text-gray-500 py-8">Tìm phòng trên mobile đang được tối ưu...</p>
        </AntCard>
      </div>
    </section>
  );
};

export default Hero;