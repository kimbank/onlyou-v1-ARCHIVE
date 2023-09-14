'use client'

import { Alert } from "@mui/material";
import { Button, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckIcon from '@mui/icons-material/Check';
import * as React from 'react';
import { useState, useEffect } from "react";
import { Container } from "@mui/material";


//Figma: Success notification
export function SuccessNotification({ alertMessage, visible, setVisible /* visible, setVisible useState를 page.js에서도 호출하기 위해 export */ }) {
    const [notificationHeight, setNotificationHeight] = useState(0); // 시작 시 위치
    const time = 2000; // notification이 내려왔을 때 대기하는 시간인데, 변경해도 됩니다
    const drop = () => {
        setNotificationHeight(72);
        setTimeout(() => setNotificationHeight(0), time);
        setTimeout(() => setVisible(false), time + 500)
    };

    useEffect(() => {
        if (visible) {
            drop();
        }
    }, [visible]);

    return (
        <Container disableGutters>
            {visible && (
                <Alert severity="success" sx={{
                    borderRadius: 2,
                    position: 'fixed',
                    top: `${notificationHeight}px`,
                    left: '24px',
                    right: '24px',
                    transition: 'top 0.5s ease-in-out',
                    maxWidth: '444px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    {alertMessage}
                </Alert>
            )}
        </Container>
    );
}


//Figma: Danger notification
export function DangerNotification({ alertMessage, visible, setVisible /* visible, setVisible useState를 page.js에서도 호출하기 위해 export */ }) {
    const [notificationHeight, setNotificationHeight] = useState(0); // 시작 시 위치
    const time = 2000; // notification이 내려왔을 때 대기하는 시간인데, 변경해도 됩니다
    const drop = () => {
        setNotificationHeight(72);
        setTimeout(() => setNotificationHeight(0), time);
        setTimeout(() => setVisible(false), time + 500)
    };

    useEffect(() => {
        if (visible) {
            drop();
        }
    }, [visible]);

    return (
        <Container disableGutters>
            {visible && (
                <Alert severity="error" sx={{
                    borderRadius: 2,
                    position: 'fixed',
                    top: `${notificationHeight}px`,
                    left: '24px',
                    right: '24px',
                    transition: 'top 0.5s ease-in-out',
                    maxWidth: '444px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    {alertMessage}
                </Alert>
            )}
        </Container>
    );
}



// Figma: Info text
// 이 버튼은 위 notification과 달리, 나왔다가 들어갔다 하는 컴포넌트가 아니라서 애니메이션이 없습니다.
export function InfoText({ title, alertMessage, shadow = true }) {
    return (
        <div>
            {/* 이슈: 버튼이 figma와 다르게 양 옆으로 화면을 체우지 않습니다. */}
            <Button
                variant='contained'
                color="secondary"
                sx={{
                    borderRadius: '8px',
                    // height: '33px',  // 수정: 230926 높이가 정해져 있어 Typograpy가 위 아래로 삐져 나오는 문제 발생.
                    padding: '8px 12px',
                    backgroundColor: '#F7F4F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: !shadow && 'none', // initial, inherit, none, unset
                }}
            >
                <InfoIcon sx={{
                    marginRight: 1,
                    color: '#FF7700'
                }} />
                {/* 수정: 230906 제목 추가 부분. 
                    div로 감싼 후 제목을 위해 Typography를 새로 만들어 제목을 추가했습니다.
                    이슈: 230906 제목 텍스트 css를 수정해야 합니다.
                */}
                <Container disableGutters sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                }}>
                    <Typography
                        variant='subtitle1'
                        className="caption"
                        align="left"
                        sx={{
                            color: '#3C3B3A'
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        className="caption"
                        sx={{
                            color: '#3C3B3A'
                        }}
                    >
                        {alertMessage}
                    </Typography>
                </Container>
            </Button>
        </div>
    )
}




// Figma: Danger mini notification
// 이 버튼은 위 notification과 달리, 나왔다가 들어갔다 하는 컴포넌트가 아니라서 애니메이션이 없습니다.
export function DangerMiniNotification({ alertMessage }) {
    return (
        <div>
            <Button
                variant='contained'
                color="secondary"
                sx={{
                    borderRadius: '8px',
                    height: '33px',
                    padding: '8px 12px',
                    backgroundColor: '#F7F4F2',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <WarningIcon sx={{
                    marginRight: 1,
                    color: '#FF8982'
                }} />
                <Typography
                    variant='subtitle1'
                    className="caption"
                    sx={{
                        color: '#FF8982'
                    }}
                >
                    {alertMessage}
                </Typography>
            </Button>
        </div>
    )
}




// Figma: Certification
// 인증마크입니다.
// 이 버튼은 위 notification과 달리, 나왔다가 들어갔다 하는 컴포넌트가 아니라서 애니메이션이 없습니다.
export function Certification({ alertMessage, shadow = false }) {
    return (
        <div>
            <Button
                variant='contained'
                color="secondary"
                sx={{
                    borderRadius: '8px',
                    height: '33px',
                    padding: '8px 12px',
                    backgroundColor: '#F7F4F2',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: !shadow && 'none'
                }}
            >
                <CheckIcon sx={{
                    marginRight: 1,
                    color: '#FF7700'
                }} />
                <Typography
                    variant='subtitle1'
                    className="caption"
                    sx={{
                        color: '#FF7700'
                    }}
                >
                    {alertMessage}
                </Typography>
            </Button>
        </div>
    )
}