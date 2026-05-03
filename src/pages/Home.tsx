import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Spin, Statistic, Card, Select } from 'antd';
import { Link } from 'react-router-dom';

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