// 버튼만 모아둔 페이지입니다.

'use client'

import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';

const ButtonText = '버튼';


// 공통
// prop으로 {onClick}, {buttonName} 넣으면 되는데,
    // {onClick}은 버튼을 클릭했을 때 실행되는 함수이고,
    // {buttonName}은 버튼에 쓰여있는 글씨(제목)입니다.
// UI 구성할 땐 고정된 width가 편할 것 같아서 일단 Full button은 320px, Half button은 160px로 고정해두었는데, 원하시면 바꾸시면 될 것 같습니다.
    // 참고로 Figma에선 Fill 사용해서 부모 요소를 채우도록 해두었습니다.




// Figma: Main Button
// CTA에 쓰이는 메인 버튼입니다.
export function MainButton({ onClick, buttonName, shadow = false }) {
    return (
        <div>
            <Button
                onClick={onClick}
                color="primary"
                variant='contained'
                sx={{
                    borderRadius: '12px',
                    height: '56px',
                    width: '100%',
                    boxShadow: !shadow && 'none', // initial, inherit, none, unset
                }}
            >
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontFamily: 'Pretendard-Semibold',
                        fontSize: '14px',
                        letterSpacing: '1.25px',
                    }}
                >
                    {buttonName}
                </Typography>
            </Button>
        </div>
    )
}




// Figma: Main half Button
export function MainHalfButton({ onClick, buttonName, shadow = false }) {
    return (
        <div>
            <Button
                onClick={onClick}
                color="primary"
                variant='contained'
                sx={{
                    borderRadius: '12px',
                    height: '56px',
                    width: '50%',
                    boxShadow: !shadow && 'none',
                }}
            >
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontFamily: 'Pretendard-Semibold',
                        fontSize: '14px',
                        letterSpacing: '1.25px',
                    }}
                >
                    {buttonName}
                </Typography>
            </Button>
        </div>
    )
}




// Figma: Sub Button
// 회색 계열의 서브버튼입니다.
export function SubButton({ onClick, buttonName, shadow = false, height = '56px', width = '100%' }) {
    return (
        <div>
            <Button
                onClick={onClick}
                color="secondary"
                variant='contained'
                sx={{
                    borderRadius: '12px',
                    height: height,
                    width: '100%',
                    boxShadow: !shadow && 'none',
                }}
            >
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontFamily: 'Pretendard-Semibold',
                        fontSize: '14px',
                        letterSpacing: '1.25px',
                    }}
                >
                    {buttonName}
                </Typography>
            </Button>
        </div>
    )
}




// Figma: Sub half Button
export function SubHalfButton({ onClick, buttonName, shadow = false, disabled = false }) {
    return (
        <div>
            <Button
                onClick={onClick}
                color="secondary"
                variant='contained'
                sx={{
                    borderRadius: '12px',
                    height: '56px',
                    width: '50%',
                    boxShadow: !shadow && 'none',
                }}
                disabled={disabled}
            >
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontFamily: 'Pretendard-Semibold',
                        fontSize: '14px',
                        letterSpacing: '1.25px',
                    }}
                >
                    {buttonName}
                </Typography>
            </Button>
        </div>
    )
}




// Figma: Edit Button
export function EditButton({ onClick, buttonName, shadow = false }) {
    return (
        <div>
            <Button
                onClick={onClick}
                color="secondary"
                variant='contained'
                sx={{
                    borderRadius: '8px',
                    height: '33px',
                    padding: '8px 12px',
                    boxShadow: !shadow && 'none',
                }}
            >
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontFamily: 'Pretendard-Semibold',
                        fontSize: '14px',
                        letterSpacing: '1.25px',
                        textDecoration: 'none',
                    }}
                >
                    {buttonName}
                    <ArrowForwardIosIcon sx={{
                        width: '10px',
                        height: '10px',
                        color: '#3C3B3A',
                    }} />
                </Typography>
            </Button>
        </div>
    )
}




// Figma: Upload Button
export function UploadButton({ onClick, buttonName, shadow = false }) {
    return (
        <div>
            <Button
                onClick={onClick}
                color="secondary"
                variant='contained'
                sx={{
                    borderRadius: '16px',
                    width: '120px',
                    height: '80px',
                    boxShadow: !shadow && 'none',
                }}
            >
                <CloudUploadIcon sx={{
                    width: '40px',
                }} />
            </Button>
        </div>
    )
}





