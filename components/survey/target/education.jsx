"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Button, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function Education({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState("");
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    setData({ ...data, education: value });
  }, [value]);

  const handleChange = (newValue) => {
    if (newValue == value) {
      setValue("")
      setData({ ...data, education: null });
    }
    else if (value == "") {
      setValue(newValue)
      setData({ ...data, education: newValue });
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
    // setData({ ...data, education: value });
  };

  const handleWeight = (newWeight) => {
    if (newWeight == weight) {
      handleWeight(null);
    }
    else {
      setWeight(newWeight);
      setData({ ...data, education_w: newWeight });
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
    <Divider />
    <Typography className="basic-gray">
      원하는 상대방의 학력을 모두 선택해주세요.
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
      <Button variant="contained" sx={sx} onClick={() => handleChange('0')} color={value.split(',').includes('0') ? "primary" : "secondary"}>대학 미진학</Button>
      <Button variant="contained" sx={sx} onClick={() => handleChange('1')} color={value.split(',').includes('1') ? "primary" : "secondary"}>전문대</Button>
      <Button variant="contained" sx={sx} onClick={() => handleChange('2')} color={value.split(',').includes('2') ? "primary" : "secondary"}>일반 4년제 대학</Button>
      <Button variant="contained" sx={sx} onClick={() => handleChange('3')} color={value.split(',').includes('3') ? "primary" : "secondary"}>명문대</Button>
      <Button variant="contained" sx={sx} onClick={() => handleChange('4')} color={value.split(',').includes('4') ? "primary" : "secondary"}>일류대</Button>
    </Container>


      <WeightPannel weight={weight} handleWeight={handleWeight} />
    </Container>
  );
}

const sx = {
  borderRadius: "8px",
  height: "35px",
  minWidth: "40px",
  boxShadow: "none",
}
