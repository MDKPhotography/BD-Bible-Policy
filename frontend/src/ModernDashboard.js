import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Card, Row, Col, Statistic, Progress, Typography } from 'antd';
import { GMU_COLORS } from './theme';

const { Title } = Typography;

const GradientBackground = styled.div`
  background: linear-gradient(135deg, ${GMU_COLORS.primary} 0%, ${GMU_COLORS.darkGreen} 100%);
  min-height: 100vh;
  padding: 40px;
`;

const MetricCard = styled(motion.div)`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,51,0,0.1);
  height: 100%;
  transition: all 0.3s ease;
  border-top: 4px solid ${GMU_COLORS.secondary};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,51,0,0.15);
  }
`;

const GoldAccent = styled.span`
  color: ${GMU_COLORS.secondary};
  font-weight: bold;
`;

const ModernDashboard = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <GradientBackground>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -50 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '50px' }}
      >
        <h1 style={{ 
          fontSize: '3.5rem', 
          color: 'white', 
          fontWeight: '800',
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          Business Development <GoldAccent>Command Center</GoldAccent>
        </h1>
        <p style={{ fontSize: '1.5rem', color: GMU_COLORS.secondary, fontWeight: '300' }}>
          George Mason University • Strategic Intelligence Platform
        </p>
      </motion.div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Statistic
              title="Pipeline Value"
              value={284.6}
              precision={1}
              valueStyle={{ color: GMU_COLORS.primary, fontWeight: 'bold', fontSize: '28px' }}
              prefix="$"
              suffix="M"
            />
            <Progress 
              percent={85} 
              strokeColor={{
                '0%': GMU_COLORS.primary,
                '100%': GMU_COLORS.lightGreen,
              }}
              showInfo={false} 
            />
          </MetricCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Statistic
              title="Active Opportunities"
              value={140}
              valueStyle={{ color: GMU_COLORS.darkGreen, fontWeight: 'bold', fontSize: '28px' }}
            />
            <Progress 
              percent={70} 
              strokeColor={{
                '0%': GMU_COLORS.secondary,
                '100%': GMU_COLORS.darkGold,
              }}
              showInfo={false} 
            />
          </MetricCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Statistic
              title="Avg Deal Size"
              value={2.03}
              precision={2}
              valueStyle={{ color: GMU_COLORS.primary, fontWeight: 'bold', fontSize: '28px' }}
              prefix="$"
              suffix="M"
            />
            <Progress 
              percent={60} 
              strokeColor={GMU_COLORS.lightGreen}
              showInfo={false} 
            />
          </MetricCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Statistic
              title="Win Rate"
              value={72}
              valueStyle={{ color: GMU_COLORS.secondary, fontWeight: 'bold', fontSize: '28px' }}
              suffix="%"
            />
            <Progress 
              percent={72} 
              strokeColor={{
                '0%': GMU_COLORS.darkGold,
                '100%': GMU_COLORS.secondary,
              }}
              showInfo={false} 
            />
          </MetricCard>
        </Col>
      </Row>
    </GradientBackground>
  );
};

export default ModernDashboard;
