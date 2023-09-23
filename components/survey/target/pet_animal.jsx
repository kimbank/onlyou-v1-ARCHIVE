"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Container, Button, Divider } from "@mui/material";

import WeightPannel from "./weight_pannel";

export default function PetAnimal({ data, setData, sub, setSub }) {
  const [value, setValue] = React.useState(null);
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    setData({ ...data, pet_animal: value });
    setSub(!sub);
  }, [value]);

  const handleChange = (newValue) => {
    if (newValue == value) {
      setValue(null)
      setData({ ...data, pet_animal: null });
    }
    else if (value == null) {
      setValue(newValue)
      setData({ ...data, pet_animal: newValue });
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
      setData({ ...data,  pet_animal_w: newWeight });
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
        원하는 상대방의 반려동물을 선택해주세요.
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
        <Button variant="contained" sx={sx} onClick={() => handleChange(0)} color={value == 0 ? "primary" : "secondary"}>키우기 어렵습니다</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange(1)} color={value == 1 ? "primary" : "secondary"}>키우지 않으나 반려동물에 거부감은 없습니다</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange(2)} color={value == 2 ? "primary" : "secondary"}>한 마리 키웁니다</Button>
        <Button variant="contained" sx={sx} onClick={() => handleChange(3)} color={value == 3 ? "primary" : "secondary"}>두 마리 이상 키웁니다</Button>
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
