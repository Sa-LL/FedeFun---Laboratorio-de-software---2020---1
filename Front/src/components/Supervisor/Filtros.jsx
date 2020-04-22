import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";
import BallotIcon from "@material-ui/icons/Ballot";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PlaceIcon from "@material-ui/icons/Place";

const useStyles = makeStyles((theme) => ({
  paperSearch: {
    display: "flex",
    alignItems: "center",
    width: "300px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));
export default function Filtros({ placehold, handleValue, nombre, index }) {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.paperSearch}>
      <IconButton aria-label={placehold}>
        {index === 0 ? (
          <AccessibilityIcon />
        ) : index === 1 ? (
          <PeopleIcon />
        ) : index === 2 ? (
          <ShoppingCartIcon />
        ) : index === 3 ? (
          <BrandingWatermarkIcon />
        ) : index === 4 ? (
          <BallotIcon />
        ) : index === 7 ? (
          <DateRangeIcon />
        ) : index === 8 ? (
          <PlaceIcon />
        ) : null}
      </IconButton>
      <InputBase
        classes={{ input: classes.input }}
        placeholder={placehold}
        name={nombre}
        autoComplete="off"
        onChange={(e) => {
          handleValue(e.target.value, e.target.name);
        }}
      />
    </Paper>
  );
}
