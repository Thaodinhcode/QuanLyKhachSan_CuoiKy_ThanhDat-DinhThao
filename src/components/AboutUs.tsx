import React from 'react';
import { Row, Col, Typography, Image, Space, Button } from 'antd';
import { Check } from 'lucide-react';

const { Title, Paragraph, Text } = Typography;
const AntImage = Image as any;

const AboutUs = () => {
  return (
    <section id="about" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <Row gutter={[64, 48]} align="middle">
        <Col xs={24} lg={12}>
          <div style={{ position: 'relative', overflow: 'hidden', padding: '20px' }}>
            <AntImage
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200"
              alt="About Resort"
              style={{ borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', width: '100%', height: 'auto', objectFit: 'cover' }}
              preview={false}
            />
            {/* Design Accent - Only show on larger screens to avoid overflow */}
            <div className="hidden lg:block" style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 150,
              height: 150,
              border: '10px solid #eb2f96',
              borderRadius: 16,
              zIndex: -1
            }} />
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <Space orientation="vertical" size={16}>
            <Text style={{ color: '#eb2f96', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2 }}>
              Về chúng tôi
            </Text>
            <Title level={2} style={{ fontSize: 40, margin: '0 0 16px 0' }}>
              Trải nghiệm kỳ nghỉ dưỡng đẳng cấp quốc tế
            </Title>
            <Paragraph style={{ fontSize: 16, color: '#666', lineHeight: 1.8 }}>
              Tận hưởng thiên đường nghỉ dưỡng tại khách sạn – nơi vẻ đẹp của biển cả hòa quyện cùng sự sang trọng hiện đại. Chúng tôi không chỉ trao bạn một phòng nghỉ, mà gửi tặng một trải nghiệm sống đỉnh cao.
            </Paragraph>
            <Space orientation="vertical" size={12} style={{ marginBottom: 24 }}>
              <Space><Check size={18} color="#eb2f96" /><Text>Hơn 25 cơ sở trên toàn quốc</Text></Space>
              <Space><Check size={18} color="#eb2f96" /><Text>Dịch vụ chăm sóc khách hàng 24/7</Text></Space>
              <Space><Check size={18} color="#eb2f96" /><Text>Ẩm thực tinh hoa chuẩn 5 sao</Text></Space>
            </Space>