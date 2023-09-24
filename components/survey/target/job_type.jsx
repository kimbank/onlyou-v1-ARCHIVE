"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Button, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function JobType({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState("");
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    if (value == "") { setData({ ...data, job_type: null }); setSub(!sub); }
    else { setData({ ...data, job_type: value }); setSub(!sub); }
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
      setData({ ...data, job_type_w: newWeight });
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
      <Typography className="heading2">직장 유형</Typography>
      <Divider />
      <Typography className="basic-gray">
        <strong>꺼리는</strong> 상대방의 직장 유형을 모두 선택해주세요.
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
        <Button variant="contained" sx={sx} onClick={() => handleChange('0')} color={value.split(',').includes('0') ? "primary" : "secondary"}>대학생</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('1')} color={value.split(',').includes('1') ? "primary" : "secondary"}>대학원생</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('2')} color={value.split(',').includes('2') ? "primary" : "secondary"}>중견기업</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('3')} color={value.split(',').includes('3') ? "primary" : "secondary"}>중소기업</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('4')} color={value.split(',').includes('4') ? "primary" : "secondary"}>스타트업</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('5')} color={value.split(',').includes('5') ? "primary" : "secondary"}>자영업자</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('6')} color={value.split(',').includes('6') ? "primary" : "secondary"}>프리랜서</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('7')} color={value.split(',').includes('7') ? "primary" : "secondary"}>경기 전문직</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('8')} color={value.split(',').includes('8') ? "primary" : "secondary"}>공무원</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('9')} color={value.split(',').includes('9') ? "primary" : "secondary"}>대기업</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('10')} color={value.split(',').includes('10') ? "primary" : "secondary"}>법인 대표</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange('11')} color={value.split(',').includes('11') ? "primary" : "secondary"}>기타</Button>
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
