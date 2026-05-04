import React, { useState, useEffect } from 'react';
import { 
  Layout, Menu, Table, Button, Typography, Space, Tag, Modal, Form, 
  Input, InputNumber, Select, App, Spin, Row, Col, Card, Tooltip, Avatar, Statistic, Grid, Drawer
} from 'antd';
import { 
  LayoutDashboard, Bed, BookOpen, LogOut, Plus, Edit2, Trash2, 
  CheckCircle, XCircle, Search, Users, DollarSign, TrendingUp, UserCog, Hotel, Menu as MenuIcon
} from 'lucide-react';
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

  const handleSaveRoom = async (values: any) => {
    try {
      if (editingRoom) {
        await RoomService.updateRoom({ ...editingRoom, ...values });
        message.success('Cập nhật phòng thành công');
      } else {
        const newRoom: Room = { 
          ...values, 
          id: `r${Date.now()}`, 
          reviews: [] 
        };
        await RoomService.addRoom(newRoom);
        message.success('Thêm phòng mới thành công');
      }
      setIsRoomModalOpen(false);
      setEditingRoom(null);
      roomForm.resetFields();
      fetchData();
    } catch (e) {
      message.error('Lỗi khi lưu thông tin phòng');
    }
  };

  const handleDeleteRoom = (id: string) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa phòng này?',
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        try {
          await RoomService.deleteRoom(id);
          message.success('Xóa phòng thành công');
          fetchData();
        } catch (e) {
          message.error('Lỗi khi xóa phòng');
        }
      },
    });
  };

  const handleDeleteUser = (id: string) => {
    if (id === 'u1') return message.error('Không thể xóa tài khoản Admin chính!');
    modal.confirm({
      title: 'Xác nhận xóa tài khoản',
      content: 'Bạn có chắc chắn muốn xóa người dùng này?',
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        try {
          await UserService.deleteUser(id);
          message.success('Xóa người dùng thành công');
          fetchData();
        } catch (e) {
          message.error('Lỗi khi xóa người dùng');
        }
      },
    });
  };

  const filteredRooms = rooms.filter(r => 
    r.name.toLowerCase().includes(roomSearch.toLowerCase()) || 
    r.type.toLowerCase().includes(roomSearch.toLowerCase())
  );

  const filteredBookings = bookings
    .filter(b => statusFilter === 'All' ? true : b.status === statusFilter)
    .sort((a, b) => {
      if (a.status === 'Pending' && b.status !== 'Pending') return -1;
      if (a.status !== 'Pending' && b.status === 'Pending') return 1;
      return b.id.localeCompare(a.id);
    });

  const roomColumns = [
    {
      title: 'Phòng',
      key: 'name',
      render: (_: any, record: Room) => (
        <Space>
          <img src={record.image} alt="" style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }} />
          <div>
            <Text strong>{record.name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.type}</Text>
          </div>
        </Space>
      ),
    },
    { title: 'Giá ($)', dataIndex: 'price', key: 'price', render: (price: number) => `$${price}` },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config: any = { 
          Available: { color: 'success', label: 'Trống' }, 
          Occupied: { color: 'error', label: 'Hết phòng' }, 
          Maintenance: { color: 'warning', label: 'Bảo trì' } 
        };
        const item = config[status] || { color: 'default', label: status };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Room) => (
        <Space size="middle">
          <Button size="small" icon={<Edit2 size={12} />} onClick={() => { setEditingRoom(record); roomForm.setFieldsValue(record); setIsRoomModalOpen(true); }} />
          <Button size="small" danger icon={<Trash2 size={12} />} onClick={() => handleDeleteRoom(record.id)} />
        </Space>
      ),
    },
  ];
