'use client'

import { Container, Typography, Button } from '@mui/material';
import { MainSelectButton, SubSelectButton, MainButton } from '@/components/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Link from 'next/link';


export default function Letter({ params }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`/api/user/letter/${params.u_id}`)
      .then((res) => {
        setData(res.data);
      })
  }, [])

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "48px",
      }}
    >
      <Typography className="heading2">
        {data && data.nickname}님께서
        <br />
        편지를 보냈어요!
      </Typography>

      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "24px",
          border: 1,
          padding: "24px",
          gap: "48px",
          borderColor: "#FFC999",
        }}
      >
        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <Button sx={sx_selected}>편지</Button>
          <Link href={`/user/${params.u_id}/detail`}>
          <Button sx={sx_default}>상세</Button>
          </Link>
          <Link href={`/user/${params.u_id}/photo`}>
            <Button sx={sx_default}>사진</Button>
          </Link>
        </Container>

        <Typography className='basic'>
          {data && data.letter}
        </Typography>


        <Container disableGutters sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '8px',
          marginTop: '24px',
        }}>
          <MainSelectButton buttonName='수락하기' onClick={() => handleAccept()} />
          <SubSelectButton buttonName='거절하기' onClick={() => handleReject()} />
        </Container>
      </Container>

      <a href="https://g8h7y7g082m.typeform.com/to/htWbQxB7">
        <MainButton buttonName='매칭 피드백하기' />
      </a>
    </Container>
  );
}


const sx_default = {
  borderRadius: '8px',
  height: '35px',
  width: '56px',
  boxShadow: 'none',
  backgroundColor: '#F7F4F2',
  color: '#3C3B3A',
  fontFamily: 'Pretendard-Semibold',
  fontSize: '14px',
  letterSpacing: '1.25px',
}

const sx_selected = {
  borderRadius: '8px',
  height: '35px',
  width: '56px',
  boxShadow: 'none',
  backgroundColor: '#3C3B3A',
  color: '#FFFFFF',
  fontFamily: 'Pretendard-Semibold',
  fontSize: '14px',
  letterSpacing: '1.25px',
  pointerEvents: 'none',
}