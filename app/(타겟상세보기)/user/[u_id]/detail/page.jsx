'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';


export default function Detial({ params }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get(`/api/user/detail/${params.u_id}`)
        .then(response => {
            setUser(response.data);
            console.log(response.data);
        });
  }, []);

  return (
    <Typography className='heading2'>{params.u_id} 상세 페이지입니다.</Typography>
  );
}
