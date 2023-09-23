"use client";

import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";


export default function AthleticLife({ data, setData }) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
        setData({ ...data, athletic_life: event.target.value });
    };

    return (
        <Container
            disableGutters
            sx={{
                display: "grid",
                gap: 1,
            }}
        >
            <Typography className="input-title">운동 생활</Typography>
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
                        중요성엔 공감하지만, 규칙적으로 하고 있진 않다
                    </MenuItem>
                    <MenuItem value={1}>
                        운동을 규칙적으로 꾸준히 한다.
                    </MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
}
