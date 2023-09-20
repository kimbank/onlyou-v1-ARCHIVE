'use client'

import React, { useState } from 'react';
import { Container, Typography } from "@mui/material";
import { DangerNotification } from '@/components/Notification';
import { SubButton, MainButton, MainMiniButton, SubMiniButton, SubMiniFullButton } from '@/components/Button';
import { CheckedCheckbox, DefaultCheckbox } from '@/components/Checkbox';
import Modal from '@/components/Modal';
import { Certification, TimeInfo } from '@/components/Notification';

import { useQuery } from 'react-query';
import { useGetTargetInfo } from '@/app/api_/query/useGetTargetInfo';
import Error from "@/components/error";

import Link from 'next/link';
import Image from 'next/image';
import Bag from "@/public/bag.svg";
import House from "@/public/house.svg";
import People from "@/public/people.svg";
import Kakao from "@/public/kakao_mini_icon.svg";


// 매칭 선택 상태
export default function Success() {
  const [left, setLeft] = useState("??:??:??");
  const [sec, setSec] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data } = useGetTargetInfo();
  // console.log(data)

  if (!data) return <Error />;
  
  setTimeout(() => {setLeft(Timer(data.time_left - (sec)));setSec(sec+1)}, 1000);


  // const user = {
  //   "id": 69,
  //   "gender": 0,
  //   "nickname": "온리유",
  //   "birth_year": "2001년생",
  //   'kakao_id': '카카오1sadfsafd',
  // }

  async function handleClipboard() {
    await navigator.clipboard.writeText(data.kakao_id);
    setIsCopied(true);
  }

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
        <Typography className='heading2'>축하드려요! 🎉</Typography>
        <Typography className='basic-gray'>서로가 서로를 선택하여 연락처가 공개되었어요. <br />카카오톡 아이디를 통해 인사를 건네보세요!</Typography>
      </Container>
      <UserCard user={data} setShowModal={setShowModal} left={left} />
      <Modal clicked={showModal} setClicked={setShowModal}>
        <Typography className='heading2'>상대방의 <br />카카오톡 아이디입니다.</Typography>
        <Typography align='center' borderRadius='12px' paddingY='4px' marginX='16px' bgcolor={'#F7F4F2'}>{data.kakao_id}</Typography>
        { !isCopied ? 
          <MainButton buttonName='복사하기' onClick={() => handleClipboard()} /> :
          <SubButton buttonName='복사완료!' onClick={() => handleClipboard()} />
        }
      </Modal>
    </Container>
  );
}

function UserCard({ user, setShowModal, left }) {

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
        {user.birth_year ? user.birth_year : "?"}
      </Typography>
      
      <Container disableGutters sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '28px',
          marginBottom: '4px',
        }}>
          { user.kakao_id ?
            <span onClick={() => setShowModal(true)} style={{display:'flex', alignItems:'center'}}>
              <Image src={Kakao} style={{marginRight: '8px'}} />
              <Typography className='heading5'>확인하기</Typography>
            </span> :
            <div></div>
          }
          <TimeInfo alertMessage={`공개마감 ${left}`} />
        </Container>
        <Link href={`/user/${user.id}/detail`}>
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
