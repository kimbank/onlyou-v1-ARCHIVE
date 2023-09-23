'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";

import { DropdownInput } from '@/components/Input';
import { MainButton, SubButton }  from '@/components/Button';

const Character = () => {
    const dropdownInputNameGroup = ['외향/내향', '직관/현실', '감성/이성', '즉흥/계획', '자기확신/신중']

    return (
        <Container disableGutters sx={{
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '64px',
        }}>
            <h1 className="heading2">내 성격 입력하기</h1>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
            }}>
                {dropdownInputNameGroup.map((buttonName, index) => (
                    <DropdownInput buttonName={buttonName} key={index} />
                ))}
            </Container>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}>
                <Link href={`application/my/dating_style`}>
                    <MainButton buttonName="다음 단계" />
                </Link>
                <Link href={`application/my/life`}>
                    <SubButton buttonName="이전 단계" />
                </Link>
            </Container>
        </Container>
    );
}

export default Character;