import React from 'react';
import { Layout, Row, Col, Typography, Space, Button, Divider, ConfigProvider } from 'antd';
import { Mail, ArrowRight, Facebook, Instagram, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
  // Các style dùng chung để code sạch hơn
  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '15px',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s'
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.5)',
    display: 'block',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#eb2f96',
        },
      }}
    >
      <Footer 
        id="contact" 
        style={{ 
          // Hiệu ứng nền vũ trụ
          background: 'radial-gradient(circle at 50% -20%, #1a1a3d 0%, #050505 80%)', 
          color: '#ffffff',
          padding: '80px 5% 30px',
          fontFamily: "'Inter', sans-serif",
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[48, 40]}>
            
            {/* Cột 1: Brand & Technology Desc */}
            <Col xs={24} lg={9}>
              <Space direction="vertical" size={25}>
                <Link to="/">
                  <img 
                    src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/logo.png" 
                    alt="Stellar Hotel" 
                    style={{ height: 75, filter: 'drop-shadow(0 0 10px rgba(235, 47, 150, 0.5))' }} 
                  />
                </Link>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '1.8', display: 'block' }}>
                  <strong style={{ color: '#fff' }}>STELLAR GALAXY</strong> - Định nghĩa lại sự xa hoa bằng công nghệ vị lai. 
                  Trải nghiệm không gian nghỉ dưỡng đẳng cấp 5 sao với hệ thống vận hành thông minh.
                </Text>
                <Button 
                  type="primary" 
                  size="large"
                  style={{ 
                    background: 'linear-gradient(90deg, #eb2f96 0%, #722ed1 100%)', 
                    border: 'none',
                    height: '50px',
                    padding: '0 30px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(235, 47, 150, 0.3)'
                  }}
                >
                  ĐẶT PHÒNG NGAY <ArrowRight size={18} style={{ marginLeft: 8 }} />
                </Button>
              </Space>
            </Col>

            {/* Cột 2: Quick Links */}
            <Col xs={12} md={6} lg={4}>
              <Title level={5} style={{ color: '#eb2f96', marginBottom: 25, fontSize: '14px', letterSpacing: '2px' }}>KHÁM PHÁ</Title>
              <Space direction="vertical" size={15}>
                {['Phòng Suite AI', 'Dịch vụ Spa', 'Nhà hàng Vũ Trụ', 'Sự kiện'].map((item) => (
                  <Text key={item} style={linkStyle}>{item}</Text>
                ))}
              </Space>
            </Col>

            {/* Cột 3: Founders & Contact */}
            <Col xs={24} md={12} lg={11}>
              <Title level={5} style={{ color: '#722ed1', marginBottom: 25, fontSize: '14px', letterSpacing: '2px' }}>ĐỘI NGŨ SÁNG LẬP</Title>
              
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ ...glassCardStyle, borderLeft: '4px solid #eb2f96' }}>
                    <Text strong style={{ color: '#fff', fontSize: '15px', display: 'block' }}>Đình Thảo</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Founder & CEO</Text>
                    <Space size={12} style={{ marginTop: 10, display: 'flex' }}>
                      <Mail size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
                      <Facebook size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
                      <Github size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
                    </Space>
                  </div>
                </Col>

                <Col span={12}>
                  <div style={{ ...glassCardStyle, borderLeft: '4px solid #722ed1' }}>
                    <Text strong style={{ color: '#fff', fontSize: '15px', display: 'block' }}>Thành Đạt</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Co-Founder & CTO</Text>
                    <Space size={12} style={{ marginTop: 10, display: 'flex' }}>
                      <Mail size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
                      <Twitter size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
                      <Linkedin size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
                    </Space>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.08)', margin: '50px 0 25px' }} />

          <Row justify="space-between" align="middle">
            <Col xs={24} md={12}>
              <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
                © {new Date().getFullYear()} STELLAR HOTEL. DESIGNED FOR THE FUTURE.
              </Text>
            </Col>
            <Col xs={24} md={12} style={{ textAlign: 'right' }}>
              <Space size={20}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#52c41a', boxShadow: '0 0 8px #52c41a' }}></div>
                  <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Nguyễn Đình Thảo</Text>
                </div>
              </Space>
            </Col>
          </Row>
        </div>
      </Footer>
    </ConfigProvider>
  );
};

export default AppFooter;