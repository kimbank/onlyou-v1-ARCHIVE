import './globals.css';
import CssBaseline from '@mui/material/CssBaseline';

export const metadata = {
  title: '온리유',
  description: '!!!온리유 설명',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko-KR">
      <body style={{'backgroundColor': '#FFE4CC'}}>
        <div style={{'maxWidth': '480px', 'minHeight': '100vh', 'marginLeft': 'auto', 'marginRight': 'auto', 'backgroundColor': '#fff'}}>
          <br />
          <CssBaseline>
            {children}
          </CssBaseline>
          <br /><br />
        </div>
      </body>
    </html>
  )
}
