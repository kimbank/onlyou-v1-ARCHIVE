'use client'

import { InfoText } from "@/components/Notification";
import { MainButton } from "@/components/Button";
import Typography from '@mui/material/Typography';

import axios from "axios";
import React, { useState, useEffect } from 'react';

// 매칭 신청서(타겟상대)를 완성하지 못한 상태
export default function ApplicationTarget() {
  const [userCount, setUserCount] = useState([]);

  useEffect(() => {
    axios.get('/api/matching/competitor_count')
        .then(response => {
            setUserCount(response.data);
            console.log(response.data);
        });
  }, []);

  return (
    <>
      <Typography className="heading1">인연을 찾아드릴게요!</Typography>
      <Typography className="basic-gray">매칭에 참여하고, 인연을 만나보세요!</Typography>
      <br />
      <InfoText title={`약 ${userCount}명의 상대가 인연을 기다리고 있어요!`} shadow={false} />
      <br/><br/><br/>
      <MainButton buttonName="이상형 정보 이어서 완성하기" shadow={false} />
    </>
  );
}
