import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: '100%', height: '64px', borderRadius: '24px 24px 0 0', borderTop: '1px solid #FFAD66', boxShadow: '0px -2px 4px 0px rgba(0, 0, 0, 0.25)', position: 'fixed', bottom: 0, left: 0, right: 0 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="매칭"
        value="match"
        icon={<FavoriteIcon />}
        showLabel
      />
      <BottomNavigationAction
        label="성사"
        value="success"
        icon={<EmailIcon />}
        showLabel
      />
      <BottomNavigationAction
        label="게시판"
        value="board"
        icon={<AssignmentIcon />}
        showLabel
      />
      <BottomNavigationAction
        label="내정보"
        value="myInfo"
        icon={<AccountCircleIcon />}
        showLabel
      />
    </BottomNavigation>
  );
}