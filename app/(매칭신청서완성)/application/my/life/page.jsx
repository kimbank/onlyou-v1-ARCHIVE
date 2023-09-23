"use client";

import React from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { DropdownInput } from "@/components/Input";
import { MainButton, SubMiniButton, SubButton } from "@/components/Button";

import SmokingHistory from "@/components/survey/my/smoking_history";
import Drinking from "@/components/survey/my/drinking";
import OwnedCar from "@/components/survey/my/owned_car";

const Value = () => {
  const [data, setData] = React.useState(LifeData);

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
      <Drinking data={data} setData={setData} />
      <OwnedCar data={data} setData={setData} />
      {/* <Interests data={data} setData={setData} /> */}
      {/* <NumberRelationships data={data} setData={setData} /> */}
      {/* <AthleticLife data={data} setData={setData} /> */}
      {/* <PetAnimal data={data} setData={setData} /> */}
      {/* <Religion data={data} setData={setData} /> */}

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
