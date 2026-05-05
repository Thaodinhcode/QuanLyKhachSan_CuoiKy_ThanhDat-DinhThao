import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Typography, Tag, Button, Row, Col, Card, Spin, Space, Divider, Modal, DatePicker, InputNumber, Form, Input, Upload, Select, App, Rate, Avatar, Pagination } from 'antd';
import { Room, Booking, Review } from '../types';
import { ChevronLeft, Wifi, Coffee, Tv, CheckCircle, UploadCloud, CreditCard, ShieldCheck, User, Star } from 'lucide-react';
import { RoomService, BookingService } from '../services/api';
import { bookingService } from '../services/bookingService';
import { useUser } from '../context/UserContext';
import dayjs from 'dayjs';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const AntCard = Card as any;

const RoomDetail = () => {
  const { message, modal } = App.useApp();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<Room | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [form] = Form.useForm();
  const [reviewForm] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const canReview = useMemo(() => {
    if (!currentUser || !room) return false;
    // Check if user has completed a stay at this room
    return bookings.some(b => 
      b.userId === currentUser.id && 
      b.roomId === room.id && 
      b.status === 'Checked-out'
    );
  }, [currentUser, room, bookings]);
  
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');

  const fetchData = async () => {
    if (!id) return;
    try {
      const [foundRoom, allBookings] = await Promise.all([
        RoomService.getRoomById(id),
        BookingService.getBookings()
      ]);
      if (foundRoom) setRoom({ ...foundRoom });
      setBookings(allBookings);
    } catch (e) {
      console.error("Error fetching room details", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [id]);

  const handleAddReview = async (values: any) => {
    if (!currentUser) {
      message.error('Vui lòng đăng nhập để gửi đánh giá');
      return;
    }

    const newReview: Review = {
      id: `rv${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      rating: values.rating,
      comment: values.comment,
      date: dayjs().format('YYYY-MM-DD')
    };

    if (room) {
      const updatedRoom = { ...room, reviews: [newReview, ...room.reviews] };
      await RoomService.updateRoom(updatedRoom);
      setRoom(updatedRoom);
      message.success('Cảm ơn bạn đã đánh giá!');
      reviewForm.resetFields();
    }
  };

  const avgRating = useMemo(() => {
    if (!room || !room.reviews || !room.reviews.length) return 0;
    const sum = room.reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / room.reviews.length).toFixed(1);
  }, [room]);

  const totalPrice = useMemo(() => {
    if (!room || !checkIn || !checkOut) return 0;
    return bookingService.calculateTotalPrice(room.price, checkIn, checkOut);
  }, [room, checkIn, checkOut]);

  const handleBooking = (values: any) => {
    if (!currentUser) {
      modal.confirm({
        title: 'Bạn chưa đăng nhập',
        content: 'Vui lòng đăng nhập hoặc đăng ký tài khoản để thực hiện đặt phòng.',
        okText: 'Đăng nhập ngay',
        cancelText: 'Quay lại',
        onOk() {
          navigate('/auth');
        },
      });
      return;
    }

    if (currentUser.role === 'Admin') {
      message.error('Admin không thể thực hiện đặt phòng. Vui lòng sử dụng tài khoản User.');
      return;
    }

    const [start, end] = values.dates;
    const checkInStr = start.format('YYYY-MM-DD');
    const checkOutStr = end.format('YYYY-MM-DD');

    // 1. Conflict Check (Chỉ check với các đơn đã Confirmed)
    const isAvailable = bookingService.isRoomAvailable(room!.id, checkInStr, checkOutStr, bookings);
    if (!isAvailable) {
      message.error('Phòng đã có khách đặt trong khoảng thời gian này. Vui lòng chọn lịch khác!');
      return;
    }

    modal.confirm({
      title: 'Xác nhận đặt phòng',
      content: (
        <div>
          <p>Phòng: <strong>{room?.name}</strong></p>
          <p>Thời gian: {checkInStr} → {checkOutStr}</p>
          <p>Số khách: {values.guests}</p>
          <p>Số CCCD: {values.idCard}</p>
          <p style={{ fontSize: 18, color: '#1677ff', fontWeight: 'bold', marginTop: 16 }}>
            Tổng thanh toán: ${totalPrice}
          </p>
          <Text type="secondary" style={{ fontSize: 12 }}>* Đơn hàng sẽ ở trạng thái Chờ duyệt (Pending)</Text>
        </div>
      ),
      onOk: async () => {
        const bid = `B${dayjs().valueOf()}${Math.floor(Math.random() * 9000) + 1000}`;
        const newBooking: Booking = {
          id: bid,
          roomId: room!.id,
          userId: currentUser!.id,
          guestName: currentUser!.name,
          guestIdCard: values.idCard,
          checkIn: checkInStr,
          checkOut: checkOutStr,
          guests: values.guests,
          totalPrice: totalPrice,
          status: 'Pending',
          paymentMethod: values.paymentMethod,
          paymentStatus: 'Pending',
          createdAt: dayjs().toISOString()
        };
        
        try {
          await BookingService.createBooking(newBooking);
          message.success('Gửi yêu cầu đặt phòng thành công!');
          navigate('/my-bookings');
        } catch (e) {
          message.error('Lỗi khi gửi yêu cầu đặt phòng');
        }
      },
    });
  };

  const handleUploadChange = async (info: any) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const hide = message.loading('Đang quét thông tin CCCD...', 0);
      try {
        const detectedId = await bookingService.mockVerifyCCCD();
        form.setFieldsValue({ idCard: detectedId });
        message.success('Đã tự động điền số CCCD từ ảnh!');
      } finally {
        hide();
      }
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spin size="large" /></div>;
  if (!room) return <div style={{ textAlign: 'center', padding: '100px' }}>Phòng không tồn tại</div>;

  return (
    <Content style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Button icon={<ChevronLeft size={16} />} onClick={() => navigate(-1)} style={{ marginBottom: '24px' }}>
        Quay lại
      </Button>

      <Row gutter={[40, 40]}>
        <Col xs={24} lg={14}>
          <img 
            src={room.image} 
            alt={room.name} 
            style={{ width: '100%', borderRadius: '12px', minHeight: '300px', maxHeight: '500px', objectFit: 'cover', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }} 
          />
          
          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <Tag color="blue" style={{ borderRadius: 2 }}>{room.type}</Tag>
              <Tag color={room.status === 'Available' ? 'success' : room.status === 'Occupied' ? 'error' : 'warning'} style={{ borderRadius: 2 }}>
                {room.status === 'Available' ? 'Trống' : room.status === 'Occupied' ? 'Hết phòng' : 'Bảo trì'}
              </Tag>
              {room.reviews.length > 0 && (
                <Space size={4}>
                  <Star size={14} color="#fadb14" fill="#fadb14" />
                  <Text strong>{avgRating}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>({room.reviews.length} đánh giá)</Text>
                </Space>
              )}
            </div>
            <Title level={1} style={{ margin: 0, letterSpacing: '-0.02em' }}>{room.name}</Title>
            <Divider />
            
            <Title level={4}>Trải nghiệm không gian</Title>
            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#4b5563' }}>{room.description}</Paragraph>
            
            <Divider />
            
            <Title level={4}>Tiện nghi cao cấp</Title>
            <Row gutter={[16, 24]}>
              {room.amenities?.map(item => (
                <Col span={12} md={8} key={item}>
                  <Space>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#f0f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle size={14} color="#1677ff" />
                    </div>
                    <Text>{item}</Text>
                  </Space>
                </Col>
              ))}
            </Row>

            <Divider />

            <div id="reviews">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={4} style={{ margin: 0 }}>Đánh giá từ khách hàng</Title>
                {room.reviews.length > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <Title level={2} style={{ margin: 0, color: '#fadb14' }}>{avgRating}</Title>
                    <Rate disabled defaultValue={Number(avgRating)} allowHalf style={{ fontSize: 14 }} />
                  </div>
                )}
              </div>

              {canReview && (
                <AntCard variant="borderless" style={{ background: '#f8fafc', borderRadius: 12, marginBottom: 32 }}>
                  <Text strong>Viết đánh giá của bạn</Text>
                  <Form form={reviewForm} layout="vertical" onFinish={handleAddReview} style={{ marginTop: 16 }}>
                    <Form.Item name="rating" label="Thang điểm" rules={[{ required: true, message: 'Vui lòng chọn mức độ hài lòng!' }]}>
                      <Rate style={{ color: '#eb2f96' }} />
                    </Form.Item>
                    <Form.Item name="comment" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung đánh giá!' }]}>
                      <TextArea rows={3} placeholder="Chia sẻ trải nghiệm của bạn về căn phòng này..." />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{ background: '#eb2f96', borderColor: '#eb2f96' }}>Gửi đánh giá</Button>
                  </Form>
                </AntCard>
              )}

              {!canReview && currentUser && currentUser.role === 'User' && (
                <div style={{ background: '#f1f5f9', padding: '12px 16px', borderRadius: 8, marginBottom: 32, fontSize: 13, color: '#64748b' }}>
                  Bạn chỉ có thể đánh giá sau khi đã hoàn tất kỳ nghỉ tại phòng này.
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {room.reviews.length > 0 ? (
                  <>
                    <style>{`
                      .ant-pagination-item-active {
                        border-color: #eb2f96 !important;
                      }
                      .ant-pagination-item-active a {
                        color: #eb2f96 !important;
                      }
                      .ant-pagination-item:hover {
                        border-color: #eb2f96 !important;
                      }
                      .ant-pagination-item:hover a {
                        color: #eb2f96 !important;
                      }
                    `}</style>
                    {room.reviews?.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item: Review) => (
                      <div key={item.id} style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <Avatar icon={<User size={16} />} style={{ backgroundColor: '#eb2f96' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ marginBottom: 4 }}>
                            <Space orientation="vertical" size={2}>
                              <Text strong>{item.userName}</Text>
                              <Rate disabled defaultValue={item.rating} style={{ fontSize: 12, color: '#fadb14' }} />
                            </Space>
                          </div>
                          <div style={{ marginTop: 8 }}>
                            <Paragraph style={{ color: '#334155', marginBottom: 4 }}>{item.comment}</Paragraph>
                            <Text type="secondary" style={{ fontSize: 12 }}>{dayjs(item.date).format('DD/MM/YYYY')}</Text>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48, marginBottom: 24 }}>
                      <Pagination 
                        current={currentPage} 
                        total={room.reviews.length} 
                        pageSize={pageSize} 
                        onChange={(page) => {
                          setCurrentPage(page);
                          document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        showSizeChanger={false}
                      />
                    </div>
                  </>
                ) : (
                  <div style={{ padding: '40px 0', textAlign: 'center', color: '#94a3b8' }}>
                    Chưa có đánh giá nào cho phòng này.
                  </div>
                )}
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={10}>
          {currentUser?.role === 'Admin' ? (
            <AntCard style={{ borderRadius: 16, textAlign: 'center', padding: '40px 20px', backgroundColor: '#fffbe6', border: '1px solid #ffe58f' }}>
              <div style={{ marginBottom: 20 }}>
                <ShieldCheck size={48} color="#faad14" style={{ margin: '0 auto' }} />
              </div>
              <Title level={4}>Chế độ Quản trị viên</Title>
              <Text>Tài khoản của bạn có quyền quản trị. Vui lòng sử dụng trang Admin để quản lý phòng này thay vì đặt phòng.</Text>
              <div style={{ marginTop: 24 }}>
                <Button type="primary" onClick={() => navigate('/admin')}>
                  Đi tới trang quản trị
                </Button>
              </div>
            </AntCard>
          ) : (
            <AntCard variant="borderless" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.08)', borderRadius: 16, position: 'sticky', top: '100px' }}>
            <div style={{ marginBottom: '24px' }}>
              <Text type="secondary">Giá niêm yết</Text>
              <div>
                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>${room.price}</span>
                <Text type="secondary"> / đêm</Text>
              </div>
            </div>

            <Form form={form} layout="vertical" onFinish={handleBooking} initialValues={{ guests: 1, paymentMethod: 'Transfer' }}>
              <Form.Item 
                name="dates" 
                label="Thời gian lưu trú" 
                rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
              >