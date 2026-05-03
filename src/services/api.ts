import { Room, Booking, User, BookingStatus } from '../types';
import { mockRooms, mockBookings, mockUsers } from '../data';

// Helper to get from storage or default
const getStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return defaultValue;
    const parsed = JSON.parse(saved);
    return parsed !== null && parsed !== undefined ? parsed : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from storage`, e);
    return defaultValue;
  }
};

const setStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const RoomService = {
  getRooms: async (): Promise<Room[]> => {
    return getStorage<Room[]>('mockRooms', mockRooms);
  },
  getRoomById: async (id: string): Promise<Room | null> => {
    const rooms = await RoomService.getRooms();
    return rooms.find(r => r.id === id) || null;
  },
  updateRoom: async (room: Room): Promise<void> => {
    const rooms = await RoomService.getRooms();
    const updated = (rooms || []).map(r => r.id === room.id ? room : r);
    setStorage('mockRooms', updated);
  },
  addRoom: async (room: Room): Promise<void> => {
    const rooms = await RoomService.getRooms();
    setStorage('mockRooms', [...rooms, room]);
  },
  deleteRoom: async (id: string): Promise<void> => {
    const rooms = await RoomService.getRooms();
    setStorage('mockRooms', rooms.filter(r => r.id !== id));
  }
};

export const BookingService = {
  getBookings: async (): Promise<Booking[]> => {
    const bookings = getStorage<Booking[]>('mockBookings', mockBookings);
    return bookings.filter((v, i, a) => v.id && a.findIndex(t => t.id === v.id) === i);
  },
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    const all = await BookingService.getBookings();
    return all.filter(b => b.userId === userId);
  },
  createBooking: async (booking: Booking): Promise<void> => {
    const all = await BookingService.getBookings();
    setStorage('mockBookings', [...all, booking]);
  },
  updateBookingStatus: async (bookingId: string, status: BookingStatus): Promise<void> => {
    const all = await BookingService.getBookings();
    const updated = (all || []).map(b => b.id === bookingId ? { ...b, status } : b);
    setStorage('mockBookings', updated);

    // Side effect: update room status
    const booking = updated.find(b => b.id === bookingId);
    if (booking) {
      const room = await RoomService.getRoomById(booking.roomId);
      if (room) {
        let newStatus = room.status;
        if (status === 'Confirmed') newStatus = 'Occupied';
        else if (status === 'Cancelled' || status === 'Checked-out') newStatus = 'Available';
        
        if (newStatus !== room.status) {
          await RoomService.updateRoom({ ...room, status: newStatus as any });
        }
      }
    }
  }
};

export const UserService = {
  getUsers: async (): Promise<User[]> => {
    return getStorage<User[]>('mockUsers', mockUsers);
  },
  addUser: async (user: User): Promise<void> => {
    const users = await UserService.getUsers();
    setStorage('mockUsers', [...users, user]);
  },
  login: async (email: string, password?: string): Promise<User | null> => {
    const users = await UserService.getUsers();
    // In this mock, we accept any password as long as the email matches
    return users.find(u => u.email === email) || null;
  },
  deleteUser: async (id: string): Promise<void> => {
    const users = await UserService.getUsers();
    setStorage('mockUsers', users.filter(u => u.id !== id));
  }
};
