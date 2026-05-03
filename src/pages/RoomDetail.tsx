import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Typography, Tag, Button, Row, Col, Card, Spin, Space, Divider, Modal, DatePicker, InputNumber, Form, Input, Upload, Select, App, Rate, Avatar, Pagination } from 'antd';
import { Room, Booking, Review } from '../types';
import { ChevronLeft, Wifi, Coffee, Tv, CheckCircle, UploadCloud, CreditCard, ShieldCheck, User, Star, Sparkles } from 'lucide-react';
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

  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');

  const canReview = useMemo(() => {
    if (!currentUser || !room) return false;
    return bookings.some(b => 
      b.userId === currentUser.id && 
      b.roomId === room.id && 
      b.status === 'Checked-out'
    );
  }, [currentUser, room, bookings]);

  const fetchData = async () => {
    if (!id) return;
    try {
      const [foundRoom, allBookings] = await Promise.all([
        RoomService.getRoomById(id),
        BookingService.getBookings()
      ]);
      if (foundRoom) setRoom(foundRoom);
      setBookings(allBookings);
    } catch (e) {
      console.error("Error fetching room details", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const avgRating = useMemo(() => {
    if (!room?.reviews?.length) return 0;
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
        content: 'Vui lòng đăng nhập để đặt phòng',
        okText: 'Đăng nhập',
        onOk: () => navigate('/auth')
      });
      return;
    }

    if (currentUser.role === 'Admin') {
      message.error('Admin không thể đặt phòng. Vui lòng dùng tài khoản User.');
      return;
    }

    const [start, end] = values.dates;
    const checkInStr = start.format('YYYY-MM-DD');
    const checkOutStr = end.format('YYYY-MM-DD');

    const isAvailable = bookingService.isRoomAvailable(room!.id, checkInStr, checkOutStr, bookings);
    if (!isAvailable) {
      message.error('Phòng đã được đặt trong khoảng thời gian này!');
      return;
    }

    modal.confirm({
      title: 'Xác nhận đặt phòng',
      content: (
        <div>
          <p><strong>{room?.name}</strong></p>
          <p>{checkInStr} → {checkOutStr}</p>
          <p>Số khách: {values.guests}</p>
          <p style={{ fontSize: 18, color: '#c084fc', fontWeight: 'bold', marginTop: 12 }}>
            Tổng tiền: ${totalPrice}
          </p>
        </div>
      ),
      onOk: async () => {
        const newBooking: Booking = {
          id: `B${Date.now()}`,
          roomId: room!.id,
          userId: currentUser.id,
          guestName: currentUser.name,
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
          message.success('Đặt phòng thành công! Đơn của bạn đang chờ duyệt.');
          navigate('/my-bookings');
        } catch (e) {
          message.error('Có lỗi xảy ra khi đặt phòng');
        }
      }
    });
  };

  const handleUploadChange = async (info: any) => {
    if (info.file.status === 'done') {
      const hide = message.loading('Đang xử lý CCCD...', 0);
      try {
        const detectedId = await bookingService.mockVerifyCCCD();
        form.setFieldsValue({ idCard: detectedId });
        message.success('Đã tự động nhận diện số CCCD!');
      } finally {
        hide();
      }
    }
  };

  const handleAddReview = async (values: any) => {
    if (!currentUser || !room) return;

    const newReview: Review = {
      id: `rv${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      rating: values.rating,
      comment: values.comment,
      date: dayjs().format('YYYY-MM-DD')
    };

    const updatedRoom = { ...room, reviews: [newReview, ...room.reviews] };
    await RoomService.updateRoom(updatedRoom);
    setRoom(updatedRoom);
    message.success('Đánh giá của bạn đã được ghi nhận!');
    reviewForm.resetFields();
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '120px', background: '#0f172a' }}><Spin size="large" /></div>;
  if (!room) return <div style={{ textAlign: 'center', padding: '120px', color: 'white' }}>Không tìm thấy phòng</div>;

  return (
    <Content style={{ padding: '40px 24px', maxWidth: '1280px', margin: '0 auto', background: '#0f172a', minHeight: '100vh' }}>
      {/* Back Button */}
      <Button icon={<ChevronLeft />} onClick={() => navigate(-1)} style={{ marginBottom: 32, color: '#c4b5fd' }}>
        Quay lại
      </Button>

      <Row gutter={[48, 48]}>
        {/* Left Column */}
        <Col xs={24} lg={14}>
          <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,0.6)' }}>
            <img src={room.image} alt={room.name} style={{ width: '100%', height: '520px', objectFit: 'cover' }} />
          </div>

          <div style={{ marginTop: 40 }}>
            <Space style={{ marginBottom: 16 }}>
              <Tag style={{ background: 'rgba(139,92,246,0.2)', color: '#c4b5fd', borderColor: '#8b5cf6', padding: '4px 16px', borderRadius: 9999 }}>{room.type}</Tag>
              <Tag color={room.status === 'Available' ? 'green' : 'red'} style={{ borderRadius: 9999 }}>
                {room.status === 'Available' ? 'Sẵn sàng' : 'Hết phòng'}
              </Tag>
            </Space>

            <Title level={1} style={{ color: 'white' }}>{room.name}</Title>

            <Divider style={{ borderColor: '#334155' }} />

            <Title level={4} style={{ color: '#e0e7ff' }}>Mô tả</Title>
            <Paragraph style={{ fontSize: 16.5, color: '#cbd5e1', lineHeight: 1.8 }}>{room.description}</Paragraph>

            <Divider style={{ borderColor: '#334155' }} />

            <Title level={4} style={{ color: '#e0e7ff' }}>Tiện nghi</Title>
            <Row gutter={[24, 20]}>
              {room.amenities?.map((item, i) => (
                <Col span={12} md={8} key={i}>
                  <Space style={{ color: '#c4b5fd' }}>
                    <CheckCircle size={20} />
                    <Text style={{ color: '#e0e7ff' }}>{item}</Text>
                  </Space>
                </Col>
              ))}
            </Row>
          </div>
        </Col>

        {/* Right Column - Booking */}
        <Col xs={24} lg={10}>
          {currentUser?.role === 'Admin' ? (
            <AntCard style={{ background: 'rgba(234,179,8,0.1)', borderColor: '#eab308', borderRadius: 20 }}>
              <ShieldCheck size={60} style={{ color: '#fbbf24', margin: '0 auto', display: 'block' }} />
              <Title level={4} style={{ textAlign: 'center', color: 'white' }}>Chế độ Quản trị viên</Title>
              <Button block size="large" type="primary" onClick={() => navigate('/admin')}>
                Quản lý phòng
              </Button>
            </AntCard>
          ) : (
            <AntCard style={{ 
              background: 'rgba(30,41,59,0.9)', 
              border: '1px solid rgba(192,132,252,0.3)', 
              borderRadius: 24,
              position: 'sticky',
              top: 100
            }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Text style={{ color: '#a5b4fc' }}>Giá / đêm</Text>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#e0bbff' }}>${room.price}</div>
              </div>

              <Form form={form} onFinish={handleBooking} layout="vertical">
                <Form.Item name="dates" label="Chọn ngày" rules={[{ required: true }]}>
                  <RangePicker style={{ width: '100%', height: 52 }} onChange={(dates) => {
                    if (dates) {
                      setCheckIn(dates[0]!.format('YYYY-MM-DD'));
                      setCheckOut(dates[1]!.format('YYYY-MM-DD'));
                    }
                  }} />
                </Form.Item>

                <Form.Item name="guests" label="Số khách" rules={[{ required: true }]}>
                  <InputNumber min={1} max={6} style={{ width: '100%', height: 52 }} />
                </Form.Item>

                <Form.Item name="idCard" label="Số CCCD" rules={[{ required: true }]}>
                  <Input prefix={<CreditCard />} placeholder="Nhập số CCCD" style={{ height: 52 }} />
                </Form.Item>

                <Form.Item name="paymentMethod" label="Thanh toán" initialValue="Transfer">
                  <Select options={[
                    { value: 'Transfer', label: 'Chuyển khoản' },
                    { value: 'Cash', label: 'Tiền mặt' }
                  ]} />
                </Form.Item>

                {totalPrice > 0 && (
                  <div style={{ background: 'rgba(139,92,246,0.15)', padding: 20, borderRadius: 16, textAlign: 'center', margin: '24px 0' }}>
                    <Text style={{ color: '#c4b5fd' }}>Tổng thanh toán</Text>
                    <Title level={3} style={{ color: '#e0bbff', margin: 8 }}>${totalPrice}</Title>
                  </div>
                )}

                <Button type="primary" size="large" block htmlType="submit" style={{ height: 64, fontSize: 18, background: 'linear-gradient(90deg, #8b5cf6, #d946ef)' }}>
                  ĐẶT PHÒNG NGAY
                </Button>
              </Form>
            </AntCard>
          )}
        </Col>
      </Row>
    </Content>
  );
};

export default RoomDetail;