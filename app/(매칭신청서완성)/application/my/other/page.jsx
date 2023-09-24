'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";
import { Typography, Backdrop, CircularProgress } from '@mui/material';

import { MainButton, SubButton } from '@/components/Button';
import { DangerNotification } from '@/components/Notification';
import Modal from '@/components/Modal';

import { DropDownInput } from "@/components/survey/my/drop_down_input";
import { TextInput } from '@/components/survey/my/text_input';

import axios from 'axios';

function canProceedToNextPage(data) {
  for (const key in data) {
    if (data[key] === null || data[key] === '') {
      return false; // 하나라도 null 값이 있으면 다음 페이지로 못감
    }
  }
  return true; // 모든 값이 null이 아니면 다음 페이지로 갈 수 있음
}

const Other = () => {
  const [showModal, setShowModal] = useState(false); // 버튼을 눌렀을 때 모달창이 뜨는데, 모달창에 들어갈 내용을 적어놓은 것
  const [data, setData] = React.useState(OtherData);
  const [dangerMessage, setDangerMessage] = React.useState('');
  const [dangerVisible, setDangerVisible] = React.useState(false);
  const [open, setOpen] = React.useState(true);   // 데이터를 불러오는 중인지 여부
  const canProceed = canProceedToNextPage(data);  // 다음 페이지로 갈 수 있는지 여부

  const DATA_PATH = '/api/application/my/other';

  React.useEffect(() => {
    axios.get(DATA_PATH)
      .then((res) => {
        setData(res.data);
        setOpen(false);
      })
  }, []);

  const handleNext = () => {
    if (canProceed) {
      axios.patch(DATA_PATH, data)
        .then((res) => {
          if (res.status == 200) {
            setShowModal(true);
          } else {
            setDangerMessage('서버 오류가 발생했습니다.');
            setDangerVisible(true);
          }
        })
    } else {
      setDangerMessage('비어 있는 항목이 존재합니다');
      setDangerVisible(true);
    }
  }

  return (
    <>
      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "64px",
        }}
      >
        <Typography className='heading2'>기타 정보 입력하기</Typography>
        <Typography className="basic-gray">본인의 정보를 입력해주세요.</Typography>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}>
          <DropDownInput data={data} setData={setData} data_name={"information_before_meeting"} title={"만나기 전 정보"} options={[<>만나기 전에는 간단히<br />장소와 시간만 정하고 싶어요</>, <>만나기 전에도 카톡, 전화 등으로<br /> 서로를 알아가고 싶어요</>]} />
          <TextInput data={data} setData={setData} data_name={"kakao_id"} title={"카카오톡 아이디"} />
        </Container>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <Typography className='heading3'> 카카오톡 아이디 찾는 법 </Typography>
          <Typography className='basic' style={{ color: '#666563' }}>카카오톡 → 친구 추가 → 내 아이디 확인</Typography>
          <img src="/kakaotalk1.png" />
        </Container>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <Link href={`application/target`}>
            <MainButton buttonName="마침" onClick={() => { handleNext() }} />
          </Link>
          <Link href={`application/my/appearance`}>
            <SubButton buttonName="이전 단계" />
          </Link>
        </Container>
        <Modal clicked={showModal} setClicked={setShowModal}>
          <Typography className='heading2' style={{ marginRight: '56px' }}>본인 정보를<br />모두 입력해주셨어요!</Typography>
          <Typography className='basic' style={{ color: '#666563' }}>이제 회원님의 이상형을 말씀해주세요</Typography>
          {/* <Link > */}
          <MainButton buttonName='이상형 입력하기' onClick={() => setShowModal(false)} />
          {/* </Link> */}
        </Modal>
      </Container>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DangerNotification alertMessage={dangerMessage} visible={dangerVisible} setVisible={setDangerVisible} />
    </>
  );
}

export default Other;

const OtherData = {
  information_before_meeting: null,
  kakao_id: null,
}