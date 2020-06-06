import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Lista from "./ListaProductos/Lista";
import Tipo from "./ListaProductos/Tipo";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#009688",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  product: {
    display: "flex",
    background: "#26A69A",
    marginBottom: "-7%",
    marginTop: "3%",
  },
  productDetails: {
    display: "flex",
    flexDirection: "row",
  },
  iconMargin: {
    margin: theme.spacing(1),
  },
  input: {
    maxWidth: "30px",
    textAlignLast: "center",
  },
  price: {
    textAlign: "right",
    marginTop: "-5%",
  },
  delete: {
    float: "right",
    marginBottom: "-5%",
  },
}));

export default function Productos({ handleDataProd, contador }) {
  const [tipo, setTipo] = useState("");
  const [flag, setFlag] = useState(false);
  const [dataJson, setDataJson] = useState({
    ID: "",
    type: "",
    name: "",
    price: "0",
    brand: "",
    amount: 0,
  });
  const [count, setCount] = useState(0);
  const handleTipo = (t) => {
    setTipo(t);
    handleJson("type", t);
  };
  // Controlador del contador
  const handleChanger = () => {
    if (count < 0) {
      setCount(0);
    } else if (count >= 99) {
      setCount(99);
    }
    // handleJson("amount", count);
  };

  // Controlador del json del producto
  const handleJson = (atributo, valor) => {
    setDataJson({ ...dataJson, [atributo]: valor });
  };
  const handleAsign = (atributos, valores) => {
    // for (var i = 0; i < 3; i++) {
    //   console.log(atributos[i], valores[i]);
    //   handleJson(atributos[i], valores[i]);
    // }
    setDataJson({
      ...dataJson,
      [atributos[0]]: valores[0],
      [atributos[1]]: valores[1],
      [atributos[2]]: valores[2],
      [atributos[3]]: valores[3],
    });
  };
  const handleFlag = () => {
    setFlag(true);
    // console.log(dataJson);
  };
  // const handleUpdate = () => {
  //   handleDataProd(dataJson, contador);
  //   console.log(dataJson);
  // }

  useEffect(() => {
    // handleJson("amount", count.toString());
    handleDataProd(dataJson, contador);
    // console.log(dataJson);
    setFlag(false);
  }, [count, flag, contador, dataJson, handleDataProd]);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <IconButton
            aria-label="delete"
            className={classes.delete}
            size="small"
          // onClick={() => {
          //   if (count > 0) {
          //     setCount(count - 1);
          //     handleJson("amount", count - 1);
          //   }
          // }}
          >
            <ClearIcon />
          </IconButton>
          <Tipo tipoP={handleTipo} />
          <div className={classes.productDetails}>
            <Card className={classes.product}>
              <CardContent className={classes.content}>
                <Lista
                  tipoProd={tipo}
                  handleAsign={handleAsign}
                  handleFlag={handleFlag}
                />
              </CardContent>
            </Card>
            <div className={classes.controls}>
              <IconButton
                aria-label="add"
                className={classes.iconMargin}
                size="medium"
                onClick={() => {
                  if (count > 0) {
                    setCount(count - 1);
                    handleJson("amount", count - 1);
                  }
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Input
                className={classes.input}
                margin="dense"
                disableUnderline
                inputProps={{ maxLength: 2 }}
                value={count}
                onChange={handleChanger()}
              />
              <IconButton
                aria-label="remove"
                className={classes.iconMargin}
                size="medium"
                onClick={() => {
                  if (count <= 99) {
                    setCount(count + 1);
                    handleJson("amount", count + 1);
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
          <Typography className={classes.price} component="h1" variant="h5">
            ${dataJson.price * dataJson.amount}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
