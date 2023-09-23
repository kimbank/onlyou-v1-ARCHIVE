
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Button, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function consumption_values({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState("");
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    if (value == "") { setData({ ...data, consumption_values: null }); setSub(!sub); }
    else { setData({ ...data, consumption_values: value }); setSub(!sub); }
  }, [value]);

  const handleChange = (newValue) => {
    if (newValue == value) {
      setValue("")
    }
    else if (value == "") {
      setValue(newValue)
    } else {
      let d = value.split(',').sort(function(a,b) {return Number(a)-Number(b)})
      if (d.includes(newValue)) {
        d.splice(d.indexOf(newValue), 1)
        setValue(d.join(','))
      } else {
        d.push(newValue)
        setValue(d.sort(function(a,b) {return Number(a)-Number(b)}).join(','))
      }
    }
    setSub(!sub);
  };

  const handleWeight = (newWeight) => {
    if (newWeight == weight) {
      handleWeight(null);
    }
    else {
      setWeight(newWeight);
      setData({ ...data, consumption_values_w: newWeight });
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
      <Typography className="heading2">반려동물</Typography>
      <Divider />
      <Typography className="basic-gray">
        원하는 상대방의 반려동물 조건 선택해주세요.
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
        <Button variant="contained" sx={sx} onClick={() => handleChange('0')} color={value.split(',').includes('0') ? "primary" : "secondary"}>키우기 어렵습니다</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('1')} color={value.split(',').includes('1') ? "primary" : "secondary"}>키우지 않으나 반려동물에 거부감은 없습니다.</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('2')} color={value.split(',').includes('2') ? "primary" : "secondary"}>한마리 키웁니다</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('3')} color={value.split(',').includes('3') ? "primary" : "secondary"}>두마리 이상 키웁니다</Button>
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
