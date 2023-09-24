"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Button, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function AthleticLife({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState(null);
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    setData({ ...data, athletic_life: value });
    setSub(!sub);
  }, [value]);

  const handleChange = (newValue) => {
    if (newValue == value) {
      setValue(null)
      setData({ ...data, athletic_life: null });
    }
    else if (value == null) {
      setValue(newValue)
      setData({ ...data, athletic_life: newValue });
    } else {
      setValue(newValue);
    }
    setSub(!sub);
    // setData({ ...data, education: value });
  };

  const handleWeight = (newWeight) => {
    if (newWeight == weight) {
      handleWeight(null);
    }
    else {
      setWeight(newWeight);
      setData({ ...data,  athletic_life_w: newWeight });
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
      <Typography className="heading2">운동 생활</Typography>
      <Divider />
      <Typography className="basic-gray">
        원하는 상대방의 운동생활을 선택해주세요.
      </Typography>


      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "8px",
          overflowX: "scroll",
        }}
      >
        <Button variant="contained" sx={sx} onClick={() => handleChange(0)} color={value == 0 ? "primary" : "secondary"}>중요성엔 공감하지만 규칙적으로 하고 있진 않다</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange(1)} color={value == 1 ? "primary" : "secondary"}>운동을 규칙적으로 꾸준히 한다</Button>
      </Container>


      <WeightPannel weight={weight} handleWeight={handleWeight} />
    </Container>
  );
}

const sx = {
  borderRadius: "8px",
  minHeight: "35px",
  minWidth: "40px",
  boxShadow: "none",
}
