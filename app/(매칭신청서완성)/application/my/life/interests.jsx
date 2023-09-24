"use client";

import React from "react";
import axios from "axios";

import { Typography, Container, Button } from "@mui/material";


export default function Interests({ data, setData, title = "!미정" }) {
    const [value, setValue] = React.useState("");

    React.useEffect(() => {
        if (value == "") { setData({ ...data, interests: null }); }
        else { setData({ ...data, interests: value }); }
    }, [value]);

    React.useEffect(() => {
        if (data.interests == null) setValue("");
        else setValue(data.interests);
    }, [data]);

    const handleChange = (newValue) => {
        if (newValue == value) {
            setValue("")
        }
        else if (value == "") {
            setValue(newValue)
        } else {
            let d = value.split(',').sort(function (a, b) { return Number(a) - Number(b) })
            if (d.includes(newValue)) {
                d.splice(d.indexOf(newValue), 1)
                setValue(d.join(','))
            } else {
                d.push(newValue)
                setValue(d.sort(function (a, b) { return Number(a) - Number(b) }).join(','))
            }
        }
    };


    return (
        <Container
            disableGutters
            sx={{
                display: "grid",
                gap: 1,
            }}
        >
            <Typography className="input-title">{title}</Typography>

            <Container
                disableGutters
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "8px",
                }}
            >
                <Button sx={sx} variant="contained" onClick={() => handleChange('0')} color={value.split(',').includes('0') ? "primary" : "secondary"}>여행</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('1')} color={value.split(',').includes('1') ? "primary" : "secondary"}>운동/스포츠</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('2')} color={value.split(',').includes('2') ? "primary" : "secondary"}>책</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('3')} color={value.split(',').includes('3') ? "primary" : "secondary"}>직무</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('4')} color={value.split(',').includes('4') ? "primary" : "secondary"}>외국/언어</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('5')} color={value.split(',').includes('5') ? "primary" : "secondary"}>영화/넷플릭스</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('6')} color={value.split(',').includes('6') ? "primary" : "secondary"}>콘서트/공연/뮤지컬</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('7')} color={value.split(',').includes('7') ? "primary" : "secondary"}>전시회</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('8')} color={value.split(',').includes('8') ? "primary" : "secondary"}>재테크</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('9')} color={value.split(',').includes('9') ? "primary" : "secondary"}>공예/만들기</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('10')} color={value.split(',').includes('10') ? "primary" : "secondary"}>음악/악기</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('11')} color={value.split(',').includes('11') ? "primary" : "secondary"}>댄스/무용</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('12')} color={value.split(',').includes('12') ? "primary" : "secondary"}>봉사</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('13')} color={value.split(',').includes('13') ? "primary" : "secondary"}>사교/인맥</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('14')} color={value.split(',').includes('14') ? "primary" : "secondary"}>차/오토바이</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('15')} color={value.split(',').includes('15') ? "primary" : "secondary"}>반려동물</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('16')} color={value.split(',').includes('16') ? "primary" : "secondary"}>게임/오락</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('17')} color={value.split(',').includes('17') ? "primary" : "secondary"}>사진/영상</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('18')} color={value.split(',').includes('18') ? "primary" : "secondary"}>요리</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('19')} color={value.split(',').includes('19') ? "primary" : "secondary"}>맛집/카페</Button>
                <Button sx={sx} variant="contained" onClick={() => handleChange('20')} color={value.split(',').includes('20') ? "primary" : "secondary"}>애니메이션</Button>
            </Container>
        </Container>
    );
}

const sx = {
    borderRadius: "8px",
    minHeight: "35px",
    minWidth: "40px",
    boxShadow: "none",
}
