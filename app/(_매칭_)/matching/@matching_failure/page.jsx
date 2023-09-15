'use client'
import React, { useEffect, useState } from 'react';
import { Container } from "@mui/material";
import { DangerNotification, InfoText } from '@/components/Notification';
import { Certification } from '@/components/Notification';



function Title() {
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div className='heading2'>서로의 선택이 엇갈렸어요</div>
      <div className='basic' style={{ color: '#666563' }}>고객님께서 다른 인연을 찾을 수 있도록, <br /> 최선을 다해 매칭해드릴게요.</div>
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
  if (people === null) {
    return (
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div className='heading3'>내 인연은 누구?</div>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px'
        }}>
          <img src='/bag.svg' style={{ width: '20px', height: '20px' }} />
          <div className='basic' style={{ color: '#666563' }}>?</div>
        </Container>

        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px'
        }}>
          <img src='/house.svg' style={{ width: '20px', height: '20px' }} />
          <div className='basic' style={{ color: '#666563' }}>?</div>
        </Container>

        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px'
        }}>
          <img src='/people.svg' style={{ width: '20px', height: '20px' }} />
          <div className='basic' style={{ color: '#666563' }}>?</div>
        </Container>

      </Container>);
  }
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

function InfoItem() {
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <InfoText title="경쟁률 높음" alertMessage="내 이상형을 원하는 동성이 많아요." shadow={false} />
      <InfoText title="매칭 난이도 높음" alertMessage="매칭까지는 약 7일 정도 예상되어요." shadow={false} />
    </Container>);
}

// 매칭 선택 상태
export default function Failure() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [acceptFinal, setAcceptFinal] = useState(false);
  const [user, setUser] = useState(null);

  // const new_user = {
  //   "name": "사용자0123456789",
  //   "mobile_number": "01012345678",
  //   "gender": 0,
  //   "nickname": "온리유",
  //   "date_birth": "2023-08-21",
  // }
  // useEffect(() => {
  //   setUser(new_user);
  // }, []);

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
        </Container>
        {/* 매칭 전과 미성사 일 때 표시되는 알람입니다. */}
        <InfoItem />
      </Container>
    </Container>
  );
}
