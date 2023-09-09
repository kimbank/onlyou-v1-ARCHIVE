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
import { CheckedCheckbox, DefaultCheckbox } from '@/components/Checkbox';

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

function Title() {
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div className='heading2'>오늘의 인연이에요</div>
      <div className='basic' style={{ color: '#666563' }}>마감 전까지 선택을 완료해주세요!</div>
    </Container>);
}

function AuthenticationItem() {
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: '8px',
      flexDirection: 'row-reverse'
    }}>
      <Certification alertMessage="학력 인증" />
      <Certification alertMessage="직장 인증" />
    </Container>);
}

function ProfileItem() {
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div className='heading3'>taykim01</div>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px'
      }}>
        <div className='basic' style={{ color: '#666563' }}>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.13982 0C5.83521 0 4.76779 1.06875 4.76779 2.375V4.75H0.237203C0.0948814 4.75 0.0237203 4.845 0.0237203 4.96375V10.6875C0.0237203 11.3525 0.545568 11.875 1.20974 11.875H17.814C18.4782 11.875 19 11.3525 19 10.6875V4.96375C19 4.82125 18.9051 4.75 18.7865 4.75H14.2559V2.375C14.2559 1.06875 13.1885 0 11.8839 0L7.13982 0ZM7.13982 2.375H11.8839V4.75H7.13982V2.375ZM0.0237203 14.0362V18.7862C0.0237203 18.905 0.118602 19 0.237203 19H18.7628C18.8814 19 18.9763 18.905 18.9763 18.7862V14.0362C18.5968 14.1788 18.2172 14.25 17.7903 14.25H1.18602C0.759051 14.25 0.379526 14.155 0 14.0362H0.0237203Z" fill="#666563" />
          </svg>
        </div>
        <div className='basic' style={{ color: '#666563' }}>콩쥐/대표</div>
      </Container>

      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px'
      }}>
        <div className='basic' style={{ color: '#666563' }}>
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0L0 7.5H2.5V17.5H7.5V12.5H12.5V17.5H17.5V7.425L20 7.5L10 0Z" fill="#666563" />
          </svg>
        </div>
        <div className='basic' style={{ color: '#666563' }}>서울특별시 성북구</div>
      </Container>

      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px'
      }}>
        <div className='basic' style={{ color: '#666563' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C7.25 0 5 2.8 5 6.25C5 9.7 7.25 12.5 10 12.5C12.75 12.5 15 9.7 15 6.25C15 2.8 12.75 0 10 0ZM4.775 12.5C2.125 12.625 0 14.8 0 17.5V20H20V17.5C20 14.8 17.9 12.625 15.225 12.5C13.875 14.025 12.025 15 10 15C7.975 15 6.125 14.025 4.775 12.5Z" fill="#666563" />
          </svg>
        </div>
        <div className='basic' style={{ color: '#666563' }}>2001년생</div>
      </Container>

    </Container>);
}

function TimeItem() {
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'row',
      flexDirection: 'row-reverse'
    }}>
      <Certification alertMessage="선택 마감까지 19:50" />
    </Container>);
}

function KakaoItem() {
  return (
    <Container disableGutters sx={{
      flexDirection: 'row',
      gap: "8px",
      display: "flex"
    }}>
      <div className='basic'>icon자리</div>
      <div className='basic'>taykim01</div>
    </Container>);
}

function AcceptItem() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: "8px",
    }}>
      <CheckedCheckbox onClick={() => setShowModal(true)} buttonName='taykim01님 수락하기' />
      <DefaultCheckbox onClick={onReject} buttonName='거절하기' />
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <h1>.</h1>
        <br /><br /><br /><br /><br /><br />
        <h1>.</h1>
      </Modal>
    </Container>);
}

function InfoItem() {
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <InfoText title="경쟁률 높음" alertMessage="내 이상형을 원하는 동성이 많아요." />
      <InfoText title="매칭 난이도 높음" alertMessage="매칭까지는 약 7일 정도 예상되어요." />
    </Container>);
}

export default function Home() {
  const [alertVisible, setAlertVisible] = useState(false);
  const { ErrorModal, setShowErrorModal } = useErrorModal();

  function hadleLogin() {
    setShowErrorModal(true);
  }

  const user = {
    id: 1,
    name: 'taykim01',
    kakao: "taykim01",
    age: 20,
    birth: "2001-01-01",
    local: "서울특별시 성북구",
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

          {/* 제목과 부제목 입니다. */}
          <Title />

          {/* 매칭되어 나온 상대방 정보 및 버튼 모임입니다. 
              모두 주황 박스 안에 있습니다. */}
          <Container disableGutters sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: "24px",
            border: 1,
            padding: "24px",
            gap: '32px',
            borderColor: "#FFC999"
          }}>

            {/* 함수 호출 */}
            <AuthenticationItem />
            <ProfileItem />
            <TimeItem />

            <Container disableGutters sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: "8px",
            }}>

              {/* 함수 호출 */}
              <KakaoItem />
              <AcceptItem />

            </Container>
          </Container>
          {/* 매칭 전과 미성사 일 때 표시되는 알람입니다. */}
          <InfoItem />

        </Container>
        <NavBar />
      </Container>
    </ThemeProvider>
  );
}