// Figma: List Button
export function ListButton({ onClick, buttonName, shadow = false }) {
    return (
        <div>
            <Button
                onClick={onClick}
                color="secondary"
                variant='contained'
                sx={{
                    borderRadius: '8px',
                    width: '100%',
                    height: '33px',
                    padding: '8px 12px',
                    justifyContent: 'left',
                    boxShadow: !shadow && 'none',
                }}
            >
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontFamily: 'Pretendard-Semibold',
                        fontSize: '14px',
                        letterSpacing: '1.25px',
                        textAlign: 'left'
                    }}
                >
                    {buttonName}
                </Typography>
            </Button>
        </div>
    )
}




// Figma: Sub mini Button
// 원래 셀렉티드에 사용할 수 있는 button group으로 만들려고 했는데, 그룹에 버튼이 몇개씩 들어갈지 몰라서 우선 그룹 속 버튼 요소만 만들어두었습니다.
export function SubMiniButton({ onClick, buttonName, shadow = false, disabled = false }) {
    return (
        <div>
            <Button
                onClick={onClick}
                color="secondary"
                variant='contained'
                sx={{
                    borderRadius: '8px',
                    height: '33px',
                    padding: '8px 12px',
                    boxShadow: !shadow && 'none',
                }}
                disabled={disabled}
            >
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontFamily: 'Pretendard-Semibold',
                        fontSize: '14px',
                        letterSpacing: '1.25px',
                    }}
                >
                    {buttonName}
                </Typography>
            </Button>
        </div>
    )
}

export function SubMiniFullButton({ onClick, buttonName, shadow = false, disabled = false }) {
    return (
        <Button
            onClick={onClick}
            color="secondary"
            variant='contained'
            sx={{
                borderRadius: '8px',
                height: '33px',
                padding: '8px 12px',
                width: '100%',
                boxShadow: !shadow && 'none',
                justifyContent: 'flex-start',
            }}
            disabled={disabled}
        >
            <Typography
                variant='subtitle1'
                align='left'
                sx={{
                    fontFamily: 'Pretendard-Semibold',
                    fontSize: '14px',
                    letterSpacing: '1.25px',
                }}
            >
                {buttonName}
            </Typography>
        </Button>
    )
}

export function MainMiniButton({ onClick, buttonName, shadow = false, disabled = false }) {
    return (
        <div>
            <Button
                onClick={onClick}
                color="primary"
                variant='contained'
                sx={{
                    borderRadius: '8px',
                    height: '33px',
                    padding: '8px 12px',
                    boxShadow: !shadow && 'none',
                }}
                disabled={disabled}
            >
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontFamily: 'Pretendard-Semibold',
                        fontSize: '14px',
                        letterSpacing: '1.25px',
                    }}
                >
                    {buttonName}
                </Typography>
            </Button>
        </div>
    )
}

export function MainMiniCancelButton({ onClick, buttonName, shadow = false, disabled = false }) {
    return (
        <div>
            <Button
                onClick={onClick}
                color="primary"
                variant='contained'
                sx={{
                    borderRadius: '8px',
                    height: '33px',
                    padding: '8px 12px',
                    boxShadow: !shadow && 'none',
                }}
                disabled={disabled}
            >
                <Typography
                    variant='subtitle1'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontFamily: 'Pretendard-Semibold',
                        fontSize: '14px',
                        letterSpacing: '1.25px',
                    }}
                >
                    {buttonName}
                    <ClearIcon sx={{
                        fontSize: 'large',
                        color: '#fff',
                        marginLeft: '8px',
                        alignSelf: 'center',
                    }} />
                </Typography>
            </Button>
        </div>
    )
}

export function MainSelectButton({ onClick, buttonName, shadow = false, disabled = false }) {
    return (
        <Button
            onClick={onClick}
            color="primary"
            variant='contained'
            sx={{
                borderRadius: '8px',
                height: '33px',
                padding: '8px 12px',
                width: '100%',
                boxShadow: !shadow && 'none',
                flex: '1',
            }}
            disabled={disabled}
        >
            <Typography
                variant='subtitle1'
                sx={{
                    fontFamily: 'Pretendard-Semibold',
                    fontSize: '14px',
                    letterSpacing: '1.25px',
                }}
            >
                {buttonName}
            </Typography>
        </Button>
    )
}

export function SubSelectButton({ onClick, buttonName, shadow = false, disabled = false }) {
    return (
        <Button
            onClick={onClick}
            color="secondary"
            variant='contained'
            sx={{
                borderRadius: '8px',
                height: '33px',
                padding: '8px 12px',
                width: '100%',
                boxShadow: !shadow && 'none',
                flex: '1',
            }}
            disabled={disabled}
        >
            <Typography
                variant='subtitle1'
                align='left'
                sx={{
                    fontFamily: 'Pretendard-Semibold',
                    fontSize: '14px',
                    letterSpacing: '1.25px',
                }}
            >
                {buttonName}
            </Typography>
        </Button>
    )
}