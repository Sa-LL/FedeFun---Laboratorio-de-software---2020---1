import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

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
    marginTop: theme.spacing(2),
  },
  iconMargin: {
    margin: theme.spacing(1),
  },
  iconForward: {
    background: "#FFFFFF",
    margin: theme.spacing(1),
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#FFFFFF" },
    marginLeft: "100%",
  },
}));

function DatosV() {
  const classes = useStyles();
  return (
    <div>
      <IconButton aria-label="back" className={classes.iconMargin}>
        <ArrowBackIosIcon fontSize="large" />
      </IconButton>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Typography component="h1" variant="h5">
          Datos de empleado
        </Typography>
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="nombre"
              label="Nombre completo"
              name="nombre"
              defaultValue="Usuario aquí"
              disabled
              style={{ marginBottom: "20%" }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="identificacion"
              label="Identificación"
              type="identificacion"
              id="identificacion"
              defaultValue="Identificación aquí"
              disabled
            />
          </form>
        </div>
        <IconButton
          aria-label="forward"
          className={classes.iconForward}
          color="primary"
        >
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </Container>
    </div>
  );
}

export default DatosV;
