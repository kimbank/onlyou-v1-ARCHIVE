'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import {  MainButton } from '@/components/Button';
import { CheckedCheckbox, DefaultCheckbox } from '@/components/Checkbox';
import Modal from '@/components/shared/modal';


function Title({ name }) {
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div className='heading2'>{name}님의<br />상세 정보에요</div>
    </Container>);
}

function AcceptItem({ setAcceptFinal }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: "8px",
    }}>
      <CheckedCheckbox onClick={() => setShowModal(true)} buttonName='taykim01님 수락하기' />
      <DefaultCheckbox buttonName='거절하기' />
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          alignItems: 'left',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '48px',
          borderRadius: '20px',
        }}>
          <img src='/cancel_select.svg' style={{ width: '20px', height: '20px', marginLeft: "auto" }} onClick={() => { setShowModal(false) }} />
          <div className='heading3'>정말로 선택하시겠어요?</div>
          <div className='basic' style={{ color: '#666563' }}>한 번 선택하면 변경할 수 없습니다.</div>
          <MainButton buttonName='선택하기' onClick={() => { setShowModal(false); setAcceptFinal(true) }} />
        </Container>
      </Modal>
    </Container>);
}

export default function Detial({ params }) {
  const [user, setUser] = useState([]);
  const [acceptFinal, setAcceptFinal] = useState(false);
  
  useEffect(() => {
    axios.get(`/api/user/detail/${params.u_id}`)
        .then(response => {
            setUser(response.data);
            console.log(response.data);
        });
  }, []);

  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: "10px",
    }}>
      <Title name={params.u_id} />
      {/* 매칭되어 나온 상대방 정보 및 버튼 모임입니다. 
              모두 주황 박스 안에 있습니다. */}
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: "24px",
        border: 1,
        padding: "24px",
        gap: '48px',
        borderColor: "#FFC999"
      }}>
        <AcceptItem setAcceptFinal={setAcceptFinal} />
      </Container>
    </Container>
  );
}
