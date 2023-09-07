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

import { useErrorModal } from './error-modal';

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

  let [backColor0, setbackColor0] = useState(false);
  let [backColor1, setbackColor1] = useState(false);
  let [backColor2, setbackColor2] = useState(false);
  let [backColor3, setbackColor3] = useState(false);
  let [backColor4, setbackColor4] = useState(false);
  let [backColor5, setbackColor5] = useState(false);
  let [backColor6, setbackColor6] = useState(false);
  let [backColor7, setbackColor7] = useState(false);
  let [backColor8, setbackColor8] = useState(false);
  

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
            <div className='heading2'>정말 탈퇴하시겠어요?</div>
            <div className='basic' style={{color: '#666563'}}>
            서비스 이용 중 불편한 점이 있으셨다면,<br/>
            꼼꼼하게 확인하고 서비스를 개선하도록 할게요.
            </div>
          </Container>
          <Container>
            <Container>
              <div disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}> 
                {backColor0 ? <MainMiniButton onClick={() => setbackColor0(!backColor0)} buttonName={'승급 실패'}/> : <SubMiniButton onClick={() => setbackColor0(!backColor0)} buttonName={'승급 실패'}/>}
                {backColor1 ? <MainMiniButton onClick={() => setbackColor1(!backColor1)} buttonName={'원하는 상대가 없음'}/> : <SubMiniButton onClick={() => setbackColor1(!backColor1)} buttonName={'원하는 상대가 없음'}/>}
                {backColor2 ? <MainMiniButton onClick={() => setbackColor2(!backColor2)} buttonName={'매칭이 잘 안됨'}/> : <SubMiniButton onClick={() => setbackColor2(!backColor2)} buttonName={'매칭이 잘 안됨'}/>}
                {backColor3 ? <MainMiniButton onClick={() => setbackColor3(!backColor3)} buttonName={'연애를 시작함'}/> : <SubMiniButton onClick={() => setbackColor3(!backColor3)} buttonName={'연애를 시작함'}/>}
                {backColor4 ? <MainMiniButton onClick={() => setbackColor4(!backColor4)} buttonName={'사이트 오류가 잦음'}/> : <SubMiniButton onClick={() => setbackColor4(!backColor4)} buttonName={'사이트 오류가 잦음'}/>}
                {backColor5 ? <MainMiniButton onClick={() => setbackColor5(!backColor5)} buttonName={'서비스가 불편함'}/> : <SubMiniButton onClick={() => setbackColor5(!backColor5)} buttonName={'서비스가 불편함'}/>}
                {backColor6 ? <MainMiniButton onClick={() => setbackColor6(!backColor6)} buttonName={'고객 응대가 불친절함'}/> : <SubMiniButton onClick={() => setbackColor6(!backColor6)} buttonName={'고객 응대가 불친절함'}/>}
                {backColor7 ? <MainMiniButton onClick={() => setbackColor7(!backColor7)} buttonName={'알람이 너무 자주 옴'}/> : <SubMiniButton onClick={() => setbackColor7(!backColor7)} buttonName={'알람이 너무 자주 옴'}/>}
                {backColor8 ? <MainMiniButton onClick={() => setbackColor8(!backColor8)} buttonName={'개인정보 유출 우려'}/> : <SubMiniButton onClick={() => setbackColor8(!backColor8)} buttonName={'개인정보 유출 우려'}/>}
              </div>
            </Container>
            <Container disableGutters sx={{
              display: 'flex',
              flexFlow: 'row wrap',
              gap: '8px',
            }}>
              <LongText buttonName={'기타:'} placeholder={'기타 사유를 적어주세요.'}/>
            </Container>
            <Container sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <MainButton buttonName='탈퇴하기' onClick={() => handleLogin()} />
              <SubButton buttonName='돌아가기' />
            </Container>
          </Container>
        </Container>

        <NavBar/>
      </Container>  
    </ThemeProvider>
  );
}
