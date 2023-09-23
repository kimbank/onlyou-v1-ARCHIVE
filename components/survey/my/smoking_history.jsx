"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";


export default function SmokingHistory({ data, setData }) {
  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    setData({ ...data, smoking_history: event.target.value });
  };

  return (
    <Container
      disableGutters
      sx={{
        display: "grid",
        gap: 1,
      }}
    >
      <Typography className="input-title">흡연 경력</Typography>
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
            비흡연
          </MenuItem>
          <MenuItem value={1}>
            금연
          </MenuItem>
          <MenuItem value={2}>
            흡연
          </MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
}