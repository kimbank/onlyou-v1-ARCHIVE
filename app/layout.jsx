import './globals.css';

// import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

export const metadata = {
  title: '온리유',
  description: '!!!온리유 설명',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko-KR">
      <body>
        <CssBaseline>
          {children}
        </CssBaseline>
      </body>
    </html>
  )
}
