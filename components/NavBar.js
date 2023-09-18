import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { usePathname } from 'next/navigation';

export default function LabelBottomNavigation({ recent }) {
  const pathname = usePathname();
  const [value, setValue] = React.useState(pathname.split('/')[1]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const new_recent = pathname.split('/')[1]
  // if (recent == undefined) {
  //   console.log('not undifined')
  //   setValue(toString(new_recent))
  // } else {
  //   console.log(recent)
  // }

  // console.log(new_recent)
  

  return (
    <BottomNavigation value={value} onChange={handleChange} sx={{
      width: '100%', height: '64px', borderRadius: '24px 24px 0 0', borderTop: '2px solid #fff', boxShadow: '1px -2px 12px -4px rgba(0, 0, 0, 0.25)', position: 'fixed',
      bottom: 0, left: 0, right: 0, maxWidth: '480px', left: '50%', transform: 'translate(-50%, 0)'
    }}>
      <BottomNavigationAction href='/matching'
        label="매칭"
        value="matching"
        icon={<FavoriteIcon />}
        showLabel
      />
      <BottomNavigationAction href='/agreement'
        label="성사"
        value="agreement"
        icon={<EmailIcon />}
        showLabel
      />
      <BottomNavigationAction href='/board'
        label="게시판"
        value="board"
        icon={<AssignmentIcon />}
        showLabel
      />
      <BottomNavigationAction href='/my_info'
        label="내정보"
        value="my_info"
        icon={<AccountCircleIcon />}
        showLabel
      />
    </BottomNavigation>
  );
}