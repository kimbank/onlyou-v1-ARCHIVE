'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";

import { DropdownInput } from '@/components/Input';
import { MainButton, SubButton }  from '@/components/Button';

const DatingStyle = () => {
    const dropdownInputNameGroup = ['선호 데이트', '선호 연락 수단', '애교 레밸', '질투 레밸', 
    '연애 주도성', '데이트 빈도', "연락 스타일", "스킨쉽(혼전순결)", '소셜미디어(SNS)', '갈등 해결 방식']

    return (
        <Container disableGutters sx={{
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '64px',
        }}>
            <h1 className="heading2">연애 스타일 입력하기</h1>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
            }}>
                {dropdownInputNameGroup.map((buttonName) => (
                    <DropdownInput buttonName={buttonName} />
                ))}
            </Container>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}>
                <Link href={`application/my/appearance`}>
                    <MainButton buttonName="다음 단계" />
                </Link>
                <Link href={`application/my/character`}>
                    <SubButton buttonName="이전 단계" />
                </Link>
            </Container>
        </Container>
    );
}

export default DatingStyle;