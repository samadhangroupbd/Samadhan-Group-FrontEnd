import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';  // Import Link and useLocation for active highlighting
import { IoIosCreate, IoIosPeople } from "react-icons/io";
import { MdManageSearch, MdOutlineManageAccounts, MdOutlineManageSearch } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';
import { CgProfile } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";
import { GoProjectSymlink } from "react-icons/go";






const drawerWidth = 240;

const DashBoardNavBar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const location = useLocation();  // Hook to get the current path for highlighting

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>

            <List>
                {[
                    { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard/statistic' },

                    // { text: 'Create Admin', icon: <IoIosCreate className='text-2xl' />, link: '/dashboard/create-admin' },

                    { text: 'Manage Admin', icon: <MdOutlineManageAccounts className='text-2xl' />, link: '/dashboard/manage-admin' },

                    { text: 'Create Blog', icon: <PostAddIcon />, link: '/dashboard/create-blog' },

                    { text: 'Manage Blog', icon: <MdOutlineManageSearch className='text-2xl' />, link: '/dashboard/manage-blog' },

                    { text: 'Project Post', icon: <GoProjectSymlink className='text-2xl' />, link: '/dashboard/project-post' },

                    { text: 'Manage Project', icon: <MdOutlineManageSearch className='text-2xl' />, link: '/dashboard/manage-project' },

                    { text: 'Create Product', icon: <PostAddIcon />, link: '/dashboard/create-product' },

                    {
                        text: 'Manage Product', icon: <MdOutlineManageSearch className='text-2xl' />
                        , link: '/dashboard/manage-product'
                    },
                    
                ].map(({ text, icon, link }, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton selected={location.pathname === link}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText
                                primary={
                                    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {text}
                                    </Link>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider />
            <List>
                {[
                    { text: 'Admin List', icon: <RiAdminFill className='text-2xl' />, link: '/dashboard/admin-list' },
                    { text: 'Member List', icon: <IoIosPeople className='text-2xl' />, link: '/dashboard/member-list' },
                    { text: 'Profile', icon: <CgProfile className='text-2xl' />, link: '/dashboard/profile' },
                    { text: 'Sign Out', icon: <TbLogout className='text-2xl' />, link: '/dashboard/signout' },
                ].map(({ text, icon, link }, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton selected={location.pathname === link}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText
                                primary={
                                    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {text}
                                    </Link>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        <div>
                            <div><Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className="text-indigo-100 font-bold">Samadhan Group</span>
                            </Link>
                            </div>
                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
};

DashBoardNavBar.propTypes = {
    window: PropTypes.func,
};

export default DashBoardNavBar;
