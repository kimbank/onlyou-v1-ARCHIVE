'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";

import { DropdownInput } from '@/components/Input';
import { MainButton } from '@/components/Button';

const Value = () => {
    const dropdownInputNameGroup = ['결혼 가치관', '종교의 중요성', '이성 친구 가치관', '정치적 성향', '소비 가치관', '커리어와 가정 가치관']

    return (
        <Container disableGutters sx={{
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '64px',
        }}>
            <h1 className="heading2"> 가치관 정보 입력하기 </h1>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
            }}>
                {dropdownInputNameGroup.map((buttonName) => (
                    <DropdownInput buttonName={buttonName} />
                ))}
            </Container>
            <Link href={`application/my/life`}>
                <MainButton buttonName="다음 단계" />
            </Link>
        </Container>
    );
}

export default Value;