import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";
import BallotIcon from "@material-ui/icons/Ballot";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PlaceIcon from "@material-ui/icons/Place";
import InputBase from "@material-ui/core/InputBase";
import DialogPrecio from "./Dialog";
import { makeStyles } from "@material-ui/core/styles";
import DialogMap from "./Mapa/DialogMap";
import DialogDate from "./DialogDate";

const useStyles = makeStyles((theme) => ({
  iconoActivado: {
    //color: "#07CCB9",
    backgroundColor: "#289C91",
    '&:hover': {
      background: "#2EC5B6",
    },
  },
}));


export default function ListItems({ filtroActivo, setFiltroActivo }) {

  const classes = useStyles();

  const [openP, setOpenP] = useState(false);
  const [openT, setOpenT] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  const handleClickOpenP = () => {
    setOpenP(true);
  };

  const handleClickOpenT = () => {
    setOpenT(true);
  }

  const handleClickOpenD = () => {
    setOpenD(true);
  }

  const handleCloseT = () => {
    setOpenT(false);
  }
  const handleCloseP = () => {
    setOpenP(false);
  };
  const handleCloseD = () => {
    setOpenD(false);
  };
  const handleMapOpen = () => {
    setOpenMap(true);
  }

  const handleMapClose = () => {
    setOpenMap(false);
  }

  const handleConfirm = () => {
    setOpenMap(false);
    setFiltroActivo({
      ...filtroActivo,
      lugar: {
        ...filtroActivo.lugar,
        estado: true,
      }
    })
  }

  const handleCoordenadas = (longitud, latitud) => {
    setFiltroActivo({
      ...filtroActivo, lugar: {
        ...filtroActivo.lugar,
        longitud: longitud,
        latitud: latitud,
      },
    });
  }


  return (
    <div>
      {/* Vendedor */}
      <ListItem
        button
        className={filtroActivo.vendedor.estado ? classes.iconoActivado : null}
      >
        <ListItemIcon onClick={() => setFiltroActivo({ ...filtroActivo, vendedor: { ...filtroActivo.vendedor, estado: !filtroActivo.vendedor.estado } })} >
          <AccessibilityIcon />
        </ListItemIcon>
        {filtroActivo.vendedor.estado ?
          <InputBase
            placeholder="Vendedor..."
            autoComplete="off"
            value={filtroActivo.vendedor.valor}
            onChange={(e) => setFiltroActivo({ ...filtroActivo, vendedor: { ...filtroActivo.vendedor, valor: e.target.value } })
            }
          /> :
          <ListItemText onClick={() => { setFiltroActivo({ ...filtroActivo, vendedor: { ...filtroActivo.vendedor, estado: true } }); }} primary="Vendedor" />}

      </ListItem>


      {/* Cliente */}
      <ListItem
        button
        className={filtroActivo.cliente.estado ? classes.iconoActivado : null}
      >
        <ListItemIcon onClick={() => setFiltroActivo({ ...filtroActivo, cliente: { ...filtroActivo.cliente, estado: !filtroActivo.cliente.estado } })}>
          <PeopleIcon />
        </ListItemIcon>
        {filtroActivo.cliente.estado ?
          <InputBase
            placeholder="Cliente..."
            autoComplete="off"
            value={filtroActivo.cliente.valor}
            onChange={(e) => setFiltroActivo({ ...filtroActivo, cliente: { ...filtroActivo.cliente, valor: e.target.value } })
            }
          /> :
          <ListItemText onClick={() => setFiltroActivo({ ...filtroActivo, cliente: { ...filtroActivo.cliente, estado: true } })} primary="Cliente" />
        }
      </ListItem>


      {/* Tipo de producto */}
      <ListItem
        button
        className={filtroActivo.productos__tp.estado ? classes.iconoActivado : null}
      >
        <ListItemIcon onClick={() => setFiltroActivo({ ...filtroActivo, productos__tp: { ...filtroActivo.productos__tp, estado: !filtroActivo.productos__tp.estado } })}>
          <ShoppingCartIcon />
        </ListItemIcon>
        {filtroActivo.productos__tp.estado ?
          <InputBase
            placeholder="Tipo de producto..."
            autoComplete="off"
            value={filtroActivo.productos__tp.valor}
            onChange={(e) => setFiltroActivo({ ...filtroActivo, productos__tp: { ...filtroActivo.productos__tp, valor: e.target.value } })
            }
          /> : <ListItemText onClick={() => setFiltroActivo({ ...filtroActivo, productos__tp: { ...filtroActivo.productos__tp, estado: true } })} primary="Tipo de producto" />
        }
      </ListItem>


      {/* Marca de producto */}
      <ListItem
        button
        className={filtroActivo.productos__brand.estado ? classes.iconoActivado : null}
      >
        <ListItemIcon onClick={() => setFiltroActivo({ ...filtroActivo, productos__brand: { ...filtroActivo.productos__brand, estado: !filtroActivo.productos__brand.estado } })}>
          <BrandingWatermarkIcon />
        </ListItemIcon>
        {filtroActivo.productos__brand.estado ?
          <InputBase
            placeholder="Marca de producto..."
            autoComplete="off"
            value={filtroActivo.productos__brand.valor}
            onChange={(e) => setFiltroActivo({ ...filtroActivo, productos__brand: { ...filtroActivo.productos__brand, valor: e.target.value } })
            }
          /> : <ListItemText onClick={() => setFiltroActivo({ ...filtroActivo, productos__brand: { ...filtroActivo.productos__brand, estado: true } })} primary="Marca de producto" />
        }
      </ListItem>


      {/* Nombre de producto */}
      <ListItem
        button
        className={filtroActivo.productos__name.estado ? classes.iconoActivado : null}
      >
        <ListItemIcon onClick={() => setFiltroActivo({ ...filtroActivo, productos__name: { ...filtroActivo.productos__name, estado: !filtroActivo.productos__name.estado } })}>
          <BallotIcon />
        </ListItemIcon>
        {filtroActivo.productos__name.estado ?
          <InputBase
            placeholder="Nombre de producto..."
            autoComplete="off"
            value={filtroActivo.productos__name.valor}
            onChange={(e) => setFiltroActivo({ ...filtroActivo, productos__name: { ...filtroActivo.productos__name, valor: e.target.value } })
            }
          /> : <ListItemText onClick={() => setFiltroActivo({ ...filtroActivo, productos__name: { ...filtroActivo.productos__name, estado: true } })} primary="Nombre de producto" />
        }
      </ListItem>


      {/* Precio del producto */}
      <ListItem
        button
        className={filtroActivo.precio.estado ? classes.iconoActivado : null}
      >
        <ListItemIcon onClick={() => setFiltroActivo({ ...filtroActivo, precio: { ...filtroActivo.precio, estado: !filtroActivo.precio.estado } })}>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText onClick={handleClickOpenP} primary="Precio del producto" />
        <DialogPrecio open={openP} handleClose={handleCloseP} titulo="Precio del producto" setFiltroActivo={setFiltroActivo} filtroActivo={filtroActivo} campo={"precio"} />
      </ListItem>


      {/* Total de la factura */}
      <ListItem
        button
        className={filtroActivo.total.estado ? classes.iconoActivado : null}
      >
        <ListItemIcon onClick={() => setFiltroActivo({ ...filtroActivo, total: { ...filtroActivo.total, estado: !filtroActivo.total.estado } })} >
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText onClick={handleClickOpenT} primary="Total de la factura" />
        <DialogPrecio open={openT} handleClose={handleCloseT} titulo="Total de la factura" setFiltroActivo={setFiltroActivo} filtroActivo={filtroActivo} campo={"total"} />
      </ListItem>


      {/* Fecha */}
      <ListItem
        button
        className={filtroActivo.fecha.estado ? classes.iconoActivado : null}
      >
        <ListItemIcon onClick={() => setFiltroActivo({ ...filtroActivo, fecha: { ...filtroActivo.fecha, estado: !filtroActivo.fecha.estado } })}>
          <DateRangeIcon />
        </ListItemIcon>

        {/* <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <DatePicker
              value={filtroActivo.fecha.valor}
              InputProps={{
                disableUnderline: true
              }}
              onChange={handleDateChange}
              format="dd/MM/yyyy"

            />
          </MuiPickersUtilsProvider> */}
        <ListItemText onClick={handleClickOpenD} primary="Fecha" />
        <DialogDate open={openD} handleClose={handleCloseD} setFiltroActivo={setFiltroActivo} filtroActivo={filtroActivo} />


      </ListItem>


      {/* Ubicación */}
      <ListItem
        button
        className={filtroActivo.lugar.estado ? classes.iconoActivado : null}
      >
        <ListItemIcon onClick={() => setFiltroActivo({ ...filtroActivo, lugar: { ...filtroActivo.lugar, estado: !filtroActivo.lugar.estado } })} >
          <PlaceIcon />
        </ListItemIcon>
        <ListItemText onClick={handleMapOpen} primary="Lugar" />
        <DialogMap open={openMap} handleClose={handleMapClose} handleConfirm={handleConfirm} handleCoordenadas={handleCoordenadas} />
      </ListItem>
    </div>
  );
}
