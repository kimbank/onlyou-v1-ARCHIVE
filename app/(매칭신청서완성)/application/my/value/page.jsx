'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";
import { Typography, Backdrop, CircularProgress } from "@mui/material";

import { MainButton } from '@/components/Button';
import { DangerNotification } from '@/components/Notification';

import { DropDownInput } from '@/components/survey/my/drop_down_input';

import axios from 'axios';

function canProceedToNextPage(data) {
    for (const key in data) {
        if (data[key] === null || data[key] === '') {
            return false; // 하나라도 null 값이 있으면 다음 페이지로 못감
        }
    }
    return true; // 모든 값이 null이 아니면 다음 페이지로 갈 수 있음
}

const Value = () => {
    const [data, setData] = React.useState(ValueData);
    const [dangerMessage, setDangerMessage] = React.useState('');
    const [dangerVisible, setDangerVisible] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const canProceed = canProceedToNextPage(data); // 다음 페이지로 갈 수 있는지 여부

    React.useEffect(() => {
        axios.get('/api/application/my/values')
            .then((res) => {
                setData(res.data);
                setOpen(false);
            })
    }, []);

    const handleNext = () => {
        if (canProceed) {
            axios.patch('/api/application/my/values', data)
                .then((res) => {
                    if (res.status == 200) {
                        window.location.href = '/application/my/life';
                    } else {
                        setDangerMessage('서버 오류가 발생했습니다.');
                        setDangerVisible(true);
                    }
                })
        } else {
            setDangerMessage('비어 있는 항목이 존재합니다');
            setDangerVisible(true);
        }
    }

    return (
        <>
            <Container
                disableGutters
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "64px",
                }}
            >
                {/* <button onClick={() => console.log(data)}>정보 보기</button> */}
                <Typography className="heading2"> 가치관 정보 입력하기 </Typography>

                <Container disableGutters sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                }}>
                    <DropDownInput data={data} setData={setData} data_name={"marriage_values"} title={"결혼 가치관"} options={["비혼주의에요", "아직 결혼은 이르다고 생각해요", <>사랑한다면 3년 내로<br/> 결혼도 생각할 것 같아요</>]} />
                    <DropDownInput data={data} setData={setData} data_name={"religious_values"} title={"종교의 중요성"} options={["인생에서 종교는 중요하지 않아요", <>종교가 중요하긴 하지만, <br/>가장 중요한 요소는 아니에요</>, "종교가 매우 중요해요"]} />
                    <DropDownInput data={data} setData={setData} data_name={"opposite_friends_values"} title={"이성 친구 가치관"} options={["친한 친구라면 술, 영화도 괜찮아요", "식사, 커피 외에는 이해하기 어려워요", <>친한 친구라도 단둘이<br/> 만나는 것은 자제해야 해요</>]} />
                    <DropDownInput data={data} setData={setData} data_name={"political_values"} title={"정치적 성향"} options={["관심 없어요", "진보에 가까워요", "보수에 가까워요", "중도에 가까워요"]} />
                    <DropDownInput data={data} setData={setData} data_name={"consumption_values"} title={"소비 가치관"} options={["조금 부족하더라도 편안한 미래를 위해 절약하고 싶어요", "지금 아니면 못하는 것들에 충분히 투자하고 싶어요"]} />
                    <DropDownInput data={data} setData={setData} data_name={"career_family_values"} title={"커리어와 가정 가치관"} options={["두 사람 모두 가정이 커리어보다 우선이었으면 해요", "두 사람 중 한 명은 커리어보다 가정에 신경을 썼으면 해요"]} />
                </Container>

                <MainButton buttonName='다음단계' onClick={() => handleNext()} />
            </Container>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
            <DangerNotification alertMessage={dangerMessage} visible={dangerVisible} setVisible={setDangerVisible} />
        </>
    );
}

export default Value;

const ValueData = {
    marriage_values: null,
    religious_values: null,
    opposite_friends_values: null,
    political_values: null,
    consumption_values: null,
    career_family_values: null,
}