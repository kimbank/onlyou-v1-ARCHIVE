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

import { MainButton, SubButton } from '@/components/Button';
// import { Container } from 'postcss';
import Container from '@mui/material/Container';


// Figma: Popup
// 모달입니다.
// 버튼을 누르면 시간 지연을 두고 모달이 상승하는 구조입니다.
const drawerBleeding = 120;

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


function SwipeableEdgeDrawer({ title, content, showModal, setShowModal }) {
  // const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setShowModal(newOpen);
  };

  // const container = window !== undefined ? () => window().document.body : undefined;
  const container = undefined;

  return (
    <>
      {showModal && (
        // <motion.div
        // initial={{ scale: 0.95 }}
        // animate={{ scale: 1 }}
        // exit={{ scale: 0.95 }}
        // >

        <Root>
          <CssBaseline />
          <Global
            styles={{
              '.MuiDrawer-root > .MuiPaper-root': {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: 'visible',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                transition: 'height 0.3s ease-in-out',
              },
            }}
          />
            {/* <MainButton buttonName="팝업열기" onClick={toggleDrawer(true)}></MainButton> */}
          <SwipeableDrawer
            container={container}
            anchor="bottom"
            open={showModal}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
            transitionDuration={1500}
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
                px: 5,
                py: 2,
                height: '100%',
                overflow: 'auto',
              }}
            >
              <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '16px'
              }}>
                <MainButton buttonName='온리유 가입하기' />
                <SubButton buttonName='다른 번호로 로그인하기' />
              </Container>
            </StyledBox>
          </SwipeableDrawer>
        </Root>
      )}
      </>
  );
}

SwipeableEdgeDrawer.propTypes = {

  window: PropTypes.func,
};

// export default SwipeableEdgeDrawer;

export function useErrorModal() {
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const ErrorModalCallback = React.useCallback(() => {
    return (
      <SwipeableEdgeDrawer
        title={"앗, 가입되지 않은 전화번호에요."}
        content={"온리유에 가입하거나, 다른 번호로 로그인해주세요!"}
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
      />
    );
  }, [showErrorModal, setShowErrorModal]);

  return React.useMemo(
    () => ({ setShowErrorModal, ErrorModal: ErrorModalCallback }),
    [setShowErrorModal, ErrorModalCallback],
  );
}