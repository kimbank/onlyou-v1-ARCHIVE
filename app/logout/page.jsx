'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import Container from "@mui/material/Container";
import { Certification } from '@/components/Notification';
import { MainButton, MainHalfButton, MainMiniButton, SubButton, SubHalfButton, SubMiniButton, SubMiniFullButton } from '@/components/Button';
import { DefaultCheckbox } from '@/components/Checkbox';

import Image from 'next/image';
import Bag from "@/public/bag.svg";
import House from "@/public/house.svg";
import People from "@/public/people.svg";
import Typography from '@mui/material/Typography';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";

import { DormantToggle } from '@/components/Toggle';

const theme = createTheme({
  palette: {
    primary: {
      light: '#FFA266',
      main: '#FF7700',
      dark: '#C45A00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFFFFF',
      main: '#F7F4F2',
      dark: '#B2B0AE',
      contrastText: '#3C3B3A',
    },
  },
});

export default function Logout() {

  return (
    <ThemeProvider theme={theme}>
    <Container sx={{marginBottom: '80px'}}>
      <Container disableGutters sx={{
        marginTop: '256px',
        display: 'flex',
        flexDirection: 'column',
        gap: '64px'
      }}>
        <div style={{textAlign: 'center', color: 'grey'}} className='heading2'>로그아웃 중입니다. . .</div>
        <div style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
          <SubButton buttonName={'메인으로 돌아가기'}/>
        </div>
      </Container>
    </Container>
  </ThemeProvider>
  );
}