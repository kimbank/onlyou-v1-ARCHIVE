"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MainSelectButton, SubSelectButton, SubMiniButton, MainButton } from "@/components/Button";
import { CheckedCheckbox, DefaultCheckbox } from "@/components/Checkbox";
import { RatingToggle } from "@/components/Steps";
import Modal from "@/components/Modal";
import path from "path";

function Title({ name, pathName }) {
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

function ButtonGrop({ u_id, pathName }) {
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
      { pathName.endsWith("letter") ? 
        <Button sx={sx_selected}>편지</Button> :
        <Link href={`/user/${u_id}/letter`}>
          <Button sx={sx_default}>편지</Button>
        </Link>
      }
      { pathName.endsWith("detail") ?
        <Button sx={sx_selected}>상세</Button> :
        <Link href={`/user/${u_id}/detail`}>
          <Button sx={sx_default}>상세</Button>
        </Link>
      }
      { pathName.endsWith("photo") ?
        <Button sx={sx_selected}>사진</Button> :
        <Link href={`/user/${u_id}/photo`}>
          <Button sx={sx_default}>사진</Button>
        </Link>
      }
    </Container>
  );
}

function AcceptItem({ setAcceptFinal }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Container disableGutters sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '8px',
        marginTop: '24px',
      }}>
        <MainSelectButton buttonName='수락하기' />
        <SubSelectButton buttonName='거절하기' />
      </Container>
    </>
  );
}

export default function Layout({ children, params }) {
  // const [user, setUser] = useState(null);
  // const [acceptFinal, setAcceptFinal] = useState(false);
  // const pathName = usePathname();

  // useEffect(() => {
  //   axios.get(`/api/user/detail/${params.u_id}`).then((response) => {
  //     setUser(response.data);
  //     console.log(response.data);
  //   });
  // }, []);

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "48px",
      }}
    >
      {/* 제목입니다. */}
      {/* {user && user.nickname && <Title name={user.nickname} pathName={pathName} />} */}
      {/* 주황 박스 안의 내용 입니다. */}
      {/* <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "24px",
          border: 1,
          padding: "24px",
          gap: "48px",
          borderColor: "#FFC999",
        }}
      > */}
        {/* <ButtonGrop u_id={params.u_id} pathName={pathName} /> */}
        {children}
        {/* <AcceptItem setAcceptFinal={setAcceptFinal} /> */}
      {/* </Container> */}
      {/* <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: "8px",
            }}>
                <RatingToggle />
            </Container> */}
      {/* <a href="https://g8h7y7g082m.typeform.com/to/htWbQxB7">
        <MainButton buttonName='매칭 피드백하기' />
      </a> */}
    </Container>
  );
}



const sx_default = {
  borderRadius: '8px',
  height: '35px',
  width: '56px',
  boxShadow: 'none',
  backgroundColor: '#F7F4F2',
  color: '#3C3B3A',
  fontFamily: 'Pretendard-Semibold',
  fontSize: '14px',
  letterSpacing: '1.25px',
}

const sx_selected = {
  borderRadius: '8px',
  height: '35px',
  width: '56px',
  boxShadow: 'none',
  backgroundColor: '#3C3B3A',
  color: '#FFFFFF',
  fontFamily: 'Pretendard-Semibold',
  fontSize: '14px',
  letterSpacing: '1.25px',
  pointerEvents: 'none',
}