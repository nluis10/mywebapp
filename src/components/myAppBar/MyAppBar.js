import React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import StarIcon from "@mui/icons-material/Star";
import LogoutIcon from "@mui/icons-material/Logout";
import MovieIcon from "@mui/icons-material/Movie";
import WebIcon from "@mui/icons-material/Web";
import GroupsIcon from "@mui/icons-material/Groups";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

function MyAppBar(props) {
  let navegacion = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cerrarSesion = () => {
    props.borrarToken();
    navegacion("/login");
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0b5489",
      },
    },
  });

  const themeB = createTheme({
    palette: {
      background: {
        paper: "#0b5489",
      },
      text: {
        primary: " #ffffff ",
      },
    },
  });

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
          <ListItem button key="modelos" component={Link} to="/modelos">
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Modelos" />
          </ListItem>
        <Divider />
        <ListItem button key="movies" component={Link} to="/movies">
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary="Movies" />
        </ListItem>
        <Divider />
        <ListItem button key="sitios">
          <ListItemIcon>
            <WebIcon />
          </ListItemIcon>
          <ListItemText primary="Sitios" />
        </ListItem>
        <Divider />
        <ListItem button key="casting">
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Casting" />
        </ListItem>
        <Divider />
        <ListItem button key="cerrarSesion">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesion" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              MY WEB APP
            </Typography>
            <Typography variant="h6" onClick={handleMenu}>
              {props.usuEmail}
            </Typography>
            <div>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={cerrarSesion}>Cerrar sesion</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <ThemeProvider theme={themeB}>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default MyAppBar;
