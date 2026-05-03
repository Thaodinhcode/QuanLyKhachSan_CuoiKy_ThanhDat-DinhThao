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

  const bookingColumns = [
    { 
      title: 'KHÁCH HÀNG', 
      key: 'guest',
      render: (_: any, record: Booking) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text strong>{record.guestName}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.guestIdCard}</Text>
        </div>
      )
    },
    { 
      title: 'PHÒNG', 
      key: 'room',
      render: (_: any, record: Booking) => {
        const room = rooms.find(r => r.id === record.roomId);
        return <Text>{room?.name || 'Unknown'}</Text>;
      }
    },
    { 
      title: 'THỜI GIAN', 
      key: 'dates',
      render: (_: any, record: Booking) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text>{record.checkIn} → {record.checkOut}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.guests} khách</Text>
        </div>
      )
    },
    { 
      title: 'TỔNG TIỀN', 
      dataIndex: 'totalPrice', 
      key: 'totalPrice', 
      render: (p: number) => <Text strong>${p}</Text> 
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
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
    {
      title: 'HÀNH ĐỘNG',
      key: 'actions',
      render: (_: any, record: Booking) => (
        <Space>
          {record.status === 'Pending' && (
            <>
              <Button type="primary" size="small" icon={<CheckCircle size={14} />} onClick={() => handleUpdateBookingStatus(record.id, 'Confirmed')} style={{ background: '#52c41a', borderColor: '#52c41a' }}>Duyệt</Button>
              <Button danger size="small" icon={<XCircle size={14} />} onClick={() => handleUpdateBookingStatus(record.id, 'Cancelled')}>Hủy</Button>
            </>
          )}
          {record.status === 'Confirmed' && (
            <Button size="small" icon={<Hotel size={14} />} onClick={() => handleCheckOut(record.id)} style={{ color: '#1677ff', borderColor: '#1677ff' }}>Check-out</Button>
          )}
        </Space>
      )
    }
  ];

  const userColumns = [
    {
      title: 'Người dùng',
      key: 'user',
      render: (_: any, record: User) => (
        <Space>
          <Avatar icon={<Users size={14}/>} />
          <div>
            <Text strong>{record.name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => <Tag color={role === 'Admin' ? 'purple' : 'blue'}>{role}</Tag>
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (p: string) => p || 'N/A'
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: User) => (
        <Button danger size="small" disabled={record.role === 'Admin'} onClick={() => handleDeleteUser(record.id)}>Xóa</Button>
      )
    }
  ];

  const totalRevenue = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Checked-out').reduce((sum, b) => sum + b.totalPrice, 0);

  const sidebarContent = (
    <>
      <div style={{ height: 64, padding: '16px', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src="https://raw.githubusercontent.com/Thaodinhcode/Thaodinhcode/refs/heads/main/logo%20qu%E1%BA%A3n%20l%C3%BD%20kh%C3%A1ch%20s%E1%BA%A1n.png" 
          alt="Stellar Hotel" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain' 
          }} 
        />
      </div>
        {(isMobile || !collapsed) && <span style={{ color: 'white', fontWeight: 700, fontSize: 18, marginLeft: 12 }}>stellarhotel</span>}
      </div>
      <Menu 
        theme="dark" 
        selectedKeys={[activeKey]} 
        mode="inline" 
        onClick={({key}) => { 
          if (key !== 'logout') {
            setActiveKey(key);
            if (isMobile) setCollapsed(true);
          }
        }}
        items={[
          { key: '1', icon: <LayoutDashboard size={18} />, label: 'Tổng quan' },
          { key: '2', icon: <Bed size={18} />, label: 'Quản lý phòng' },
          { key: '3', icon: <BookOpen size={18} />, label: 'Đơn đặt phòng' },
          { key: '4', icon: <UserCog size={18} />, label: 'Người dùng' },
          { type: 'divider' },
          { 
            key: 'logout', 
            icon: <LogOut size={18} />, 
            label: 'Đăng xuất', 
            onClick: () => { 
              localStorage.removeItem('user'); 
              window.location.href = '/'; 
            } 
          },
        ]} 
      />
    </>
  );

  const renderDashboard = () => (
    <>
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} lg={6}>
          <AntCard style={{ borderRadius: 12 }}>
            <Statistic title="Doanh thu" value={totalRevenue} prefix={<DollarSign size={20} color="#52c41a" />} precision={0} styles={{ content: { fontWeight: 700 } }} />
          </AntCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <AntCard style={{ borderRadius: 12 }}>
            <Statistic title="Phòng" value={rooms.length} prefix={<Bed size={20} color="#1677ff" />} styles={{ content: { fontWeight: 700 } }} />
          </AntCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <AntCard style={{ borderRadius: 12 }}>
            <Statistic title="Chờ duyệt" value={bookings.filter(b => b.status === 'Pending').length} prefix={<BookOpen size={20} color="#fa8c16" />} styles={{ content: { fontWeight: 700 } }} />
          </AntCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <AntCard style={{ borderRadius: 12 }}>
            <Statistic title="Thành viên" value={users.length} prefix={<Users size={20} color="#722ed1" />} styles={{ content: { fontWeight: 700 } }} />
          </AntCard>
        </Col>
      </Row>
      <AntCard title="Đơn đặt phòng mới nhất" style={{ borderRadius: 12 }}>
        <Table columns={bookingColumns} dataSource={bookings.slice(0, 8)} pagination={false} rowKey="id" scroll={{ x: 800 }} />
      </AntCard>
    </>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <Drawer
          title="stellarhotel Admin"
          placement="left"
          onClose={() => setCollapsed(true)}
          open={!collapsed}
          styles={{ 
            body: { padding: 0, background: '#001529' }, 
            header: { background: '#001529', borderBottom: '1px solid #333', color: 'white' } 
          }}
          size="default"
        >
          {sidebarContent}
        </Drawer>
      ) : (
        <Sider 
          collapsible
          collapsed={collapsed} 
          onCollapse={setCollapsed} 
          breakpoint="lg"
          collapsedWidth={80}
          trigger={null}
          style={{ 
            height: '100vh', 
            position: 'sticky', 
            top: 0, 
            left: 0,
            zIndex: 1001,
            overflow: 'hidden'
          }}
        >
          {sidebarContent}
        </Sider>
      )}

      <Layout>
        <div style={{ height: 64, background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f2f5' }}>
          <Button type="text" icon={<MenuIcon size={20} />} onClick={() => setCollapsed(!collapsed)} style={{ marginRight: 16 }} />
          <Title level={4} style={{ margin: 0 }}>
            {activeKey === '1' && 'Bảng điều khiển'}
            {activeKey === '2' && 'Quản lý phòng'}
            {activeKey === '3' && 'Quản lý đặt phòng'}
            {activeKey === '4' && 'Quản lý người dùng'}
          </Title>
        </div>
        
        <Content style={{ padding: isMobile ? '16px' : '32px', background: '#f0f2f5', minHeight: 'calc(100vh - 64px)' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>
          ) : (
            <>
              {activeKey === '1' && renderDashboard()}
              {activeKey === '2' && (
                <AntCard title="Danh sách phòng" extra={<Button type="primary" onClick={() => setIsRoomModalOpen(true)}>Thêm phòng</Button>}>
                  <Table 
                    columns={roomColumns} 
                    dataSource={filteredRooms} 
                    rowKey="id" 
                    scroll={{ x: 600 }} 
                    pagination={{ pageSize: 15 }}
                  />
                </AntCard>
              )}
              {activeKey === '3' && (
                <AntCard title="Đơn đặt phòng" extra={
                  <Select defaultValue="All" style={{ width: 150 }} onChange={setStatusFilter}>
                      <Option value="All">Tất cả</Option>
                      <Option value="Pending">Chờ duyệt</Option>
                      <Option value="Confirmed">Đã duyệt</Option>
                      <Option value="Cancelled">Đã hủy</Option>
                      <Option value="Checked-out">Đã hoàn tất</Option>
                  </Select>
                }>
                  <Table 
                    columns={bookingColumns} 
                    dataSource={filteredBookings} 
                    rowKey="id" 
                    scroll={{ x: 900 }} 
                    pagination={{ pageSize: 15 }}
                  />
                </AntCard>
              )}
              {activeKey === '4' && (
                <AntCard title="Danh sách thành viên">
                  <Table 
                    columns={userColumns} 
                    dataSource={users} 
                    rowKey="id" 
                    scroll={{ x: 600 }} 
                    pagination={{ pageSize: 15 }}
                  />
                </AntCard>
              )}
            </>
          )}

          <Modal
            title={editingRoom ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
            open={isRoomModalOpen}
            onCancel={() => { setIsRoomModalOpen(false); setEditingRoom(null); }}
            onOk={() => roomForm.submit()}
          >
            <Form form={roomForm} layout="vertical" onFinish={handleSaveRoom}>
              <Form.Item name="name" label="Tên phòng" rules={[{ required: true }]}><Input /></Form.Item>
              <Form.Item name="type" label="Loại phòng" rules={[{ required: true }]}>
                <Select options={[{value:'Single', label:'Single'},{value:'Double', label:'Double'},{value:'Suite', label:'Suite'},{value:'Deluxe', label:'Deluxe'}]} />
              </Form.Item>
              <Form.Item name="price" label="Giá mỗi đêm ($)" rules={[{ required: true }]}><InputNumber style={{width:'100%'}} min={0}/></Form.Item>
              <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
                <Select options={[{ value: 'Available', label: 'Trống' }, { value: 'Occupied', label: 'Hết phòng' }, { value: 'Maintenance', label: 'Bảo trì' }]} />
              </Form.Item>
              <Form.Item name="image" label="Link ảnh" rules={[{ required: true }]}><Input /></Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
