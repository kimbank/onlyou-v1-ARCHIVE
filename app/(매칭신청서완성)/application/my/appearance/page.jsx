'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";

import { DropdownInput } from '@/components/Input';
import { MainButton, SubButton }  from '@/components/Button';

const DatingStyle = () => {
    const dropdownInputNameGroup = ['동물 이미지', '쌍꺼풀', '얼굴상', '체형', 
    '피부톤', '문신 유무', "패션 스타일"]

    return (
        <Container disableGutters sx={{
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '64px',
        }}>
            <h1 className="heading2">외모 정보 입력하기</h1>
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
                <Link href={`application/my/other`}>
                    <MainButton buttonName="다음 단계" />
                </Link>
                <Link href={`application/my/dating_style`}>
                    <SubButton buttonName="이전 단계" />
                </Link>
            </Container>
        </Container>
    );
}

export default DatingStyle;