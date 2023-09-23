"use client";

import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";


export default function ReligionValues({ data, setData }) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
        setData({ ...data, religion_values: event.target.value });
    };

    return (
        <Container
            disableGutters
            sx={{
                display: "grid",
                gap: 1,
            }}
        >
            <Typography className="input-title">종교의 중요성</Typography>
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
                        인생에서 종교는 중요하지 않아요
                    </MenuItem>
                    <MenuItem value={1}>
                        종교가 중요하긴 하지만, 가장 중요한 요소는 아니에요
                    </MenuItem>
                    <MenuItem value={2}>
                        종교가 매우 중요해요
                    </MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
}
