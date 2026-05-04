import React, { useState, useEffect } from 'react';
import { Room, Booking, BookingStatus, User } from '../types';
import { RoomService, BookingService, UserService } from '../services/api';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const AntCard = Card as any;
const { Option } = Select as any;

const AdminDashboard = () => {
  const { message, modal } = App.useApp();
  const screen = useBreakpoint();
  const isMobile = !screen.md;

  const [activeKey, setActiveKey] = useState('1');
  const [collapsed, setCollapsed] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomForm] = Form.useForm();
  
  const [roomSearch, setRoomSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'All'>('All');

  const fetchData = async () => {
    try {
      const [allRooms, allBookings, allUsers] = await Promise.all([
        RoomService.getRooms(),
        BookingService.getBookings(),
        UserService.getUsers()
      ]);
      setRooms(allRooms);
      setBookings(allBookings);
      setUsers(allUsers);
    } catch (e) {
      console.error("Error fetching data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    try {
      await BookingService.updateBookingStatus(bookingId, status);
      message.success('Cập nhật trạng thái thành công');
      fetchData();
    } catch (e) {
      message.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const handleCheckOut = (bookingId: string) => {
    modal.confirm({
      title: 'Xác nhận trả phòng',
      content: 'Hoàn tất thủ tục check-out cho khách hàng và giải phóng phòng?',
      okText: 'Xác nhận',
      onOk: async () => {
        try {
          await BookingService.updateBookingStatus(bookingId, 'Checked-out');
          message.success('Đã trả phòng thành công');
          fetchData();
        } catch (e) {
          message.error('Lỗi khi hoàn tất trả phòng');
        }
      }
    });
  };