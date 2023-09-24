"use client";

import React from "react";
import {
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";
import TextField from '@mui/material/TextField';

export function TextInput({ data, setData, data_name, title = "!미정" }) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
        setData({ ...data, [data_name]: event.target.value });
    };

    // React.useEffect(() => {
    //     if (value == "") { setData({ ...data, kakao_id: null }); }
    //     else { setData({ ...data, kakao_id: value }); }
    // }, [value]);

    React.useEffect(() => {
        if (data.kakao_id == null) setValue(null);
        else setValue(data.kakao_id);
    }, [data]);

    return (
        <FormControl>
            <TextField
                required
                id="standard-required"
                // label={title}
                variant="standard"
                onChange={handleChange}
                value={value}
                placeholder={title}
            />
        </FormControl>
    );
}