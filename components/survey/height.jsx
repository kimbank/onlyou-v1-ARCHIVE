'use client'

import React, { useState, useEffect } from 'react';

import { Typography, Container, Box, Slider } from "@mui/material";
import { Await } from 'react-router-dom';


export default function HeightRange({ data, setData }) {
    const [value, setValue] = React.useState([160, 185]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setData({ ...data, height_s: newValue[0], height_e: newValue[1] });
    };

    return (
        <Container disableGutters sx={{
            display: 'flex', 
            flexDirection: 'column' 
        }}>
            {/* <Typography className='input-title'>
            {buttonName}
            </Typography> */}
            <Container sx={{
                display: 'grid',
            }}>
                <Box sx={{ width: 300 }}>
                    <Slider
                        // getAriaLabel={() => 'range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        // getAriaValueText={valueText}
                        min={160}
                        max={185}
                    />
                </Box>
                <Box sx={{ width: 300, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography className='caption' variant="body2">{`${value[0] > 160 ? value[0] : value[0] +'-'}`}</Typography>
                    <Typography className='caption' variant="body2">{`${value[1] < 185 ? value[1] : value[1] +'+'}`}</Typography>
                </Box>
            </Container>
            <button onClick={() => console.log(data)}>데이터 확인</button>
        </Container>
    );
}