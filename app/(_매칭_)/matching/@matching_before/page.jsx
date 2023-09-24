'use client'
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

import Image from 'next/image';
import Bag from "@/public/bag.svg";
import House from "@/public/house.svg";
import People from "@/public/people.svg";
import { InfoText } from '@/components/Notification';


// 매칭 대기중 상태
export default function Before() {

  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '64px',
    }}>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        // marginY: '64px',
      }}>
        <Typography className='heading2'>인연을 찾는 중이에요</Typography>
        <Typography className='basic-gray'>
        ONLYou는 오래 걸리더라도 정확한 매칭을 진행하는 것을 지향해요. 회원님의 조건과 이상형 조건에 따라 7일~10일 이상의 주기로 매칭이 진행됩니다.
        회원님의 조건과 이상형 조건에 따라 7일~10일 이상의 주기로 매칭이 진행됩니다.
        </Typography>
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
        <InfoText title="예상 매칭 난이도" alertMessage="매칭 정보가 쌓이면 계산되어요" shadow={false} />
      </Container>
    </Container>
  );
}
