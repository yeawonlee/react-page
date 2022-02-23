import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArchiveIcon from "@mui/icons-material/Archive";
import GridOnIcon from "@mui/icons-material/GridOn";
import PivotTableChartIcon from "@mui/icons-material/PivotTableChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";

import ChangeTheme from "./ChangeTheme";
import ChangeThemeButton from "./ChangeThemeButton";

import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Members from "./Members";
import Map from "./Map";
import GridTest from "./GridTest";
import PivotGridTest from "./PivotGridTest";
import ChartTest from "./ChartTest";
import Editors from "./Editors";
import Footer from "./Footer";
import "./App.css";
import { ListItemIcon } from "@mui/material";

const drawerWidth = 280;

const pages = ["Product", "Pricing", "Blog"];
const settings = ["Profile", "Account", "DashBoard", "Logout"];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    wiidth: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

/* ------------------- Main 함수 ------------------- */
const App = (props) => {
  // Drawer
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigation = useNavigate();
  const itemList = [
    {
      icon: <HomeIcon />,
      text: "Home",
      onClick: () => navigation("/"),
    },
    {
      icon: <PersonIcon />,
      text: "Member Service",
      onClick: () => navigation("/members"),
    },
    {
      icon: <LocationOnIcon />,
      text: "Map Control",
      onClick: () => navigation("/maps"),
    },
  ];

  const UIConponentItemList = [
    {
      icon: <GridOnIcon />,
      text: "Grid Test",
      onClick: () => navigation("/grids"),
    },
    {
      icon: <PivotTableChartIcon />,
      text: "Pivot Grid Test",
      onClick: () => navigation("/pivot-grids"),
    },
    {
      icon: <BarChartIcon />,
      text: "Chart Test",
      onClick: () => navigation("/charts"),
    },
    {
      icon: <EditIcon />,
      text: "Editors",
      onClick: () => navigation("/editors"),
    },
  ];

  // Nested List
  const [nestedListOpen, setNestedListOpen] = useState(true);

  const handleClick = () => {
    setNestedListOpen(!nestedListOpen);
    //console.log(`nestedListOpen : ${nestedListOpen}`);
  };

  // App Bar
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Drawer Demo Code */}
        <AppBar position="fixed" open={open}>
          <Container maxWidth="x1">
            <Toolbar disableGutters>
              {/* LOGO 이미지 */}
              <Box sx={{ mr: 2, display: "flex" }}>
                <img alt="LOGO" src="img/cloud-computing.png" width={60} />
              </Box>

              {/* Menu 아이콘 */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>

              {/* 상단 메뉴 (Products, Pricing, Blog) */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <Menu
                  id="menu"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              {/* 테마 변경 아이콘  */}
              <Box
                sx={{
                  mx: 2,
                  flexGrow: 0,
                  display: { xs: "none", md: "flex" },
                }}
              >
                <ChangeThemeButton />
              </Box>

              {/* 사용자 정보  */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <List>
            {itemList.map((item, index) => {
              const { icon, text, onClick } = item;
              return (
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}

            {/* UI Component Test 메뉴 */}
            <ListItem>
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="UI Component Test" onClick={handleClick} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {UIConponentItemList.map((item) => {
                  const { icon, text, onClick } = item;
                  return (
                    <ListItem
                      button
                      key={text}
                      onClick={onClick}
                      sx={{ pl: 8 }}
                    >
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText primary={text} />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<Home title="Home Page" />}></Route>
            <Route path="/maps" element={<Map />}></Route>
            <Route path="/members" element={<Members />}></Route>
            <Route path="/grids" element={<GridTest />}></Route>
            <Route path="/pivot-grids" element={<PivotGridTest />}></Route>
            <Route path="/charts" element={<ChartTest />}></Route>
            <Route path="/editors" element={<Editors />}></Route>
          </Routes>
          <Footer />
        </Box>
      </Box>
    </div>
  );
};

export default App;
