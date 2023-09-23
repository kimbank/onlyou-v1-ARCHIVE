"use client";

import React from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { DropdownInput } from "@/components/Input";
import { MainButton, SubMiniButton, SubButton } from "@/components/Button";

import SmokingHistory from "@/components/survey/my/smoking_history";

const Value = () => {
  const [data, setData] = React.useState(LifeData);

  // const editButtonNameGrop = [
  //   "여행",
  //   "운동/스포츠",
  //   "책",
  //   "직무",
  //   "전시회",
  //   "외국/언어",
  //   "영화/넷플릭스",
  //   "공예/만들기",
  //   "음악/악기",
  //   "콘서트/공연/뮤지컬",
  //   "재태크",
  //   "댄스/무용",
  //   "전시회",
  //   "봉사",
  //   "사교/인맥",
  //   "차/오토바이",
  //   "반려동물",
  //   "게임/오락",
  //   "요리",
  //   "사진/영상",
  //   "맛집/카페",
  //   "에니메이션/만화",
  //   "쇼핑/패션",
  // ];

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "64px",
      }}
    >
      <button onClick={() => console.log(data)}>정보 보기</button>



      <Typography className="heading2"> 생활 정보 입력하기 </Typography>



      <SmokingHistory data={data} setData={setData} />
      {/* <Drinking data={data} setData={setData} /> */}
      {/* <OwnedCar data={data} setData={setData} /> */}
      {/* <Interests data={data} setData={setData} /> */}
      {/* <NumberRelationships data={data} setData={setData} /> */}
      {/* <AthleticLife data={data} setData={setData} /> */}
      {/* <PetAnimal data={data} setData={setData} /> */}
      {/* <Religion data={data} setData={setData} /> */}





      {/* <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <DropdownInput buttonName={"흡연 경력"} />
        <DropdownInput buttonName={"음주 생활"} />
        <DropdownInput buttonName={"자차 보유"} />
        <Typography className="input-title">관심사(모두 선택)</Typography>
        <Container
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            gap: "8px",
          }}
        >
          {editButtonNameGrop.map((buttonName) => (
            <SubMiniButton buttonName={buttonName} />
          ))}
        </Container>
        <DropdownInput buttonName={"연애 횟수"} />
        <DropdownInput buttonName={"운동 생활"} />
        <DropdownInput buttonName={"반려동물"} />
        <DropdownInput buttonName={"종교"} />
      </Container> */}
      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Link href={`application/my/character`}>
          <MainButton buttonName="다음 단계" />
        </Link>
        <Link href={`application/my/value`}>
          <SubButton buttonName="이전 단계" />
        </Link>
      </Container>
    </Container>
  );
};

export default Value;

const LifeData = {
  smoking_history: null,
  drinking_life: null,
  owned_car: null,
  interests: null,
  number_relationships: null,
  athletic_life: null,
  pet_animal: null,
  religion: null,
};
