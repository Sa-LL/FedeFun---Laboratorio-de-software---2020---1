import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { RadioGroup } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from "react-router-dom";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  iconMargin: {
    marginLeft: "-5%",
  },
  iconForward: {
    background: "#FFFFFF",
    margin: theme.spacing(1),
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#FFFFFF" },
    marginTop: "10%",
    marginLeft: "80%",
  },
  main: {
    marginTop: "5%",
  },
  text: {
    paddingLeft: "10%",
    paddingTop: "10%",
  },
  off: {
    marginLeft: "70%",
  },
}));

function DatosC() {
  const history = useHistory();

  const classes = useStyles();
  const [selected, setSelected] = useState("empresa");
  const [nombre, setNombre] = useState("def ault");
  const [doc, setDoc] = useState("0000000");
  const [correo, setCorreo] = useState("default@default.com");
  const [tel, setTel] = useState("0000000");
  const [nit, setNit] = useState("0000000-0");
  const [errorList, setErrorList] = useState({
    nombre: "",
    documento: "",
    nit: "",
    correo: "",
    telefono: "",
  });
  const handleLogout = () => {
    history.push("/");
  };

  const changerRadio = (e) => {
    setSelected(e.target.value);
  };

  const onChanger = (compare, error) => {
    if (compare) {
      setErrorList({ ...errorList, [error]: "" });
    } else {
      setErrorList({ ...errorList, [error]: "Campo no válido" });
    }
  };
  const handleNext = () => {
    if (
      errorList.nombre === "" &&
      (errorList.documento === "" || errorList.nit === "") &&
      errorList.correo === "" &&
      errorList.telefono === ""
    ) {
      if (
        nombre !== "def ault" &&
        (doc !== "0000000" || nit !== "0000000-0") &&
        correo !== "default@default.com" &&
        tel !== "0000000"
      ) {
        sessionStorage.setItem("nombreC", nombre);
        sessionStorage.setItem("tipoC", selected);
        sessionStorage.setItem("documentoC", doc);
        sessionStorage.setItem("correoC", correo);
        sessionStorage.setItem("telefonoC", tel);
        history.push("/listaProductos");
      } else {
        console.log("default");
      } /////// INSERTAR ELSE AQUÍ
    }
  };
  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <CssBaseline />
      <IconButton
        onClick={() => history.push("/inicioV")} //////// Volver
        aria-label="back"
        className={classes.iconMargin}
      >
        <ArrowBackIosIcon fontSize="large" />
      </IconButton>
      <IconButton
        className={classes.off}
        onClick={handleLogout}
        color="inherit"
      >
        <PowerSettingsNewIcon />
      </IconButton>
      <Typography className={classes.text} component="h1" variant="h5">
        Datos del cliente
      </Typography>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="Empresa"
                control={
                  <Radio
                    checked={selected === "empresa"}
                    onChange={changerRadio}
                    value="empresa"
                    color="primary"
                  />
                }
                label="Empresa"
              />
              <FormControlLabel
                value="Persona natural"
                control={
                  <Radio
                    checked={selected === "persona"}
                    onChange={changerRadio}
                    value="persona"
                    color="primary"
                  />
                }
                label="Persona natural"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            error={!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(nombre)}
            id="standard-error-helper-text"
            label="Nombre completo"
            name="nombre"
            autoComplete="off"
            helperText={errorList.nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              onChanger(
                /^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(e.target.value),
                e.target.name
              );
            }}
          />
          {selected === "empresa" ? (
            <TextField
              error={!/^(^[0-9]+-{1}[0-9]{1})$/.test(nit)}
              margin="normal"
              fullWidth
              id="nit"
              label="NIT"
              name="nit"
              autoComplete="off"
              helperText={errorList.nit}
              onChange={(e) => {
                setNit(e.target.value);
                onChanger(
                  /^(^[0-9]+-{1}[0-9]{1})$/.test(e.target.value),
                  e.target.name
                );
              }}
            />
          ) : (
            <TextField
              error={!/^[0-9]{5,11}$/.test(doc)}
              margin="normal"
              fullWidth
              id="documento"
              label="Documento de identificación"
              name="documento"
              autoComplete="off"
              helperText={errorList.documento}
              onChange={(e) => {
                setDoc(e.target.value);
                onChanger(/^[0-9]{5,11}$/.test(e.target.value), e.target.name);
              }}
            />
          )}
          <TextField
            margin="normal"
            fullWidth
            error={!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(correo)}
            id="correo"
            label="Correo electrónico"
            name="correo"
            autoComplete="off"
            helperText={errorList.correo}
            onChange={(e) => {
              setCorreo(e.target.value);
              onChanger(
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(
                  e.target.value
                ),
                e.target.name
              );
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            error={!/^[0-9]{7,10}$/.test(tel)}
            name="telefono"
            label="Teléfono"
            id="telefono"
            autoComplete="off"
            helperText={errorList.telefono}
            onChange={(e) => {
              setTel(e.target.value);
              onChanger(/^[0-9]{7,10}$/.test(e.target.value), e.target.name);
            }}
          />
        </form>
        <IconButton
          aria-label="forward"
          className={classes.iconForward}
          color="primary"
          onClick={handleNext} ///// Seguir
        >
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </div>
    </Container>
  );
}

export default DatosC;
