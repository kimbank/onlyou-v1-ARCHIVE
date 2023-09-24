'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";
import { Typography, Backdrop, CircularProgress } from "@mui/material";

import { MainButton, SubButton } from '@/components/Button';
import { DangerNotification } from '@/components/Notification';

import { DropDownInput } from '@/components/survey/my/drop_down_input';

import axios from 'axios';

function canProceedToNextPage(data) {
  for (const key in data) {
    if (data[key] === null || data[key] === '') {
      return false; // 하나라도 null 값이 있으면 다음 페이지로 못감
    }
  }
  return true; // 모든 값이 null이 아니면 다음 페이지로 갈 수 있음
}

const Appearance = () => {
  const [data, setData] = React.useState(AppearanceData);
  const [dangerMessage, setDangerMessage] = React.useState('');
  const [dangerVisible, setDangerVisible] = React.useState(false);
  const [open, setOpen] = React.useState(true);  // 데이터를 불러오는 중인지 여부
  const canProceed = canProceedToNextPage(data); // 다음 페이지로 갈 수 있는지 여부

  const DATA_PATH = '/api/application/my/appearance';

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
            window.location.href = '/application/my/other';
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
        {/* <button onClick={() => console.log(data)}>정보 보기</button> */}
        <Container disableGutters sx={{display:'flex', flexDirection:'column', gap:'8px'}}>
          <Typography className="heading2">외모 정보 입력하기 </Typography>
          <Typography className="basic-gray">본인의 가치관 정보를 입력해주세요.</Typography>
        </Container>

        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}>
          <DropDownInput data={data} setData={setData} data_name={"animal_image"} title={"동물 이미지"} options={["강아지", "고양이", "여우", "곰돌이", "햄스터", "공룡"]} />
          <DropDownInput data={data} setData={setData} data_name={"double_eyelid"} title={"쌍꺼풀"} options={["무쌍", "속쌍", "유쌍"]} />
          <DropDownInput data={data} setData={setData} data_name={"face_shape"} title={"얼굴상"} options={["순진한 얼굴상", "진지한 얼굴상"]} />
          <DropDownInput data={data} setData={setData} data_name={"body_type"} title={"체형"} options={["슬림", "표준", "통통", "탄탄", "근육근육"]} />
          <DropDownInput data={data} setData={setData} data_name={"skin_tone"} title={"피부톤"} options={["하얀 편", "보통", "어두운 편"]} />
          <DropDownInput data={data} setData={setData} data_name={"tattoo"} title={"문신 유무"} options={["없음", "있음"]} />
          <DropDownInput data={data} setData={setData} data_name={"fashion_style"} title={"패션 스타일"} options={["캐주얼", "댄디", "스트릿", "아메카지", "포멀", "모던", "여성스러운"]} />
        </Container>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <MainButton buttonName="다음 단계" onClick={() => { handleNext() }} />
          <Link href={`application/my/dating_style`}>
            <SubButton buttonName="이전 단계" />
          </Link>
        </Container>
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

export default Appearance;

const AppearanceData = {
  animal_image: null,
  double_eyelid: null,
  face_shape: null,
  body_type: null,
  skin_tone: null,
  tattoo: null,
  fashion_style: null,
}