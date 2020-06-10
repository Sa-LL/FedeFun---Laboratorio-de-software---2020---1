import React, { useState, useEffect } from "react";
import Productos from "./Productos";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from "react-router-dom";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    marginLeft: "70%",
  },
  iconForward: {
    background: "#FFFFFF",
    margin: theme.spacing(1),
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#FFFFFF" },
    float: "right",
    marginTop: "10%",
    marginBottom: "10%",
  },
  off: {
    float: "right",
  },
  upperBar: {
    marginBottom: "10%",
    marginTop: "10%",
  },
}));

export default function ListaProductosV() {
  const history = useHistory();
  let contador = 1;
  // Estilos
  const classes = useStyles();
  const handleLogout = () => {
    history.push("/");
  };

  const [factura, setFactura] = useState({
    cliente: {
      name: sessionStorage.getItem("nombreC"),
      tipoC: sessionStorage.getItem("tipoC"),
      documento: sessionStorage.getItem("documentoC"),
      correo: sessionStorage.getItem("correoC"),
      telefono: sessionStorage.getItem("telefonoC"),
    },
    productos: [],
    fecha: `${new Date().getDate()}-${
      new Date().getMonth() + 1
      }-${new Date().getFullYear()}`,
    lugar: [0, 0],
  });
  // Controlador para el arreglo de json de los productos
  const handleDataProd = (data, index) => {
    let dataProdCopy = [...dataProd];
    dataProdCopy[index] = data;
    //console.log(dataProdCopy[index].amount)
    setDataProd(dataProdCopy);
    // setDataProd(dataProd.concat(data));
  };
  // Arreglo de informacion de productos
  const [dataProd, setDataProd] = useState([]);
  // Arreglo de componente de productos para tener multiples tipos
  const [products, setProducts] = useState([
    <Productos handleDataProd={handleDataProd} contador={0} />,
  ]);
  // Controlador para hacer el mapeo y agregar mas componentes de Producto en el DOM
  const createProduct = () => {
    setDataProd(dataProd.concat([]));
    setProducts(
      products.concat(
        <Productos handleDataProd={handleDataProd} contador={contador} />
      )
    );
    contador = contador + 1;
  };

  //useEffect
  useEffect(() => {
    let facturaCopy = { ...factura };
    facturaCopy.productos = dataProd;
    // facturaCopy.productos[0] && console.log(facturaCopy.productos[0].amount)
    setFactura(facturaCopy);
  }, [dataProd]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setFactura({
        ...factura,
        lugar: [pos.coords.longitude, pos.coords.latitude]
      })
    });
  }, [])

  //Siguiente

  const goForward = () => {
    // let facturaCopy = { ...factura};
    // facturaCopy.productos = dataProd;
    if (factura.productos.length) {
      console.log(factura.productos[0].amount);
      sessionStorage.setItem("factura", JSON.stringify(factura));
    }
    history.push("/factura");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.upperBar}>
        <IconButton onClick={() => history.push("/datosC")} aria-label="back">
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
        <IconButton
          className={classes.off}
          onClick={handleLogout}
          color="inherit"
        >
          <PowerSettingsNewIcon />
        </IconButton>
      </div>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Productos
        </Typography>
        <List>
          {products.map((product, id) => (
            <ListItem key={id}>{product}</ListItem>
          ))}
        </List>
        <div className={classes.button}>
          <Fab color="primary" aria-label="add" onClick={createProduct}>
            <AddIcon />
          </Fab>
        </div>
      </div>
      <IconButton
        aria-label="forward"
        className={classes.iconForward}
        color="primary"
        onClick={goForward}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>
    </Container>
  );
}
