'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

import { SubMiniButton } from '@/components/Button';

function ButtonGrop({ where }) {

    return (
        <Container disableGutters sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: "10px",
        }}>
            {!(where === 'letter') ? 
                <Link href={`/user/${u_id}/letter`}> 
                    <SubMiniButton buttonName='편지' value='letter' />
                </Link> :
                <SubMiniButton buttonName='편지' value='letter' />
            }
        </Container>);
}

export default ButtonGrop;  