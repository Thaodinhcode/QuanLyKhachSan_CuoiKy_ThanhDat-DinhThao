import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Spin, Empty, Button, Tabs, Card, Select, Pagination } from 'antd';
import { RoomService } from '../services/api';
import { Room } from '../types';
import RoomCard from '../components/RoomCard';
import { Search, Filter } from 'lucide-react';

const { Content } = Layout;
const { Title, Text } = Typography;

const Rooms = () => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRooms = await RoomService.getRooms();
        
        let filtered = allRooms;
        if (filter !== 'All') {
          filtered = allRooms.filter(r => r.type === filter);
        }
        setRooms(filtered);
      } catch (e) {
        console.error("Error fetching rooms", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [filter]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentRooms = rooms.slice(startIndex, startIndex + pageSize);

  return (
    <Content style={{ maxWidth: '1200px', margin: '0 auto' }} className="py-8 px-4 sm:py-12 sm:px-6">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <Title className="text-2xl sm:text-3xl md:text-4xl" style={{ margin: '0 0 8px 0' }}>Tất cả các phòng</Title>
          <Text type="secondary" className="text-sm sm:text-base">Tìm kiếm phòng phù hợp với nhu cầu của bạn</Text>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f5f5f5', padding: '8px 16px', borderRadius: '8px' }}>
          <Text strong style={{ whiteSpace: 'nowrap' }}>Lọc theo:</Text>
          <Select 
            defaultValue="All" 
            style={{ width: 140 }} 
            variant="borderless"
            onChange={setFilter}
            options={[
              { value: 'All', label: 'Tất cả' },
              { value: 'Single', label: 'Phòng đơn' },
              { value: 'Double', label: 'Phòng đôi' },
              { value: 'Suite', label: 'Phòng Suite' },
              { value: 'Deluxe', label: 'Phòng Deluxe' },
            ]}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>
      ) : rooms.length > 0 ? (
        <>
          <Row gutter={[24, 24]}>
            {currentRooms.map(room => (
              <Col xs={24} sm={12} lg={8} key={room.id}>
                <RoomCard room={room} />
              </Col>
            ))}
          </Row>
          
          <div style={{ marginTop: '48px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={rooms.length}
              onChange={handlePageChange}
              showSizeChanger={false}
              hideOnSinglePage
            />
          </div>
        </>
      ) : (
        <div style={{ padding: '100px 0' }}>
          <Empty description="Không tìm thấy phòng nào phù hợp" />
        </div>
      )}
    </Content>
  );
};

export default Rooms;
