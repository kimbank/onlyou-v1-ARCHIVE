"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Button, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function IntutiveOrRealistic({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState("");
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    if (value == "") { setData({ ...data, intutive_or_realistic: null }); setSub(!sub); }
    else { setData({ ...data, intutive_or_realistic: value }); setSub(!sub); }
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
      setData({ ...data, intutive_or_realistic_w: newWeight });
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
      <Typography className="heading2">직관/현실</Typography>
      <Divider />
      <Typography className="basic-gray">
        원하는 상대방의 직관/현실 정도를 모두 선택해주세요.
      </Typography>


      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          overflowX: "scroll",
        }}
      >
        <Button variant="contained" sx={sx2} onClick={() => handleChange('-2')} color={value.split(',').includes('-2') ? "primary" : "secondary"} />
        <Button variant="contained" sx={sx1} onClick={() => handleChange('-1')} color={value.split(',').includes('-1') ? "primary" : "secondary"} />
        <Button variant="contained" sx={sx0} onClick={() => handleChange('0')} color={value.split(',').includes('0') ? "primary" : "secondary"} />
        <Button variant="contained" sx={sx1} onClick={() => handleChange('1')} color={value.split(',').includes('1') ? "primary" : "secondary"} />
        <Button variant="contained" sx={sx2} onClick={() => handleChange('2')} color={value.split(',').includes('2') ? "primary" : "secondary"} />
      </Container>
      <Container disableGutters sx={{display:'flex',justifyContent:'space-between', maxWidth:'280px', alignContent:'flex-end'}}>
        <Typography className="basic-gray">매우 직관</Typography>
        <Typography className="basic-gray">매우 현실</Typography>
      </Container>


      <WeightPannel weight={weight} handleWeight={handleWeight} />
    </Container>
  );
}

const sx0 = {
  borderRadius: "28px",

  minHeight: "35px",
  minWidth: "35px",

  border: 2,
  borderColor: "#666563",
  padding: 0,
  boxShadow: "none",
}
const sx1 = {
  borderRadius: "28px",

  minHeight: "45px",
  minWidth: "45px",

  border: 2,
  borderColor: "#666563",
  padding: 0,
  boxShadow: "none",
}
const sx2 = {
  borderRadius: "28px",

  minHeight: "55px",
  minWidth: "55px",

  border: 2,
  borderColor: "#666563",
  padding: 0,
  boxShadow: "none",
}