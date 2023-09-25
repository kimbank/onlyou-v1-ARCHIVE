'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function Photo({ params }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get(`/api/user/photo/${params.u_id}`)
      .then((res) => {
        setPhotos(res.data);
      })
  }, [])

  return (
    <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems:'center', justifyItems:'center' }}>
      {
        photos.map((photo, index) => {
          return (
            <img style={{borderRadius: '16px', width: '100%'}}
              src={photo.url} key={index}/>
          )
        })
      }
    </Container>
  );
}
