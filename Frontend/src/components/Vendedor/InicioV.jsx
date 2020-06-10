import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Copyright from "../Copyright";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    width: "200px",
    height: "200px",
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

export default function InicioV() {
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    axios
      .get("https://productos-json.herokuapp.com/list", {
        params: {},
      })
      .then((res) => {
        //props.handleLista(res.data);
        sessionStorage.setItem("list", JSON.stringify(res.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <input
      accept="image/*"
      className={classes.input}
      id="contained-button-file"
      multiple
      type="file"
      /> */}
        <label htmlFor="contained-button-file">
          <IconButton>
            <Avatar
              src="../../iconos/Logo.png"
              style={{
                margin: "10px",
                width: "100px",
                height: "100px",
              }}
            />
          </IconButton>
        </label>
        <Typography className={classes.text} component="h1" variant="h5">
          Bienvenido, {sessionStorage.getItem("usuario")}
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
        <Copyright />
      </div>
    </Container>
  );
}
