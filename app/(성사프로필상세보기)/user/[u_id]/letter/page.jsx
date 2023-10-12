"use client";

import { Container, Typography, Button } from "@mui/material";
import {
  MainSelectButton,
  SubSelectButton,
  MainButton,
} from "@/components/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Link from "next/link";


export default function Letter({ params }) {
  const [data, setData] = useState(null);
  const [selectable, setSelectable] = useState(false);

  useEffect(() => {
    axios.get(`/api/user/letter/${params.u_id}`).then((res) => {
      setData(res.data);
      setSelectable(res.data.selectable);
    });
  }, []);

  return (
    <Typography className="basic" sx={{ overflow: "scroll" }}>
      {data &&
        data.letter.split("\n").map((line, index) => {
          return (
            <span key={index}>
              {line}
              <br />
            </span>
          );
        })}
      a<br />
      <br />
      <br />
      <br />
      <br />
      <br />b<br />
      <br />
      <br />
      <br />
      <br />c<br />
      <br />
      <br />
      <br />d
    </Typography>
  );
}

const sx_default = {
  borderRadius: "8px",
  height: "35px",
  width: "56px",
  boxShadow: "none",
  backgroundColor: "#F7F4F2",
  color: "#3C3B3A",
  fontFamily: "Pretendard-Semibold",
  fontSize: "14px",
  letterSpacing: "1.25px",
};

const sx_selected = {
  borderRadius: "8px",
  height: "35px",
  width: "56px",
  boxShadow: "none",
  backgroundColor: "#3C3B3A",
  color: "#FFFFFF",
  fontFamily: "Pretendard-Semibold",
  fontSize: "14px",
  letterSpacing: "1.25px",
  pointerEvents: "none",
};
