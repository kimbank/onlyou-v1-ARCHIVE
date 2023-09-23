"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Button, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function Divorce({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState(null);
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    setData({ ...data, divorce: value });
    setSub(!sub);
  }, [value]);

  const handleChange = (newValue) => {
    if (newValue == value) {
      setValue(null)
      setData({ ...data, divorce: null });
    }
    else if (value == null) {
      setValue(newValue)
      setData({ ...data, divorce: newValue });
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
      setData({ ...data,  divorce_w: newWeight });
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
    <Typography className="heading2">돌싱 여부</Typography>
    <Divider />
    <Typography className="basic-gray">
      원하는 상대방의 돌싱 여부를 선택해주세요.
    </Typography>


    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <Button variant="contained" sx={sx} onClick={() => handleChange(0)} color={value == 0 ? "primary" : "secondary"}>미혼</Button>
      <Button variant="contained" sx={sx} onClick={() => handleChange(1)} color={value == 1 ? "primary" : "secondary"}>돌싱</Button>
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
