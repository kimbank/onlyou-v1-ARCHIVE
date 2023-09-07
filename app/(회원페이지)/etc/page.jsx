'use client'

import Image from 'next/image'
import kakao from '/public/kakaotalk1.png'

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

  export default function Etc() {

   
    return (
        <ThemeProvider theme={theme}>
          <Header />
            <Container sx={{ marginBottom: '80px', }}>
							<Container disableGutters sx={{
            marginTop: '128px',
            display: 'flex',
            flexDirection: 'column',
            gap: '64px'
          }}>
						<Container>
							<>
								<div className='heading2'>카카오톡 아이디를<br/>입력해주세요.</div><br/>
								<div className='basic' style={{color: '#666563'}}>카카오톡 아이디는 상호 매칭의사를 확인 후,
								<br/>매칭이 최종 성사되면 상대방에게 전달되어요.
								</div>
								</>	
						</Container>
						<Container>
							<div className='basic' style={{color: '#666563'}}>카카오톡 아이디</div>
							<TextInput placeholder={'카카오톡 아이디를 입력해주세요'}/>
						</Container>
						<Container>
							<div className='heading5' style={{color: 'black'}}>카카오톡 아이디 찾는 방법</div>
							<div className='heading6' style={{color: '#666563'}}>카카오톡→친구추가→내 아이디 확인</div>
							<div>
								<Image src={kakao} alt='카카오톡 설명' width={'210px'}/>
							</div>
						</Container>
						<Container>
							<MainButton buttonName={'다음 단계'}></MainButton>
							<SubButton buttonName={'이전 단계로 돌아가기'}></SubButton>
						</Container>
					</Container>

						</Container>
        </ThemeProvider>
    )
  }