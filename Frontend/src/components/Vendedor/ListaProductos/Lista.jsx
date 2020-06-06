import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Lista({ tipoProd, handleAsign, handleFlag }) {
  // Crear estiles
  const classes = useStyles();
  // Variable control del "select"
  const [producto, setProducto] = useState("");

  const [open, setOpen] = useState(false);

  // Sacar los datos de la "base de datos externa" que están en el almacenamiento de sesión
  const lista = JSON.parse(sessionStorage.getItem("list"));

  // Controlador del "select" y asignacion del nombre para el JSON
  const handleChange = (event) => {
    setProducto(event.target.value);
    // atributo: name, valor: value
    //handleJson("id", lista[tipoProd])
    const { itemId, itemPrice, itemBrand } = event.currentTarget.dataset;
    handleAsign(
      ["name", "ID", "price", "brand"],
      [event.target.value, itemId, itemPrice, itemBrand]
    );
    // handleJson("name", event.target.value);
    // handleJson("id", itemId);
    // handleJson("price", itemPrice);
    // handleJson("brand", itemBrand);
    console.log(`${itemId} ${itemPrice} ${itemBrand}`);
    handleFlag();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    //console.log(lista.celular[0].id);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="producto">Producto</InputLabel>
        <Select
          labelId="producto-open-label"
          id="producto-open"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={producto}
          onChange={handleChange}
        >
          {tipoProd
            ? lista[tipoProd].map((item, index) => (
              <MenuItem
                key={index}
                value={item.nombre}
                data-item-id={item.id}
                data-item-price={item.precio}
                data-item-brand={item.marca}
              >
                {item.nombre}
              </MenuItem>
            ))
            : null}
        </Select>
      </FormControl>
    </div>
  );
}
