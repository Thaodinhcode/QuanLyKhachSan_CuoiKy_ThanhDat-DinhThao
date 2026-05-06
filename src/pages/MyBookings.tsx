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