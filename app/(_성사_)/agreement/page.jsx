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
import Modal from '@/components/Modal';
import { MainButton } from '@/components/Button';


const theme = createTheme({
    palette: {
      primary: {
        light: '#FFA266',
        main: '#FF7700',
        dark: '#C45A00',
        contrastText: '#fff',
      },
      secondary: {
        light: '#FFFFFF',
        main: '#F7F4F2',
        dark: '#B2B0AE',
        contrastText: '#3C3B3A',
      },
    },
  });
  
  export default function RootLayout({ children }) {
    return (
      <ThemeProvider theme={theme}>
        <Header />
            <Container>
                {/*성사된 상대의 유무에 따라 나타나야 하는 */}
                <div className='heading2'>아직 성사된 상대가 없어요.</div>
            </Container>
        <NavBar />
      </ThemeProvider>
    )
  }
  