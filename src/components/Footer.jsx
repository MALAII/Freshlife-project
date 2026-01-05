import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 4,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: 'center',
      }}
    >
     <p className="text-xs flex justify-between text-gray-500">
        © {new Date().getFullYear()} All rights reserved ·{" "}
        <span className="font-medium text-gray-600">
          Designed &amp; Developed by <span className="text-purple-600 font-medium">Malaiyarasi</span>
        </span>
      </p>
    </Box>
  );
};

export default Footer;
