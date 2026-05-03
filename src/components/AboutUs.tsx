import React from 'react';
import { Row, Col, Typography, Image, Space, Button } from 'antd';
import { Check, Sparkles } from 'lucide-react';

const { Title, Paragraph, Text } = Typography;
const AntImage = Image as any;

const AboutUs = () => {
  return (
    <section 
      id="about" 
      style={{ 
        padding: '120px 24px', 
        background: 'linear-gradient(180deg, #0f172a 0%, #1e1133 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background cosmic effects */}
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#4c1d95_0%,transparent_70%)] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#7c3aed_0%,transparent_60%)] opacity-30" />

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Row gutter={[80, 48]} align="middle">
          
          {/* LEFT - IMAGE */}
          <Col xs={24} lg={12}>
            <div style={{ position: 'relative', padding: '20px' }}>
              {/* Glow layer */}
              <div 
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  background: 'linear-gradient(135deg, #8b5cf6, #c026d3, #ec4899)',
                  borderRadius: '24px',
                  filter: 'blur(25px)',
                  opacity: 0.25,
                  zIndex: 0
                }} 
              />

              <div style={{ 
                position: 'relative', 
                zIndex: 1,
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.6)',
              }}>
                <AntImage
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200"
                  alt="Stellar Resort"
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    objectFit: 'cover',
                    borderRadius: '24px'
                  }}
                  preview={false}
                />
                
                {/* Overlay cosmic shine */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.1) 100%)',
                  pointerEvents: 'none'
                }} />
              </div>

              {/* Decorative corner elements */}
              <div style={{
                position: 'absolute',
                top: 40,
                right: -20,
                width: 120,
                height: 120,
                border: '3px solid rgba(192, 132, 252, 0.4)',
                borderRadius: '20px',
                transform: 'rotate(12deg)',
                zIndex: 2
              }} />
            </div>
          </Col>

          {/* RIGHT - CONTENT */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size={24} style={{ width: '100%' }}>
              
              <div className="flex items-center gap-3">
                <Sparkles size={28} className="text-purple-400" />
                <Text 
                  style={{ 
                    color: '#c084fc', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '4px',
                    fontSize: '15px'
                  }}
                >
                  KHÁM PHÁ VŨ TRỤ STELLAR
                </Text>
              </div>

              <Title 
                level={1} 
                style={{ 
                  fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', 
                  lineHeight: 1.1,
                  margin: 0,
                  background: 'linear-gradient(90deg, #f3e8ff, #e0bbff, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 900
                }}
              >
                Nơi những vì sao chạm đến kỳ nghỉ của bạn
              </Title>

              <Paragraph style={{ 
                fontSize: '17.5px', 
                color: '#cbd5e1', 
                lineHeight: 1.85,
                marginBottom: 16
              }}>
                Stellar không chỉ là một khu nghỉ dưỡng — đây là cổng kết nối giữa thiên nhiên hùng vĩ và sự xa xỉ vượt thời gian. 
                Mỗi góc nhỏ đều được thiết kế để mang đến cảm giác bạn đang nghỉ dưỡng giữa dải Ngân Hà.
              </Paragraph>

              {/* Features */}
              <Space direction="vertical" size={18}>
                {[
                  "Hơn 25 thiên đường nghỉ dưỡng trên toàn quốc",
                  "Dịch vụ cá nhân hóa 24/7 bởi đội ngũ chuyên gia",
                  "Ẩm thực 5 sao kết hợp tinh hoa vũ trụ",
                  "Trải nghiệm spa và wellness chuẩn quốc tế"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div style={{
                      width: 32,
                      height: 32,
                      background: 'rgba(192, 132, 252, 0.15)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(192, 132, 252, 0.3)'
                    }}>
                      <Check size={18} color="#c084fc" />
                    </div>
                    <Text style={{ 
                      color: '#e2e8f0', 
                      fontSize: '16.5px',
                      lineHeight: 1.6
                    }}>
                      {item}
                    </Text>
                  </div>
                ))}
              </Space>

              <Button 
                size="large" 
                style={{
                  height: 56,
                  borderRadius: '9999px',
                  padding: '0 40px',
                  fontSize: '17px',
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #8b5cf6, #d946ef)',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
                  marginTop: 20
                }}
                className="hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-[0_0_40px_rgba(192,132,252,0.6)]"
              >
                <a href="#contact">Bắt đầu hành trình của bạn</a>
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutUs;