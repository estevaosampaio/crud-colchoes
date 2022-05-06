import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <div>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    CMP - 1491
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    Trabalho Final - Estevão & Lecino
                </Typography>
                {/* <Copyright /> */}
            </Box>
        </div>
    );
};

export default Footer;
