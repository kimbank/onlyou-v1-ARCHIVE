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

  export default function last() {

    return (
      <ThemeProvider theme={theme}>
        <Header/>  
        {/* <GuestHeader /> */}
        {/* <ErrorModal /> */}
        <Container sx={{ marginBottom: '80px', }}>
  
  
          <Container disableGutters sx={{
            marginTop: '128px',
            display: 'flex',
            flexDirection: 'column',
            gap: '64px'
          }}>
            <Container disableGutters sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div className='heading2' style={{textAlign: 'center'}}>로그아웃이 완료되었어요.</div>
              <a href='/'>
                <SubButton buttonName={'다른번호로 로그인하기.'}/>
              </a>
            </Container>
            <Container>
              <Container>
              </Container>
              <Container disableGutters sx={{
                display: 'flex',
                flexFlow: 'row wrap',
                gap: '8px',
              }}>
                
              </Container>
              <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                
              </Container>
            </Container>
          </Container>
  
          <NavBar/>
        </Container>  
      </ThemeProvider>
    );
  }