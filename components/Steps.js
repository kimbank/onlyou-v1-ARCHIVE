'use client'

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';




//Figma: Steps
export function StepsToggle() {
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton
        value="basic"
        sx={{
          backgroundColor: alignment === 'basic' ? '#3C3B3A' : '#F7F4F2',
          '&.Mui-selected': { backgroundColor: '#3C3B3A', color: '#FFFFFF' },
          borderRadius: '8px 0 0 8px',
          height: '40px'
        }}
      >
        <Typography className='Button' sx={{
          color: alignment === 'basic' ? '#FFFFFF' : '#3C3B3A',
        }}>
          기본
        </Typography>
      </ToggleButton>

      <ToggleButton
        value="detail"
        sx={{
          backgroundColor: alignment === 'detail' ? '#3C3B3A' : '#F7F4F2',
          '&.Mui-selected': { backgroundColor: '#3C3B3A', color: '#FFFFFF' },
          height: '40px'
        }}
      >
        <Typography className='Button' sx={{
          color: alignment === 'detail' ? '#FFFFFF' : '#3C3B3A',
        }}>
          상세
        </Typography>
      </ToggleButton>

      <ToggleButton
        value="photo"
        sx={{
          backgroundColor: alignment === 'photo' ? '#3C3B3A' : '#F7F4F2',
          '&.Mui-selected': { backgroundColor: '#3C3B3A', color: '#FFFFFF' },
          borderRadius: '0 8px 8px 0',
          height: '40px'
        }}
      >
        <Typography className='Button' sx={{
          color: alignment === 'photo' ? '#FFFFFF' : '#3C3B3A',
        }}>
          사진
        </Typography>
      </ToggleButton>

    </ToggleButtonGroup>
  );
}




// Figma: Rating
// 클릭된 요소는 자동으로 별이 보이도록 해두었습니다.
export function RatingToggle() {
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      {/* toggle Button element */}
      <ToggleButton
        value="one"
        sx={{
          backgroundColor: alignment === 'one' ? '#FF7700' : '#F7F4F2',
          '&.Mui-selected': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          borderRadius: '8px 0 0 8px',
          display: 'flex',
          height: '40px',
          padding: '0 24px'
        }}
      >
        <Typography className='Button' sx={{
          color: alignment === 'one' ? '#FFFFFF' : '#3C3B3A'
        }}>
          1
        </Typography>
        <StarIcon sx={{
          width: '20px',
          display: alignment === 'one' ? 'block' : 'none',
          color: '#FFFFFF',
          marginLeft: '4px'
        }} />
      </ToggleButton>
      <ToggleButton
        value="two"
        sx={{
          backgroundColor: alignment === 'two' ? '#FF7700' : '#F7F4F2',
          '&.Mui-selected': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          display: 'flex',
          alignItems: 'center',
          height: '40px',
          padding: '0 24px'
        }}
      >
        <Typography className='Button' sx={{
          color: alignment === 'two' ? '#FFFFFF' : '#3C3B3A'
        }}>
          2
        </Typography>
        <StarIcon sx={{
          width: '20px',
          display: alignment === 'two' ? 'block' : 'none',
          color: '#FFFFFF',
          marginLeft: '4px'
        }} />
      </ToggleButton>
      <ToggleButton
        value="three"
        sx={{
          backgroundColor: alignment === 'three' ? '#FF7700' : '#F7F4F2',
          '&.Mui-selected': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          display: 'flex',
          alignItems: 'center',
          height: '40px',
          padding: '0 24px'
        }}
      >
        <Typography className='Button' sx={{
          color: alignment === 'three' ? '#FFFFFF' : '#3C3B3A'
        }}>
          3
        </Typography>
        <StarIcon sx={{
          width: '20px',
          display: alignment === 'three' ? 'block' : 'none',
          color: '#FFFFFF',
          marginLeft: '4px'
        }} />
      </ToggleButton>
      <ToggleButton
        value="four"
        sx={{
          backgroundColor: alignment === 'four' ? '#FF7700' : '#F7F4F2',
          '&.Mui-selected': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          display: 'flex',
          alignItems: 'center',
          height: '40px',
          padding: '0 24px'
        }}
      >
        <Typography className='Button' sx={{
          color: alignment === 'four' ? '#FFFFFF' : '#3C3B3A'
        }}>
          4
        </Typography>
        <StarIcon sx={{
          width: '20px',
          display: alignment === 'four' ? 'block' : 'none',
          color: '#FFFFFF',
          marginLeft: '4px'
        }} />
      </ToggleButton>
      <ToggleButton
        value="five"
        sx={{
          backgroundColor: alignment === 'five' ? '#FF7700' : '#F7F4F2',
          '&.Mui-selected': { backgroundColor: '#FF7700', color: '#FFFFFF' },
          display: 'flex',
          alignItems: 'center',
          borderRadius: '0 8px 8px 0',
          height: '40px',
          padding: '0 24px'
        }}
      >
        <Typography className='Button' sx={{
          color: alignment === 'five' ? '#FFFFFF' : '#3C3B3A'
        }}>
          5
        </Typography>
        <StarIcon sx={{
          width: '20px',
          display: alignment === 'five' ? 'block' : 'none',
          color: '#FFFFFF',
          marginLeft: '4px'
        }} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}