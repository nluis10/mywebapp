import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import StarIcon from '@mui/icons-material/Star';
import LogoutIcon from '@mui/icons-material/Logout';
import MovieIcon from '@mui/icons-material/Movie';
import WebIcon from '@mui/icons-material/Web';
import GroupsIcon from '@mui/icons-material/Groups';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";


const drawerWidth = 200;

function MyDrawerBox(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button key="Modelos">
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Modelos" />
        </ListItem>
        <Divider />
        <ListItem button key="Movies">
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary="Movies" />
        </ListItem>
        <Divider />
        <ListItem button key="Sitios">
          <ListItemIcon>
            <WebIcon />
          </ListItemIcon>
          <ListItemText primary="Sitios" />
        </ListItem>
        <Divider />
        <ListItem button key="Casting">
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Casting" />
        </ListItem>
        <Divider />
        <ListItem button key="CerrarSesion">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesion" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const theme = createTheme({
    palette: {
      background: {
        paper: "#0b5489",
      },
      text: {
        primary: " #ffffff ",
      },
    },
  });

  return (
      <ThemeProvider theme={theme}>
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
  );
}

export default MyDrawerBox;
