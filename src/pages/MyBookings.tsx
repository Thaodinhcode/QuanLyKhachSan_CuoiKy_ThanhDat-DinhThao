import React, { useState, useEffect } from 'react';
import { Layout, Typography, Table, Tag, Empty, Space, Spin, Card, Button, Modal, Descriptions, Divider, App } from 'antd';
import { Booking, Room } from '../types';
import { RoomService, BookingService } from '../services/api';
import { useUser } from '../context/UserContext';
import dayjs from 'dayjs';
import { Calendar, Eye, Trash2, CreditCard, Banknote, Sparkles } from 'lucide-react';

const { Content } = Layout;
const { Title, Text } = Typography;
const AntCard = Card as any;

const MyBookings = () => {
  const { message, modal } = App.useApp();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { user: currentUser } = useUser();

  const fetchData = async () => {
    if (!currentUser) return;
    try {
      const [allBookings, allRooms] = await Promise.all([
        BookingService.getUserBookings(currentUser.id),
        RoomService.getRooms()
      ]);
      setBookings(allBookings.sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()));
      setRooms(allRooms);
    } catch (e) {
      console.error("Error fetching bookings", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [currentUser?.id]);

  const handleCancelBooking = (bookingId: string) => {
    modal.confirm({
      title: 'Xác nhận hủy đơn',
      content: 'Bạn có chắc chắn muốn hủy đơn đặt phòng này không?',
      okText: 'Hủy đơn',
      okType: 'danger',
      onOk: async () => {
        try {
          await BookingService.updateBookingStatus(bookingId, 'Cancelled');
          message.success('Đã hủy đơn thành công');
          fetchData();
        } catch (e) {
          message.error('Lỗi khi hủy đơn');
        }
      }
    });
  };

  const roomOfSelected = rooms.find((r: Room) => r.id === selectedBooking?.roomId);

  const showDetail = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailModalOpen(true);
  };

  const columns = [
    {
      title: 'MÃ ĐƠN',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <div style={{ 
          background: 'rgba(139, 92, 246, 0.1)', 
          padding: '6px 12px', 
          borderRadius: 8, 
          display: 'inline-block',
          border: '1px solid rgba(192, 132, 252, 0.3)'
        }}>
          <Text strong style={{ fontSize: 13, color: '#c4b5fd' }}>#BK-{id.slice(0,8)}</Text>
        </div>
      ),
    },
    {
      title: 'PHÒNG',
      key: 'room',
      render: (_: any, record: Booking) => {
        const room = rooms.find((r: Room) => r.id === record.roomId);
        return (
          <div>
            <Text strong style={{ color: 'white', fontSize: 15 }}>{room?.name || 'Không xác định'}</Text>
            <br />
            <Text style={{ color: '#a5b4fc', fontSize: 13 }}>{room?.type}</Text>
          </div>
        );
      }
    },
    {
      title: 'THỜI GIAN',
      key: 'dates',
      render: (_: any, record: Booking) => (
        <div style={{ color: '#e0e7ff' }}>
          <div>{dayjs(record.checkIn).format('DD/MM/YYYY')} → {dayjs(record.checkOut).format('DD/MM/YYYY')}</div>
          <Text style={{ color: '#94a3b8', fontSize: 13 }}>
            {dayjs(record.checkOut).diff(dayjs(record.checkIn), 'day')} đêm • {record.guests} khách
          </Text>
        </div>
      )
    },
    {
      title: 'THANH TOÁN',
      key: 'payment',
      render: (_: any, record: Booking) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            {record.paymentMethod === 'Transfer' ? 
              <CreditCard size={18} color="#a5b4fc" /> : 
              <Banknote size={18} color="#86efac" />}
            <Text style={{ color: '#e0e7ff' }}>
              {record.paymentMethod === 'Transfer' ? 'Chuyển khoản' : 'Tiền mặt'}
            </Text>
          </div>
          <Tag color={record.paymentStatus === 'Paid' ? 'green' : 'gold'} 
               style={{ borderRadius: 9999, fontWeight: 600 }}>
            {record.paymentStatus === 'Paid' ? 'ĐÃ THANH TOÁN' : 'CHƯA THANH TOÁN'}
          </Tag>
        </div>
      )
    },
    {
      title: 'TỔNG TIỀN',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => (
        <Text strong style={{ 
          color: '#e0bbff', 
          fontSize: 18,
          textShadow: '0 0 15px rgba(224, 187, 255, 0.3)'
        }}>
          ${price.toLocaleString()}
        </Text>
      )
    },
    {
      title: 'TRẠNG THÁI',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config: any = { 
          Pending: { color: 'gold', label: 'Chờ duyệt' }, 
          Confirmed: { color: 'green', label: 'Đã xác nhận' }, 
          Cancelled: { color: 'red', label: 'Đã hủy' },
          'Checked-out': { color: 'blue', label: 'Đã trả phòng' }
        };
        const item = config[status] || { color: 'default', label: status };
        return (
          <Tag color={item.color} style={{ 
            fontWeight: 600, 
            borderRadius: 9999, 
            padding: '4px 14px' 
          }}>
            {item.label}
          </Tag>
        );
      }
    },
    {
      title: 'HÀNH ĐỘNG',
      key: 'action',
      align: 'center' as const,
      render: (_: any, record: Booking) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<Eye size={18} />} 
            onClick={() => showDetail(record)}
            style={{ color: '#c4b5fd' }}
          >
            Chi tiết
          </Button>
          {record.status === 'Pending' && (
            <Button 
              type="text" 
              danger 
              icon={<Trash2 size={18} />} 
              onClick={() => handleCancelBooking(record.id)}
            >
              Hủy
            </Button>
          )}
        </Space>
      )
    }
  ];

  if (!currentUser) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px', background: '#0f172a', minHeight: '80vh' }}>
        <Title level={3} style={{ color: 'white' }}>Vui lòng đăng nhập để xem đơn đặt</Title>
        <Button type="primary" size="large" onClick={() => window.location.href = '/auth'} style={{ marginTop: 20 }}>
          Đăng nhập ngay
        </Button>
      </div>
    );
  }

  return (
    <Content style={{ 
      maxWidth: '1280px', 
      margin: '0 auto', 
      minHeight: '80vh',
      background: '#0f172a',
      padding: '40px 24px'
    }}>
      <div style={{ marginBottom: 50, textAlign: 'center' }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles size={36} style={{ color: '#c084fc' }} />
          <Text style={{ color: '#c4b5fd', fontSize: 16, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase' }}>
            STELLAR BOOKINGS
          </Text>
        </div>
        <Title level={2} style={{ color: 'white', margin: 0 }}>Đơn đặt phòng của tôi</Title>
        <Text style={{ color: '#a5b4fc', fontSize: 17 }}>Quản lý & theo dõi các hành trình của bạn</Text>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '140px' }}>
          <Spin size="large" />
        </div>
      ) : bookings.length > 0 ? (
        <AntCard 
          style={{ 
            background: 'rgba(30, 41, 59, 0.7)', 
            border: '1px solid rgba(192, 132, 252, 0.2)',
            borderRadius: 20,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
          }}
        >
          <Table 
            columns={columns} 
            dataSource={bookings} 
            rowKey="id" 
            pagination={{ pageSize: 6, hideOnSinglePage: true }}
            scroll={{ x: 900 }}
            style={{ background: 'transparent' }}
          />
        </AntCard>
      ) : (
        <AntCard style={{ 
          textAlign: 'center', 
          padding: '100px 40px', 
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(192, 132, 252, 0.15)',
          borderRadius: 20 
        }}>
          <Empty 
            description={
              <Space direction="vertical" size={16}>
                <Text style={{ color: '#cbd5e1', fontSize: 18 }}>Bạn chưa có đơn đặt phòng nào.</Text>
                <Button type="primary" size="large" onClick={() => window.location.href = '/rooms'}>
                  Khám phá phòng ngay
                </Button>
              </Space>
            } 
          />
        </AntCard>
      )}

      {/* Detail Modal - Cosmic Style */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Sparkles style={{ color: '#c084fc' }} />
            <span>Chi tiết đơn #BK-{selectedBooking?.id.slice(-6).toUpperCase()}</span>
          </div>
        }
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={[<Button key="close" size="large" onClick={() => setIsDetailModalOpen(false)}>Đóng</Button>]}
        width={700}
        styles={{ 
          body: { 
            background: '#1e2937', 
            color: '#e0e7ff',
            padding: '30px' 
          },
          header: { background: '#1e2937', borderBottom: '1px solid #334155' }
        }}
      >
        {selectedBooking && (
          <div>
            <Descriptions title="Thông tin khách hàng" bordered column={1} size="middle" labelStyle={{ color: '#94a3b8' }}>
              <Descriptions.Item label="Họ tên">{selectedBooking.guestName}</Descriptions.Item>
              <Descriptions.Item label="Số CMND/CCCD">{selectedBooking.guestIdCard}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt">{dayjs(selectedBooking.createdAt).format('HH:mm DD/MM/YYYY')}</Descriptions.Item>
            </Descriptions>

            <Divider style={{ borderColor: '#475569' }} />

            <Descriptions title="Thông tin phòng" bordered column={1} size="middle" labelStyle={{ color: '#94a3b8' }}>
              <Descriptions.Item label="Tên phòng">{roomOfSelected?.name}</Descriptions.Item>
              <Descriptions.Item label="Loại phòng">{roomOfSelected?.type}</Descriptions.Item>
              <Descriptions.Item label="Thời gian lưu trú">
                {dayjs(selectedBooking.checkIn).format('DD/MM/YYYY')} — {dayjs(selectedBooking.checkOut).format('DD/MM/YYYY')}
                <br />({dayjs(selectedBooking.checkOut).diff(dayjs(selectedBooking.checkIn), 'day')} đêm)
              </Descriptions.Item>
              <Descriptions.Item label="Số lượng khách">{selectedBooking.guests} người</Descriptions.Item>
            </Descriptions>

            <Divider style={{ borderColor: '#475569' }} />

            <Descriptions title="Thanh toán" bordered column={1} size="middle" labelStyle={{ color: '#94a3b8' }}>
              <Descriptions.Item label="Phương thức">
                {selectedBooking.paymentMethod === 'Transfer' ? 'Chuyển khoản ngân hàng' : 'Tiền mặt'}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái thanh toán">
                <Tag color={selectedBooking.paymentStatus === 'Paid' ? 'green' : 'gold'}>
                  {selectedBooking.paymentStatus === 'Paid' ? 'ĐÃ THANH TOÁN' : 'CHƯA THANH TOÁN'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Tổng cộng">
                <Title level={3} style={{ color: '#e0bbff', margin: 0 }}>
                  ${selectedBooking.totalPrice.toLocaleString()}
                </Title>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </Content>
  );
};

export default MyBookings;