"use client";

import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";


export default function MarriageValues({ data, setData }) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
        setData({ ...data, marriage_values: event.target.value });
    };

    return (
        <Container
            disableGutters
            sx={{
                display: "grid",
                gap: 1,
            }}
        >
            <Typography className="input-title">결혼 가치관</Typography>
            <FormControl>
                <Select
                    labelId="select-label"
                    id="select"
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                        borderRadius: "12px",
                        boxShadow: `0 0 0 1px #B2B0AE`,
                        height: "43px",
                    }}
                >
                    <MenuItem value={null} disabled>
                        <Typography className="basic">선택해주세요.</Typography>
                    </MenuItem>


                    <MenuItem value={0}>
                        비혼주의에요
                    </MenuItem>
                    <MenuItem value={1}>
                        아직 결혼은 이르다고 생각해요
                    </MenuItem>
                    <MenuItem value={2}>
                        사랑한다면 3년 내로 결혼도 생각할 것 같아요
                    </MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
}
