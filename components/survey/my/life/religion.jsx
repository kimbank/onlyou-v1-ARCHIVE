"use client";

import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";


export default function Religion({ data, setData }) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
        setData({ ...data, religion: event.target.value });
    };

    return (
        <Container
            disableGutters
            sx={{
                display: "grid",
                gap: 1,
            }}
        >
            <Typography className="input-title">종교</Typography>
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
                        무교
                    </MenuItem>
                    <MenuItem value={0}>
                        기독교
                    </MenuItem>
                    <MenuItem value={0}>
                        천주교
                    </MenuItem>
                    <MenuItem value={0}>
                        불교
                    </MenuItem>
                    <MenuItem value={0}>
                        원불교
                    </MenuItem>
                    <MenuItem value={0}>
                        기타
                    </MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
}
