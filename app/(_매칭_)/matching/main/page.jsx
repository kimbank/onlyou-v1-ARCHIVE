'use client'

import Container from '@mui/material/Container';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
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
      <TimeInfo alertMessage="선택 마감까지 19:50" />
    </Container>);
}

// 매칭 수락과 거절을 선택하는 버튼 모음입니다.
// 수락이나 거절을 했을 때, 한 번 더 확인하는 모달이 표시됩니다.
// issue: 아직 디버깅을 하지 않아 제대로 작동하는지 확인이 불가능 합니다.
function AcceptItem({ setAcceptFinal }) {
  const [showModal, setShowModal] = useState(false);
  const [acceptTemporary, setAcceptTemporary] = useState(null); 

  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: "8px",
    }}>
      <CheckedCheckbox buttonName='taykim01님 수락하기' onClick={() => {setShowModal(true); setAcceptTemporary('accepted');}} />
      <DefaultCheckbox buttonName='거절하기' onClick={() => {setShowModal(true); setAcceptTemporary('rejected');}} />

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
          <MainButton buttonName='선택하기' onClick={() => { setShowModal(false); setAcceptFinal(acceptTemporary) }} />
        </Container>
      </Modal>
    </Container>);
}

// 메칭에 성공했을 때 표시되는 버튼 모음입니다.
// kakao id를 보여주고, 프로필 페이지로 넘어가는 버튼이 있습니다.
// issue: 프로필 페이지로 넘어가도록 구현해야 합니다.
// issue: kakao id를 받아와야 합니다.
function SuccessItem({ people }) {

  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: "8px",
    }}>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: "8px",
      }}>
        <img src='/kakao_mini_icon.svg' style={{ width: '32px', height: '32px', wordBreak: "break-all" }} />
        <div className='basic' style={{ marginTop: "auto", marginBottom: "auto" }}>{people["name"]}</div>
        <TimeInfo alertMessage="공개 마감 19:50" />
      </Container>
      {/* issue: 프로필 페이지로 넘어가도록 구현해야 합니다. */}
      <SubMiniFullButton buttonName='프로필 보기' onClick={() => { }} />
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
  // alert를 보여주는 state입니다.
  // true일 때 alert가 보여집니다.
  const [alertVisible, setAlertVisible] = useState(false);
  // user 정보를 저장하는 state입니다.
  // user 정보를 받아오지 못했을 때 null 값을 가집니다.
  const [user, setUser] = useState(null);
  // 자신의 최종 수락 여부를 저장하는 state입니다.
  // accepted, rejected, null 세 가지 값을 가질 수 있습니다.
  const [acceptFinal, setAcceptFinal] = useState(null);
  // 상대의 수락 여부를 저장하는 state입니다.
  // accepted, rejected, null 세 가지 값을 가질 수 있습니다.
  // issue: 상대의 수락 여부를 나타낸 예시입니다. 실제 상대의 수락 여부는 서버에서 받아와야 합니다.
  const [acceptFromOther, setAcceptFromOther] = useState(null);

  // user 정보를 받았다는 가정하에 작성한 코드입니다. 
  // 실제로는 user 정보를 받아오는 코드를 작성해야 합니다.
  const sample_user = {
    "name": "사용자",
    "mobile_number": "01012345678",
    "gender": 0,
    "nickname": "온리유",
    "date_birth": "2023-08-21",
  }
  useEffect(() => {
    setUser(sample_user);
  }, []);

  // 자신의 수락 여부와 상대의 수락 여부를 비교하여 최종 결정을 합니다.
  // issue: 상대의 수락 여부를 나타낸 예시입니다. 실제 상대의 수락 여부는 서버에서 받아와야 합니다.
  useEffect(() => {
    if (acceptFinal === 'rejected') {
      setUser(null);
      // issue: 추가로 상대에게 거절을 알리는 통신을 보내야 합니다.
    } else if (acceptFinal === 'accepted') {
      if (acceptFromOther === 'rejected') {
        setUser(null);
      } else if (acceptFromOther === 'accepted') {
        // 매칭이 성사되었을 때, 매칭 성사 페이지로 이동합니다.

      } else {
        setAlertVisible(true);
      }
    } else {
      setAcceptFinal(null);
    }
  }, [acceptFinal, acceptFromOther]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ErrorModal />
      <Container sx={{ marginBottom: '80px', }}>
        {/* 준비중을 알려주는 알람입니다. */}
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

            <AuthenticationItem />
            <ProfileItem people={user} />
            <TimeItem />

            <Container disableGutters sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: "8px",
            }}>

              {/* 상대방의 수락 여부에 따라 다른 버튼이 표시됩니다. */}
              {(acceptFinal === 'accepted') && (acceptFromOther === 'accepted') && <SuccessItem people={user} />}
              {/* '선택'창의 수락과 거절, 프로필 상세보기 버튼 모음입니다. */}
              {(user !== null) && (acceptFinal === null) && <AcceptItem setAcceptFinal={setAcceptFinal} />}
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
