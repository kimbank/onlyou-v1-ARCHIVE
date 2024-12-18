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

const Character = () => {
  const [data, setData] = React.useState(CharacterData);
  const [dangerMessage, setDangerMessage] = React.useState('');
  const [dangerVisible, setDangerVisible] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const canProceed = canProceedToNextPage(data); // 다음 페이지로 갈 수 있는지 여부

  const DATA_PATH = '/api/application/my/personality';

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
            window.location.href = '/application/my/dating_style';
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
          <Typography className="heading2"> 내 성격 입력하기 </Typography>
          <Typography className="basic-gray">본인의 성격 정보를 입력해주세요.</Typography>
        </Container>

        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}>
          <DropDownInput data={data} setData={setData} data_name={"extrovert_or_introvert"} title={"외향/내향"} options={["매우 외향", "외향", "중립", "내향", "매우 내향"]} start_index={-2} />
          <DropDownInput data={data} setData={setData} data_name={"intutive_or_realistic"} title={"직관/현실"} options={["매우 직관적", "직관적", "중립", "현실적", "매우 현실적"]} start_index={-2} />
          <DropDownInput data={data} setData={setData} data_name={"emotional_or_rational"} title={"감성/이성"} options={["매우 감성적", "감성적", "중립", "이성적", "매우 이성적"]} start_index={-2} />
          <DropDownInput data={data} setData={setData} data_name={"impromptu_or_planned"} title={"즉흥/계획"} options={["매우 즉흥적", "즉흥적", "중립", "계획적", "매우 계획적"]} start_index={-2} />
          <DropDownInput data={data} setData={setData} data_name={"selfconfidence_or_careful"} title={"자기확신/신중"} options={["매우 자기확신", "자기확신", "중립", "신중", "매우 신중"]} start_index={-2} />
        </Container>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <MainButton buttonName="다음 단계" onClick={() => { handleNext() }} />
          <Link href={`application/my/life`}>
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

export default Character;

const CharacterData = {
  extrovert_or_introvert: null,
  intutive_or_realistic: null,
  emotional_or_rational: null,
  impromptu_or_planned: null,
  selfconfidence_or_careful: null,
}