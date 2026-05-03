import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Spin, Empty, Button, Tabs, Card, Select, Pagination } from 'antd';
import { RoomService } from '../services/api';

const { Content } = Layout;
const { Title, Text } = Typography;

const Rooms = () => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRooms = await RoomService.getRooms();
        
        let filtered = allRooms;
        if (filter !== 'All') {
          filtered = allRooms.filter(r => r.type === filter);
        }
        setRooms(filtered);
      } catch (e) {
        console.error("Error fetching rooms", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [filter]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentRooms = rooms.slice(startIndex, startIndex + pageSize);
