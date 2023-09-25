'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function Photo({ params }) {

  return (
    <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems:'center', justifyItems:'center' }}>
      <img style={{borderRadius: '16px', width: '100%'}}
        src='https://api.typeform.com/responses/files/837be5543ad7a4ef73d66a204ab22e0139911a5233c070baa44dab9ed51ac922/IMG_9250.jpeg' />
    </Container>
  );
}
