import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders({ promesa, flag }) {
  const [data, setData] = useState([]);

  axios.interceptors.request.use(function (config) {
    const token = "Bearer " + sessionStorage.getItem("token");
    config.headers.Authorization = token;
    return config;
  });

  useEffect(() => {
    var count = 0;
    var objeto = {};
    Object.keys(promesa).forEach(function (key) {
      if (promesa[key].estado === true) {
        count += 1;
        if (key === "precio") {
          objeto = {
            ...objeto,
            "productos__price__lte": promesa[key].valor.superior,
            "productos__price__gte": promesa[key].valor.inferior
          }
        }
        else if (key === "total") {
          objeto = {
            ...objeto,
            "total__lte": promesa[key].valor.superior,
            "total__gte": promesa[key].valor.inferior
          }
        }
        else {
          objeto = {
            ...objeto,
            [key]: promesa[key].valor
          }
        }
        // objeto = {...objeto, [key] : }
      }
    });
    if (count === 0) {
      axios
        .get("http://localhost:4000/factura", {
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
        .get("http://localhost:4000/factura", {
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
    //   if (promesa[i].estado === true) {
    //     count = 1;
    //   }
    // }
    // if (count === 0) {

    // } else {
    //   console.log("")
    // }
  }, [flag]);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Facturas recientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Vendedor</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Producto(s)</TableCell>
            <TableCell>Lugar</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dt) => (
            <TableRow key={dt._id}>
              <TableCell>
                {new Date(dt.fecha.$date).toLocaleDateString()}
              </TableCell>
              <TableCell>{dt.vendedor}</TableCell>
              <TableCell>{dt.cliente.name}</TableCell>
              <TableCell>
                {dt.productos[0].tp}
                {dt.productos.length > 1
                  ? dt.productos.slice(1).map((prod) => `, ${prod.tp}`)
                  : null}
              </TableCell>
              <TableCell>{`${dt.lugar.coordinates[0]}, ${dt.lugar.coordinates[1]}`}</TableCell>
              <TableCell align="right">{dt.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}
    </React.Fragment>
  );
}
