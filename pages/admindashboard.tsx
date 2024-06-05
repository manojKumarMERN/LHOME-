import React, { useState } from 'react';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ListItemButton, ListItemIcon, ListItemText, Container, Grid, Paper } from '@mui/material';
import UserTable from './userlist'; // Import UserTable component
import PeopleIcon from '@mui/icons-material/People';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as config from "../next.config";
import PageHeader from "./components/PageHeader";
import css from "../styles/wall.module.scss";
import Footer from "./components/Footer/Footer";


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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [screenwidth, setWidth] = React.useState(window.innerWidth);
  let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
  let hgtt = 0;
  if (window.innerWidth < 600) {
      hgtt = window.innerHeight - 210;
      if (window.innerWidth > 490 && window.innerWidth < 512) {
          hgtt += 10;
      }
  } else {
      hgtt = window.innerHeight - 160;
  }

  const [screenheight, setHeight] = React.useState(hgtt);
  const [hidden, setHidden] = React.useState(false)

  const handleResize = React.useCallback(() => {
      setWidth(window.innerWidth);
      let hgtt = 0;
      if (window.innerWidth < 600) {
          hgtt = window.innerHeight - 210;
          if (window.innerWidth > 490 && window.innerWidth < 512) {
              hgtt += 10;
          }
          if (window.innerWidth > 571 && window.innerWidth < 599) {
              hgtt += 50;
          }
          if (window.innerWidth > 570 && window.innerWidth < 572) {
              hgtt += 45;
          }
          if (window.innerWidth > 509 && window.innerWidth < 571) {
              hgtt += 25;
          }
          if (window.innerWidth > 500 && window.innerWidth < 510) {
              hgtt += 15;
          }
          if (window.innerWidth < 500) {
              hgtt -= 10;
          }
      } else {
          hgtt = window.innerHeight - 160;
      }
      setHeight(hgtt);
  }, []);

  const handleResized = React.useCallback(() => {
      setTimeout(() => {
          handleResize();
      }, 1000);
  }, [handleResize]);



  return (
    <div className="animate-fade-in">
                <div className={css.lhomePage}>
                    <div className={hidden ? "hidden" : ""}>
                        <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />
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

            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <Link href="/userlist" className="no-underline">
              <ListItemButton >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </Link>

            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Job" />
            </ListItemButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              
              <Link href="/createjob" >
                <MenuItem onClick={handleClose} >
                  Create Job
                </MenuItem>
              </Link>
              <Link href="/editjob" >
              <MenuItem onClick={handleClose} >
                Edit Job
              </MenuItem>
              </Link>
            </Menu>
           
            
            <Link href="/issuesreply" className="no-underline">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Issues" />
              </ListItemButton>
            </Link>
            {/* Add other list items here */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
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
                  <UserTable />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    <div><Footer /></div>

    </div>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiDrawer from '@mui/material/Drawer';
// import Box from '@mui/material/Box';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import * as config from "../next.config";
// import PageHeader from "./components/PageHeader";
// import css from "../styles/wishlistpage.module.scss";
// import { mainListItems } from './components/Admin/listItems';

// // function Copyright(props: any) {
// //   return (
// //     <Typography variant="body2" color="text.secondary" align="center" {...props}>
// //       {'Copyright © '}
// //       <Link color="inherit" href="https://mui.com/">
// //         Your Website
// //       </Link>{' '}
// //       {new Date().getFullYear()}
// //       {'.'}
// //     </Typography>
// //   );
// // }

// const drawerWidth: number = 240;

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     '& .MuiDrawer-paper': {
//       position: 'relative',
//       whiteSpace: 'nowrap',
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       boxSizing: 'border-box',
//       ...(!open && {
//         overflowX: 'hidden',
//         transition: theme.transitions.create('width', {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen,
//         }),
//         width: theme.spacing(7),
//         [theme.breakpoints.up('sm')]: {
//           width: theme.spacing(9),
//         },
//       }),
//     },
//   }),
// );

// const defaultTheme = createTheme();

// export default function DashboardPage() {
//   const [open, setOpen] = useState(true);
//   const [screenwidth, setWidth] = useState(0);
//   const [screenheight, setHeight] = useState(0);

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   const handleResize = () => {
//     setWidth(window.innerWidth);
//     let hgtt = window.innerWidth < 600 ? window.innerHeight - 210 : window.innerHeight - 160;

//     if (window.innerWidth > 490 && window.innerWidth < 512) {
//       hgtt += 10;
//     } else if (window.innerWidth > 571 && window.innerWidth < 599) {
//       hgtt += 50;
//     } else if (window.innerWidth > 570 && window.innerWidth < 572) {
//       hgtt += 45;
//     } else if (window.innerWidth > 509 && window.innerWidth < 571) {
//       hgtt += 25;
//     } else if (window.innerWidth > 500 && window.innerWidth < 510) {
//       hgtt += 15;
//     } else if (window.innerWidth < 500) {
//       hgtt -= 10;
//     }

//     setHeight(hgtt);
//   };

//   useEffect(() => {
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <>
//       <div className="animate-fade-in">
//         <div className={css.lhomePage}>
//           {/* <PageHeader
//             screenwidth={screenwidth}
//             screenheight={screenheight}
//             assetpath={config.assetPrefix}
//             hidden={false}
//           /> */}
//           <ThemeProvider theme={defaultTheme}>
//             <Box sx={{ display: 'flex' }}>
//               <CssBaseline />
//               <AppBar position="absolute" open={open}>
//                 <Toolbar
//                   sx={{
//                     pr: '24px', // keep right padding when drawer closed
//                   }}
//                 >
//                   <IconButton
//                     edge="start"
//                     color="inherit"
//                     aria-label="open drawer"
//                     onClick={toggleDrawer}
//                     sx={{
//                       marginRight: '36px',
//                       ...(open && { display: 'none' }),
//                     }}
//                   >
//                     <MenuIcon />
//                   </IconButton>
//                   <Typography
//                     component="h1"
//                     variant="h6"
//                     color="inherit"
//                     noWrap
//                     sx={{ flexGrow: 1 }}
//                   >
//                     Admin Dashboard
//                   </Typography>
//                   {/* <IconButton color="inherit">
//                     <Badge badgeContent={4} color="secondary">
//                       <NotificationsIcon />
//                     </Badge>
//                   </IconButton> */}
//                 </Toolbar>
//               </AppBar>
//               <Drawer variant="permanent" open={open}>
//                 <Toolbar
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'flex-end',
//                     px: [1],
//                   }}
//                 >
//                   <IconButton onClick={toggleDrawer}>
//                     <ChevronLeftIcon />
//                   </IconButton>
//                 </Toolbar>
//                 <Divider />
//                 <List component="nav">
//                   {mainListItems}
//                   <Divider sx={{ my: 1 }} />
//                   {/* {secondaryListItems} */}
//                 </List>
//               </Drawer>
//               <Box
//                 component="main"
//                 sx={{
//                   backgroundColor: (theme) =>
//                     theme.palette.mode === 'light'
//                       ? theme.palette.grey[100]
//                       : theme.palette.grey[900],
//                   flexGrow: 1,
//                   height: '100vh',
//                   overflow: 'auto',
//                 }}
//               >
//                 <Toolbar />
//                 {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//                   <Grid container spacing={3}>
//                     {/* Chart */}
//                     {/* <Grid item xs={12} md={8} lg={9}>
//                       <Paper
//                         sx={{
//                           p: 2,
//                           display: 'flex',
//                           flexDirection: 'column',
//                           height: 240,
//                         }} */}
//                       {/* >  */}
//                         {/* <Chart /> */}
//                       {/* </Paper>
//                     </Grid> */}
//                     {/* Recent Deposits */}
//                     {/* <Grid item xs={12} md={4} lg={3}>
//                       <Paper
//                         sx={{
//                           p: 2,
//                           display: 'flex',
//                           flexDirection: 'column',
//                           height: 240,
//                         }}
//                       > */}
//                         {/* <Deposits /> */}
//                       {/* </Paper>
//                     </Grid> */}
//                     {/* Recent Orders */}
//                     {/* <Grid item xs={12}>
//                       <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
//                         {/* <Orders /> */}
//                       {/* </Paper> */}
//                     {/* </Grid>  */}
//                   {/* </Grid> */}
//                   {/* <Copyright sx={{ pt: 4 }} /> */}
//                 {/* </Container> */}
//               </Box>
//             </Box>
//           </ThemeProvider>
//         </div>
//       </div>
//     </>
//   );
// }
