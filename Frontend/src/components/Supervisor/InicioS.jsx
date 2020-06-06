import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItems from "./ListItems.jsx";
import Orders from "./Orders";
import Filtros from "./Filtros";
import SearchIcon from "@material-ui/icons/Search";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useHistory } from "react-router-dom";
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    marginTop: "5%",
  },
  fixedHeight: {
    height: 240,
  },
  paperSearch: {
    display: "flex",
    alignItems: "center",
    width: "300px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIcon: {
    textAlign: "center",
  },
}));

export default function InicioS() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  //Barra lateral izquierda
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  //////////////////////////////////////
  //Consultas (empieza en las recientes)
  const [filtroActivo, setFiltroActivo] = useState({
    vendedor: {
      estado: false,
      valor: "",
    },
    cliente: {
      estado: false,
      valor: "",
    },
    productos__tp: {
      estado: false,
      valor: "",
    },
    productos__brand: {
      estado: false,
      valor: "",
    },
    productos__name: {
      estado: false,
      valor: "",
    },
    precio: {
      estado: false,
      valor: {
        superior: "",
        inferior: "",
      },
      rango: true,
    },
    total: {
      estado: false,
      valor: {
        superior: "",
        inferior: "",
      },
      rango: true,
    },
    fecha: {
      estado: false,
      valor: new Date(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`),
      // `${new Date().getDate()}-${
      //   new Date().getMonth() + 1
      //   }-${new Date().getFullYear()}`
    },
    lugar: {
      estado: false,
      valor: "",
    },
  });
  ///////////////////////////////////////

  const [flag, setFlag] = useState(false);

  const handleLogout = () => {
    history.push("/");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton onClick={handleLogout} color="inherit">
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItems filtroActivo={filtroActivo} setFiltroActivo={setFiltroActivo} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.searchIcon}>
                <IconButton aria-label="search" onClick={() => setFlag(!flag)}>
                  <SearchIcon />
                </IconButton>
              </div>
              <Paper className={classes.paper}>
                <Orders promesa={filtroActivo} flag={flag} />
              </Paper>
            </Grid>
          </Grid>
          {/* <Box pt={4}>
            <Copyright />
          </Box> */}
        </Container>
      </main>
    </div>
  );
}
