"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";


export default function Drinking({ data, setData }) {
  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    setData({ ...data, drinking: event.target.value });
  };

  return (
    <Container
      disableGutters
      sx={{
        display: "grid",
        gap: 1,
      }}
    >
      <Typography className="input-title">음주 생활</Typography>
      <FormControl>
        <Select
          labelId="select-label"
          id="select"
          value={value}
          onChange={handleChange}
          displayEmpty
          sx={{
            borderRadius: "12px",
            boxShadow: `0 0 0 1px #B2B0AE`,
            height: "43px",
          }}
        >
          <MenuItem value={null} disabled>
            <Typography className="basic">선택해주세요.</Typography>
          </MenuItem>


          <MenuItem value={0}>
            전혀 마시지 않음
          </MenuItem>
          <MenuItem value={1}>
            거의 마시지 않음
          </MenuItem>
          <MenuItem value={2}>
            이따금 마심(한 달 1회 이상)
          </MenuItem>
          <MenuItem value={3}>
            종종 마심(주 1회 이상)
          </MenuItem>
          <MenuItem value={4}>
            자주 마심(주 2회 이상)
          </MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
}
