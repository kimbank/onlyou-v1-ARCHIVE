'use client'

import { Container, Typography } from '@mui/material';
import { InfoText } from "@/components/Notification";
import { MainButton } from "@/components/Button";


// 승급심사 제출이 필요한 상태
export default function PromotionRejected() {
  return (
    <Container disableGutters sx={{
      marginTop: '80px',
      display: 'flex',
      flexDirection: 'column',
      gap: '64px',
    }}>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <Typography className="heading2">승급심사 결과 반려되었습니다.</Typography>
      </Container>
      <MainButton buttonName="승급심사 재도전 하기" shadow={false} disabled />
    </Container>
  );
}
