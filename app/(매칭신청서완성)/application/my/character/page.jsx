'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { MainButton, SubButton } from '@/components/Button';

import { DropDownInput } from '@/components/survey/my/drop_down_input';

const Character = () => {
    const [data, setData] = React.useState(CharacterData);

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
                <DropDownInput data={data} setData={setData} data_name={"extrovert_or_realistic"} title={"외향/내향"} options={["매우 외향", "외향", "중립", "내향", "매우 내향"]} start_index={-2} />
                <DropDownInput data={data} setData={setData} data_name={"intutive_or_realistic"} title={"직관/현실"} options={["매우 직관적", "직관적", "중립", "현실적", "매우 현실적"]} start_index={-2} />
                <DropDownInput data={data} setData={setData} data_name={"emotional_or_rational"} title={"감성/이성"} options={["매우 감성적", "감성적", "중립", "이성적", "매우 이성적"]} start_index={-2} />
                <DropDownInput data={data} setData={setData} data_name={"impromptu_or_planned"} title={"즉흥/계획"} options={["매우 즉흥적", "즉흥적", "중립", "계획적", "매우 계획적"]} start_index={-2} />
                <DropDownInput data={data} setData={setData} data_name={"selfconfidence_or_careful"} title={"자기확신/신중"} options={["매우 자기확신", "자기확신", "중립", "신중", "매우 신중"]} start_index={-2} />
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
    extrovert_or_realistic: null,
    intutive_or_realistic: null,
    emotional_or_rational: null,
    impromptu_or_planned: null,
    selfconfidence_or_careful: null,
}