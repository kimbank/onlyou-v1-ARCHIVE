'use client';

import Image from 'next/image';
import { UserDetailHeader } from '@/components/Header';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";

import { Header } from '@/components/Header';
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

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <UserDetailHeader />
      <Container disableGutters sx={{ marginTop: '32px', marginBottom: '32px', padding: '0 32px', }}>
        {children}
      </Container>
    </ThemeProvider>
  )
}
