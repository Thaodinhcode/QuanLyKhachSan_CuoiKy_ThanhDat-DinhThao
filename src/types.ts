export type RoomType = 'Single' | 'Double' | 'Suite' | 'Deluxe';
export type RoomStatus = 'Available' | 'Occupied' | 'Maintenance';
export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Checked-out';
export type PaymentMethod = 'Cash' | 'Transfer';
export type PaymentStatus = 'Paid' | 'Pending';
export type UserRole = 'Admin' | 'User';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  image: string;
  description: string;
  amenities: string[];
  status: RoomStatus;
  reviews: Review[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  guestName: string;
  guestIdCard: string;
  idCardImage?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
}
