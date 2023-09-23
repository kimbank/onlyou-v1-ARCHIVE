"use client";

import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";


export default function OppositeFriendsValues({ data, setData }) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
        setData({ ...data, opposite_friends_values: event.target.value });
    };

    return (
        <Container
            disableGutters
            sx={{
                display: "grid",
                gap: 1,
            }}
        >
            <Typography className="input-title">이성 친구 가치관</Typography>
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
                        친한 친구라면 술, 영화도 괜찮아요
                    </MenuItem>
                    <MenuItem value={1}>
                        식사, 커피 외에는 이해하기 어려워요
                    </MenuItem>
                    <MenuItem value={2}>
                        친한 친구라도 단둘이 만나는 것은 자제해야 해요
                    </MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
}
