"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Box, Slider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function Education({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState("");
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    axios.get("/api/application/target/education").then((res) => {
      if (res.data.education !== null && res.data.education_w !== null) {
        setValue(res.data.education);
        setWeight(res.data.education_w);
      }
    });
  }, []);

  useEffect(() => {
    setData({
      ...data,
      education: value,
      education_w: weight,
    });
    console.log('학력 저장 완료');
  }, [sub]);

  const handleWeight = (newWeight) => {
    if (newWeight == weight) {
      handleWeight(null);
    }
    else {
      setWeight(newWeight);
      setData({ ...data, height_w: newWeight });
    }
    setSub(!sub);
  };

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "8px",
      }}
    >
    <Typography className="heading2">학력</Typography>
    <Typography className="basic-gray">
      원하는 상대방의 학력을 모두 선택해주세요.
    </Typography>
      <WeightPannel weight={weight} handleWeight={handleWeight} />
    </Container>
  );
}
