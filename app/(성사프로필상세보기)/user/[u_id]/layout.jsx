'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SubMiniButton, MainButton } from '@/components/Button';
import { CheckedCheckbox, DefaultCheckbox } from '@/components/Checkbox';
import { RatingToggle } from '@/components/Steps';
import Modal from '@/components/Modal';
import path from 'path';

function Title({ name, pathName }) {
    return (
        <Container disableGutters sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            {(pathName.endsWith('letter')) && <div className='heading2'>{name}님께서<br />편지를 보냈어요!</div>}
            {(pathName.endsWith('detail')) && <div className='heading2'>{name}님의<br />상세 정보에요</div>}
            {(pathName.endsWith('photo')) && <div className='heading2'>{name}님의<br />사진이에요</div>}
        </Container>);
}

function ButtonGrop({ u_id, pathName }) {


    return (
        <Container disableGutters sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: "10px",
        }}>
            {!(pathName.endsWith('letter')) ?
                <Link href={`/user/${u_id}/letter`}>
                    <SubMiniButton buttonName='편지' value='letter' />
                </Link> :
                <SubMiniButton buttonName='편지' value='letter' />
            }
            {!(pathName.endsWith('detail')) ?
                <Link href={`/user/${u_id}/detail`}>
                    <SubMiniButton buttonName='상세' value='detail' />
                </Link> :
                <SubMiniButton buttonName='상세' value='detail' />
            }
            {!(pathName.endsWith('photo')) ?
                <Link href={`/user/${u_id}/photo`}>
                    <SubMiniButton buttonName='사진' value='photo' />
                </Link> :
                <SubMiniButton buttonName='사진' value='photo' />
            }
        </Container>);
}

function AcceptItem({ setAcceptFinal }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <Container disableGutters sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: "8px",
        }}>
            <CheckedCheckbox onClick={() => setShowModal(true)} buttonName='taykim01님 수락하기' />
            <DefaultCheckbox buttonName='거절하기' />
            <Modal clicked={showModal} setClicked={setShowModal}>
                <Typography className='heading2' style={{ marginRight: '56px' }}>정말로 선택하시겠어요?</Typography>
                <Typography className='basic' style={{ color: '#666563' }}>한 번 선택하면 변경할 수 없습니다.</Typography>
                <MainButton buttonName='선택하기' onClick={() => { setShowModal(false); setAcceptFinal(true) }} />
            </Modal>
        </Container>);
}


export default function Layout({ children, params }) {
    const [user, setUser] = useState([]);
    const [acceptFinal, setAcceptFinal] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        axios.get(`/api/user/detail/${params.u_id}`)
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            });
    }, []);


    return (
        <Container disableGutters sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: "48px",
        }}>
            {/* 제목입니다. */}
            <Title name={params.u_id} pathName={pathName} />
            {/* 주황 박스 안의 내용 입니다. */}
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: "24px",
                border: 1,
                padding: "24px",
                gap: '48px',
                borderColor: "#FFC999"
            }}>
                <ButtonGrop u_id={params.u_id} pathName={pathName} />
                {children}
                <AcceptItem setAcceptFinal={setAcceptFinal} />
            </Container>
            <Container disableGutters sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: "8px",
            }}>
                <RatingToggle />
            </Container>
        </Container>
    )
}
