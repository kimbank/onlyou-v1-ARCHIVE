import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TollOutlinedIcon from '@mui/icons-material/TollOutlined';
import { Container, Box } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import Image from 'next/image';
import Logo from "@/public/ONLYou.png";

const credit = 100


// Figma: Header
export function Header() {
    return (
        <AppBar position='fixed' sx={{
            backgroundColor: '#FFFFFF', height: 60,
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0 24px', width: '100%'
        }}>
            <Container disableGutters sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Toolbar sx={{ gap: 0.5, flexGrow: 1, marginTop: '1px' }}>
                    <Image src={Logo} alt="logo" width={83} height={18} />
                    {/* <div className='logo-title' style={{ marginTop: '-12px' }}>온리유</div> */}
                </Toolbar>

                <Box sx={{ display: 'flex', gap: 2 }}>
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
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0 24px', width: '100%'
        }}>
            <Container disableGutters sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Toolbar sx={{ gap: 0.5, flexGrow: 1, marginTop: '1px' }}>
                    <Image src={Logo} alt="logo" width={83} height={18} />
                    {/* <div className='logo-title' style={{ marginTop: '-12px' }}>온리유</div> */}
                </Toolbar>
            </Container>
        </AppBar>
    )
}
