'use client'

import { Container, Typography } from '@mui/material';
import { InfoText } from "@/components/Notification";
import { MainButton } from "@/components/Button";

import axios from "axios";
import React, { useState, useEffect } from 'react';


// 매칭신청서 (내정보)가 제출되지 않은 상태
export default function ApplicationExtra() {
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
        <Typography className="heading2">인연을 찾아드릴게요!</Typography>
        <Typography className="basic-gray">매칭에 참여하고, 인연을 만나보세요!</Typography>
        <InfoText title={`약 ${userCount}명의 상대가 인연을 기다리고 있어요!`} />
      </Container>
      <a href="/application/my/value">
        <MainButton buttonName="내 정보 이어서 완성하기" />
      </a>
    </Container>
  );
}
