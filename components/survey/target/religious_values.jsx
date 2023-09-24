"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Button, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function ReligiousValues({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState("");
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    if (value == "") { setData({ ...data, religious_values: null }); setSub(!sub); }
    else { setData({ ...data, religious_values: value }); setSub(!sub); }
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
      setData({ ...data, religious_values_w: newWeight });
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
    <Typography className="heading2">종교의 중요성</Typography>
    <Divider />
    <Typography className="basic-gray">
      원하는 상대의 종교의 중요성을 선택해주세요.
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
      <Button variant="contained" sx={sx} onClick={() => handleChange('0')} color={value.split(',').includes('0') ? "primary" : "secondary"}>인생에서 종교는 중요하지 않아요</Button>
      <Button variant="contained" sx={sx} onClick={() => handleChange('1')} color={value.split(',').includes('1') ? "primary" : "secondary"}>종교가 중요하긴 하지만, 가장 중요한 요소는 아니에요</Button>
      <Button variant="contained" sx={sx} onClick={() => handleChange('2')} color={value.split(',').includes('2') ? "primary" : "secondary"}>종교가 매우 중요해요</Button>
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
