import SwipeableEdgeDrawer from '@/components/Popup';
import Container from '@mui/material/Container';

export default function Modal({ children, clicked, setClicked }) {
  
  return (
    <SwipeableEdgeDrawer clicked={clicked} setClicked={setClicked}>
      {children}
    </SwipeableEdgeDrawer>
  )
}