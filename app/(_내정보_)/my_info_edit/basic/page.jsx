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


export default function Basic() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get('/api/my_info')
        .then(response => {
            setUser(response.data);
            console.log(response.data);
        });
  }, []);

  return (
    <Container disableGutters sx={{marginBottom: '80px'}}>
      <Container disableGutters sx={{
        marginTop: '80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <Typography className="heading2">기본 정보 수정</Typography>
        <br />
        <Container>

          {/* 작업 영역 */}
          
        </Container>
      </Container>
    </Container>
  );
}
