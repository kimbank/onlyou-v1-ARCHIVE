import './globals.css';
import CssBaseline from '@mui/material/CssBaseline';

export const metadata = {
  title: '온리유',
  description: '!!!온리유 설명',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko-KR">
      <body>
        <div style={{'maxWidth': '720px', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
          <CssBaseline>
            {children}
          </CssBaseline>
        </div>
      </body>
    </html>
  )
}
