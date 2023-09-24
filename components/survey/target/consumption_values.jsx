"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Button, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function AthleticLife({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState(null);
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    setData({ ...data, consumption_values: value });
    setSub(!sub);
  }, [value]);

  const handleChange = (newValue) => {
    if (newValue == value) {
      setValue(null)
      setData({ ...data, consumption_values: null });
    }
    else if (value == null) {
      setValue(newValue)
      setData({ ...data, consumption_values: newValue });
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
      setData({ ...data,  consumption_values_w: newWeight });
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
      <Typography className="heading2">소비 가치관</Typography>
      <Divider />
      <Typography className="basic-gray">
        원하는 상대방의 소비 가치관을 선택해주세요.
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
        <Button variant="contained" sx={sx} onClick={() => handleChange(0)} color={value == 0 ? "primary" : "secondary"}>조금 부족하더라도 편안한 미래를 위해 절약하고 싶어요</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange(1)} color={value == 1 ? "primary" : "secondary"}>지금 아니면 못하는 것들에 충분히 투자하고 싶어요</Button>
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
