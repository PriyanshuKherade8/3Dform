import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Outlet, Link } from "react-router-dom";
import { PrimaryColor } from "../../Styles/GlobalStyles/GlobalStyles";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BackupIcon from "@mui/icons-material/Backup";
// Drawer width
const drawerWidth = 240;

// Mixin for opened drawer
const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: PrimaryColor,
  color: "white",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// Mixin for closed drawer
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: PrimaryColor,
  color: "white",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Drawer header styling
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// Styled AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "drawerOpen",
})(({ theme, drawerOpen }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(drawerOpen && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: PrimaryColor,
}));

// Styled Drawer
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "drawerOpen",
})(({ theme, drawerOpen }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(drawerOpen && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!drawerOpen && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Styled Link to remove underline and set color
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "white",
});

export default function MiniDrawer() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" drawerOpen={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ marginRight: 5 }, drawerOpen && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Xculptor-3D
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" drawerOpen={drawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <StyledLink to="/">
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
                  drawerOpen
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: "center" },
                    drawerOpen ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  <ModelTrainingIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Model List"
                  sx={[
                    drawerOpen
                      ? { opacity: 1, color: "white" }
                      : { opacity: 0 },
                  ]}
                />
              </ListItemButton>
            </StyledLink>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <StyledLink to="/experience-list">
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
                  drawerOpen
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: "center" },
                    drawerOpen ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  <MailIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Experience list"
                  sx={[
                    drawerOpen
                      ? { opacity: 1, color: "white" }
                      : { opacity: 0 },
                  ]}
                />
              </ListItemButton>
            </StyledLink>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <StyledLink to="/variant-list">
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
                  drawerOpen
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
              >
                <Inventory2Icon
                  sx={[
                    { minWidth: 0, justifyContent: "center" },
                    drawerOpen ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  <MailIcon sx={{ color: "white" }} />
                </Inventory2Icon>
                <ListItemText
                  primary="Variant list"
                  sx={[
                    drawerOpen
                      ? { opacity: 1, color: "white" }
                      : { opacity: 0 },
                  ]}
                />
              </ListItemButton>
            </StyledLink>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <StyledLink to="/product-list">
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
                  drawerOpen
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
              >
                <FormatListBulletedIcon
                  sx={[
                    { minWidth: 0, justifyContent: "center" },
                    drawerOpen ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  <MailIcon sx={{ color: "white" }} />
                </FormatListBulletedIcon>
                <ListItemText
                  primary="Product list"
                  sx={[
                    drawerOpen
                      ? { opacity: 1, color: "white" }
                      : { opacity: 0 },
                  ]}
                />
              </ListItemButton>
            </StyledLink>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <StyledLink to="/file-upload">
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
                  drawerOpen
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
              >
                <BackupIcon
                  sx={[
                    { minWidth: 0, justifyContent: "center" },
                    drawerOpen ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  <MailIcon sx={{ color: "white" }} />
                </BackupIcon>
                <ListItemText
                  primary="File Upload"
                  sx={[
                    drawerOpen
                      ? { opacity: 1, color: "white" }
                      : { opacity: 0 },
                  ]}
                />
              </ListItemButton>
            </StyledLink>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
