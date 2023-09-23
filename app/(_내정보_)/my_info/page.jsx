'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import Container from "@mui/material/Container";
import { Certification, DangerNotification } from '@/components/Notification';
import { MainHalfButton, MainMiniButton, SubHalfButton, SubMiniButton, SubMiniFullButton } from '@/components/Button';
import { DefaultCheckbox } from '@/components/Checkbox';

import Link from 'next/link';
import Image from 'next/image';
import Bag from "@/public/bag.svg";
import House from "@/public/house.svg";
import People from "@/public/people.svg";
import Typography from '@mui/material/Typography';

import { DormantToggle } from '@/components/Toggle';
import Modal from '@/components/Modal';
import { MainButton } from '@/components/Button';

import { useQuery } from 'react-query';
import { useGetMyInfo } from '@/app/api_/query/useGetMyInfo';

import Error from "@/components/error";
// import { Link } from 'react-router-dom';



const MyInfo = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [isDormant, setIsDormant] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data } = useGetMyInfo();


  async function setDormanTrue() {
    const res = await axios.get('/api/my_info/dormant/true');

    if (res.data == 'success') {
      setShowModal(false);
      window.location.href = '/my_info';
    } else {
      alert('휴면상태 전환에 실패했습니다.');
    }
  }
  async function setDormantFalse() {
    const res = await axios.get('/api/my_info/dormant/false');

    if (res.data == 'success') {
      setShowModal(false);
      window.location.href = '/my_info';
    } else {
      alert('휴면상태 해제에 실패했습니다.');
    }
  }

  const handleDormant = (e, newValue) => {
    if (newValue !== null) {
      setShowModal(true);
      if (newValue == 'true') {
        // setIsDormant(true);
        // setDormanTrue();
      }
      if (newValue == 'false') {
        // setIsDormant(false);
        // setDormantFalse();
      }
    }
  }

  if(!data) return <Error />;

  return (
    <Container disableGutters sx={{marginBottom: '80px'}}>
      <DangerNotification alertMessage={alertMessage} visible={visible} setVisible={setVisible} />

      <Container disableGutters sx={{
        marginTop: '80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}> 
        <Typography className='heading2'>내 정보</Typography>
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
            {data.job_type && <Certification alertMessage="학력 인증" />}
            {data.education && <Certification alertMessage="직장 인증" />}
          </Container>

          {/* 닉네임 */}
          <Typography className='heading2' marginBottom={'16px'}> 
            {data.nickname}
          </Typography>

          {/* 직장유형 */}
          <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
            <Image src={Bag} width='20px' style={{marginRight: '10px'}}/>
            {data.job_type ? data.job_type : "직장정보 미입력"}
          </Typography>

          {/* 거주지 */}
          <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
            <Image src={House} width='20px' style={{marginRight: '10px'}}/>
            {data.residence ? data.residence : "거주지 미입력"}
          </Typography>

          {/* 생년월일 */}
          <Typography className='basic-gray' sx={{display: 'flex', verticalAlign: 'center'}}>
            <Image src={People} width='20px' style={{marginRight: '10px'}}/>
            {data.date_birth ? data.date_birth : "????"}년생
          </Typography>
        </Container>

        {/*매칭 활성화와 휴면 상태를 나타내는 버튼입니다.
        탈퇴페이지에서의 문제와 마찬가지로 옆으로 정렬이 되지않았습니다. */}  

        <DormantToggle isDormant={Boolean(data.dormant)} handleDormant={handleDormant} />
        <Modal clicked={showModal} setClicked={setShowModal}>
          {
            data.dormant ? 
            <>
              <Typography className='heading2' style={{marginRight: '56px'}}>휴면상태를<br/>해제하시겠습니까?</Typography>
              <Typography className='basic-gray'>{data.dormant}에 휴면상태로<br/>전환되었습니다.</Typography>
              <MainButton buttonName='휴면 해제하기' onClick={() => setDormantFalse()} />
            </> :
            <>
              <Typography className='heading2' style={{marginRight: '56px'}}>휴면상태로<br/>전환하시겠습니까?</Typography>
              <MainButton buttonName='휴면 전환하기' onClick={() => setDormanTrue()}/>
            </>
          }
        </Modal>

        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '32px',
        }}>
          {/*다음 아래의 버튼들의 크기가 컨테이너 가로길이를 전부 채우도록만 수정 부탁드립니다.*/}
          <Typography className='heading4' style={{marginBottom: '5px'}}>매칭 신청서 수정하기</Typography>
          <SubMiniFullButton buttonName={'내 정보 수정하기'} onClick={() => {setAlertMessage('준비중인 기능입니다.');setVisible(true)}} />
          <Link href='/application/target'>
            <SubMiniFullButton buttonName={'이상형 정보 수정하기'} />
          </Link>
          <a href='https://g8h7y7g082m.typeform.com/to/hbat7gbg' target='_blank'>
            <SubMiniFullButton buttonName={'인증 뱃지 수정하기'} />
          </a>
          <SubMiniFullButton buttonName={'편지 수정하기'} onClick={() => {setAlertMessage('준비중인 기능입니다.');setVisible(true)}} />
        </Container>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '32px',
        }}>
          <Typography className='heading4'>기타</Typography>
          <SubMiniFullButton buttonName={'지인 차단'} onClick={() => {setAlertMessage('준비중인 기능입니다.');setVisible(true)}} />
          <SubMiniFullButton buttonName={'경고 점수 조회'} onClick={() => {setAlertMessage('준비중인 기능입니다.');setVisible(true)}} />
          <a href="/logout" className='heading7' style={{textDecoration: 'underline', color: 'rgba(178, 176, 174, 1)', marginTop: '16px', marginLeft: '14px'}}>로그아웃</a>
          <a href="/leave" className='heading7' style={{textDecoration: 'underline', color: 'rgba(178, 176, 174, 1)', marginTop: '0px', marginLeft: '14px'}}>회원 탈퇴</a>
        </Container>
      </Container>
    </Container>
  );
}

export default MyInfo;
