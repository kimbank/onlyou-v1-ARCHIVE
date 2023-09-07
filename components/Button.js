// 버튼만 모아둔 페이지입니다.

'use client'

import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ButtonText = '버튼';


// 공통
// prop으로 {onClick}, {buttonName} 넣으면 되는데,
    // {onClick}은 버튼을 클릭했을 때 실행되는 함수이고,
    // {buttonName}은 버튼에 쓰여있는 글씨(제목)입니다.
// UI 구성할 땐 고정된 width가 편할 것 같아서 일단 Full button은 320px, Half button은 160px로 고정해두었는데, 원하시면 바꾸시면 될 것 같습니다.
    // 참고로 Figma에선 Fill 사용해서 부모 요소를 채우도록 해두었습니다.




// Figma: Main Button
// CTA에 쓰이는 메인 버튼입니다.
export function MainButton({ onClick, buttonName }) {
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
export function MainHalfButton({onClick, buttonName}) {
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
export function SubButton({onClick, buttonName}) {
    return (
        <div>
            <Button
                onClick={onClick}
                color="secondary"
                variant='contained'
                sx={{
                    borderRadius: '12px',
                    height: '56px',
                    width: '100%',
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
export function SubHalfButton({onClick, buttonName, disabled = false}) {
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
export function EditButton({onClick, buttonName}) {
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
export function UploadButton({onClick, buttonName}) {
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
export function ListButton({onClick, buttonName}) {
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
                    justifyContent: 'left'
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
export function SubMiniButton({onClick, buttonName, disabled = false}) {
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

export function MainMiniButton({onClick, buttonName, disabled = false}) {
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