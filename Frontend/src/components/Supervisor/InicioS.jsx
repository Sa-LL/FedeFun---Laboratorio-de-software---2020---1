import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
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
import Button from '@material-ui/core/Button';
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import TocIcon from '@material-ui/icons/Toc';
import RoomIcon from '@material-ui/icons/Room';
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import DialogFactura from "./DialogoFactura/DialogFactura";

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
  buttonGroup: {
    textAlign: "center",
    marginTop: "3%",
    marginBottom: "4%",
  },
  paperMap: {
    padding: theme.spacing(2),
    display: "flex",
    marginTop: "5%",
    height: "70vh",
    position: "relative",
  },
  largeIcon: {
    '& svg': {
      fontSize: 30
    }
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
      key: 0,
    },
    cliente: {
      estado: false,
      valor: "",
      key: 1,
    },
    productos__tp: {
      estado: false,
      valor: "",
      key: 2,
    },
    productos__brand: {
      estado: false,
      valor: "",
      key: 3,
    },
    productos__name: {
      estado: false,
      valor: "",
      key: 4,
    },
    precio: {
      estado: false,
      valor: {
        superior: "",
        inferior: "",
      },
      rango: true,
      key: 5,
    },
    total: {
      estado: false,
      valor: {
        superior: "",
        inferior: "",
      },
      rango: true,
      key: 6,
    },
    fecha: {
      estado: false,
      valor: {
        superior: new Date(),
        inferior: new Date(),
      },
      rango: true,
      // `${new Date().getDate()}-${
      //   new Date().getMonth() + 1
      //   }-${new Date().getFullYear()}`

      key: 7,
    },
    lugar: {
      estado: false,
      longitud: 0,
      latitud: 0,
      key: 8,
    },
  });
  ///////////////////////////////////////

  const [display, setDisplay] = useState('table');

  const handleDisplay = (event, newDisplay) => {
    if (newDisplay !== null) {
      setDisplay(newDisplay);
    }
  }

  const [flag, setFlag] = useState(false);

  const [viewport, SetViewport] = useState({
    latitude: 4.813415,
    longitude: -75.699704,
    zoom: 13,
  });


  const [selectedMap, setSelectedMap] = useState({});

  const [openFactura, setOpenFactura] = useState(false);

  const handleCloseFactura = () => {
    setOpenFactura(false);
  }

  const handleOpenFactura = () => {
    setOpenFactura(true);
  }

  const handleLogout = () => {
    history.push("/");
  };



  ///////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  const [data, setData] = useState([]);

  axios.interceptors.request.use(function (config) {
    const token = "Bearer " + sessionStorage.getItem("token");
    config.headers.Authorization = token;
    return config;
  });

  useEffect(() => {
    let count = 0;
    let objeto = {};
    Object.keys(filtroActivo).forEach(function (key) {
      if (filtroActivo[key].estado === true) {
        count += 1;
        if (key === "precio") {
          if (filtroActivo[key].rango) {
            objeto = {
              ...objeto,
              "productos__price__lte": filtroActivo[key].valor.superior,
              "productos__price__gte": filtroActivo[key].valor.inferior
            }
          } else {
            objeto = {
              ...objeto,
              "productos__price": filtroActivo[key].valor.superior
            }
          }

        }
        else if (key === "total") {
          if (filtroActivo[key].rango) {
            objeto = {
              ...objeto,
              "total__lte": filtroActivo[key].valor.superior,
              "total__gte": filtroActivo[key].valor.inferior
            }
          } else {
            objeto = {
              ...objeto,
              "total": filtroActivo[key].valor.superior,
            }
          }

        }
        else if (key === "fecha") {
          if (filtroActivo[key].rango) {
            objeto = {
              ...objeto,
              "fecha__lt": filtroActivo[key].valor.inferior,
              "fecha__gte": filtroActivo[key].valor.superior
            }
          } else {
            objeto = {
              ...objeto,
              "fecha": filtroActivo[key].valor.superior
            }
          }
        }
        else if (key === "lugar") {
          objeto = {
            ...objeto,
            "longitud": filtroActivo[key].longitud,
            "latitud": filtroActivo[key].latitud
          }
        } else if (key === "vendedor") {
          objeto = {
            ...objeto,
            "username": filtroActivo[key].valor
          }
        }
        else {
          objeto = {
            ...objeto,
            [key]: filtroActivo[key].valor
          }
        }
        // objeto = {...objeto, [key] : }
      }
    });
    if (count === 0) {
      axios
        .get("https://fedefun.herokuapp.com/factura", {
          params: { recents: "" },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("https://fedefun.herokuapp.com/factura", {
          params: objeto,
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // for (var i = 0; i < 9; i++) {
    //   if (filtroActivo[i].estado === true) {
    //     count = 1;
    //   }
    // }
    // if (count === 0) {

    // } else {
    //   console.log("")
    // }
  }, [flag]);



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
          <ListItems filtroActivo={filtroActivo} setFiltroActivo={setFiltroActivo} handleDrawerOpen={handleDrawerOpen} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Filtros filtroActivo={filtroActivo} setFiltroActivo={setFiltroActivo} />
              <div className={classes.buttonGroup}>
                <ToggleButtonGroup
                  value={display}
                  exclusive
                  onChange={handleDisplay}
                  aria-label="data display"
                >
                  <ToggleButton value="table" aria-label="table">
                    <TocIcon />
                  </ToggleButton>
                  <ToggleButton value="map" aria-label="map">
                    <RoomIcon />
                  </ToggleButton>
                </ToggleButtonGroup></div>

              <div className={classes.searchIcon}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SearchIcon />}
                  onClick={() => setFlag(!flag)}
                >Buscar</Button>
              </div>
              {display === 'table' ? <Paper className={classes.paper}>
                <Orders data={data} />
              </Paper> :
                <Paper
                  className={classes.paperMap}
                >
                  {/* <MapaFacturas parentDimensions={dimensions} /> */}
                  <ReactMapGL
                    {...viewport}
                    width="100%"
                    height="100%"
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={viewport => {
                      SetViewport(viewport);
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                  >
                    {
                      Object.keys(data).map(function (nombre) {
                        return (<Marker key={data[nombre]._id}
                          longitude={data[nombre].lugar.coordinates[0]}
                          latitude={data[nombre].lugar.coordinates[1]}
                          offsetLeft={-41}
                          offsetTop={-65}
                        >
                          <IconButton
                            className={classes.largeIcon}
                            onClick={() => {
                              setSelectedMap(data[nombre]);
                              handleOpenFactura();
                            }}
                          >
                            <RoomIcon color="secondary" />
                          </IconButton>
                        </Marker>)
                      }
                      )
                    }
                  </ReactMapGL>
                </Paper>

              }
              <DialogFactura open={openFactura} handleClose={handleCloseFactura} data={selectedMap} />
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
