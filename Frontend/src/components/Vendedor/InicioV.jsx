import React, { useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    marginBottom: "10%",
    marginTop: "-30%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    padding: "10%",
  },
}));

export default function InicioV(props) {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("http://localhost:5000/list", {
        params: {},
      })
      .then((res) => {
        props.handleLista(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          // className={classes.img}
          src={require("../../iconos/Logo.png")}
          alt="logo"
        />
        <Typography className={classes.text} component="h1" variant="h5">
          Bienvenido
        </Typography>
        <form className={classes.form} noValidate>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // href="/datosV"
            onClick={() => history.push("/datosC")} ///////////////// Ir a hacer facturas
          >
            Hacer factura
          </Button>
          {/* <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ver facturas
          </Button> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              sessionStorage.clear(); ///////////////////// Logout, limpiar la sesión
              history.push("/"); //////////////////////// Volver al Login
            }}
          >
            Desconectarse
          </Button>
        </form>
      </div>
    </Container>
  );
}
