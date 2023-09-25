'use client'
import React, { useEffect, useState } from 'react';
import { Container, Typography } from "@mui/material";
import { DangerNotification, InfoText } from '@/components/Notification';
import { Certification } from '@/components/Notification';

import Image from 'next/image';
import Bag from "@/public/bag.svg";
import House from "@/public/house.svg";
import People from "@/public/people.svg";


// 매칭 선택 상태
export default function Failure() {
  
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '64px'
    }}>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <Typography className='heading2'>서로의 선택이 엇갈렸어요</Typography>
        <Typography className='basic-gray'>고객님께서 다른 인연을 찾을 수 있도록, <br />최선을 다해 매칭해드릴게요.</Typography>
      </Container>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: "24px",
        border: 1,
        padding: "24px",
        gap: '4px',
        borderColor: "#FFC999"
      }}>

        {/* 닉네임 */}
        <Typography className='heading2'> 
          내 인연은 누구?
        </Typography>

        {/* 직장유형 */}
        <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
          <Image src={Bag} width='20px' style={{marginRight: '10px'}}/>
          ?
        </Typography>

        {/* 거주지 */}
        <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
          <Image src={House} width='20px' style={{marginRight: '10px'}}/>
          ?
        </Typography>

        {/* 생년월일 */}
        <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
          <Image src={People} width='20px' style={{marginRight: '10px'}}/>
          ?
        </Typography>
      </Container>
      
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <InfoText title="예상 경쟁률" alertMessage="매칭 정보가 쌓이면 계산되어요" shadow={false} />
        <InfoText title="예상 매칭 주기" alertMessage="매칭 정보가 쌓이면 계산되어요" shadow={false} />
      </Container>
    </Container>
  );
}
