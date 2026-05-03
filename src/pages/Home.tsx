import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Spin, Statistic, Card, Select } from 'antd';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import { RoomService } from '../services/api';
import { Room } from '../types';
import { Users, Building, ShieldCheck, Star, Hotel } from 'lucide-react';

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
    <div>
      <Hero />
      
      {/* Statistics Section */}
      <div style={{ background: '#fff', padding: '64px 24px', borderBottom: '1px solid #f0f2f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[32, 48]} justify="center">
            <Col xs={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                  <Building size={28} color="#eb2f96" />
                </div>
                <Statistic title="Cơ sở toàn quốc" value={25} suffix="+" styles={{ content: { fontWeight: 800 } }} />
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                  <Users size={28} color="#eb2f96" />
                </div>
                <Statistic title="Khách hàng hài lòng" value={600} suffix="+" styles={{ content: { fontWeight: 800 } }} />
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                  <Star size={28} color="#eb2f96" />
                </div>
                <Statistic title="Đánh giá 5 sao" value={1500} suffix="+" styles={{ content: { fontWeight: 800 } }} />
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                  <ShieldCheck size={28} color="#eb2f96" />
                </div>
                <Statistic title="Chuyên gia phục vụ" value={120} suffix="+" styles={{ content: { fontWeight: 800 } }} />
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <AboutUs />

      {/* Services Section */}
      <section id="services" className="py-12 px-6 sm:py-20 sm:px-8" style={{ background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Text style={{ color: '#eb2f96', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2 }}>
              Dịch vụ của chúng tôi
            </Text>
            <Title level={2} className="text-2xl sm:text-3xl md:text-4xl mt-2 mb-0">Trải nghiệm tiện ích 5 sao</Title>
          </div>
          <Row gutter={[24, 24]}>
            {[
              { 
              title: 'Hồ bơi vô cực', 
              desc: 'Trải nghiệm cảm giác thư giãn tuyệt đối giữa làn nước trong xanh và tầm nhìn ôm trọn đại dương.', 
              icon: <div style={{ display: 'flex', justifyContent: 'center' }}><Users size={32} color="#eb2f96" /></div> 
              },
              { 
                title: 'Ẩm thực thượng hạng', 
                desc: 'Hành trình vị giác đa dạng với các món ăn Á-Âu được chế biến từ những nguyên liệu tươi ngon nhất.', 
                icon: <div style={{ display: 'flex', justifyContent: 'center' }}><Star size={32} color="#eb2f96" /></div> 
              },
              { 
                title: 'Spa & Trị liệu', 
                desc: 'Đánh thức mọi giác quan và phục hồi năng lượng với các liệu trình chăm sóc sức khỏe chuyên sâu.', 
                icon: <div style={{ display: 'flex', justifyContent: 'center' }}><ShieldCheck size={32} color="#eb2f96" /></div> 
              },
              { 
                title: 'Dịch vụ đưa đón', 
                desc: 'Khởi đầu kỳ nghỉ thuận tiện với dịch vụ xe sang đưa đón tận nơi, đảm bảo sự riêng tư và an toàn.', 
                icon: <div style={{ display: 'flex', justifyContent: 'center' }}><Building size={32} color="#eb2f96" /></div> 
              },
            ].map((item, index) => (
              <Col key={index} xs={24} sm={12} lg={6}>
                <AntCard 
                  hoverable 
                  variant="borderless"
                  style={{ textAlign: 'center', height: '100%', borderRadius: 12, background: '#f9f9f9' }}
                >
                  <div style={{ marginBottom: 20 }}>{item.icon}</div>
                  <Title level={4}>{item.title}</Title>
                  <Text type="secondary">{item.desc}</Text>
                </AntCard>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section id="explore" className="py-12 px-6 sm:py-20 sm:px-8" style={{ background: '#f4f7f6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Text style={{ color: '#eb2f96', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2 }}>
              Khám phá phòng nghỉ
            </Text>
            <Title level={2} className="text-2xl sm:text-3xl md:text-4xl mt-2 mb-0">Phòng nghỉ cao cấp dành cho bạn</Title>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>
          ) : (
            <Row gutter={[24, 24]}>
              {featuredRooms.map(room => (
                <Col key={room.id} xs={24} md={12} lg={8}>
                  <RoomCard room={room} />
                </Col>
              ))}
            </Row>
          )}

          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <Link to="/rooms">
              <Button type="primary" size="large" style={{ background: '#eb2f96', borderColor: '#eb2f96', height: 48, padding: '0 40px', borderRadius: 8 }}>
                XEM TẤT CẢ PHÒNG
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
