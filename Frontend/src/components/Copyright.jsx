import React from "react";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  copyright: {
    textAlign: "center",
  },
});

export default function Copyright() {
  const classes = useStyles();
  return (
    <Box className={classes.copyright} mt={8}>
      <img
        src={require("../iconos/Logo.png")}
        alt="logo"
        height="42"
        width="42"
      />
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit">FedeFun</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
