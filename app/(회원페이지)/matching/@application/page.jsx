'use client'

import Container from '@mui/material/Container';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

import { EditButton, ListButton, MainButton, MainHalfButton, SubButton, SubHalfButton, SubMiniButton, UploadButton } from '@/components/Button';
import { SuccessNotification, DangerNotification, InfoText, DangerMiniNotification, Certification } from '@/components/Notification';
import { DropdownInput, LongText, TextInput, Range, TextField } from '@/components/Input';
import { StepsToggle, RatingToggle } from '@/components/Steps';
import SwipeableEdgeDrawer from '@/components/Popup';
import NavBar from '@/components/NavBar'

import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";

import { useErrorModal } from './error-modal';

import Link from 'next/link'

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

export default function Home() {
  const [alertVisible, setAlertVisible] = useState(false);
  const { ErrorModal, setShowErrorModal } = useErrorModal();

  function hadleLogin() {
    setShowErrorModal(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ErrorModal />
      <Container sx={{ marginBottom: '80px', }}>
        <DangerNotification alertMessage='준비중입니다.' visible={alertVisible} setVisible={setAlertVisible} />


        <Container disableGutters sx={{
          marginTop: '128px',
          display: 'flex',
          flexDirection: 'column',
          gap: '64px'
          // 페이지의 기본 gap인 64px를 설정하고, Header/NavBar에 화면이 가리지 않도록 위/아래로 margin을 64px 추가합니다.
        }}>
          <Container disableGutters sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div className='heading2'>인연을 찾아드릴게요!</div>
            <div className='basic' style={{ color: '#666563' }}>매칭에 참여하고, 인연을 만나보세요!</div>
            <InfoText alertMessage="약 80명의 상대가 인연을 기다리고 있어요!" />
          </Container>




          <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            // 버튼을 담는 컨테이너는 <div> 태그로 감싼 후, 다시 <Container> 태그로 감싸고, 그 안에 버튼을 넣어야 합니다.
            // 버튼이 맨 아래 있도록 하기 위해 display는 absolute로 합니다.
          }}>
            <Link href= "/before_matching">
              <MainButton buttonName='신청서 이어 완성하기' />
            </Link>

          </Container>
          {/* <Error title="앗, 가입되지 않은 전화번호에요." content="온리유에 가입하거나, 다른 번호로 로그인해주세요!" isError={isError} /> */}
        </Container>

        <NavBar />
      </Container>
    </ThemeProvider>
  );
}
