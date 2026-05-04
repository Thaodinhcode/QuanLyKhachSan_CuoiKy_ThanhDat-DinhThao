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