'use client'

import { Select, MenuItem, FormControl } from '@mui/material';
import React from 'react';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Input } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/joy/Box';
import { TextField } from '@mui/material';
import { Slider } from '@mui/material';
import { Radio } from '@mui/material';

const placeholder = '선택하세요'
const options = ['op1', 'op2', 'op3']




// Figma: Dropdown
export function DropdownInput({ buttonName }) {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Container disableGutters sx={{
            display: 'grid',
            gap: 1
        }}>
            <Typography className='input-title'>
                {buttonName}
            </Typography>
            <FormControl>
                <Select
                    labelId="select-label"
                    id="select"
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                        borderRadius: '12px',
                        boxShadow: `0 0 0 1px #B2B0AE`,
                    }}
                >
                    <MenuItem value="" disabled>
                        <Typography className='basic'>{placeholder}</Typography>
                    </MenuItem>

                    {options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
        </Container>
    );
}




// Figma: Text input
export function TextInput({ buttonName, placeholder, setValue, disabled = false }) {
    return (
        <Container disableGutters sx={{
            display: 'grid',
            gap: 1
        }}>
            <Typography className='input-title'>
            {buttonName}
            </Typography>
            <Input placeholder={placeholder} onChange={(e) => setValue(e.target.value)} disabled={disabled} />
        </Container>
    );
}




// Figma: Long text
// 세로 공간을 많이 차지하는게 좋지 않을 것 같아서 글이 세로로 늘어날수록 컴포넌트도 세로로 늘어나도록 해두었습니다.
export function LongText({ buttonName, placeholder }) {
    return (
        <Container disableGutters
        sx={{
            display: 'grid',
            gap: 1,
        }}
        >
            <Typography className='input-title'>
                {buttonName}
            </Typography>
            <TextField sx={{ minHeight: '80px' }} multiline InputProps={{ sx: { borderRadius: '12px'} }}
                placeholder={placeholder}>
            </TextField>
        </Container>
    )
}



// Figma: Range
export function Range({ buttonName }) {
    const [value, setValue] = React.useState([160, 185]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const length = (v) => `${v}`;

    return (
        <Container disableGutters sx={{ display: 'grid', gap: 1 }}>
            <Typography className='input-title'>
            {buttonName}
            </Typography>
            <Container sx={{
                display: 'grid',
            }}>
                <Box sx={{ width: 320 }}>
                    <Slider
                        getAriaLabel={() => 'range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valueText}
                        max={185}
                        min={160}
                    />
                </Box>
                <Box sx={{ width: 320, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography className='caption' variant="body2">{`${value[0] > 160 ? value[0] : value[0] +'-'}`}</Typography>
                    <Typography className='caption' variant="body2">{`${value[1] < 185 ? value[1] : value[1] +'+'}`}</Typography>
                </Box>
            </Container>
        </Container>
    );
}

export function AgeRange({ buttonName }) {
    const [value, setValue] = React.useState([24, 35]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const length = (v) => `${v}`;

    return (
        <Container disableGutters sx={{ display: 'grid', gap: 1 }}>
            <Typography className='input-title'>
            {buttonName}
            </Typography>
            <Container sx={{
                display: 'grid',
            }}>
                <Box sx={{ width: 320 }}>
                    <Slider
                        getAriaLabel={() => 'range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valueText}
                        max={24}
                        min={35}
                    />
                </Box>
                <Box sx={{ width: 320, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography className='caption' variant="body2">{`${value[0] > 24}`}</Typography>
                    <Typography className='caption' variant="body2">{`${value[1] < 35 ? value[1] : value[1] +'+'}`}</Typography>
                </Box>
            </Container>
        </Container>
    );
}

export function HeightRange({ buttonName }) {
    const [value, setValue] = React.useState([160, 185]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const length = (v) => `${v}`;

    return (
        <Container disableGutters sx={{ display: 'grid', gap: 1 }}>
            <Typography className='input-title'>
            {buttonName}
            </Typography>
            <Container sx={{
                display: 'grid',
            }}>
                <Box sx={{ width: 320 }}>
                    <Slider
                        getAriaLabel={() => 'range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valueText}
                        max={185}
                        min={160}
                    />
                </Box>
                <Box sx={{ width: 320, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography className='caption' variant="body2">{`${value[0] > 160 ? value[0] : value[0] +'-'}`}</Typography>
                    <Typography className='caption' variant="body2">{`${value[1] < 185 ? value[1] : value[1] +'+'}`}</Typography>
                </Box>
            </Container>
        </Container>
    );
}

export function DrinkRange({ buttonName }) {
    const [value, setValue] = React.useState([0, 2]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const length = (v) => `${v}`;

    return (
        <Container disableGutters sx={{ display: 'grid', gap: 1 }}>
            <Typography className='input-title'>
            {buttonName}
            </Typography>
            <Container sx={{
                display: 'grid',
            }}>
                <Box sx={{ width: 320 }}>
                    <Slider
                        getAriaLabel={() => 'range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valueText}
                        max={2}
                        min={0}
                    />
                </Box>
                <Box sx={{ width: 320, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography className='caption' variant="body2">{`${value[0]}`}</Typography>
                    <Typography className='caption' variant="body2">{`${value[1]}`}</Typography>
                </Box>
            </Container>
        </Container>
    );
}



// additional function for Range
function valueText(value) {
    return `${value}`;
}


export function RadioButtons({ left, right }) {
    const [selectedValue, setSelectedValue] = React.useState('0');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    return (
        <Container disableGutters sx={{
            display: 'row',
            gap: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Radio {...controlProps('-2')}
                    sx={{
                        '& .MuiSvgIcon-root': {
                            fontSize: 28,
                        },
                    }}
                />
                <Radio {...controlProps('-1')} />
                <Radio {...controlProps('0')} size="small" />
                <Radio {...controlProps('1')} />
                <Radio
                    {...controlProps('2')}
                    sx={{
                        '& .MuiSvgIcon-root': {
                            fontSize: 28,
                        },
                    }}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography className='caption' variant="body2">{left}</Typography>
                <Typography className='caption' variant="body2">{right}</Typography>
            </Box>
        </Container>
    );
}

