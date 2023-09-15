'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import Container from "@mui/material/Container";
import { Certification } from '@/components/Notification';
import { MainHalfButton, MainMiniButton, SubHalfButton, SubMiniButton, SubMiniFullButton } from '@/components/Button';
import { DefaultCheckbox } from '@/components/Checkbox';

import Image from 'next/image';
import Bag from "@/public/bag.svg";
import House from "@/public/house.svg";
import People from "@/public/people.svg";
import Typography from '@mui/material/Typography';

import { DormantToggle } from '@/components/Toggle';


const MyInfo = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get('/api/my_info')
        .then(response => {
            setUser(response.data);
            console.log(response.data);
        });
  }, []);

  return (
    <Container disableGutters sx={{marginBottom: '80px'}}>


      <Container disableGutters sx={{
        marginTop: '80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}> 
        <div className='heading1'>내 정보</div>
        {/*백엔드로 구현되는 부분인거 같아 오렌지색 박스 안의 부분은
            건들이지 않았습니다.*/}
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
            gap: '0px',
            flexDirection: 'row-reverse'
          }}>
            {user.job_type && <Certification alertMessage="학력 인증" />}
            {user.education && <Certification alertMessage="직장 인증" />}
          </Container>

          {/* 닉네임 */}
          <Typography className='heading2' marginBottom={'16px'}> 
            {user.nickname}
          </Typography>

          {/* 직장유형 */}
          <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
            <Image src={Bag} width='20px' style={{marginRight: '10px'}}/>
            {user.job_type ? user.job_type : "직장정보 미입력"}
          </Typography>

          {/* 거주지 */}
          <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
            <Image src={House} width='20px' style={{marginRight: '10px'}}/>
            {user.residence ? user.residence : "거주지 미입력"}
          </Typography>

          {/* 생년월일 */}
          <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
            <Image src={People} width='20px' style={{marginRight: '10px'}}/>
            {user.date_birth ? user.date_birth : "????"}년생
          </Typography>
        </Container>

        {/*매칭 활성화와 휴면 상태를 나타내는 버튼입니다.
        탈퇴페이지에서의 문제와 마찬가지로 옆으로 정렬이 되지않았습니다. */}  

        <DormantToggle onText='매칭 활성화' offText='휴면' />

        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '32px',
        }}>
          {/*다음 아래의 버튼들의 크기가 컨테이너 가로길이를 전부 채우도록만 수정 부탁드립니다.*/}
          <div className='heading4' style={{marginBottom: '5px'}}>매칭 신청서 수정하기</div>
          <SubMiniFullButton buttonName={'내 정보 수정하기'}/>
          <SubMiniFullButton buttonName={'이상형 정보 수정하기'}/>
          <SubMiniFullButton buttonName={'인증 뱃지 수정하기'}/>
          <SubMiniFullButton buttonName={'편지 수정하기'}/>
        </Container>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '32px',
        }}>
          <div className='heading4'>기타</div>
          <SubMiniFullButton buttonName={'지인 차단'} />
          <SubMiniFullButton buttonName={'경고 점수 조회'}/>
          <div className='heading7' style={{textDecoration: 'underline', color: 'rgba(178, 176, 174, 1)', marginBottom: '0px', marginLeft: '14px'}}>로그아웃</div>
          <div className='heading7' style={{textDecoration: 'underline', color: 'rgba(178, 176, 174, 1)', marginTop: '0px', marginLeft: '14px'}}>회원 탈퇴</div>
        </Container>
      </Container>
    </Container>
  );
}

export default MyInfo;
