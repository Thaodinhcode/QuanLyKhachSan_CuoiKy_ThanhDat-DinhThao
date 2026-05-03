import React from 'react';
import { Card, Tag, Button, Typography, Space, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { Room } from '../types';
import { Users, DollarSign, Star, Sparkles } from 'lucide-react';

const { Text, Title } = Typography;
const AntCard = Card as any;

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const statusColors = {
    Available: '#22c55e',
    Occupied: '#ef4444',
    Maintenance: '#eab308'
  };

  const statusLabels = {
    Available: 'Sẵn sàng',
    Occupied: 'Đã đặt',
    Maintenance: 'Bảo trì'
  };

  const avgRating = room.reviews?.length > 0 
    ? (room.reviews.reduce((acc, curr) => acc + curr.rating, 0) / room.reviews.length).toFixed(1)
    : '4.8';

  return (
    <AntCard
      hoverable
      cover={
        <div style={{ 
          position: 'relative', 
          height: '260px', 
          overflow: 'hidden',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px'
        }}>
          <img
            alt={room.name}
            src={room.image}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
          
          {/* Cosmic overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(30,17,51,0.75) 100%)',
            transition: 'all 0.4s'
          }} />

          {/* Glow effect on hover */}
          <div style={{
            position: 'absolute',
            inset: 0,
            boxShadow: 'inset 0 0 60px rgba(139, 92, 246, 0.4)',
            opacity: 0,
            transition: 'opacity 0.4s'
          }} className="group-hover:opacity-100" />

          {/* Status badge */}
          <div style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 2
          }}>
            <Tag 
              style={{
                background: statusColors[room.status] + '22',
                color: statusColors[room.status],
                border: `1px solid ${statusColors[room.status]}88`,
                borderRadius: '9999px',
                padding: '4px 14px',
                fontWeight: 700,
                fontSize: '12px',
                backdropFilter: 'blur(8px)'
              }}
            >
              {statusLabels[room.status]}
            </Tag>
          </div>
        </div>
      }
      style={{ 
        overflow: 'hidden', 
        borderRadius: '16px', 
        border: '1px solid rgba(192, 132, 252, 0.15)',
        background: '#1e2937',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      styles={{ body: { padding: '24px' } }}
      className="group hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
    >
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        {/* Type & Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ 
            color: '#c4b5fd', 
            fontWeight: 600, 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px',
            fontSize: '13px'
          }}>
            {room.type}
          </Text>
          
          <Space align="center">
            <Star size={18} fill="#fbbf24" color="#fbbf24" />
            <Text strong style={{ color: '#fefce8', fontSize: '16px' }}>
              {avgRating}
            </Text>
          </Space>
        </div>

        {/* Room Name */}
        <Title 
          level={4} 
          style={{ 
            margin: 0, 
            color: 'white', 
            fontSize: '22px',
            lineHeight: 1.3,
            fontWeight: 800
          }}
        >
          {room.name}
        </Title>

        {/* Price & Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: '8px' }}>
          <div>
            <Text style={{ 
              fontSize: '28px', 
              fontWeight: 800, 
              color: '#e0bbff',
              lineHeight: 1 
            }}>
              ${room.price}
            </Text>
            <Text style={{ color: '#94a3b8', fontSize: '14px' }}> / đêm</Text>
          </div>

          <Link to={`/rooms/${room.id}`}>
            <Button 
              type="primary" 
              size="large"
              style={{
                borderRadius: '9999px',
                height: 52,
                padding: '0 32px',
                background: 'linear-gradient(90deg, #8b5cf6, #d946ef)',
                border: 'none',
                fontWeight: 700,
                boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)'
              }}
              className="group-hover:scale-105 transition-transform duration-300"
            >
              ĐẶT PHÒNG NGAY
            </Button>
          </Link>
        </div>
      </Space>
    </AntCard>
  );
};

export default RoomCard;