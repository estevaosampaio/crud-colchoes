import { Link } from 'react-router-dom';
import BedIcon from '@mui/icons-material/Bed';
import { Toolbar, Typography, AppBar, useMediaQuery, useTheme, Button } from '@mui/material';
import DrawerComp from './DrawerComp';

const NavBar = () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <AppBar position="relative" sx={{ background: '#2e037c' }}>
                <Toolbar>
                    <BedIcon fontSize="large" sx={{ mr: 4 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        CMP - 1491
                    </Typography>

                    {isMatch ? (
                        <>
                            <DrawerComp />
                        </>
                    ) : (
                        <>
                            <Link to={'/'} style={{ textDecoration: 'none', color: '#ffffff', marginLeft: 'auto' }}>
                                <Button sx={{ color: '#fff' }} variant="outlined">
                                    Home
                                </Button>
                            </Link>

                            <Link to={'/cadastro'} style={{ textDecoration: 'none', color: '#ffffff', marginLeft: '20px' }}>
                                <Button sx={{ color: '#fff' }} variant="outlined">
                                    Cadastro
                                </Button>
                            </Link>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavBar;
