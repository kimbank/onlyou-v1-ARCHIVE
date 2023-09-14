'use client'

import Container from '@mui/material/Container';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { ReactComponent as CancelSelect } from '@/public/cancel_select.svg';

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

function ProfileItem({ people }) {
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div className='heading3'>{people["name"]}</div>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px'
      }}>
        <img src='/bag.svg' style={{ width: '20px', height: '20px' }} /> 
        <div className='basic' style={{ color: '#666563' }}>콩쥐/대표</div>
      </Container>

      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px'
      }}>
        <img src='/house.svg' style={{ width: '20px', height: '20px' }} /> 
        <div className='basic' style={{ color: '#666563' }}>서울특별시 성북구</div>
      </Container>

      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px'
      }}>
        <img src='/people.svg' style={{ width: '20px', height: '20px' }} /> 
        <div className='basic' style={{ color: '#666563' }}>{people["date_birth"].split('-')[0]}년생</div>
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

function AcceptItem({ setAcceptFinal }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: "8px",
    }}>
      <CheckedCheckbox onClick={() => setShowModal(true)} buttonName='taykim01님 수락하기' />
      <DefaultCheckbox buttonName='거절하기' />
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          alignItems: 'left',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '48px',
          borderRadius: '20px',
        }}>
          <img src='/cancel_select.svg' style={{ width: '20px', height: '20px', marginLeft: "auto" }} onClick={() => { setShowModal(false) }} />
          <div className='heading3'>정말로 선택하시겠어요?</div>
          <div className='basic' style={{ color: '#666563' }}>한 번 선택하면 변경할 수 없습니다.</div>
          <MainButton buttonName='선택하기' onClick={() => { setShowModal(false); setAcceptFinal(true) }} />
        </Container>
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
  const [acceptFinal, setAcceptFinal] = useState(false);

  function hadleLogin() {
    setShowErrorModal(true);
  }

  const user = {
    "name": "사용자",
    "mobile_number": "01012345678",
    "gender": 0,
    "nickname": "온리유",
    "date_birth": "2023-08-21",
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
            <ProfileItem people={user} />
            <TimeItem />

            <Container disableGutters sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: "8px",
            }}>

              {/* 함수 호출 */}
              <KakaoItem />
              <AcceptItem setAcceptFinal={setAcceptFinal} />

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
