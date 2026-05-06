import { Room, Booking, User } from './types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@hotel.com', role: 'Admin' },
  { id: 'u2', name: 'Nguyen Van A', email: 'user@hotel.com', role: 'User', phone: '0901234567' }
];

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Ocean View Suite',
    type: 'Suite',
    price: 250,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    description: 'A luxurious suite with a breathtaking view of the ocean. Features a king-sized bed and a private balcony.',
    amenities: ['Free WiFi', 'Mini Bar', 'AC', 'TV', 'Ocean View'],
    status: 'Available',
    reviews: [
      { id: 'rv1', userId: 'u2', userName: 'Nguyen Van A', rating: 5, comment: 'Phòng cực kỳ đẹp, view biển xuất sắc!', date: '2024-05-15' },
      { id: 'rv2', userId: 'u3', userName: 'Tran Thi B', rating: 4, comment: 'Dịch vụ tốt, phòng sạch sẽ.', date: '2024-05-10' }
    ]
  },
  {
    id: '2',
    name: 'Deluxe Garden Room',
    type: 'Deluxe',
    price: 180,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    description: 'Perfect for couples, this room offers a peaceful view of our botanical gardens.',
    amenities: ['Free WiFi', 'Garden View', 'AC', 'Coffee Maker'],
    status: 'Available',
    reviews: [
      { id: 'rv3', userId: 'u2', userName: 'Nguyen Van A', rating: 4, comment: 'Khuôn viên xanh mát, rất thư giãn.', date: '2024-04-20' }
    ]
  },
  {
    id: '3',
    name: 'Business Double Room',
    type: 'Double',
    price: 150,
    image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=800',
    description: 'Modern room designed for business travelers, featuring a large desk and ergonomic chair.',
    amenities: ['Free WiFi', 'Desk', 'Safe', 'TV'],
    status: 'Available',
    reviews: []
  },
  {
    id: '4',
    name: 'Presidential Suite',
    type: 'Suite',
    price: 500,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    description: 'Our most prestigious room, offering unparalleled luxury and space.',
    amenities: ['Private Pool', 'Personal Butler', 'Champagne on arrival', 'Panoramic View'],
    status: 'Occupied',
    reviews: [
      { id: 'rv4', userId: 'u4', userName: 'Le Van C', rating: 5, comment: 'Xứng đáng với giá tiền, đẳng cấp thực sự.', date: '2024-05-01' }
    ]
  },
  {
    id: '5',
    name: 'Standard Single Room',
    type: 'Single',
    price: 90,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800',
    description: 'Cozy and efficient room for the solo traveler.',
    amenities: ['Free WiFi', 'AC', 'Single Bed', 'Desk'],
    status: 'Available',
    reviews: [
      { id: 'rv5', userId: 'u5', userName: 'Hoang Duc D', rating: 3, comment: 'Phòng hơi nhỏ nhưng đầy đủ tiện nghi.', date: '2024-03-15' }
    ]
  },
  {
    id: '6',
    name: 'Family Executive Room',
    type: 'Double',
    price: 220,
    image: 'https://hanoiharmoniahotel.com/UploadFile/Gallery/Rooms/FamilyExe/1.jpg',
    description: 'Spacious room designed for families, with two double beds.',
    amenities: ['Free WiFi', '2 Double Beds', 'Kid-friendly Service', 'AC'],
    status: 'Available',
    reviews: []
  },
  {
    id: '7',
    name: 'Loft Studio',
    type: 'Single',
    price: 130,
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800',
    description: 'Modern loft style studio, perfect for creative minds.',
    amenities: ['Fiber Internet', 'Workstation', 'Kitchenette', 'AC'],
    status: 'Available',
    reviews: [
      { id: 'rv6', userId: 'u6', userName: 'Kim T', rating: 5, comment: 'Không gian sáng tạo, wifi rất nhanh.', date: '2024-04-10' }
    ]
  },
  {
    id: '8',
    name: 'Royal Penthouse',
    type: 'Suite',
    price: 850,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate luxury experience spanning the entire top floor.',
    amenities: ['Private Bar', 'Jacuzzi', 'Cinema Room', '360 View'],
    status: 'Maintenance',
    reviews: []
  },
  {
    id: '9',
    name: 'Beachfront Bungalow',
    type: 'Deluxe',
    price: 320,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
    description: 'Step directly from your room onto the white sand beach.',
    amenities: ['Direct Beach Access', 'Hammock', 'Outdoor Shower', 'AC'],
    status: 'Available',
    reviews: [
      { id: 'rv7', userId: 'u7', userName: 'John D', rating: 5, comment: 'Best vacation ever, the beach is right there!', date: '2024-05-20' }
    ]
  },
  {
    id: '10',
    name: 'Honeymoon Villa',
    type: 'Suite',
    price: 450,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-private villa with private pool and romantic setup.',
    amenities: ['Private Pool', 'Romantic Dinner', 'Jacuzzi', 'Ocean Access'],
    status: 'Available',
    reviews: []
  },
  {
    id: '11',
    name: 'Studio Apartment',
    type: 'Double',
    price: 160,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    description: 'Fully equipped studio for long stays.',
    amenities: ['Kitchen', 'Washing Machine', 'WiFi', 'Desk'],
    status: 'Available',
    reviews: []
  },
  {
    id: '12',
    name: 'Executive Suite',
    type: 'Suite',
    price: 380,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800',
    description: 'Modern suite with high-end executive amenities.',
    amenities: ['Meeting Room Access', 'Private Lounge', 'AC', 'Safe'],
    status: 'Occupied',
    reviews: []
  },
  {
    id: '13',
    name: 'Ocean Vista Room',
    type: 'Deluxe',
    price: 280,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    description: 'Wake up to the sound of waves in this premium oceanfront room.',
    amenities: ['Balcony', 'King Bed', 'Rain Shower', 'WiFi'],
    status: 'Available',
    reviews: []
  },
  {
    id: '14',
    name: 'Garden Terrace Double',
    type: 'Double',
    price: 180,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    description: 'Quiet room with a beautiful private terrace overlooking the grounds.',
    amenities: ['Terrace', 'Minibar', 'AC', 'Coffee Maker'],
    status: 'Available',
    reviews: []
  },
  {
    id: '16',
    name: 'Mountain Retreat Suite',
    type: 'Suite',
    price: 310,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    description: 'Elevated luxury with panoramic mountain views and fresh alpine air.',
    amenities: ['Mountain View', 'Fireplace', 'Heated Floors', 'Tea Station'],
    status: 'Available',
    reviews: []
  },
  {
    id: '17',
    name: 'Sun-Soaked Twin Room',
    type: 'Double',
    price: 150,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800',
    description: 'Bright and airy room with two comfortable twin beds.',
    amenities: ['Large Windows', 'WiFi', 'Desk', 'AC'],
    status: 'Available',
    reviews: []
  },
  {
    id: '18',
    name: 'Presidential Penthouse B',
    type: 'Suite',
    price: 950,
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800',
    description: 'The pinnacle of luxury with a private helipad access (simulated).',
    amenities: ['Helipad Access', 'Infinity Pool', 'Wine Cellar', 'Butler'],
    status: 'Maintenance',
    reviews: []
  },
  {
    id: '19',
    name: 'Lakeside Cabin',
    type: 'Deluxe',
    price: 240,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeRfO1o6WmzynyBEJZ_HW35r0G9D6z3NPKaQ&s',
    description: 'Charming wood cabin right on the edge of our private lake.',
    amenities: ['Lake Access', 'Balcony', 'Fishing Gear', 'BBQ'],
    status: 'Available',
    reviews: []
  },
  {
    id: '20',
    name: 'Corporate Single',
    type: 'Single',
    price: 110,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800',
    description: 'Streamlined room for the focused professional.',
    amenities: ['Wired Internet', 'Ergonomic Chair', 'Quiet Zone', 'Coffee'],
    status: 'Available',
    reviews: []
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'B001',
    roomId: '1',
    userId: 'u2',
    guestName: 'Nguyen Van A',
    guestIdCard: '123456789',
    checkIn: '2024-05-10',
    checkOut: '2024-05-12',
    guests: 2,
    totalPrice: 500,
    status: 'Confirmed',
    paymentMethod: 'Transfer',
    paymentStatus: 'Paid',
    createdAt: '2024-05-01'
  },
  {
    id: 'B002',
    roomId: '2',
    userId: 'u2',
    guestName: 'Nguyen Van A',
    guestIdCard: '123456789',
    checkIn: '2024-05-15',
    checkOut: '2024-05-18',
    guests: 1,
    totalPrice: 540,
    status: 'Confirmed',
    paymentMethod: 'Cash',
    paymentStatus: 'Paid',
    createdAt: '2024-05-10'
  }
];
