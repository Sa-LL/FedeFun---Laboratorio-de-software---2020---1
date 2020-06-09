import React, { useEffect } from "react";
import Login from "./components/Login";
import DatosC from "./components/Vendedor/DatosC";
import Grid from "@material-ui/core/Grid";
import teal from "@material-ui/core/colors/teal";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import InicioV from "./components/Vendedor/InicioV";
import ListaProductosV from "./components/Vendedor/ListaProductosV";
import InicioS from "./components/Supervisor/InicioS";
import InicioA from "./components/Admin/InicioA";
import Factura from "./components/Vendedor/Factura";

const useStyles = makeStyles({
  root: {
    background: teal[300],
    height: "100vh",
  },
});

function App() {
  const handleLogin = () => {
    sessionStorage.setItem("auth", "true");
  };
  // const handleLista = (data) => {
  //   sessionStorage.setItem("dataList", JSON.stringify(data));
  //   console.log(data)
  // };
  const classes = useStyles();
  return (
    <Grid
    // container
    // classes={classes}
    // spacing={0}
    // direction="column"
    // alignItems="center"
    // justify="center"
    >
      <Router>
        <Route
          exact
          path="/"
          handleLogin={handleLogin}
          render={(props) => <Login {...props} handleLogin={handleLogin} />}
        />
        <ProtectedRoute
          exact
          path="/inicioV"
          component={InicioV}
        />
        <ProtectedRoute exact path="/datosC" component={DatosC} />
        <ProtectedRoute
          exact
          path="/listaProductos"
          component={ListaProductosV}
        />
        <ProtectedRoute exact path="/factura" component={Factura} />
        <ProtectedRoute exact path="/inicioS" component={InicioS} />
        <ProtectedRoute exact path="/inicioA" component={InicioA} />
      </Router>
    </Grid>
  );
}

export default App;
