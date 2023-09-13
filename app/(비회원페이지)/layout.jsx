'use client';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";

import { GuestHeader } from '@/components/Header';
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
      <GuestHeader />
      <Container sx={{ marginTop: '128px', marginBottom: '80px' }}>
        {children}
      </Container>
    </ThemeProvider>
  )
}
