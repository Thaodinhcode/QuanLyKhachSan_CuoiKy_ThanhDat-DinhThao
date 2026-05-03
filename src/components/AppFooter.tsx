import React from 'react';
import { Layout, Row, Col, Typography, Space, Button, Divider } from 'antd';
import { Mail, MapPin, Hotel } from 'lucide-react';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
  return (
    <Footer id="contact" style={{ background: '#0a0a0a', color: '#ffffff' }} className="py-16 px-6">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Thêm justify="center" để đẩy toàn bộ các cột vào giữa */}
        <Row gutter={[48, 48]} justify="center">

          {/* Cột 1: Logo + Mô tả - Giữ lg={6} */}
          <Col xs={24} md={12} lg={6}>
            <Space direction="vertical" size={16}>
              <div>
                <a href="/">
                  <img 
                    src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/logo.png" 
                    alt="Stellar Hotel" 
                    style={{ height: 110, cursor: 'pointer' }} 
                  />
                </a>
              </div>
              
              <Text style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
                Khám phá thế giới của sự tiện nghi, sang trọng và phiêu lưu khi bạn tìm hiểu bộ sưu tập khách sạn được chọn lọc của chúng tôi.
              </Text>

              <Link to="/rooms">
                <Button 
                  type="primary" 
                  size="large"
                  style={{ 
                    background: '#eb2f96', 
                    borderColor: '#eb2f96', 
                    borderRadius: 6,
                    height: 48,
                    fontWeight: 600
                  }}
                >
                  Đặt phòng ngay
                </Button>
              </Link>
            </Space>
          </Col>