'use client'
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { InfoText, DangerNotification } from '@/components/Notification';
import { MainButton } from '@/components/Button';
import Link from 'next/link'

function Title() {
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div className='heading2'>인연을 찾아드릴게요!</div>
      <div className='basic' style={{ color: '#666563' }}>매칭에 참여하고, 인연을 만나보세요!</div>
      <InfoText alertMessage="약 80명의 상대가 인연을 기다리고 있어요!" shadow={false} />
    </Container>
  );
}

function ContinueButton() {
  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* issue: 링크를 아직 안걸었습니다. */}
      <Link href="">
        <MainButton buttonName='신청서 이어 완성하기' />
      </Link>
    </Container>
  );
}

// 매칭 대기중 상태
export default function Before() {
  const [alertVisible, setAlertVisible] = useState(false);

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
        <Title />
        <ContinueButton />
      </Container>
    </Container>
  );
}
