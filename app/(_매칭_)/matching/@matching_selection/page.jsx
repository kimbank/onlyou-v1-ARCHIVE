'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import Container from "@mui/material/Container";
import { Certification } from '@/components/Notification';
import { MainSelectButton, SubButton, SubSelectButton, MainButton } from '@/components/Button';
import { TimeInfo } from '@/components/Notification';

import Image from 'next/image';
import Link from 'next/link';
import Bag from "@/public/bag.svg";
import House from "@/public/house.svg";
import People from "@/public/people.svg";
import Typography from '@mui/material/Typography';

import Modal from '@/components/Modal';

import { useQuery } from 'react-query';
import { useGetTargetInfo } from '@/app/api_/query/useGetTargetInfo';
import Error from "@/components/error";


const Selection = () => {
  const [left, setLeft] = useState("??:??:??");
  const [sec, setSec] = useState(0);
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const { data } = useGetTargetInfo();
  // console.log(data)

  if (!data) return <Error />;

  setTimeout(() => {setLeft(Timer(data.time_left - (sec)));setSec(sec+1)}, 1000);

  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '64px',
    }}>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        // marginY: '64px',
      }}>
        <Typography className='heading2'>오늘의 인연이에요</Typography>
        <Typography className='basic-gray'>마감 전까지 선택을 완료해주세요!</Typography>
      </Container>
      <UserCard user={data} acp={setShowAccept} rej={setShowReject} left={left} />
      <Modal clicked={showAccept} setClicked={setShowAccept}>
        <Typography className='heading2'>정말로 선택하시겠어요?</Typography>
        <Typography className='basic-gray'>한 번 선택하면 변경할 수 없습니다</Typography>
        <MainButton buttonName='선택하기' onClick={() => handleAccept()} />
      </Modal>
      <Modal clicked={showReject} setClicked={setShowReject}>
        <Typography className='heading2'>정말로 거절하시겠어요?</Typography>
        <Typography className='basic-gray'>한 번 선택하면 변경할 수 없습니다</Typography>
        <MainButton buttonName='거절하기' onClick={() => handleReject()} />
      </Modal>
    </Container>
  )
}


function UserCard({ user, acp, rej, left }) {

  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: "24px",
      border: 1,
      padding: "24px",
      gap: '4px',
      borderColor: "#FFC999"
    }}>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        flexDirection: 'row-reverse',
        marginBottom: '28px',
      }}>
        {user.job_type && <Certification alertMessage="직장 인증" />}
        {user.education && <Certification alertMessage="학력 인증" />}
      </Container>

      {/* 닉네임 */}
      <Typography className='heading2'> 
        {user.nickname}
      </Typography>

      {/* 직장유형 */}
      <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
        <Image src={Bag} width='20px' style={{marginRight: '10px'}}/>
        {user.job_type ? user.job_type : "?"}
      </Typography>

      {/* 거주지 */}
      <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
        <Image src={House} width='20px' style={{marginRight: '10px'}}/>
        {user.residence ? user.residence : "?"}
      </Typography>

      {/* 생년월일 */}
      <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
        <Image src={People} width='20px' style={{marginRight: '10px'}}/>
        {user.date_birth ? user.date_birth : "?"}
      </Typography>
      
      <Container disableGutters sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '28px',
        marginBottom: '4px',
      }}>
        <div></div>
        <TimeInfo alertMessage={`선택 마감까지 ${left}`} /> 
      </Container>
      <Container disableGutters sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '8px',
        marginTop: '24px',
      }}>
        <MainSelectButton buttonName='수락하기' onClick={() => acp(true)} />
        <SubSelectButton buttonName='거절하기' onClick={() => rej(true)} />
      </Container>
      <Link href={`/user/${user.id}/letter`}>
        <SubButton buttonName='프로필 상세보기' height='40px'></SubButton>
      </Link>
    </Container>
  )
}

function Timer(sec) {
  if (sec == 0) window.location.reload();
  
  let hour = Math.floor(sec / 3600);
  let min = Math.floor((sec % 3600) / 60);
  let second = sec % 60;

  if (hour < 10) hour = `0${hour}`;
  if (min < 10) min = `0${min}`;
  if (second < 10) second = `0${second}`;

  if (hour > 0) {
    return `${hour}:${min}:${second}`;
  } else if (min > 0) {
    return `${min}:${second}`;
  } else if (second > 0) {
    return `${second}`;
  }
  return ""
}

async function handleAccept() {
  const res = await axios.get('/api/matching/select/true');
  window.location.reload();
}

async function handleReject() {
  const res = await axios.get('/api/matching/select/false');
  window.location.reload();
}


export default Selection;
