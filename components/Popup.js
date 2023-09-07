'use client'

import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { MainButton } from './Button';


// Figma: Popup
// 모달입니다.
// 버튼을 누르면 시간 지연을 두고 모달이 상승하는 구조입니다.
const drawerBleeding = 0;

const popupTitle = '팝업제목'

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));


function SwipeableEdgeDrawer({ title, content }) {
  // const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // const container = window !== undefined ? () => window().document.body : undefined;
  const container = undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
          },
        }}
      />
      <MainButton buttonName="팝업열기" onClick={toggleDrawer(true)}></MainButton>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            // position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography className='heading3' sx={{ px: 5, pt: 5, color: '#1E1D1C' }}>{title}</Typography>
          <Typography className='basic' sx={{ px: 5, pt: 3, pb: 2, color: '#1E1D1C' }}>{content}</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {

  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;