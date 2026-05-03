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