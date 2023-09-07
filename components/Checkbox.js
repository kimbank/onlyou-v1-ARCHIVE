'use client'

import { Button, Typography } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel'
import { useState } from "react";




// Figma: Default checkbox
export function DefaultCheckbox({buttonName}) {
    return (
        <div>
            <Button
                variant='contained'
                sx={{
                    borderRadius: '8px',
                    height: '33px',
                    padding: '8px 12px',
                    backgroundColor: '#F7F4F2',
                }}
            >
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontFamily: 'Pretendard-Semibold',
                        fontSize: '14px',
                        letterSpacing: '1.25px',
                        color: '#3C3B3A',
                    }}
                >
                    {buttonName}
                </Typography>
            </Button>
        </div>
    )
}





// Figma: Checked checkbox
export function CheckedCheckbox({buttonName}) {
    return (
        <div>
            <Button
                variant='contained'
                sx={{
                    borderRadius: '8px',
                    height: '33px',
                    padding: '8px 12px',
                    backgroundColor: '#FF7700',
                }}
            >
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontFamily: 'Pretendard-Semibold',
                        fontSize: '14px',
                        letterSpacing: '1.25px',
                        color: '#FFFFFF',
                    }}
                >
                    {buttonName}
                </Typography>
            </Button>
        </div>
    )
}




// Figma: Cancel checkbox
export function CancelCheckbox({buttonName}) {
    const [isVisible, setIsVisible] = useState(true);
  
    const handleCancelClick = () => {
      setIsVisible(false);
    };
  
    return (
      <div>
        {isVisible && (
          <Button
            variant='contained'
            sx={{
              borderRadius: '8px',
              height: '33px',
              padding: '8px 12px',
              backgroundColor: '#FF7700',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='subtitle1'
              sx={{
                fontFamily: 'Pretendard-Semibold',
                fontSize: '14px',
                letterSpacing: '1.25px',
                color: '#FFFFFF',
                marginRight: '12px',
              }}
            >
              {buttonName}
            </Typography>
            <CancelIcon
              sx={{
                width: '24px',
                height: '24px',
                color: '#FFFFFF',
              }}
               onClick={handleCancelClick} // Add onClick event handler for cancel icon
          />
        </Button>
      )}
    </div>
  );
}