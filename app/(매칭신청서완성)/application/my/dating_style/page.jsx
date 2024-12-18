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

const DatingStyle = () => {
  const [data, setData] = React.useState(DatingStyleData);
  const [dangerMessage, setDangerMessage] = React.useState('');
  const [dangerVisible, setDangerVisible] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const canProceed = canProceedToNextPage(data); // 다음 페이지로 갈 수 있는지 여부

  const DATA_PATH = '/api/application/my/dating_style';
  
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
            window.location.href = '/application/my/appearance';
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
          <Typography className="heading2"> 연애 스타일 입력하기 </Typography>
          <Typography className="basic-gray">본인의 가치관 정보를 입력해주세요.</Typography>
        </Container>

        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}>
          <DropDownInput data={data} setData={setData} data_name={"preffered_dating"} title={"선호 데이트"} options={["정적인 데이트 선호", "활동적인 데이트 선호"]} />
          <DropDownInput data={data} setData={setData} data_name={"preferred_contact_method"} title={"선호 연락 수단"} options={["전화를 더 선호해요", "카톡을 더 선호해요"]} />
          <DropDownInput data={data} setData={setData} data_name={"attractiveness_level"} title={"애교 레벨"} options={["애교가 많아요", "애교가 있어요", "중간이에요", "무뚝뚝해요", "많이 무뚝뚝해요"]} start_index={-2} />
          <DropDownInput data={data} setData={setData} data_name={"jealousy_level"} title={"질투 레벨"} options={["질투가 많아요", "질투가 있어요", "중간이에요", "그저그래요", "전혀 없어요"]} start_index={-2} />
          <DropDownInput data={data} setData={setData} data_name={"love_initiative"} title={"연애 주도성"} options={["보통 따라간다", "가끔 리드한다", "종종 리드한다", "주로 리드한다"]} />
          <DropDownInput data={data} setData={setData} data_name={"dating_frequency"} title={"데이트 빈도"} options={["일주일에 1번 미만", "일주일에 1번", "일주일에 2번", "일주일에 3번 이상"]} />
          <DropDownInput data={data} setData={setData} data_name={"contact_style"} title={"연락 스타일"} options={[<>시간 여유가 있고 <br />서로 생각 날 때 연락했으면 해요</>, <>바쁘더라도 연락은<br />최대한 자주 하는 게 좋아요</>]} />
          <DropDownInput data={data} setData={setData} data_name={"skinship"} title={"스킨십(혼전순결)"} options={[<>스킨십도 연애의<br />중요한 요소라고 생각해요</>, "결혼 전 관계는 원하지 않아요"]} />
          <DropDownInput data={data} setData={setData} data_name={"sns"} title={"소셜 미디어(SNS)"} options={[<>둘만의 사생활을<br />공개적으로 올리는 건 별로예요</>, <>좋아하는 사람과의 행복한 모습을<br />당당하게 올리는 게 좋아요</>]} />
          <DropDownInput data={data} setData={setData} data_name={"conflict_resolution_method"} title={"갈등 해결 방식"} options={[<>시간을 가져 감정을 진정시킨 후<br />이야기하는 게 좋아요</>, "갈등은 바로 풀어야 해요"]} />
        </Container>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <MainButton buttonName="다음 단계" onClick={() => { handleNext() }} />
          <Link href={`application/my/character`}>
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

export default DatingStyle;

const DatingStyleData = {
  preffered_dating: null,
  preferred_contact_method: null,
  attractiveness_level: null,
  jealousy_level: null,
  love_initiative: null,
  dating_frequency: null,
  contact_style: null,
  skinship: null,
  sns: null,
  conflict_resolution_method: null,
}