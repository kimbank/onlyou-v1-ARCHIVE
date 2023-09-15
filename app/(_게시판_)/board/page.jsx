'use client'

import React, { useState, useEffect } from 'react';

import Container from "@mui/material/Container";

export default function Board() {

  return (
    <Container>
      <div className="heading2" style= {{textAlign: 'center'}}>아직 준비중인 기능입니다.</div><br/>
      <div className='heading6' style={{color: 'grey', textAlign: 'center'}}>조금만 기다려주세요..!</div>
    </Container>
  );
}