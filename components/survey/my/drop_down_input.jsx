"use client";

import React from "react";
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
        // setData({ ...data, [data_name] : event.target.value });
    };

    React.useEffect(() => {
        setData({ ...data, [data_name] : value });
    }, [value]);

    React.useEffect(() => {
        setValue(data[data_name]);
    }, [data]);
    
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
                        <Typography className="basic" color={'InactiveBorder'} fontStyle={'italic'}>선택해주세요.</Typography>
                    </MenuItem>

                    {options.map((option, index) => {
                        return (
                            <MenuItem value={index + start_index} key={(index + start_index).toString()}>
                                <Typography className="basic" sx={{ overflow: 'hidden', textOverflow:'ellipsis'}}>
                                    {option}
                                </Typography>
                            </MenuItem>
                        )
                    })}
                
                </Select>
            </FormControl>
        </Container>
    );
}
