import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TollOutlinedIcon from '@mui/icons-material/TollOutlined';
import { Container, Box } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import Image from 'next/image';
import Logo from "@/public/ONLYou.svg";

const credit = 100


// Figma: Header
export function Header() {
    return (
        <AppBar position='fixed' sx={{
            backgroundColor: '#FFFFFF', height: 60,
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '720px', left: '50%', transform: 'translate(-50%, 0)', boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.25)'
        }}>
            <Container disableGutters sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Toolbar sx={{ gap: 0.5, flexGrow: 1, marginTop: '6px', padding: '0 32px' }}>
                    <a href='/'>
                        <Image src={Logo} alt="logo" width={84} height={30} />
                    </a>
                    {/* <div className='logo-title' style={{ marginTop: '-12px' }}>온리유</div> */}
                </Toolbar>

                <Box sx={{ display: 'flex', gap: 2, paddingRight: '32px' }}>
                    <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <Typography className='credit' sx={{ color: '#FF7700' }} >{ credit }</Typography>
                        <TollOutlinedIcon sx={{ color: '#FF7700' }} />
                    </Box>

                    <NotificationsNoneIcon sx={{ color: '#FF7700' }} />
                    <HelpOutlineIcon sx={{ color: '#FF7700' }} />
                </Box>

            </Container>
        </AppBar>
    )
}

export function GuestHeader() {
    return (
        <AppBar position='fixed' sx={{
            backgroundColor: '#FFFFFF', height: 60,
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '720px', left: '50%', transform: 'translate(-50%, 0)', boxShadow: '0px 4px 4px -4px gray'
        }}>
            <Container disableGutters sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Toolbar sx={{ gap: 0.5, flexGrow: 1, marginTop: '6px', padding: '0 32px' }}>
                    <a href='/'>
                        <Image src={Logo} alt="logo" width={84} height={30} />
                    </a>
                    {/* <div className='logo-title' style={{ marginTop: '-12px' }}>온리유</div> */}
                </Toolbar>
            </Container>
        </AppBar>
    )
}
