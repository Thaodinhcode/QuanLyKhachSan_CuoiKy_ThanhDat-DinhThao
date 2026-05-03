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