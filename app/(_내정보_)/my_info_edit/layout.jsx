'use client';

import Image from 'next/image';
import { MyInfoHeader } from '@/components/Header';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";

import Container from '@mui/material/Container';

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

function Menu() {

  return (
    <Container>
      menu
    </Container>
  )
}

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <MyInfoHeader />
      <Container disableGutters sx={{ marginTop: '80px', marginBottom: '32px', padding: '0 32px', }}>
        <Menu />
        {children}
      </Container>
    </ThemeProvider>
  )
}
