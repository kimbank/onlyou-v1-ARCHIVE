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



export default function Agreement() {

  return (
    <>
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '64px'
      }}>
        {/*성사된 상대의 유무에 따라 나타나야 하는 부분인거 같습니다 
        피그마 기준으로 글씨만 채워두었습니다. */}
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div className='heading2'>아직 성사된 상대가 없어요.</div>
          <div className='basic' style={{color: 'rgba(102, 101, 99, 1)'}}>조금만 기다려 주세요!</div>
        </Container>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: "24px",
        border: 1,
        padding: "24px",
        gap: '32px',
        borderColor: "#FFC999"
      }}>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div className='heading3'>내 인연은 누구?</div>
          <div className='basic' style={{ color: '#666563' }}>
            <img src='/bag.svg' style={{ width: '20px', height: '20px' }}/>
          </div>
          <div className='basic' style={{ color: '#666563' }}>
            <img src='/house.svg' style={{ width: '20px', height: '20px' }} />
          </div>
          <div className='basic' style={{ color: '#666563' }}>
            <img src='/people.svg' style={{ width: '20px', height: '20px' }} />
          </div>
        </Container>
      </Container>
      </Container>
    </>
  )
}
