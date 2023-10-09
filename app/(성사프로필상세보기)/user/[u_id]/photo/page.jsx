'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import { MainSelectButton, SubSelectButton, MainButton } from '@/components/Button';
import Link from 'next/link';
import Image from 'next/image';


export default function Photo({ params }) {
  const [data, setData] = useState([]);
  const [selectable, setSelectable] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get(`/api/user/photo/${params.u_id}`)
      .then((res) => {
        setData(res.data);
        setPhotos(res.data.photos);
        setSelectable(res.data.selectable);
      })
  }, [])

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "48px",
      }}
    >
      <Typography className="heading2">
        {data && data.nickname}님의
        <br />
        사진이에요
      </Typography>

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
        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <Link href={`/user/${params.u_id}/letter`}>
            <Button sx={sx_default}>편지</Button>
          </Link>
          <Link href={`/user/${params.u_id}/detail`}>
          <Button sx={sx_default}>상세</Button>
          </Link>
          <Button sx={sx_selected}>사진</Button>
        </Container>
        <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems:'center', justifyItems:'center' }}>
          { photos &&
            photos.map((photo, index) => {
              return (
                <img style={{borderRadius: '16px', width: '100%'}}
                  src={photo.url} key={index}/>
              )
            })
          }
        </Container>


        { selectable === true &&
          <Container disableGutters sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
            marginTop: '24px',
          }}>
            <MainSelectButton buttonName='수락하기' onClick={() => handleAccept()} />
            <SubSelectButton buttonName='거절하기' onClick={() => handleReject()} />
          </Container>
        }
      </Container>

      { selectable === true || true &&
        <span>
          <Typography className='basic-gray' style={{padding:'8px', fontStyle:'italic'}}>
            <strong>
              이번 매칭 어떠셨나요?<br/>
            </strong>
            답변 내용을 바탕으로 다음 매칭을 개선해드리려 해요
          </Typography>
          <a href="https://g8h7y7g082m.typeform.com/to/htWbQxB7">
            <MainButton buttonName='매칭 피드백하기' />
          </a>
        </span>
        }
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