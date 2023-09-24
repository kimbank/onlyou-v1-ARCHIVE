"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Box, Slider, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function DateBirth({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState([1985, 2000]);
  const [weight, setWeight] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setData({ ...data, date_birth_s: newValue[0], date_birth_e: newValue[1] });
    setSub(!sub);
  };

  const handleWeight = (newWeight) => {
    if (newWeight == weight) {
      handleWeight(null);
    }
    else {
      setWeight(newWeight);
      setData({ ...data, date_birth_s: value[0], date_birth_e: value[1], date_birth_w: newWeight });
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
      <Typography className="heading2">나이</Typography>
      <Divider />

      <Container disableGutters sx={{display:'flex',flexDirection:'column',gap:'0px'}}>
      <Typography className="basic-gray">
        원하는 상대방의 출생 연도 구간을 설정해주세요.
      </Typography>

      
        <Box sx={{ width: "100%", paddingX: '8px' }}>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={1985}
            max={2000}
          />
        </Box>
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
        >
          <Typography className="caption" variant="body2">{`${
            value[0] > 1985 ? value[0] : value[0] + "-"
          }년생 부터`}</Typography>
          <Typography className="caption" variant="body2">{`${
            value[1] < 2000 ? value[1] : value[1] + "+"
          }년생 까지`}</Typography>
        </Box>
      </Container>


      <WeightPannel weight={weight} handleWeight={handleWeight} />
    </Container>
  );
}
