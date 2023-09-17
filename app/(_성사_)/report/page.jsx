'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import Container from "@mui/material/Container";
import { Certification } from '@/components/Notification';
import { MainHalfButton, MainMiniButton, SubHalfButton, SubMiniButton, SubMiniFullButton } from '@/components/Button';
import { DefaultCheckbox } from '@/components/Checkbox';

import Image from 'next/image';
import Bag from "@/public/bag.svg";
import House from "@/public/house.svg";
import People from "@/public/people.svg";
import Typography from '@mui/material/Typography';

import { DormantToggle } from '@/components/Toggle';
import Modal from '@/components/Modal';
import { MainButton } from '@/components/Button';
import { Checkbox } from '@mui/material';
import { LongText, TextInput } from '@/components/Input';

function Header() {
    return (
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* 신고받는사람 닉네임을 선정해주세요 */}
        <div className='heading2'>taykim님 신고하기</div>
        <div className='basic'>빠르게 조치해드리도록 할게요.</div>
      </Container>
  );
}

function Reason() {
  return (
    <Container disableGutters sx={{
        display: 'flex',
        flexFlow: 'row wrap',
        gap: '8px'
    }}>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className='heading6'>신고 사유를 알려주세요</div>
      </Container>
      <DefaultCheckbox buttonName={'소개팅에 지각'}/>
      <DefaultCheckbox buttonName={'금전 거래를 요구'}/>
      <DefaultCheckbox buttonName={'타인을 사칭하거나 사진을 도용'}/>
      <DefaultCheckbox buttonName={'불쾌한 스킨십을 시도했어요'}/>
      <DefaultCheckbox buttonName={'금융 정보 등 민감한 개인정보 요구'}/>
      <DefaultCheckbox buttonName={'성적인 농담 등 불쾌한 표현 사용'}/>
      <DefaultCheckbox buttonName={'기재된 정보가 사실과 다름'}/>
      {/*텍스트 인풋 상자의 크기를 맞추어 주세요 */}
      <LongText buttonName={'기타:'} placeholder={'기타 신고 사유를 작성해주세요'}/>
    </Container>
  );
}


  
  export default function Report() {
    return (
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '64px'
        }}>
          {/*오른쪽 위 부분의 x자로 닫는 버튼이 있어야 합니다*/}
          <Header/>
          <Reason/>
          <MainButton buttonName={'제출하기'}/>
        </Container>
    )}