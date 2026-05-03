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