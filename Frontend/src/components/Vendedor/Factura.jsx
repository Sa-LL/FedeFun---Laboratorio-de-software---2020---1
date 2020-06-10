import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    //marginTop: theme.spacing(2),
    marginTop: "-10%",
  },
  iconMargin: {
    margin: theme.spacing(1),
  },
  iconForward: {
    background: "#FFFFFF",
    margin: theme.spacing(1),
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#FFFFFF" },
    float: "right",
  },
}));

function Factura() {
  const classes = useStyles();
  const factura = JSON.parse(sessionStorage.getItem("factura"));
  const history = useHistory();

  axios.interceptors.request.use(function (config) {
    const token = "Bearer " + sessionStorage.getItem("token");
    config.headers.Authorization = token;
    return config;
  });

  const handleFacturar = () => {
    axios
      .post("https://fedefun.herokuapp.com/factura", factura)
      .then((res) => {
        console.log(res);
        history.push("/InicioV");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <IconButton aria-label="back" className={classes.iconMargin} onClick={() => history.push("/listaProductos")}>
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
        <Typography component="h1" variant="h5">
          Factura
        </Typography>
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="nombre"
              label="Nombre del cliente"
              name="nombre"
              defaultValue={factura.cliente.name}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              label="Tipo de cliente"
              defaultValue={factura.cliente.tipoC}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              label="Identificación del cliente"
              defaultValue={factura.cliente.documento}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              label="Correo"
              defaultValue={factura.cliente.correo}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              label="Teléfono cliente"
              defaultValue={factura.cliente.telefono}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              label="Fecha"
              defaultValue={factura.fecha}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              label="Lugar"
              defaultValue={factura.lugar}
              disabled
            />
            {factura.productos.map((item, index) => (
              <div key={index}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="ID producto"
                  defaultValue={item.ID}
                  disabled
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Tipo producto"
                  defaultValue={item.type}
                  disabled
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Nombre producto"
                  defaultValue={item.name}
                  disabled
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Precio producto"
                  defaultValue={item.price}
                  disabled
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Marca producto"
                  defaultValue={item.brand}
                  disabled
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Cantidad del producto"
                  defaultValue={item.amount}
                  disabled
                />
              </div>
            ))}
          </form>
        </div>
        <IconButton
          aria-label="forward"
          className={classes.iconForward}
          color="primary"
          onClick={handleFacturar}
        >
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </Container>
    </div>
  );
}

export default Factura;
