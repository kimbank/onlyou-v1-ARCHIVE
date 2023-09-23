'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { MainButton, SubButton } from '@/components/Button';

import { DropDownInput } from '@/components/survey/my/drop_down_input';

const Appearance = () => {
    const [data, setData] = React.useState(AppearanceData);

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

            <Typography className="heading2"> 외모 정보 입력하기 </Typography>

            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
            }}>
                <DropDownInput data={data} setData={setData} data_name={"animal_image"} title={"동물 이미지"} options={["강아지", "고양이", "여우", "곰돌이", "햄스터", "공룡"]} />
                <DropDownInput data={data} setData={setData} data_name={"double_eyelid"} title={"쌍꺼풀"} options={["무쌍", "속쌍", "유쌍"]} />
                <DropDownInput data={data} setData={setData} data_name={"face_shape"} title={"얼굴상"} options={["순진한 얼굴상", "진지한 얼굴상"]} />
                <DropDownInput data={data} setData={setData} data_name={"body_type"} title={"체형"} options={["슬림", "표준", "통통", "탄탄", "근육근육"]} />
                <DropDownInput data={data} setData={setData} data_name={"skin_tone"} title={"피부톤"} options={["하얀 편", "보통", "어두운 편"]} />
                <DropDownInput data={data} setData={setData} data_name={"tattoo"} title={"문신 유무"} options={["없음", "있음"]} />
                <DropDownInput data={data} setData={setData} data_name={"fashion_style"} title={"패션 스타일"} options={["캐주얼", "댄디", "스트릿", "아메카지", "포멀", "모던", "여성스러운"]} />
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

export default Appearance;

const AppearanceData = {
    animal_image: null,
    double_eyelid: null,
    face_shape: null,
    body_type: null,
    skin_tone: null,
    tattoo: null,
    fashion_style: null,
}