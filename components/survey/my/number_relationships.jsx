"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";


export default function NumberRelationships({ data, setData }) {
  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    setData({ ...data, number_relationships: event.target.value });
  };

  return (
    <Container
      disableGutters
      sx={{
        display: "grid",
        gap: 1,
      }}
    >
      <Typography className="input-title">연애 횟수</Typography>
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
            0회
          </MenuItem>
          <MenuItem value={1}>
            1~2회
          </MenuItem>
          <MenuItem value={2}>
            3~4회
          </MenuItem>
          <MenuItem value={3}>
            5~6회
          </MenuItem>
          <MenuItem value={4}>
            7회 이상
          </MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
}
