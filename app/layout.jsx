import './globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import Hotjar from '@/utils/hostjar';

export const metadata = {
  title: '아무나 만나지 마세요, 연애정보회사 ONLYou',
  description: '꼭 맞는 사람만 신중하게 매칭하는 소개팅 서비스에요. 외모, 가치관, 연애스타일 등 42개의 항목과 그 중요도까지 설정할 수 있어요.',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="ko-KR">
      <body style={{'backgroundColor': '#FFE4CC'}}>
        <div style={{'maxWidth': '480px', 'minHeight': '100vh', 'marginLeft': 'auto', 'marginRight': 'auto', 'backgroundColor': '#fff', boxShadow:'0px 0px 32px -12px grey'}}>
          <br />
          <CssBaseline>
            {children}
          </CssBaseline>
          <br /><br />
        </div>
        { process.env.NEXT_PUBLIC_HOTJAR === 'true' && <Hotjar />}
      </body>
    </html>
  )
}
