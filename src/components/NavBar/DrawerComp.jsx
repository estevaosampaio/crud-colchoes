import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List sx={{ backgroundColor: '#2e037c', height: '100%' }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText sx={{ color: '#fff' }}>
                                <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                                    Home
                                </Link>
                            </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText sx={{ color: '#fff' }}>
                                <Link to={'/cadastro'} style={{ textDecoration: 'none', color: 'white' }}>
                                    Cadastro
                                </Link>
                            </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton sx={{ color: 'white', marginLeft: 'auto' }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    );
};

export default DrawerComp;
