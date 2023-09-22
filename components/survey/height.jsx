'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Typography, Container, Box, Slider } from "@mui/material";


export default function HeightRange({ data, setData }) {
    const [value, setValue] = React.useState([160, 185]);
    const [weight, setWeight] = useState(null);
    useEffect(() => {
        axios.get('/api/application/target/height')
            .then(res => {
                if (res.data.height_s !== null && res.data.height_e !== null && res.data.height_w !== null) {
                    setValue([res.data.height_s, res.data.height_e]);
                    setWeight(res.data.height_w);
                    setData({ ...data, height_s: res.data.height_s, height_e: res.data.height_e, height_w: res.data.height_w });
                }
            });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setData({ ...data, height_s: newValue[0], height_e: newValue[1] });
    };

    return (
        <Container disableGutters sx={{
            display: 'flex', 
            flexDirection: 'column',
            width: '100%',
        }}>
            <Container sx={{
                display: 'grid',
            }}>
                <Box sx={{ width: '100%' }}>
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
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography className='caption' variant="body2">{`${value[0] > 160 ? value[0] : value[0] +'-'}`}</Typography>
                    <Typography className='caption' variant="body2">{`${value[1] < 185 ? value[1] : value[1] +'+'}`}</Typography>
                </Box>
            </Container>
            <button onClick={() => console.log(data)}>데이터 확인</button>
        </Container>
    );
}