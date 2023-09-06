'use client'

import Container from '@mui/material/Container';
import { GuestHeader } from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

import axios from 'axios';

import { EditButton, ListButton, MainButton, MainHalfButton, SubButton, SubHalfButton, SubMiniButton, UploadButton } from '@/components/Button';
import { SuccessNotification, DangerNotification, InfoText, DangerMiniNotification, Certification } from '@/components/Notification';
import { DropdownInput, LongText, TextInput, Range, TextField } from '@/components/Input';
import { StepsToggle, RatingToggle } from '@/components/Steps';
import SwipeableEdgeDrawer from '@/components/Popup';
import NavBar from '@/components/NavBar'

import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";

import { useErrorModal } from './error-modal';

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

export default function Home() {
  const [mobile_number, setMobileNumber] = useState('');
  const [mobile_number_disabled, setMobileNumberDisabled] = useState(false);
  const [auth_code, setAuthCode] = useState('');
  const [auth_code_disabled, setAuthCodeDisabled] = useState(true);

  const [dangerVisible, setDangerVisible] = useState(false);
  const [dangerMessage, setDangerMessage] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [sendMessage, setSendMessage] = useState('인증번호 전송');
  const [sendDisabled, setSendDisabled] = useState(false);

  const { ErrorModal, setShowErrorModal } = useErrorModal();
  

  function authTimer(left_seconds) {
    // 버튼 클릭하지 못하게하고 버튼 내부 글자가 타이머로 바뀌는 코드, 제한 시간이 지나면 다시 버튼을 클릭할 수 있게 하는 코드
    let remainSeconds = left_seconds;

    setMobileNumberDisabled(true);
    setAuthCodeDisabled(false);
    setSendMessage(left_seconds + '초');
    setSendDisabled(true);

    const interval = setInterval(function () {
      if (remainSeconds > 0) {
        setSendMessage(remainSeconds + '초');
        remainSeconds--;
      } else {
        setSendMessage('인증번호 전송');
        setAuthCodeDisabled(true);
        setSendDisabled(false);
        clearInterval(interval);
      }
    }, 1000);
  }

  async function handleAuthCode() {

    if (/^010[0-9]\d{7}$/.test(mobile_number)) {
      try {
        const res = await axios.post('/api/login', 
          {
            mobile_number: mobile_number,
            code: "000000"
          }
        );
        console.log(res);

        if (res.data.msg.split(' ')[0] === 'NEW_CODE_CREATED') {
          setSuccessMessage('6자리 인증번호가 전송되었습니다.');
          setSuccessVisible(true);

          authTimer(299);
        }
        else if (res.data.msg.split(' ')[0] === 'TIME_LEFT') {
          // 인증번호 전송 불가능하게 하고 시간 카운트 다운 하는 코드
          authTimer(Number(res.data.msg.split(' ')[1]) - 1);
        }
        else if (res.data.msg.split(' ')[0] === 'NOT_REGISTERED') {
          // 가입되지 않았으니 회원가입을 유도하는 코드
          setDangerMessage('가입되지 않았습니다. \n가입이 되었는데도 이 메시지가 보인다면 관리자에게 문의해주세요.');
          setDangerVisible(true);
        } else {
          throw new Error('UNKNOWN_ERROR');
        }
      } catch (e) {
        setDangerMessage('잠시 후 다시 시도해주세요. \n문제가 지속되면 관리자에게 문의해주세요.');
        setDangerVisible(true);
      }
    } else {
      setDangerMessage('휴대전화 번호를 정확히 입력해주세요. \n(ex. 01012345678)');
      setDangerVisible(true);
    }
  }

  async function handleLogin() {

    if (/^\d{6}$/.test(auth_code)) {
      try {
        const res = await axios.post('/api/login', 
          {
            mobile_number: mobile_number,
            code: auth_code
          }
        );

        if (res.data.msg.split(' ')[0] === "AUTH_SUCCESS") {
          setSuccessMessage('로그인에 성공했습니다.');
          setSuccessVisible(true);

          // 로그인 시키는 코드
        }
        else if (res.data.msg.split(' ')[0] === "TRY_LEFT") {
          setDangerMessage('인증번호가 일치하지 않습니다. \n남은 시도 횟수는 ' + res.data.msg.split(' ')[1] + '회 입니다.');
          setDangerVisible(true);
          // 인증번호 전송 불가능하게 하고 시간 카운트 다운 하는 코드
        }
        else if (res.data.msg.split(' ')[0] === "AUTH_EXPIRED") {
          setDangerMessage('인증 시간이 만료되었습니다. \n인증번호를 다시 전송해주세요.');
          setDangerVisible(true);
          // 인증번호 전송 가능하게 하는 코드
        }
        else if (res.data.msg.split(' ')[0] === "AUTH_BLOCKED") {
          setDangerMessage('5회 이상 인증 번호가 일치하지 않아 차단되었습니다. \n관리자에게 문의해주세요.');
          setDangerVisible(true);
        } else {
          throw new Error('UNKNOWN_ERROR');
        }
      } catch (e) {
        setDangerMessage('잠시 후 다시 시도해주세요. \n문제가 지속되면 관리자에게 문의해주세요.');
        setDangerVisible(true);
      }
    } else {

      if (!mobile_number_disabled) {
        setDangerMessage('인증번호 전송을 완료한 후 시도해주세요.');
        setDangerVisible(true);
      } else {
        setDangerMessage('6자리 인증번호를 정확히 입력해주세요. \n(ex. 123456)');
        setDangerVisible(true);
      }
    }

    // setShowErrorModal(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <GuestHeader />
      <ErrorModal />
      <Container sx={{ marginBottom: '80px', }}>
        <DangerNotification alertMessage={dangerMessage} visible={dangerVisible} setVisible={setDangerVisible} />
        <SuccessNotification alertMessage={successMessage} visible={successVisible} setVisible={setSuccessVisible} />
          
          
          <Container disableGutters sx={{
            marginTop: '128px',
            display: 'flex',
            flexDirection: 'column',
            gap: '64px'
            // 페이지의 기본 gap인 64px를 설정하고, Header/NavBar에 화면이 가리지 않도록 위/아래로 margin을 64px 추가합니다.
          }}>
            <Container disableGutters sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div className='heading2'>로그인하기</div>
              <div className='basic' style={{ color: '#666563' }}>로그인을 위해 전화번호를 인증해주세요.</div>
            </Container>


            <Container disableGutters sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'end'
            }}>
              <TextInput buttonName={"휴대전화 번호"} placeholder={"휴대전화 번호를 입력해주세요"} setValue={setMobileNumber} disabled={mobile_number_disabled} />
              <SubMiniButton buttonName={sendMessage} onClick={() => handleAuthCode()} disabled={sendDisabled} />
              <TextInput buttonName={"인증번호"} placeholder={auth_code_disabled ? "휴대전화 번호를 입력한 후 인증번호 전송을 해주세요" : "인증번호를 입력해주세요"} setValue={setAuthCode} disabled={auth_code_disabled} />
            </Container>


            <Container sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              // 버튼을 담는 컨테이너는 <div> 태그로 감싼 후, 다시 <Container> 태그로 감싸고, 그 안에 버튼을 넣어야 합니다.
              // 버튼이 맨 아래 있도록 하기 위해 display는 absolute로 합니다.
            }}>
              <MainButton buttonName='로그인하기' onClick={() => handleLogin()} />
              <SubButton buttonName='가입하기' />
            </Container>
            {/* <Error title="앗, 가입되지 않은 전화번호에요." content="온리유에 가입하거나, 다른 번호로 로그인해주세요!" isError={isError} /> */}
          </Container>
          
          <NavBar />
      </Container>
    </ThemeProvider>
  );
}
