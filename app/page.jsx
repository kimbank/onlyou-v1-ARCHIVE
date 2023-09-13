'use client'

import Link from 'next/link';

import Container from '@mui/material/Container';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

import { EditButton, ListButton, MainButton, MainHalfButton, SubButton, SubHalfButton, SubMiniButton, UploadButton } from '@/components/Button';
import { SuccessNotification, DangerNotification, InfoText, DangerMiniNotification, Certification } from '@/components/Notification';
import { DropdownInput, LongText, TextInput, Range, TextField } from '@/components/Input';
import { CancelCheckbox, CheckedCheckbox, DefaultCheckbox } from '@/components/Checkbox';
import { Toggle } from '@/components/Toggle';
import { StepsToggle, RatingToggle } from '@/components/Steps';
import SwipeableEdgeDrawer from '@/components/Popup';
import NavBar from '@/components/NavBar'

import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";

import Modal from '@/components/shared/modal';

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

const buttonTitle = '버튼입니다.';

export default function Home() {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container>
    {/* <Modal showModal={showModal} setShowModal={setShowModal}>
      <h1>.</h1>
      <br /><br /><br /><br /><br /><br />
      <h1>.</h1>
    </Modal> */}
      <Container sx={{ marginBottom: '80px', marginTop: '128px',}}>
        <Container disableGutters sx={{
          
          display: 'flex',
          flexDirection: 'column',
          gap: '64px'
          // 페이지의 기본 gap인 64px를 설정하고, Header/NavBar에 화면이 가리지 않도록 위/아래로 margin을 64px 추가합니다.
          }}>


            {/* 샘플 페이지 */}
            <Container sx={{
              display: 'flex',
              flexFlow: 'row wrap'
            }}>
              <Link href='/login'>
                <EditButton buttonName="로그인" />
              </Link>
              <Link href='/signup'>
                <EditButton buttonName="회원가입" />
              </Link>
              <Link href='/promotion'>
                <EditButton buttonName="승급심사" />
              </Link>
              <Link href='/leave'>
                <EditButton buttonName="탈퇴" />
              </Link>
              <br />
              <Link href='/matching/before_participating'>
                <EditButton buttonName="[매칭] 매칭 전" />
              </Link>
              <Link href='/matching/main'>
                <EditButton buttonName="[매칭] 매칭 참여 전" />
              </Link>
              <Link href='/my_info'>
                <EditButton buttonName="내 정보" />
              </Link>
              <Link href='/agreement'>
                <EditButton buttonName="성사" />
              </Link>
            </Container>
            {/* 샘플페이지 */}

          <SwipeableEdgeDrawer clicked={showModal} setClicked={setShowModal}><h1>모달입니다.</h1><br/><br/></SwipeableEdgeDrawer>
          <button onClick={() => setShowModal(true)}>
            모달 후보
          </button>

          <h1>다음은 버튼입니다.</h1>
          <MainButton buttonName={buttonTitle + "MainButton"}/>
          <SubButton buttonName={buttonTitle + "SubButton"}/>
          <MainHalfButton buttonName={buttonTitle + "MainHalfButton"}/>
          <SubHalfButton buttonName={buttonTitle + "SubHalfButton"}/>
          <EditButton buttonName={buttonTitle + "EditButton"}/>
          <UploadButton buttonName={buttonTitle + "UploadButton"}/>
          <ListButton buttonName={buttonTitle + "ListButton"}/>
          <SubMiniButton buttonName={buttonTitle + "SubMiniButton"}/>
          <h1>다음은 입력창입니다.</h1>
          <DropdownInput buttonName={buttonTitle + 1}/>
          <TextInput buttonName={buttonTitle + 2}/>
          <LongText buttonName={buttonTitle + 3}/>
          <Range buttonName={buttonTitle + 4}/>
          <h1>다음은 체크박스입니다.</h1>
          <DefaultCheckbox buttonName={buttonTitle + 1}/>
          <CheckedCheckbox buttonName={buttonTitle + 2}/>
          <CancelCheckbox buttonName={buttonTitle + 3}/>
          <CancelCheckbox buttonName={buttonTitle + 4}/>
          <h1>다음은 토글입니다.</h1>
          <Toggle />
          <h1>다음은 알림입니다.</h1>
          <SuccessNotification />
          <DangerNotification />
          <InfoText />
          <DangerMiniNotification />
          <Certification />
          <h1>다음은 단계입니다.</h1>
          <StepsToggle />
          <RatingToggle />
          <SwipeableEdgeDrawer />
          <Footer />
          <h1>다음은 하단바입니다.</h1>
        </Container>
        
        
      </Container>
      
      </Container>
      <NavBar />
    </ThemeProvider>
  );
}
