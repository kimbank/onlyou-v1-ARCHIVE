'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';

import { DropdownInput, TextInput } from '@/components/Input';
import { MainButton, SubButton } from '@/components/Button';
import Modal from '@/components/Modal';

const DatingStyle = () => {

    // 버튼을 눌렀을 때 모달창이 뜨는데, 모달창에 들어갈 내용을 적어놓은 것
    const [showModal, setShowModal] = useState(false);

    return (
        <Container disableGutters sx={{
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '64px',
        }}>
            <h1 className="heading2">기타 정보 입력하기</h1>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
            }}>
                <DropdownInput buttonName={'만나기 전 정보'} />
                <TextInput buttonName={'카카오톡 아이디'} />
            </Container>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}>
                <div className='heading3'>카카오톡 아이디 찾는 법</div>
                <div className='basic' style={{ color: '#666563' }}>카카오톡 → 친구 추가 → 내 아이디 확인</div>
                <img src="/kakaotalk1.png" />
            </Container>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}>
                <MainButton buttonName="마침" onClick={() => setShowModal(true)} />
                <Link href={`application/my/appearance`}>
                    <SubButton buttonName="이전 단계" />
                </Link>
            </Container>
            <Modal clicked={showModal} setClicked={setShowModal}>
                <Typography className='heading2' style={{ marginRight: '56px' }}>본인 정보를<br />모두 입력해주셨어요!</Typography>
                <Typography className='basic' style={{ color: '#666563' }}>이제 회원님의 이상형을 말씀해주세요</Typography>
                <Link >
                    <MainButton buttonName='이상형 입력하기' onClick={() => setShowModal(false)} />
                </Link>
            </Modal>
        </Container>
    );
}

export default DatingStyle;