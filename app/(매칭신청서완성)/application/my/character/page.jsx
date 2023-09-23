'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { MainButton, SubButton } from '@/components/Button';
import { DangerNotification } from '@/components/Notification';

import { DropDownInput } from '@/components/survey/my/drop_down_input';

function canProceedToNextPage(data) {
    for (const key in data) {
        if (data[key] === null) {
            return false; // 하나라도 null 값이 있으면 다음 페이지로 못감
        }
    }
    return true; // 모든 값이 null이 아니면 다음 페이지로 갈 수 있음
}

const Character = () => {
    const [data, setData] = React.useState(CharacterData);
    const [dangerMessage, setDangerMessage] = React.useState('');
    const [dangerVisible, setDangerVisible] = React.useState(false);
    const canProceed = canProceedToNextPage(data); // 다음 페이지로 갈 수 있는지 여부

    return (
        <Container
            disableGutters
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "64px",
            }}
        >
            <DangerNotification alertMessage={dangerMessage} visible={dangerVisible} setVisible={setDangerVisible} />

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
                {canProceed ?
                    <Link href={`application/my/dating_style`}>
                        <MainButton buttonName="다음 단계" />
                    </Link> :
                    <MainButton buttonName="다음 단계" onClick={() => { setDangerMessage('비어 있는 항목이 존재합니다'); setDangerVisible(true) }} />
                }
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