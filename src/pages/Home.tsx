import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Spin, Statistic, Card, Space } from 'antd';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import { RoomService } from '../services/api';
import { Room } from '../types';
import { Users, Building, ShieldCheck, Star, Sparkles, Award } from 'lucide-react';

const { Title, Text } = Typography;
const AntCard = Card as any;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRooms = await RoomService.getRooms();
        setFeaturedRooms(allRooms.slice(0, 3));
      } catch (e) {
        console.error("Error fetching rooms", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: '#0f172a' }}>
      <Hero />

      {/* Statistics Section - Cosmic */}
      <section style={{ 
        padding: '90px 24px', 
        background: 'linear-gradient(180deg, #1e2937 0%, #0f172a 100%)',
        position: 'relative'
      }}>
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#6b21a8_0%,transparent_70%)] opacity-30" />
        
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[32, 48]} justify="center">
            {[
              { icon: <Building size={38} />, label: "Cơ sở toàn quốc", value: 25, suffix: "+" },
              { icon: <Users size={38} />, label: "Khách hàng hài lòng", value: 600, suffix: "+" },
              { icon: <Star size={38} />, label: "Đánh giá 5 sao", value: 1500, suffix: "+" },
              { icon: <ShieldCheck size={38} />, label: "Chuyên gia phục vụ", value: 120, suffix: "+" },
            ].map((stat, index) => (
              <Col xs={12} md={6} key={index}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    marginBottom: 20, 
                    display: 'flex', 
                    justifyContent: 'center',
                    opacity: 0.9
                  }}>
                    <div style={{
                      padding: '16px',
                      background: 'rgba(139, 92, 246, 0.15)',
                      borderRadius: '50%',
                      border: '1px solid rgba(192, 132, 252, 0.3)'
                    }}>
                      {stat.icon}
                    </div>
                  </div>
                  
                  <Statistic 
                    value={stat.value} 
                    suffix={stat.suffix}
                    styles={{ 
                      content: { 
                        fontSize: '42px', 
                        fontWeight: 900, 
                        color: '#e0bbff',
                        lineHeight: 1 
                      } 
                    }} 
                  />
                  <Text style={{ 
                    color: '#c4b5fd', 
                    fontSize: '16px', 
                    marginTop: 8,
                    display: 'block'
                  }}>
                    {stat.label}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <AboutUs />

      {/* Services Section - Cosmic */}
      <section id="services" style={{ 
        padding: '100px 24px', 
        background: 'linear-gradient(180deg, #1e2937, #0f172a)' 
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles size={32} style={{ color: '#c084fc' }} />
              <Text style={{ 
                color: '#c4b5fd', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '4px',
                fontSize: '15px'
              }}>
                TIỆN ÍCH VŨ TRỤ
              </Text>
            </div>
            <Title level={2} style={{ 
              color: 'white', 
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', 
              margin: 0 
            }}>
              Trải nghiệm đẳng cấp 5 sao
            </Title>
          </div>

          <Row gutter={[28, 28]}>
            {[
              { 
                title: 'Hồ bơi vô cực', 
                desc: 'Thư giãn giữa làn nước xanh ngọc và tầm nhìn ôm trọn bầu trời sao.', 
                icon: <Users size={42} color="#c084fc" /> 
              },
              { 
                title: 'Ẩm thực thượng hạng', 
                desc: 'Hành trình vị giác với ẩm thực Á - Âu được chế biến bởi đầu bếp quốc tế.', 
                icon: <Star size={42} color="#c084fc" /> 
              },
              { 
                title: 'Spa & Trị liệu', 
                desc: 'Phục hồi năng lượng với liệu trình cao cấp lấy cảm hứng từ thiên nhiên.', 
                icon: <ShieldCheck size={42} color="#c084fc" /> 
              },
              { 
                title: 'Dịch vụ đưa đón', 
                desc: 'Xe sang riêng tư, đảm bảo sự thoải mái và riêng tư tuyệt đối.', 
                icon: <Building size={42} color="#c084fc" /> 
              },
            ].map((service, index) => (
              <Col key={index} xs={24} sm={12} lg={6}>
                <AntCard 
                  hoverable 
                  style={{ 
                    height: '100%', 
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid rgba(192, 132, 252, 0.15)',
                    borderRadius: '16px',
                    transition: 'all 0.4s'
                  }}
                  styles={{ body: { padding: '40px 28px', textAlign: 'center' } }}
                  className="group hover:-translate-y-3 hover:border-purple-400"
                >
                  <div style={{ marginBottom: 28, transition: 'transform 0.4s' }} className="group-hover:scale-110">
                    {service.icon}
                  </div>
                  
                  <Title level={4} style={{ color: 'white', marginBottom: 16 }}>
                    {service.title}
                  </Title>
                  
                  <Text style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
                    {service.desc}
                  </Text>
                </AntCard>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Featured Rooms */}
      <section id="explore" style={{ padding: '100px 24px', background: '#0f172a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award size={32} style={{ color: '#c084fc' }} />
              <Text style={{ 
                color: '#c4b5fd', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '4px',
                fontSize: '15px'
              }}>
                KHÁM PHÁ PHÒNG NGHỈ
              </Text>
            </div>
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              Những căn phòng giữa dải Ngân Hà
            </Title>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '120px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[28, 28]}>
              {featuredRooms.map(room => (
                <Col key={room.id} xs={24} md={12} lg={8}>
                  <RoomCard room={room} />
                </Col>
              ))}
            </Row>
          )}

          <div style={{ textAlign: 'center', marginTop: 80 }}>
            <Link to="/rooms">
              <Button 
                size="large"
                style={{
                  height: 62,
                  padding: '0 48px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, #8b5cf6, #d946ef)',
                  border: 'none',
                  fontSize: '17px',
                  fontWeight: 700,
                  boxShadow: '0 15px 35px rgba(139, 92, 246, 0.4)'
                }}
                className="hover:scale-105 transition-all"
              >
                XEM TẤT CẢ PHÒNG NGHỈ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;