import React from 'react';
import { Card, Tag, Button, Typography, Space, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { Room } from '../types';
import { Users, DollarSign, Star } from 'lucide-react';

const { Text, Title } = Typography;
const AntCard = Card as any;

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const statusColors = {
    Available: 'success',
    Occupied: 'error',
    Maintenance: 'warning'
  };

  const statusLabels = {
    Available: 'Trống',
    Occupied: 'Hết phòng',
    Maintenance: 'Bảo trì'
  };

  const avgRating = room.reviews?.length > 0 
    ? (room.reviews.reduce((acc, curr) => acc + curr.rating, 0) / room.reviews.length).toFixed(1)
    : null;

  return (
    <AntCard
      hoverable
      cover={
        <div style={{ height: 'auto', minHeight: '200px', maxHeight: '240px', overflow: 'hidden' }}>
          <img
            alt={room.name}
            src={room.image}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      }
      style={{ 
        overflow: 'hidden', 
        borderRadius: '8px', 
        border: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}
      styles={{ body: { padding: '20px' } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <Space size={8}>
          <Text type="secondary" style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>{room.type}</Text>
          {avgRating && (
            <Space size={2}>
              <Star size={12} color="#fadb14" fill="#fadb14" />
              <Text strong style={{ fontSize: 12 }}>{avgRating}</Text>
            </Space>
          )}
        </Space>
        <Tag 
          color={statusColors[room.status]} 
          style={{ 
            borderRadius: '2px', 
            margin: 0, 
            fontSize: '10px', 
            fontWeight: 700, 
            textTransform: 'uppercase',
            border: `1px solid ${room.status === 'Available' ? '#b7eb8f' : room.status === 'Occupied' ? '#ffa39e' : '#ffe58f'}`
          }}
        >
          {statusLabels[room.status]}
        </Tag>
      </div>
      <Title level={4} style={{ margin: '0 0 16px 0', fontSize: '18px' }}>{room.name}</Title>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Text strong style={{ fontSize: '20px' }}>${room.price}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}> / đêm</Text>
        </div>
        <Link to={`/rooms/${room.id}`}>
          <Button type="primary" size="middle" style={{ borderRadius: '4px' }}>
            Book Now
          </Button>
        </Link>
      </div>
    </AntCard>
  );
};

export default RoomCard;
