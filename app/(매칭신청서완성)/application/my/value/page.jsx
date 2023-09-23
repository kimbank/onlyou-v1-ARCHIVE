'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { MainButton } from '@/components/Button';

import MarriageValues from '@/components/survey/my/marriage_values';
import ReligiousValues from '@/components/survey/my/religious_values';
import OppositeFriendsValues from '@/components/survey/my/opposite_friends_values';
import PoliticalValues from '@/components/survey/my/political_values';
import ConsumptionValues from '@/components/survey/my/consumption_values';
import CareerFamilyValues from '@/components/survey/my/career_family_values';

const Value = () => {
    const [data, setData] = React.useState(ValueData);

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

            <Typography className="heading2"> 가치관 정보 입력하기 </Typography>

            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
            }}>
                <MarriageValues data={data} setData={setData} />
                <ReligiousValues data={data} setData={setData} />
                <OppositeFriendsValues data={data} setData={setData} />
                <PoliticalValues data={data} setData={setData} />
                <ConsumptionValues data={data} setData={setData} />
                <CareerFamilyValues data={data} setData={setData} />
            </Container>
            <Link href={`application/my/life`}>
                <MainButton buttonName="다음 단계" />
            </Link>
        </Container>
    );
}

export default Value;

const ValueData = {
    marriage_values: '결혼 가치관',
    religious_values: '종교의 중요성',
    opposite_friends_values: '이성 친구 가치관',
    political_values: '정치 성향',
    consumption_values: '소비 가치관',
    career_family_values: '커리어와 가정 가치관',
}