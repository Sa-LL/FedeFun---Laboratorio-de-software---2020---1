import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { RadioGroup } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import ErrorIcon from "@material-ui/icons/Error";
import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
  main: {
    background: "#303030",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingBottom: "10%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    marginTop: "5%",
    marginBottom: "5%",
    textAlign: "center",
  },
  icono: {
    marginTop: "10%",
  },
  radio: {
    placeContent: "center",
    paddingTop: "5%",
  },
  error: {
    display: "flex",
    marginRight: "auto",
  },
  errorText: {
    marginLeft: "10px",
    color: "#f44336",
  },
  copyright: {
    marginTop: "-20%",
  },
}));

export default function Login(props) {
  const history = useHistory();
  const [selected, setSelected] = useState("vendedor");
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const classes = useStyles();
  const [log, setLog] = useState({
    username: "",
    password: "",
    rol: "vendedor",
  });

  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const updateJson = (e) => {
    setLog({
      ...log,
      [e.target.name]: e.target.value,
    });
  };

  axios.interceptors.request.use(function (config) {
    const token = "Bearer " + sessionStorage.getItem("token");
    config.headers.Authorization = token;
    return config;
  });
  const handleClick = () => {
    axios
      .post("https://fedefun.herokuapp.com/login", log)
      .then((res) => {
        if (res.status === 200) {
          props.handleLogin();
          if (selected === "vendedor") {
            sessionStorage.setItem("usuario", log.username);
            history.push("/inicioV");
          } else if (selected === "supervisor") history.push("/inicioS");
          else if (selected === "administrador") history.push("/inicioA");
        }
        sessionStorage.setItem("token", res.data.token);
        // axios.defaults.headers.common["Authorization"] =
        //   "Bearer " + res.data.token;
      })
      .catch((err) => {
        let status = err.message.split(" ").splice(-1)[0];
        if (status === "400") {
          //setTextDialog("Rol de usuario incorrecto");
          setOpen(true);
          setText("Rol de usuario incorrecto");
        } else if (status === "404") {
          setOpen(true);
          setText("Datos incorrectos");
          //setTextDialog("Datos incorrectos");
        }
      });
  };
  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          src={require("../iconos/techworld.png")}
          alt="techworld"
          height="40%"
          width="40%"
        />
        <Typography className={classes.text} component="h1" variant="h5">
          Techworld
        </Typography>
        {open ? (
          <div className={classes.error}>
            <ErrorIcon color="error" />
            <Typography className={classes.errorText}>{text}</Typography>
          </div>
        ) : null}
        <form className={classes.form} noValidate>
          <TextField
            margin="normal"
            fullWidth
            id="usuario"
            label="Usuario"
            name="username"
            autoComplete="off"
            autoFocus
            value={log.username}
            onChange={updateJson}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="off"
            value={log.password}
            onChange={updateJson}
          />

          <FormControl component="fieldset">
            <RadioGroup
              className={classes.radio}
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="Vendedor"
                control={
                  <Radio
                    checked={selected === "vendedor"}
                    onChange={(e) => {
                      setSelected(e.target.value);
                      updateJson(e);
                    }}
                    value="vendedor"
                    color="primary"
                    name="rol"
                  />
                }
                label="Vendedor"
              />
              <FormControlLabel
                value="Supervisor"
                control={
                  <Radio
                    checked={selected === "supervisor"}
                    onChange={(e) => {
                      setSelected(e.target.value);
                      updateJson(e);
                    }}
                    value="supervisor"
                    color="primary"
                    name="rol"
                  />
                }
                label="Supervisor"
              />
              <FormControlLabel
                value="Administrador"
                control={
                  <Radio
                    checked={selected === "administrador"}
                    onChange={(e) => {
                      setSelected(e.target.value);
                      updateJson(e);
                    }}
                    value="administrador"
                    color="primary"
                    name="rol"
                  />
                }
                label="Administrador"
              />
            </RadioGroup>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          // href="/datosV"
          >
            Ingresar
          </Button>
        </form>
      </div>
      <div className={classes.copyright}>
        <Copyright />
      </div>
    </Container>
  );
}
