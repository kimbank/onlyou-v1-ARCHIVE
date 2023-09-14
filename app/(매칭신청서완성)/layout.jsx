'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MyInfoHeader } from '@/components/Header';
import { MainButton } from '@/components/Button';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import Modal from '@/components/modal'
import { useState } from 'react';

// export const metadata = {
//   title: '온리유',
//   description: '!!!온리유 회원 페이지 설명',
// }

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


export default function RootLayout({ children }) {
  const [clicked, setClicked] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <MyInfoHeader onClick={() => setClicked(true)} />
      <Container disableGutters sx={{ marginTop: '80px', marginBottom: '32px', padding: '0 32px', }}>
        {children}
      </Container>
      <Modal clicked={clicked} setClicked={setClicked}>
        <Typography className="heading2" style={{marginRight: '72px'}}>매칭 신청서 작성을 중단하시겠어요?</Typography>
        <Typography className="basic">모든 진행 상황은 저장되며, 이어 작성하실 수 있습니다.</Typography>
        <Link href="/my_info">
          <MainButton buttonName='나중에 이어 작성하기' />
        </Link>
      </Modal>
    </ThemeProvider>
  )
}
