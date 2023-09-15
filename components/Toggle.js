'use client'

import * as React from 'react';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';

// const onText = '켜짐'
// const offText = '꺼짐'



// Figma: Text toggle
export function Toggle({ onText, offText }) {
  const [value, setValue] = React.useState('false');

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      sx={{ ":hover": { backgroundColor: '#FF7700', color: '#FFFFFF' }, '&.Mui-selected:hover': { backgroundColor: '#FF7700', color: '#FFFFFF' },}}
    >
      <ToggleButton
        value="false"
        sx={{
          border: 'none',
          backgroundColor: value === 'false' ? '#FF7700' : '#F7F4F2',
          color: value === 'false' ? '#FFFFFF' : '#3C3B3A',
          '&.Mui-selected': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          '&.Mui-selected:hover': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          ':hover': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          borderRadius: '12px 0 0 12px',
          width: '50%'
        }}
      >
      {onText}
      </ToggleButton>

      <ToggleButton
        value="true"
        sx={{
          border: 'none',
          backgroundColor: value === 'true' ? '#FF7700' : '#F7F4F2',
          color: value === 'true' ? '#FFFFFF' : '#3C3B3A',
          '&.Mui-selected': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          '&.Mui-selected:hover': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          ':hover': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          borderRadius: '0 12px 12px 0',
          width: '50%'
        }}
      >
      {offText}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}


const DormantToggle = ({ isDormant, handleDormant }) => {


  return (
    <ToggleButtonGroup
      value= {isDormant ? 'true' : 'false' }
      exclusive
      onChange={handleDormant}
    >
      <ToggleButton
        value="false"
        sx={{
          border: 'none',
          backgroundColor: !isDormant ? '#FF7700' : '#F7F4F2',
          color: !isDormant ? '#FFFFFF' : '#3C3B3A',
          '&.Mui-selected': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          '&.Mui-selected:hover': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          ':hover': {  },
          borderRadius: '12px 0 0 12px',
          height: '40px',
          width: '50%',
        }}
      >
        매칭 활성화
      </ToggleButton>

      <ToggleButton
        value="true"
        sx={{
          border: 'none',
          backgroundColor: isDormant ? '#FF7700' : '#F7F4F2',
          color: isDormant ? '#FFFFFF' : '#3C3B3A',
          '&.Mui-selected': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          '&.Mui-selected:hover': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          ':hover': {  },
          borderRadius: '0 12px 12px 0',
          height: '40px',
          width: '50%'
        }}
      >
        휴면
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export { DormantToggle };
