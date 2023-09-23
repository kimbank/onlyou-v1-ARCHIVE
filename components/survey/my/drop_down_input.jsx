"use client";

import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";


export function DropDownInput({ data, setData, data_name, title = "!미정", options = [], start_index = 0}) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
        setData({ ...data, [data_name] : event.target.value });
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

                    {options.map((option, index) => {
                        return (
                            <MenuItem value={index + start_index} key={(index + start_index).toString()}>
                                {option}
                            </MenuItem>
                        )
                    })}
                
                </Select>
            </FormControl>
        </Container>
    );
}
