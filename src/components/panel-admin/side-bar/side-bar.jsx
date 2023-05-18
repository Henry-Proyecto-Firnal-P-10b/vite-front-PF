//import React y Redux
import { useEffect, useState } from 'react';
//import Material UI
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import  Avatar  from '@mui/material/Avatar';
import Stack from'@mui/material/Stack';
import { Button } from '@mui/material';
//import Icons UI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderSharedRoundedIcon from '@mui/icons-material/FolderSharedRounded';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import componentes
import EditProduct from '../edit-product/edit-product';
import CreateProduct from "../create-product/create-product";
import AllProducts from '../all-products/all-products';
import VentasTotales from '../orders/ventasTotales';
import Inicio from '../home-admin/home-admin';
import Users from '../users/users';
import User from '../user/user';





const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SideBar = () =>  {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up('sm')); //para manejar drawer visble/oculto responsive
  
  const handleAddProduct = () => {
    setContent(<CreateProduct onShowList={handleShowList} />);
  };
  const handleEditProduct = (id) => {
    setContent(<EditProduct id={id} onShowList={handleShowList} />);
  };

  const handleShowList = () => {
    setContent(<AllProducts onAddProduct={handleAddProduct} />);
  };
  
  const [content, setContent] = useState((<Inicio />))//estado local para manejar contenido dinamico

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  //funcion para manejar el contenido dinamico del drawer
  const handleItemClick = (newContent) => {
    setContent(newContent);
  };
  //para drawer abierto o cerrado segun tamaño de pantalla
  useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);


  return (
  <Box sx={{ display: 'flex' }}>
  <CssBaseline />
  <AppBar position="fixed" open={open}>
  <Toolbar>
  <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={handleDrawerOpen}
    edge="start"
    sx={{
    marginRight: 5,
    ...(open && { display: 'none' }),
    }}
  >
  <MenuIcon />
  </IconButton>
  <Link to='/'> <Button variant="text" color='secondary'>Home</Button> </Link>
  
  </Toolbar>
  </AppBar>

  <Drawer variant="permanent" open={open} >
  <DrawerHeader>
  <IconButton onClick={handleDrawerClose}>
    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
  </IconButton>
  </DrawerHeader>
  <Divider />
  <List>
  {/*menu latera*/}
  <ListItem sx={{ mt: '20%' }}>
  <ListItemButton
    onClick={() => handleItemClick(<Inicio />)}
    sx={{
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
    }}
  >
  <ListItemIcon>
  <Stack direction="row" spacing={2}>
    <Avatar sx={{ bgcolor: '#19c8db' }}>
    <SpaceDashboardIcon />
    </Avatar> 
  </Stack>
  </ListItemIcon>
  <ListItemText primary="Inicio" />
  </ListItemButton>
  </ListItem>

  <ListItem>
  <ListItemButton
    onClick={() => handleItemClick(<AllProducts onAddProduct={handleAddProduct} onEditProduct={handleEditProduct}/>)}
    sx={{
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
    }}
  >
  <ListItemIcon>
  <Stack direction="row" spacing={2}>
    <Avatar sx={{ bgcolor: '#19c8db' }}>
    <Inventory2Icon />
    </Avatar> 
  </Stack>
  </ListItemIcon>
  <ListItemText primary="Ver Productos" />
  </ListItemButton>
  </ListItem>

  <ListItem>
  <ListItemButton
    onClick={() => handleItemClick(<CreateProduct />)}
    sx={{
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
  }}
  >
  <ListItemIcon>
  <Stack direction="row" spacing={2}>
    <Avatar sx={{ bgcolor: '#19c8db' }}>
    <AddCircleIcon />
    </Avatar>
  </Stack>

  </ListItemIcon>
  <ListItemText primary="Nuevo Producto" />
  </ListItemButton>
  </ListItem>

  <ListItem>
  <ListItemButton
    onClick={() => handleItemClick(<VentasTotales />)}
    sx={{
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
    }}
  >
  <ListItemIcon>
  <Stack direction="row" spacing={2}>
    <Avatar sx={{ bgcolor: '#19c8db' }}>
    <MonetizationOnIcon />
  </Avatar>
  </Stack>

  </ListItemIcon>
  <ListItemText primary="Ventas" />
  </ListItemButton>
  </ListItem>

  <ListItem>
  <ListItemButton
    onClick={() => handleItemClick(<Users />)}
    sx={{
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
    }}
  >
  <ListItemIcon>
  <Stack direction="row" spacing={2}>
    <Avatar sx={{ bgcolor: '#19c8db' }}>
    <FolderSharedRoundedIcon />
    </Avatar> 
  </Stack>

  </ListItemIcon>
  <ListItemText primary="Clientes" />
  </ListItemButton>
  </ListItem>

    <ListItem>
    <ListItemButton
      onClick={() => handleItemClick(<User />)}
      sx={{
      minHeight: 48,
      justifyContent: open ? 'initial' : 'center',
      px: 2.5,
      }}
    >
    <ListItemIcon>
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: '#19c8db' }}>
      <AccountCircleIcon />
      </Avatar> 
    </Stack>

    </ListItemIcon>
    <ListItemText primary="Usuario" />
    </ListItemButton>
    </ListItem>
  </List>
  <Divider />
  </Drawer>
  

  <Box component="main" sx={{ flexGrow: 1, p: 3, alignContent: "center" }}>
  <DrawerHeader />
    {content}
  </Box>
  </Box>
  );
}

export default SideBar;