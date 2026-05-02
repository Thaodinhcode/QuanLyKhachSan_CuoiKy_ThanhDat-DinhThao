import { Booking } from '../types';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const bookingService = {
  // Check if a room is available (excluding cancelled bookings)
  isRoomAvailable: (roomId: string, checkIn: string, checkOut: string, existingBookings: Booking[]): boolean => {
    const start = dayjs(checkIn);
    const end = dayjs(checkOut);

    return !existingBookings.filter(b => b.status === 'Confirmed').some(booking => {
      if (booking.roomId !== roomId) return false;
      
      const bStart = dayjs(booking.checkIn);
      const bEnd = dayjs(booking.checkOut);

      // Overlap logic: (StartA < EndB) and (EndA > StartB)
      return start.isBefore(bEnd) && end.isAfter(bStart);
    });
  },

  // Mock OCR Verification for ID Card
  mockVerifyCCCD: (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomId = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
        resolve(randomId);
      }, 1500);
    });
  },

  calculateTotalPrice: (pricePerNight: number, checkIn: string, checkOut: string): number => {
    if (!checkIn || !checkOut) return 0;
    const start = dayjs(checkIn);
    const end = dayjs(checkOut);
    const days = end.diff(start, 'day');
    return days > 0 ? days * pricePerNight : 0;
  }
};
