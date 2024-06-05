import React, { useState, useCallback, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { ListItemButton, ListItemIcon, ListItemText, Container, Grid, Paper } from '@mui/material';
import UserTable from './userlist'; // Import UserTable component
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as config from '../next.config';
import PageHeader from './components/PageHeader';
import css from '../styles/wall.module.scss';
import Footer from './components/Footer/Footer';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function DashboardPage() {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(getHeight(window.innerWidth));
  const [hidden, setHidden] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Users'); // New state variable for selected menu item

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(getHeight(window.innerWidth));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const assetPath = config.assetPrefix ? `${config.assetPrefix}` : ``;

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'Users':
        return <UserTable />;
      case 'Job':
        return <Typography variant="h4">Job</Typography>;
      case 'Issues':
        return <Typography variant="h4">Issues</Typography>;
      default:
        return <Typography variant="h4">Hi</Typography>;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className={css.lhomePage}>
        <div className={hidden ? 'hidden' : ''}>
          <PageHeader screenwidth={screenWidth} screenheight={screenHeight} assetpath={assetPath} hidden={false} />
        </div>
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
                <ListItemButton onClick={() => setSelectedMenuItem('Dashboard')}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton onClick={() => setSelectedMenuItem('Users')}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
                <ListItemButton onClick={() => setSelectedMenuItem('Job')}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Job" />
                </ListItemButton>
                <ListItemButton onClick={() => setSelectedMenuItem('Issues')}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Issues" />
                </ListItemButton>
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      {renderContent()}
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
        <Footer />
      </div>
    </div>
  );
}

function getHeight(width: number): number {
  if (width < 600) {
    let height = window.innerHeight - 210;
    if (width > 490 && width < 512) {
      height += 10;
    }
    if (width > 571 && width < 599) {
      height += 50;
    }
    if (width > 570 && width < 572) {
      height += 45;
    }
    if (width > 509 && width < 571) {
      height += 25;
    }
    if (width > 500 && width < 510) {
      height += 15;
    }
    if (width < 500) {
      height -= 10;
    }
    return height;
  }
  return window.innerHeight - 160;
}
