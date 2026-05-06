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

          {/* Cột 2: Liên kết nhanh - Chỉnh lg={6} để đều với các cột khác */}
          <Col xs={12} md={12} lg={6}>
            <Title level={5} style={{ color: 'white', marginBottom: 20 }}>LIÊN KẾT NHANH</Title>
            <Space direction="vertical" size={20}>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Tìm kiếm điểm đến</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Ưu đãi & Gói đặc biệt</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Loại phòng & Tiện nghi</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Đánh giá từ khách hàng</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Mẹo & Hướng dẫn du lịch</Text>
            </Space>
          </Col>

          {/* Cột 3: Dịch vụ - Chỉnh lg={6} để đều */}
          <Col xs={12} md={12} lg={6}>
            <Title level={5} style={{ color: 'white', marginBottom: 20 }}>DỊCH VỤ CỦA CHÚNG TÔI</Title>
            <Space direction="vertical" size={20}>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Hỗ trợ tận tâm</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Tùy chọn đặt phòng linh hoạt</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Đưa đón sân bay</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Chăm sóc sức khỏe & Giải trí</Text>
            </Space>
          </Col>

          {/* Cột 4: Liên hệ - Chỉnh lg={6} để tổng bằng 24 (6x4=24) */}
          <Col xs={24} md={12} lg={6}>
            <Title level={5} style={{ color: 'white', marginBottom: 20 }}>LIÊN HỆ</Title>
            
            <Space direction="vertical" size={28} style={{ width: '100%' }}>
              <div>
                <Text style={{ color: 'rgba(255,255,255,0.85)', display: 'block', marginBottom: 8 }}>
                  <a>nguyendinhthao@gmail.com</a>
                </Text>
                <Space size={16}>
                  <a href="https://byvn.net/v6Mb" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/facebook.png" width={24} alt="FB" />
                  </a>
                  <a href="https://byvn.net/v6Mb" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/instagram.png" width={24} alt="IG" />
                  </a>
                  <a href="https://byvn.net/v6Mb" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/youtube.png" width={24} alt="YT" />
                  </a>
                  <a href="https://byvn.net/v6Mb" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/twitter.png" width={24} alt="TW" />
                  </a>
                  <a href="https://byvn.net/v6Mb" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/github.png" width={24} alt="GH" />
                  </a>
                </Space>
              </div>

              <div>
                <Text style={{ color: 'rgba(255,255,255,0.85)', display: 'block', marginBottom: 8 }}>
                  <a>nguyenthanhdat@gmail.com</a>
                </Text>
                <Space size={16}>
                  <a href="https://facebook.com/yourdatfb" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/facebook.png" width={24} alt="FB" />
                  </a>
                  <a href="https://byvn.net/v6Mb" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/instagram.png" width={24} alt="IG" />
                  </a>
                  <a href="https://byvn.net/v6Mb" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/youtube.png" width={24} alt="YT" />
                  </a>
                  <a href="https://byvn.net/v6Mb" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/twitter.png" width={24} alt="TW" />
                  </a>
                  <a href="https://byvn.net/v6Mb" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/github.png" width={24} alt="GH" />
                  </a>
                </Space>
              </div>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: 'rgba(255, 255, 255, 0)', margin: '40px 0 30px' }} />

        <div style={{ textAlign: 'center' }}>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
           {new Date().getFullYear()} Stellar Hotel_ Dinh Thao & Thanh Dat
          </Text>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;