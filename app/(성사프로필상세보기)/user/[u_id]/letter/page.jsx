'use client'

import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Letter({ params }) {
  const [letter, setLetter] = useState(null);

  useEffect(() => {
    axios.get(`/api/user/letter/${params.u_id}`)
      .then((res) => {
        setLetter(res.data.letter);
      })
  }, [])

  return (
    <Typography className='basic'>
      {letter}
    </Typography>
  );
}
