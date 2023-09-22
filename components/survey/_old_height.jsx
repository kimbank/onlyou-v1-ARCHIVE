"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Box, Slider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function HeightRange({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState([150, 185]);
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    axios.get("/api/application/target/height").then((res) => {
      if (
        res.data.height_s !== null &&
        res.data.height_e !== null &&
        res.data.height_w !== null
      ) {
        setValue([res.data.height_s, res.data.height_e]);
      }
    })
  }, []);

  useEffect(() => {
    setData({
      ...data,
      height_s: value[0],
      height_e: value[1],
      height_w: weight,
    });
    console.log('키 저장 완료');
    console.log(value);
  }, [sub]);


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
      <Typography className="heading2">키</Typography>
      <Typography className="basic-gray">
        원하는 상대방의 키를 설정해주세요.
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={160}
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

      <WeightPannel weight={weight} handleWeight={handleWeight} />
    </Container>
  );
}
