"use client";

import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";


export default function CareerFamilyValues({ data, setData }) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
        setData({ ...data, career_family_values: event.target.value });
    };

    return (
        <Container
            disableGutters
            sx={{
                display: "grid",
                gap: 1,
            }}
        >
            <Typography className="input-title">커리어와 가정 가치관</Typography>
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
                        두 사람 모두 가정이 커리어보다 우선이었으면 해요
                    </MenuItem>
                    <MenuItem value={1}>
                        두 사람 중 한 명은 커리어보다 가정에 신경을 썼으면 해요
                    </MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
}
