"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  MainSelectButton,
  SubSelectButton,
  SubMiniButton,
  MainButton,
} from "@/components/Button";
import { CheckedCheckbox, DefaultCheckbox } from "@/components/Checkbox";
import { RatingToggle } from "@/components/Steps";
import Modal from "@/components/Modal";
import path from "path";


export default function Layout({ children, params }) {
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(null);
  const [modal, setModal] = useState(false);
  const pathName = usePathname();

  // useEffect(() => {
  //   axios.get(`/api/user/detail/${params.u_id}`).then((response) => {
  //     setUser(response.data);
  //     console.log(response.data);
  //   });
  // }, []);

  return (
    <div style={{ height: "100%", margin: 0, padding: 0 }}>
      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          height: "100%",
        }}
      >
        <div style={{ flex: "0 0 auto" }}>
          <Title name={user && user.nickname} pathName={pathName} />
        </div>

        <Container
          disableGutters
          sx={{
            flex: "1 1 auto",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            borderRadius: "24px",
            border: 1,
            padding: "24px",
            gap: "24px",
            borderColor: "#FFC999",
          }}
        >
          <Menu u_id={params.u_id} pathName={pathName} />
          <div>{children}</div>
        </Container>

        <div style={{ flex: "0 0 auto", paddingBottom: "32px" }}>
          <a href="https://g8h7y7g082m.typeform.com/to/htWbQxB7">
            <MainButton buttonName="매칭 피드백하기" />
          </a>
        </div>
      </Container>
    </div>
  );
}


const Title = ({ name, pathName }) => {
  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {pathName.endsWith("letter") && (
        <Typography className="heading2">
          {name}님께서
          <br />
          편지를 보냈어요!
        </Typography>
      )}
      {pathName.endsWith("detail") && (
        <Typography className="heading2">
          {name}님의
          <br />
          상세 정보에요
        </Typography>
      )}
      {pathName.endsWith("photo") && (
        <Typography className="heading2">
          {name}님의
          <br />
          사진이에요
        </Typography>
      )}
    </Container>
  );
}


const Menu = ({ u_id, pathName }) => {
  const sx_base = {
    borderRadius: "8px",
    height: "35px",
    width: "56px",
    boxShadow: "none",
    fontFamily: "Pretendard-Semibold",
    fontSize: "14px",
    letterSpacing: "1.25px"
  };
  const sx_default = {...sx_base, backgroundColor: "#F7F4F2", color: "#3C3B3A"};
  const sx_selected = {...sx_base, backgroundColor: "#3C3B3A", color: "#FFFFFF", pointerEvents: "none"};

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      {pathName.endsWith("letter") ? (
        <Button sx={sx_selected}>편지</Button>
      ) : (
        <Link href={`/user/${u_id}/letter`}>
          <Button sx={sx_default}>편지</Button>
        </Link>
      )}
      {pathName.endsWith("detail") ? (
        <Button sx={sx_selected}>상세</Button>
      ) : (
        <Link href={`/user/${u_id}/detail`}>
          <Button sx={sx_default}>상세</Button>
        </Link>
      )}
      {pathName.endsWith("photo") ? (
        <Button sx={sx_selected}>사진</Button>
      ) : (
        <Link href={`/user/${u_id}/photo`}>
          <Button sx={sx_default}>사진</Button>
        </Link>
      )}
    </Container>
  );
}
