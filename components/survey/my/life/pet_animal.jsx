"use client";

import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";


export default function PetAnimal({ data, setData }) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
        setData({ ...data, pet_animal: event.target.value });
    };

    return (
        <Container
            disableGutters
            sx={{
                display: "grid",
                gap: 1,
            }}
        >
            <Typography className="input-title">반려동물</Typography>
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
                        키우기 어렵습니다
                    </MenuItem>
                    <MenuItem value={1}>
                        키우지 않으나 반려동물에 거부감은 없습니다
                    </MenuItem>
                    <MenuItem value={2}>
                        한 마리 키웁니다
                    </MenuItem>
                    <MenuItem value={3}>
                        두 마리 이상 키웁니다.
                    </MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
}
