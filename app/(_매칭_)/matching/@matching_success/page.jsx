'use client'
import React, { useState } from 'react';
import { Container } from "@mui/material";
import { DangerNotification } from '@/components/Notification';
import { MainButton, MainMiniButton, SubMiniButton, SubMiniFullButton } from '@/components/Button';
import { CheckedCheckbox, DefaultCheckbox } from '@/components/Checkbox';
import Modal from '@/components/shared/modal';
import { Certification, TimeInfo } from '@/components/Notification';



function Title() {
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div className='heading2'>축하드려요! 🎉</div>
      <div className='basic' style={{ color: '#666563' }}>서로가 서로를 선택하여 연락처가 공개되었어요. <br />카카오톡 아이디를 통해 인사를 건네보세요!</div>
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

function OtherItem({ people, setAcceptFinal }) {

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
      <SubMiniFullButton buttonName='프로필 보기' onClick={() => { }} />
    </Container>);
}

// 매칭 선택 상태
export default function Success() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [acceptFinal, setAcceptFinal] = useState(false);

  const user = {
    "name": "사용자0123456789",
    "mobile_number": "01012345678",
    "gender": 0,
    "nickname": "온리유",
    "date_birth": "2023-08-21",
  }

  return (
    <Container sx={{ marginBottom: '80px', }}>
      {/* 준비중을 알려주는 알람입니다. */}
      <DangerNotification alertMessage='준비중입니다.' visible={alertVisible} setVisible={setAlertVisible} />
      <Container disableGutters sx={{
        marginTop: '128px',
        display: 'flex',
        flexDirection: 'column',
        gap: '64px'
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
          <OtherItem people={user} setAcceptFinal={setAcceptFinal} />
        </Container>

      </Container>
    </Container>
  );
}
