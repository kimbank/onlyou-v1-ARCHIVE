"use client";

import React from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import { Typography, Backdrop, CircularProgress } from "@mui/material";

import Interests from "@/app/(매칭신청서완성)/application/my/life/interests";

import { MainButton, SubButton } from "@/components/Button";
import { DangerNotification } from '@/components/Notification';

import { DropDownInput } from "@/components/survey/my/drop_down_input";

import axios from 'axios';

function canProceedToNextPage(data) {
  for (const key in data) {
    if (data[key] === null || data[key] === "") {
      return false; // 하나라도 null 값이 있으면 다음 페이지로 못감
    }
  }
  return true; // 모든 값이 null이 아니면 다음 페이지로 갈 수 있음
}

const Life = () => {
  const [data, setData] = React.useState(LifeData);
  const [dangerMessage, setDangerMessage] = React.useState('');
  const [dangerVisible, setDangerVisible] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const canProceed = canProceedToNextPage(data); // 다음 페이지로 갈 수 있는지 여부

  const DATA_PATH = '/api/application/my/lifestyle';
  
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
            window.location.href = '/application/my/character';
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

        <Typography className="heading2"> 생활 정보 입력하기 </Typography>

        <Container disableGutters sx={{
          display: "flex",
          flexDirection: "column",
          gap: "32px"
        }}>
          <DropDownInput data={data} setData={setData} data_name={"smoking_history"} title={"흡연 경력"} options={["비흡연", "금연", "흡연"]} />
          <DropDownInput data={data} setData={setData} data_name={"drinking_life"} title={"음주 생활"} options={["전혀 마시지 않음", "거의 마시지 않음", "이따금 마심(한 달 1회 이상)", "종종 마심(주 1회 이상)", "자주 마심(주 2회 이상)"]} />
          <DropDownInput data={data} setData={setData} data_name={"owned_car"} title={"자차 유무"} options={["미소유", "소유"]} />
          <Interests data={data} setData={setData} title={"관심사(최대 3개 선택)"} />
          <DropDownInput data={data} setData={setData} data_name={"number_relationships"} title={"연애 횟수"} options={["없음", "1~2회", "3~4회", "5~6회", "7회 이상"]} />
          <DropDownInput data={data} setData={setData} data_name={"athletic_life"} title={"운동 생활"} options={[<>중요성엔 공감하지만,<br />규칙적으로 하고 있진 않다</>, "운동을 규칙적으로 꾸준히 한다"]} />
          <DropDownInput data={data} setData={setData} data_name={"pet_animal"} title={"반려동물"} options={["키우기 어렵습니다", <>키우지 않으나 반려동물에<br />거부감은 없습니다</>, "한 마리 키웁니다", "두 마리 이상 키웁니다."]} />
          <DropDownInput data={data} setData={setData} data_name={"religion"} title={"종교"} options={["무교", "기독교", "천주교", "불교", "원불교", "기타"]} />
        </Container>
        <Container
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <MainButton buttonName="다음 단계" onClick={() => { handleNext() }} />
          <Link href={`application/my/value`}>
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
};

export default Life;

const LifeData = {
  smoking_history: null,
  drinking_life: null,
  owned_car: null,
  interests: null, // issue: Interests 미정
  number_relationships: null,
  athletic_life: null,
  pet_animal: null,
  religion: null,
};
