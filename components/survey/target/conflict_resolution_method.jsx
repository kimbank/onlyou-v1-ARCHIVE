"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Button, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function PrefferedDating({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState(null);
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    setData({ ...data, conflict_resolution_method: value });
    setSub(!sub);
  }, [value]);

  const handleChange = (newValue) => {
    if (newValue == value) {
      setValue(null)
      setData({ ...data, conflict_resolution_method: null });
    }
    else if (value == null) {
      setValue(newValue)
      setData({ ...data, conflict_resolution_method: newValue });
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
      setData({ ...data,  conflict_resolution_method_w: newWeight });
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
      <Typography className="heading2">갈등 해결 방식</Typography>
      <Divider />
      <Typography className="basic-gray">
        원하는 상대방의 갈등 해결 방식을 선택해주세요.
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
        <Button variant="contained" sx={sx} onClick={() => handleChange(0)} color={value == 0 ? "primary" : "secondary"}>시간을 가지고 감정을 진정시킨 후 이야기하는 게 좋아요</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange(1)} color={value == 1 ? "primary" : "secondary"}>갈등은 바로 풀어야 해요</Button>
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
