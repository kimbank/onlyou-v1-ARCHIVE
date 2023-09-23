'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { MainButton, SubButton } from '@/components/Button';

import ExtrovertOrRealistic from '@/components/survey/my/character/extrovert_or_realistic';
import IntutiveOrRealistic from '@/components/survey/my/character/intutive_or_realistic';
import EmotionalOrRational from '@/components/survey/my/character/emotional_or_rational';
import ImpromptuOrPlanned from '@/components/survey/my/character/impromptu_or_planned';
import SelfconfidenceOrCareful from '@/components/survey/my/character/selfconfidence_or_careful';

const Character = () => {

    return (
        <Container
            disableGutters
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "64px",
            }}
        >
            <button onClick={() => console.log(data)}>정보 보기</button>

            <Typography className="heading2"> 내 성격 입력하기 </Typography>

            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
            }}>
                {/* <ExtrovertOrRealistic data={data} setData={setData} /> */}
                {/* <IntutiveOrRealistic data={data} setData={setData} /> */}
                {/* <EmotionalOrRational data={data} setData={setData} /> */}
                {/* <ImpromptuOrPlanned data={data} setData={setData} /> */}
                {/* <SelfconfidenceOrCareful data={data} setData={setData} /> */}
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

const CharacterData = {
    extrovert_or_realistic: '외향/내향',
    intutive_or_realistic: '직관/현실',
    emotional_or_rational: '감성/이성',
    impromptu_or_planned: '즉흥/계획',
    selfconfidence_or_careful: '자기확신/신중',
}