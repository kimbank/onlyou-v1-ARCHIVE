'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import Container from "@mui/material/Container";
import { Certification } from '@/components/Notification';
import { MainHalfButton, MainMiniButton, SubHalfButton, SubButton, SubMiniButton, SubMiniFullButton } from '@/components/Button';
import { DefaultCheckbox } from '@/components/Checkbox';
import { TimeInfo } from '@/components/Notification';

import Image from 'next/image';
import Bag from "@/public/bag.svg";
import House from "@/public/house.svg";
import People from "@/public/people.svg";
import Report from "@/public/report.svg";
import Kakao from "@/public/kakao_mini_icon.svg";
import Typography from '@mui/material/Typography';

import { useQuery } from 'react-query';
import { useGetTargetList } from '@/app/api_/query/useGetTargetList';
import Error from "@/components/error";


const Agreement = () => {
  const { data } = useGetTargetList();
  console.log(data)

  if (!data) return <Error />;

  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      { data.length > 0 ?
          <>
            <Typography className='heading2'>성사된 인연의 프로필이에요.</Typography>
            <Typography className='basic-gray'>카카오톡 아이디는 7일 동안만 공개되어요.</Typography>
          </> :
          <>
            <Typography className='heading2'>아직 성사된 상대가 없어요.</Typography>
            <Typography className='basic-gray'>조금만 기다려 주세요!</Typography>
          </>
        }
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '128px',
        marginY: '64px',
      }}>
        { data.length > 0 ?
          data.map((user, index) => {
            return <UserCard user={user} key={index} />
          }) :
          <Container disableGutters sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: "24px",
            border: 1,
            padding: "24px",
            gap: '4px',
            borderColor: "#FFC999"
          }}>
            {/* 닉네임 */}
            <Typography className='heading2'> 
              내 연인은 누구?
            </Typography>

            {/* 직장유형 */}
            <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
              <Image src={Bag} width='20px' style={{marginRight: '10px'}}/>
              ?
            </Typography>

            {/* 거주지 */}
            <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
              <Image src={House} width='20px' style={{marginRight: '10px'}}/>
              ?
            </Typography>

            {/* 생년월일 */}
            <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
              <Image src={People} width='20px' style={{marginRight: '10px'}}/>
              ?
            </Typography>
          </Container>
        }
      </Container>
    </Container>
  )
}


function UserCard({ user }) {

  return (
    <span>
      <Typography className='heading5' marginBottom={'8px'} color={'#ff7700'}>{user.date_matching}</Typography>
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
          <Image src={Report} width='18px' style={{marginLeft:'5.5px'}} />
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
            <span style={{display:'flex', alignItems:'center'}}>
              <Image src={Kakao} style={{marginRight: '8px'}} />
              <Typography className='basic'>확인하기</Typography>
            </span> :
            <div></div>
          }
          { user.public_exp ? 
            <TimeInfo alertMessage={'공개마감 00:00'} /> :
            <TimeInfo alertMessage='카카오톡 공개가 마감되었어요.' />
          }
        </Container>
        <SubButton buttonName='프로필 상세보기' height='40px'></SubButton>
        {/* {!user.public_exp && <p className='caption' style={{textDecoration: 'underline', color: '#FF8982', alignSelf:'end', margin:'0px', marginTop:'8px'}}>삭제하기</p>} */}
      </Container>
    </span>
  )
}


export default Agreement;
