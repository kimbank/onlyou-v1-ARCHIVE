'use client'

import * as React from 'react';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';

const onText = '켜짐'
const offText = '꺼짐'



// Figma: Text toggle
export function Toggle() {
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
    >
      <ToggleButton
        value="false"
        sx={{
          border: 'none',
          backgroundColor: value === 'false' ? '#FF7700' : '#F7F4F2',
          color: value === 'false' ? '#FFFFFF' : '#3C3B3A',
          '&.Mui-selected': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          borderRadius: '8px 0 0 8px',
          width: '160px'
        }}
      >
        {offText}
      </ToggleButton>

      <ToggleButton
        value="true"
        sx={{
          border: 'none',
          backgroundColor: value === 'true' ? '#FF7700' : '#F7F4F2',
          color: value === 'true' ? '#FFFFFF' : '#3C3B3A',
          '&.Mui-selected': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          borderRadius: '0 8px 8px 0',
          width: '160px'
        }}
      >
        {onText}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
