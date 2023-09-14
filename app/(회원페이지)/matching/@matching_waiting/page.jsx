'use client'
import React, { useState } from 'react';
import { Container } from "@mui/material";
import { DangerNotification } from '@/components/Notification';
import { SuccessNotification, Certification, TimeInfo } from '@/components/Notification';



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
      <TimeInfo alertMessage="상대의 선택 마감까지 19:50" />
    </Container>);
}

// 매칭 선택 상태
export default function Waiting() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(true);

  const user = {
    "name": "사용자",
    "mobile_number": "01012345678",
    "gender": 0,
    "nickname": "온리유",
    "date_birth": "2023-08-21",
  }

  return (
    <Container sx={{ marginBottom: '80px', }}>
      {/* 준비중을 알려주는 알람입니다. */}
      <DangerNotification alertMessage='준비중입니다.' visible={alertVisible} setVisible={setAlertVisible} />
      {/* 매칭이 완료되었을 때 보여주는 알람입니다. */}
      <SuccessNotification alertMessage="곧 결과를 알려드릴게요!" visible={successVisible} setVisible={setSuccessVisible}></SuccessNotification>
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
          <TimeItem />
        </Container>

      </Container>
    </Container>
  );
}
