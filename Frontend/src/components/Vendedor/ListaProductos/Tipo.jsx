import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Tipo({ tipoP }) {
  const classes = useStyles();
  const [tipo, setTipo] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setTipo(event.target.value);
    tipoP(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel id="tipo">Tipo</InputLabel>
        <Select
          labelId="tipo-open-label"
          id="tipo-open"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={tipo}
          onChange={handleChange}
        >
          <MenuItem value="Celular">Celular</MenuItem>
          <MenuItem value="Tablet">Tablet</MenuItem>
          <MenuItem value="Televisor">Televisor</MenuItem>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="PC">Computador de mesa</MenuItem>
        </Select>
      </FormControl>
      {/* <IconButton
        aria-label="close"
        size="small"
        onClick={() => {
          console.log("click");
        }}
      >
        <CancelIcon />
      </IconButton> */}
    </div>
  );
}
