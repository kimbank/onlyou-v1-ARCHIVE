'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";
import { Typography, Backdrop, CircularProgress } from '@mui/material';

import { MainButton, SubButton } from '@/components/Button';
import { DangerNotification } from '@/components/Notification';
import Modal from '@/components/Modal';

import { DropDownInput } from "@/components/survey/my/drop_down_input";
import { TextInput } from '@/components/survey/my/text_input';

import axios from 'axios';

function canProceedToNextPage(data) {
    for (const key in data) {
        if (data[key] === null || data[key] === '') {
            return false; // 하나라도 null 값이 있으면 다음 페이지로 못감
        }
    }
    return true; // 모든 값이 null이 아니면 다음 페이지로 갈 수 있음
}

const Other = () => {
    const [showModal, setShowModal] = useState(false); // 버튼을 눌렀을 때 모달창이 뜨는데, 모달창에 들어갈 내용을 적어놓은 것
    const [data, setData] = React.useState(OtherData);
    const [dangerMessage, setDangerMessage] = React.useState('');
    const [dangerVisible, setDangerVisible] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const canProceed = canProceedToNextPage(data); // 다음 페이지로 갈 수 있는지 여부

    React.useEffect(() => {
        axios.get('/api/application/my/other')
            .then((res) => {
                setData(res.data);
                setOpen(false);
            })
    }, []);

    return (
        <Container
            disableGutters
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "64px",
            }}
        >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <DangerNotification alertMessage={dangerMessage} visible={dangerVisible} setVisible={setDangerVisible} />

            {/* <button onClick={() => console.log(data)}>정보 보기</button> */}

            <Typography className='heading2'>기타 정보 입력하기</Typography>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
            }}>
                <DropDownInput data={data} setData={setData} data_name={"information_before_meeting"} title={"만나기 전 정보"} options={["!미정"]} />
                <TextInput data={data} setData={setData} data_name={"kakao_id"} title={"카카오톡 아이디"} />
            </Container>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}>
                <Typography className='heading3'> 카카오톡 아이디 찾는 법 </Typography>
                <Typography className='basic' style={{ color: '#666563' }}>카카오톡 → 친구 추가 → 내 아이디 확인</Typography>
                <img src="/kakaotalk1.png" />
            </Container>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}>
                {canProceed ?
                    <MainButton buttonName="마침" onClick={() => setShowModal(true)} />
                    :
                    <MainButton buttonName="마침" onClick={() => { setDangerMessage('비어 있는 항목이 존재합니다'); setDangerVisible(true) }} />
                }
                <Link href={`application/my/appearance`}>
                    <SubButton buttonName="이전 단계" />
                </Link>
            </Container>
            <Modal clicked={showModal} setClicked={setShowModal}>
                <Typography className='heading2' style={{ marginRight: '56px' }}>본인 정보를<br />모두 입력해주셨어요!</Typography>
                <Typography className='basic' style={{ color: '#666563' }}>이제 회원님의 이상형을 말씀해주세요</Typography>
                {/* <Link > */}
                <MainButton buttonName='이상형 입력하기' onClick={() => setShowModal(false)} />
                {/* </Link> */}
            </Modal>
        </Container>
    );
}

export default Other;

const OtherData = {
    information_before_meeting: null,
    kakao_id: null,
}