import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";
import BallotIcon from "@material-ui/icons/Ballot";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PlaceIcon from "@material-ui/icons/Place";

export default function ListItems({ handleButton }) {
  const [estado, setEstado] = useState({
    vendedor: true,
    cliente: false,
    tipo: false,
    marca: false,
    nombre: false,
    precio: false,
    total: false,
    fecha: false,
    lugar: false,
  });
  const handleEstado = (name) => {
    setEstado({ ...estado, [name]: !estado[name] });
  };
  return (
    <div>
      <ListItem
        button
        onClick={() => {
          handleButton(0, !estado.vendedor, "Vendedor...", "vendedor");
          handleEstado("vendedor");
        }}
      >
        <ListItemIcon>
          <AccessibilityIcon />
        </ListItemIcon>
        <ListItemText primary="Vendedor" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleButton(1, !estado.cliente, "Cliente...", "cliente");
          handleEstado("cliente");
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Cliente" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleButton(2, !estado.tipo, "Tipo de producto...", "productos__tp");
          handleEstado("tipo");
        }}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Tipo de producto" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleButton(
            3,
            !estado.marca,
            "Marca de producto...",
            "productos__brand"
          );
          handleEstado("marca");
        }}
      >
        <ListItemIcon>
          <BrandingWatermarkIcon />
        </ListItemIcon>
        <ListItemText primary="Marca de producto" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleButton(
            4,
            !estado.nombre,
            "Nombre de producto...",
            "productos__name"
          );
          handleEstado("nombre");
        }}
      >
        <ListItemIcon>
          <BallotIcon />
        </ListItemIcon>
        <ListItemText primary="Nombre de producto" />
      </ListItem>
      <ListItem button onClick={() => handleButton("Precio")}>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Precio del producto" />
      </ListItem>
      <ListItem button onClick={() => handleButton("Total")}>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Total de la factura" />
      </ListItem>
      <ListItem button onClick={() => handleButton("Fecha")}>
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary="Fecha" />
      </ListItem>
      <ListItem button onClick={() => handleButton("Lugar")}>
        <ListItemIcon>
          <PlaceIcon />
        </ListItemIcon>
        <ListItemText primary="Lugar" />
      </ListItem>
    </div>
  );
}
