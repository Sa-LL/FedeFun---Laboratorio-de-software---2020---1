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
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders({ promesa }) {
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const [flag, setFlag] = useState(false);
  const handlePassword = (e) => {
    setPassword(e);
  };
  const [state, setState] = useState({
    columns: [
      {
        title: "ID",
        field: "_id",
        editable: "never",
        // cellStyle: {
        //   width: 5,
        //   maxWidth: 5,
        // },
      },
      { title: "Documento", field: "external_id" },
      { title: "Usuario", field: "username" },
      {
        title: "Contraseña",
        field: "pass",
        editComponent: (props) => (
          <Input
            type="password"
            defaultValue=""
            onChange={(e) => handlePassword(e.target.value)}
          />
        ),
      },
      { title: "Nombre", field: "nombre" },
      { title: "Telefono", field: "telefono" },
      { title: "email", field: "email" },
      { title: "Dirección", field: "address" },
      {
        title: "Rol",
        field: "type",
      },
    ],
  });

  axios.interceptors.request.use(function (config) {
    const token = "Bearer " + sessionStorage.getItem("token");
    config.headers.Authorization = token;
    return config;
  });

  useEffect(() => {
    console.log(flag);
    axios
      .get("http://localhost:4000/users", {})
      .then((res) => {
        console.log(res);
        setState((prevState) => {
          const { data: removedState, ...currentState } = prevState;
          currentState.data = [];
          return currentState;
        });
        res.data.map((obj) =>
          setState((prevState) => {
            const data = [...prevState.data];
            data.push({ ...obj, pass: "Cifrada" });
            return { ...prevState, data };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);
  return (
    <React.Fragment>
      <MaterialTable
        localization={{
          header: {
            actions: 'Acciones'
          },
          toolbar: {
            searchPlaceholder: 'Búsqueda',
            searchTooltip: 'Búsqueda'
          },
          pagination: {
            labelRowsSelect: 'filas'
          },
          body: {
            emptyDataSourceMessage: 'No hay información para mostrar',
            addTooltip: 'Añadir',
            deleteTooltip: 'Eliminar',
            editTooltip: 'Editar'
          }
        }}
        title={<Title>Usuarios</Title>}
        columns={state.columns}
        data={state.data}
        options={{ actionsColumnIndex: -1 }}
        editable={{
          onRowAdd: ({ _id: temp, ...sendData }) =>
            axios
              .post("http://localhost:4000/users", {
                ...sendData,
                password: password,
              })
              .then((res) => {
                console.log(res);
                setFlag(!flag);
              })
              .catch((err) => {
                console.log(err);
                console.log(sendData);
              }),
          onRowUpdate: ({ _id: temp, ...sendData }, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                // if (oldData) {
                //   setState((prevState) => {
                //     const data = [...prevState.data];
                //     data[data.indexOf(oldData)] = newData;
                //     return { ...prevState, data };
                //   });
                // }
                //const { _id: temp, ...sendData } = newData;
                console.log(sendData);
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />

      {/* <Table size="small">
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
      </Table> */}

      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}
    </React.Fragment>
  );
}
