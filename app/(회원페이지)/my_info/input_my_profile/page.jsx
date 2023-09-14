'use client'

import Container from '@mui/material/Container';
import {  Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

import axios from 'axios';

import { EditButton, ListButton, MainButton, MainHalfButton, SubButton, SubHalfButton, SubMiniButton, UploadButton, MainMiniButton } from '@/components/Button';
import { SuccessNotification, DangerNotification, InfoText, DangerMiniNotification, Certification } from '@/components/Notification';
import { DropdownInput, LongText, TextInput, Range, TextField } from '@/components/Input';
import { StepsToggle, RatingToggle } from '@/components/Steps';
import SwipeableEdgeDrawer from '@/components/Popup';
import NavBar from '@/components/NavBar'

import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";



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

export default function Leave() {
  return(
    <ThemeProvider theme={theme}>
          <Header/>
          <Container sx={{marginBottom: '80px'}}>
            <Container disableGutters sx={{
              marginTop: '128px',
              display: 'flex',
              flexDirection: 'column',
              gap: '64px'
            }}>
              <div className='heading2'>내 프로필 입력하기</div>
              <div>
                <div className='heading6' style={{color: 'rgba(102, 101, 99, 1)'}}>직장 유형</div>
                {/*다음 드롭인풋 컴포넌트에 placeholder 파라미터가 있어야 할것 같습니다
                충돌 방지를 위해 컴포넌트 조작은 하지 않았습니다 또한 피그마 부분과 모양도 다릅니다. */}
                <DropdownInput></DropdownInput>
              </div>
              <div>
                <div className='heading6' style={{color: 'rgba(102, 101, 99, 1)'}}>최종 학력</div>
                <DropdownInput></DropdownInput>
              </div>
            </Container>
          </Container>
    </ThemeProvider>
  );
}