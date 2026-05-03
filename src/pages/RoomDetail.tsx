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