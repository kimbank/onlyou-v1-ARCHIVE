"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SubMiniButton, MainButton } from "@/components/Button";
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
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
      }}
    >
      <CheckedCheckbox
        onClick={() => setShowModal(true)}
        buttonName="taykim01님 수락하기"
      />
      <DefaultCheckbox buttonName="거절하기" />
      <Modal clicked={showModal} setClicked={setShowModal}>
        <Typography className="heading2" style={{ marginRight: "56px" }}>
          정말로 선택하시겠어요?
        </Typography>
        <Typography className="basic" style={{ color: "#666563" }}>
          한 번 선택하면 변경할 수 없습니다.
        </Typography>
        <MainButton
          buttonName="선택하기"
          onClick={() => {
            setShowModal(false);
            setAcceptFinal(true);
          }}
        />
      </Modal>
    </Container>
  );
}

export default function Layout({ children, params }) {
  const [user, setUser] = useState([]);
  const [acceptFinal, setAcceptFinal] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    axios.get(`/api/user/detail/${params.u_id}`).then((response) => {
      setUser(response.data);
      console.log(response.data);
    });
  }, []);

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
      <Title name={params.u_id} pathName={pathName} />
      {/* 주황 박스 안의 내용 입니다. */}
      <Container
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
      >
        <ButtonGrop u_id={params.u_id} pathName={pathName} />
        {children}
        <AcceptItem setAcceptFinal={setAcceptFinal} />
      </Container>
      {/* <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: "8px",
            }}>
                <RatingToggle />
            </Container> */}
      <MainButton>

      </MainButton>
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