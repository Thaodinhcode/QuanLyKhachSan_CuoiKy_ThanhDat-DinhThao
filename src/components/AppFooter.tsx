import React from 'react';
import { Layout, Row, Col, Typography, Space, Button, Divider, ConfigProvider } from 'antd';
import { Mail, ArrowRight, Facebook, Instagram, Youtube, Twitter, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
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
          background: '#0a0a0a', 
          color: '#ffffff',
          padding: '60px 5% 30px',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Row gutter={[48, 40]} justify="center">
            
            {/* Cột 1: Brand & CTA */}
            <Col xs={24} md={12} lg={7}>
              <Space direction="vertical" size={20}>
                <Link to="/">
                  <img 
                    src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/logo.png" 
                    alt="Stellar Hotel" 
                    style={{ height: 70, filter: 'brightness(1.1)' }} 
                  />
                </Link>
                <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: '1.7', display: 'block' }}>
                  Trải nghiệm sự xa hoa và dịch vụ đẳng cấp thế giới tại Stellar Hotel. Nơi mỗi khoảnh khắc đều trở thành kỷ niệm khó quên.
                </Text>
                <Link to="/rooms">
                  <Button 
                    type="primary" 
                    size="large"
                    style={{ 
                      background: '#eb2f96', 
                      borderColor: '#eb2f96', 
                      borderRadius: '8px',
                      height: '45px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    ĐẶT PHÒNG NGAY <ArrowRight size={18} />
                  </Button>
                </Link>
              </Space>
            </Col>

            {/* Cột 2: Quick Links */}
            <Col xs={12} md={6} lg={4}>
              <Title level={5} style={{ color: '#fff', marginBottom: 25, fontSize: '14px', letterSpacing: '1.5px' }}>KHÁM PHÁ</Title>
              <Space direction="vertical" size={12}>
                {['Điểm đến', 'Ưu đãi đặc biệt', 'Loại phòng', 'Đánh giá'].map((item) => (
                  <Text 
                    key={item}
                    style={{ color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'block' }}
                  >
                    {item}
                  </Text>
                ))}
              </Space>
            </Col>

            {/* Cột 3: Services */}
            <Col xs={12} md={6} lg={4}>
              <Title level={5} style={{ color: '#fff', marginBottom: 25, fontSize: '14px', letterSpacing: '1.5px' }}>DỊCH VỤ</Title>
              <Space direction="vertical" size={12}>
                {['Hỗ trợ 24/7', 'Đưa đón sân bay', 'Spa & Massage', 'Tổ chức sự kiện'].map((item) => (
                  <Text 
                    key={item}
                    style={{ color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'block' }}
                  >
                    {item}
                  </Text>
                ))}
              </Space>
            </Col>

            {/* Cột 4: Contact Professionals */}
            <Col xs={24} md={12} lg={9}>
              <Title level={5} style={{ color: '#fff', marginBottom: 25, fontSize: '14px', letterSpacing: '1.5px' }}>LIÊN HỆ</Title>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Info Card 1 */}
                <div style={{ borderLeft: '3px solid #eb2f96', paddingLeft: '15px', marginBottom: '10px' }}>
                  <Text strong style={{ color: '#fff', display: 'block', fontSize: '15px' }}>Đình Thảo (Founder)</Text>
                  <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0' }}>
                    <Mail size={14} /> nguyendinhthao@gmail.com
                  </Text>
                  <Space size={15} style={{ marginTop: '8px' }}>
                    <Facebook size={16} style={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }} />
                    <Instagram size={16} style={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }} />
                    <Github size={16} style={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }} />
                  </Space>
                </div>

                {/* Info Card 2 */}
                <div style={{ borderLeft: '3px solid #722ed1', paddingLeft: '15px' }}>
                  <Text strong style={{ color: '#fff', display: 'block', fontSize: '15px' }}>Thành Đạt (Co-Founder)</Text>
                  <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0' }}>
                    <Mail size={14} /> nguyenthanhdat@gmail.com
                  </Text>
                  <Space size={15} style={{ marginTop: '8px' }}>
                    <Facebook size={16} style={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }} />
                    <Instagram size={16} style={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }} />
                    <Twitter size={16} style={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }} />
                  </Space>
                </div>
              </div>
            </Col>
          </Row>

          <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: '40px 0 20px' }} />

          <div style={{ textAlign: 'center' }}>
            <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
              © {new Date().getFullYear()} Stellar Hotel. Phát triển bởi <span style={{ color: '#eb2f96' }}>Dinh Thao & Thanh Dat</span>
            </Text>
          </div>
        </div>
      </Footer>
    </ConfigProvider>
  );
};

export default AppFooter;