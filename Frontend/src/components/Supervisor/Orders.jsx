import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders({ data }) {

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
                {console.log(dt)}
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
