'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useGetMyInfo } from '@/app/api_/query/useGetMyInfo';

import { Container, Typography } from '@mui/material';

import { DormantToggle } from '@/components/Toggle';
import Modal from '@/components/Modal';
import { MainButton } from '@/components/Button';

import Error from "@/components/error";



// 매칭 휴면 상태
const Dormancy = () => {
  const [showModal, setShowModal] = useState(false);

  const { data } = useGetMyInfo();

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
      console.log(data);
    }
  }

  if(!data) return <Error />;

  return (
    <Container disableGutters sx={{
      marginTop: '80px',
      display: 'flex',
      flexDirection: 'column',
      gap: '64px',
    }}>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <Typography className='heading2'>현재 매칭 휴면 상태에요.</Typography>
        <Typography className='basic-gray'>언제든지 다시 매칭에 참여하실 수 있어요.</Typography>
      </Container>
      

      <DormantToggle isDormant={Boolean(true)} handleDormant={handleDormant} />
        <Modal clicked={showModal} setClicked={setShowModal}>
          <Typography className='heading2'>휴면상태를<br/>해제하시겠습니까?</Typography>
          <Typography className='basic-gray'>{data.dormant}에 휴면상태로<br/>전환되었습니다.</Typography>
          <MainButton buttonName='휴면 해제하기' onClick={() => setDormantFalse()} />
        </Modal>
    </Container>
  );
}


export default Dormancy;