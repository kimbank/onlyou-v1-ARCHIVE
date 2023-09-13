'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import Container from "@mui/material/Container";
import { Certification } from '@/components/Notification';


// async function get_data() {
//   axios.get('/api/my_info')
//   .then(response => response.data)
//   .then(response => {console.log(response)})
// }

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
    <>
      <h1>내 정보</h1>
      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: "24px",
        border: 1,
        padding: "24px",
        gap: '32px',
        borderColor: "#FFC999"
      }}>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          flexDirection: 'row-reverse'
        }}>
          {user.job_type && <Certification alertMessage="학력 인증" />}
          {user.education && <Certification alertMessage="직장 인증" />}
        </Container>
        <h1>{user.nickname}</h1>
        <p>{user.residence}</p>
        <p>{user.date_birth}년생</p>
      </Container>

    </>
  );
}

export default MyInfo;
