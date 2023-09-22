"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Box, Slider, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function HeightRange({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState([150, 185]);
  const [weight, setWeight] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setData({ ...data, height_s: newValue[0], height_e: newValue[1] });
  };

  const handleWeight = (newWeight) => {
    if (newWeight == weight) {
      handleWeight(null);
    }
    else {
      setWeight(newWeight);
      setData({ ...data, height_s: value[0], height_e: value[1], height_w: newWeight });
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
      <Typography className="heading2">키</Typography>
      <Divider />

      <Container disableGutters sx={{display:'flex',flexDirection:'column',gap:'0px'}}>
      <Typography className="basic-gray">
        원하는 상대방의 키를 설정해주세요.
      </Typography>

      
        <Box sx={{ width: "100%", paddingX: '8px' }}>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={150}
            max={185}
          />
        </Box>
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
        >
          <Typography className="caption" variant="body2">{`${
            value[0] > 160 ? value[0] : value[0] + "-"
          }`}</Typography>
          <Typography className="caption" variant="body2">{`${
            value[1] < 185 ? value[1] : value[1] + "+"
          }`}</Typography>
        </Box>
      </Container>


      <WeightPannel weight={weight} handleWeight={handleWeight} />
    </Container>
  );
}
