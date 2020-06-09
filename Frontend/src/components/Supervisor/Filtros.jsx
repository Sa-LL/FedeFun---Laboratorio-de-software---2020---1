import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";
import BallotIcon from "@material-ui/icons/Ballot";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PlaceIcon from "@material-ui/icons/Place";
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  paperSearch: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    margin: 0,
    background: "none",
    boxShadow: "none",
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
export default function Filtros({ filtroActivo, setFiltroActivo }) {
  const classes = useStyles();

  const handleDelete = (key) => {
    setFiltroActivo({
      ...filtroActivo,
      [key]: {
        ...filtroActivo[key],
        estado: false,
      }
    })
  }

  return (
    <Paper component="ul" className={classes.paperSearch}>
      {Object.keys(filtroActivo).map(function (nombre) {
        let icon;
        let label = filtroActivo[nombre].valor;
        if (filtroActivo[nombre].estado === true) {
          switch (nombre) {
            case "vendedor":
              icon = <AccessibilityIcon />
              break;
            case "cliente":
              icon = <PeopleIcon />
              break;
            case "productos__tp":
              icon = <ShoppingCartIcon />
              break;
            case "productos__brand":
              icon = <BrandingWatermarkIcon />
              break;
            case "productos__name":
              icon = <BallotIcon />
              break;
            case "precio":
              icon = <AttachMoneyIcon />
              if (filtroActivo[nombre].rango) {
                label = `Entre $${filtroActivo[nombre].valor.superior} y $${filtroActivo[nombre].valor.inferior}`;
              } else {
                label = `$${filtroActivo[nombre].valor.superior}`
              }
              break;
            case "total":
              icon = <AssignmentTurnedInIcon />
              if (filtroActivo[nombre].rango) {
                label = `Entre $${filtroActivo[nombre].valor.superior} y $${filtroActivo[nombre].valor.inferior}`;
              } else {
                label = `$${filtroActivo[nombre].valor.superior}`
              }
              break;
            case "fecha":
              icon = <DateRangeIcon />
              if (filtroActivo[nombre].rango) {
                label = `Desde ${(filtroActivo[nombre].valor.superior).getDate()}/${(filtroActivo[nombre].valor.superior).getMonth() + 1}/${(filtroActivo[nombre].valor.superior).getFullYear()} hasta ` +
                  `${(filtroActivo[nombre].valor.inferior).getDate()}/${(filtroActivo[nombre].valor.inferior).getMonth() + 1}/${(filtroActivo[nombre].valor.inferior).getFullYear()}`
              }
              else {
                label = `${(filtroActivo[nombre].valor.superior).getDate()}/${(filtroActivo[nombre].valor.superior).getMonth() + 1}/${(filtroActivo[nombre].valor.superior).getFullYear()}`
              }
              break;
            case "lugar":
              label = `Longitud: ${(filtroActivo[nombre].longitud).toFixed(4)}, Latitud: ${(filtroActivo[nombre].latitud).toFixed(4)}`
              icon = <PlaceIcon />
              break;
          }
          return (
            <li key={filtroActivo[nombre].key}>
              <Chip
                label={label}
                className={classes.chip}
                icon={icon}
                onDelete={() => handleDelete(nombre)}
                color="primary"
              />
            </li>
          )
        } else {
          return null;
        }
      })}
    </Paper>
  );
}
