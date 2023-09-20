'use client'

import { Container, Typography } from '@mui/material';
import { InfoText } from "@/components/Notification";
import { MainButton } from "@/components/Button";

import axios from "axios";
import React, { useState, useEffect } from 'react';


// 승급심사 제출이 필요한 상태
export default function PromotionWaiting() {
  const [userCount, setUserCount] = useState([]);

  useEffect(() => {
    axios.get('/api/matching/competitor_count')
        .then(response => {
            setUserCount(response.data);
            console.log(response.data);
        });
  }, []);

  return (
    <Container disableGutters sx={{
      marginTop: '80px',
      display: 'flex',
      flexDirection: 'column',
      gap: '64px',
    }}>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <Typography className="heading2">승급심사 결과 대기중입니다.</Typography>
        <Typography className="basic-gray">승급하고, 인연을 만나보세요!</Typography>
        <InfoText title={`약 ${userCount}명의 상대가 인연을 기다리고 있어요!`} shadow={false} />
      </Container>
      {/* <MainButton buttonName="승급심사 신청하기" /> */}
    </Container>
  );
}
