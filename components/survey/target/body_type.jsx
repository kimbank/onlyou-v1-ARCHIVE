"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Button, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function BodyType({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState("");
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    if (value == "") { setData({ ...data, body_type: null }); setSub(!sub); }
    else { setData({ ...data, body_type: value }); setSub(!sub); }
  }, [value]);

  const handleChange = (newValue) => {
    if (newValue == value) {
      setValue("")
    }
    else if (value == "") {
      setValue(newValue)
    } else {
      let d = value.split(',').sort()
      if (d.includes(newValue)) {
        d.splice(d.indexOf(newValue), 1)
        setValue(d.join(','))
      } else {
        d.push(newValue)
        setValue(d.sort().join(','))
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
      setData({ ...data, body_type_w: newWeight });
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
      <Typography className="heading2">체형</Typography>
      <Divider />
      <Typography className="basic-gray">
        원하는 상대의 체형을 모두 선택해주세요.
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
        <Button variant="contained" sx={sx} onClick={() => handleChange('0')} color={value.split(',').includes('0') ? "primary" : "secondary"}>슬림</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('1')} color={value.split(',').includes('1') ? "primary" : "secondary"}>표준</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('2')} color={value.split(',').includes('2') ? "primary" : "secondary"}>통통</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('3')} color={value.split(',').includes('3') ? "primary" : "secondary"}>탄탄</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('4')} color={value.split(',').includes('4') ? "primary" : "secondary"}>근육근육</Button>
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
