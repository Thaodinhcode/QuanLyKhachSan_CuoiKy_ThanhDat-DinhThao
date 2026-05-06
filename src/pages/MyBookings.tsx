import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Typography, Table, Tag, Empty, Space, Spin, Card, Button, Modal, Descriptions, Divider, App } from 'antd';
import { Booking, Room } from '../types';
import { RoomService, BookingService } from '../services/api';
import { useUser } from '../context/UserContext';
import dayjs from 'dayjs';
import { Calendar, Eye, Trash2, CreditCard, Banknote } from 'lucide-react';

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
        <div style={{ background: '#f8fafc', padding: '4px 8px', borderRadius: 4, display: 'inline-block', border: '1px solid #e2e8f0' }}>
          <Text strong style={{ fontSize: 11, color: '#475569' }}>#BK-{id}</Text>
        </div>
      ),
    },
    {
      title: 'PHÒNG',
      key: 'room',
      render: (_: any, record: Booking) => {
        const room = rooms.find((r: Room) => r.id === record.roomId);
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong style={{ fontSize: 14 }}>{room?.name || 'Phòng không xác định'}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>{room?.type}</Text>
          </div>
        );
      }
    },
    {
      title: 'THỜI GIAN',
      key: 'dates',
      render: (_: any, record: Booking) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: 13 }}>{dayjs(record.checkIn).format('DD/MM/YYYY')} → {dayjs(record.checkOut).format('DD/MM/YYYY')}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{dayjs(record.checkOut).diff(dayjs(record.checkIn), 'day')} đêm · {record.guests} khách</Text>
        </div>
      )
    },
    {
      title: 'THANH TOÁN',
      key: 'payment',
      render: (_: any, record: Booking) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {record.paymentMethod === 'Transfer' ? <CreditCard size={14} color="#1677ff" /> : <Banknote size={14} color="#52c41a" />}
            <Text style={{ fontSize: 13 }}>{record.paymentMethod === 'Transfer' ? 'Chuyển khoản' : 'Tiền mặt'}</Text>
          </div>
          <Tag color={record.paymentStatus === 'Paid' ? 'green' : 'gold'} style={{ borderRadius: 10, fontSize: 10, alignSelf: 'flex-start' }}>
            {record.paymentStatus === 'Paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
          </Tag>
        </div>
      )
    },
    {
      title: 'TỔNG TIỀN',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => <Text strong style={{ color: '#eb2f96', fontSize: 16 }}>${price.toLocaleString()}</Text>
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
          <Tag color={item.color} style={{ fontWeight: 500, borderRadius: 4, padding: '2px 8px' }}>
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
        <Space size="middle">
          <Button 
            type="text" 
            icon={<Eye size={16} />} 
            onClick={() => showDetail(record)}
            style={{ color: '#1677ff', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            Chi tiết
          </Button>
          {record.status === 'Pending' && (
            <Button 
              type="text" 
              danger 
              icon={<Trash2 size={16} />} 
              onClick={() => handleCancelBooking(record.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            >
              Hủy
            </Button>
          )}
        </Space>
      )
    }
  ];

  if (!currentUser) return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <Title level={4}>Vui lòng đăng nhập để xem đơn đặt phòng</Title>
      <Button type="primary" style={{ marginTop: 16 }} onClick={() => window.location.href = '/auth'}>Đăng nhập ngay</Button>
    </div>
  );

  return (
    <Content style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }} className="py-8 px-4 sm:py-12 sm:px-6">
      <div style={{ marginBottom: 40 }}>
        <Title level={2} style={{ marginBottom: 8 }} className="text-xl sm:text-2xl md:text-3xl">Đơn đặt phòng của tôi</Title>
        <Text type="secondary" style={{ fontSize: 16 }}>Theo dõi trạng thái và quản lý các dịch vụ lưu trú của bạn.</Text>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>
      ) : bookings.length > 0 ? (
        <AntCard variant="borderless" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderRadius: 16 }}>
          <Table 
            columns={columns} 
            dataSource={bookings} 
            rowKey="id" 
            pagination={{ pageSize: 5, hideOnSinglePage: true }}
            scroll={{ x: 800 }}
          />
        </AntCard>
      ) : (
        <AntCard style={{ textAlign: 'center', padding: '64px 0', borderRadius: 16 }}>
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Space orientation="vertical">
                <Text type="secondary">Bạn chưa có bất kỳ giao dịch đặt phòng nào.</Text>
                <Button type="primary" onClick={() => window.location.href = '/rooms'}>Khám phá phòng ngay</Button>
              </Space>
            } 
          />
        </AntCard>
      )}

      {/* Detail Modal */}
      <Modal
        title={<Title level={4} style={{ margin: 0 }}>Chi tiết đơn đặt phòng #BK-{selectedBooking?.id.slice(-4).toUpperCase()}</Title>}
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalOpen(false)}>Đóng</Button>
        ]}
        width={650}
        styles={{ body: { padding: '20px 24px' } }}
      >
        {selectedBooking && (
          <div>
            <Descriptions title="Thông tin khách hàng" bordered column={1} size="small">
              <Descriptions.Item label="Họ tên">{selectedBooking.guestName}</Descriptions.Item>
              <Descriptions.Item label="Số CMND/CCCD">{selectedBooking.guestIdCard}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt">{dayjs(selectedBooking.createdAt).format('HH:mm DD/MM/YYYY')}</Descriptions.Item>
            </Descriptions>
            
            <Divider />
            
            <Descriptions title="Thông tin phòng & Dịch vụ" bordered column={1} size="small">
              <Descriptions.Item label="Tên phòng">{roomOfSelected?.name}</Descriptions.Item>
              <Descriptions.Item label="Loại phòng">{roomOfSelected?.type}</Descriptions.Item>
              <Descriptions.Item label="Thời gian lưu trú">{dayjs(selectedBooking.checkIn).format('DD/MM/YYYY')} - {dayjs(selectedBooking.checkOut).format('DD/MM/YYYY')} ({dayjs(selectedBooking.checkOut).diff(dayjs(selectedBooking.checkIn), 'day')} đêm)</Descriptions.Item>
              <Descriptions.Item label="Số lượng khách">{selectedBooking.guests} người</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Thanh toán" bordered column={1} size="small">
              <Descriptions.Item label="Phương thức">{selectedBooking.paymentMethod === 'Transfer' ? 'Chuyển khoản ngân hàng' : 'Thanh toán tiền mặt'}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={selectedBooking.paymentStatus === 'Paid' ? 'green' : 'warning'}>
                  {selectedBooking.paymentStatus === 'Paid' ? 'Đã hoàn tất' : 'Chờ xác nhận'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Tổng cộng">
                <Title level={4} style={{ margin: 0, color: '#eb2f96' }}>${selectedBooking.totalPrice.toLocaleString()}</Title>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </Content>
  );
};

export default MyBookings;
