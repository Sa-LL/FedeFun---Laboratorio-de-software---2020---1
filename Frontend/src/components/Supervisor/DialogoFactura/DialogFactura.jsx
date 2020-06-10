import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import PlaceIcon from "@material-ui/icons/Place";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function DialogDate({ open, handleClose, data }) {
    const classes = useStyles();

    const [cliente, setCliente] = useState(false);
    const [producto, setProducto] = useState({});


    useEffect(() => {
        let objeto = {}
        if (data.cliente) {
            data.productos.map((item) => (
                objeto = {
                    ...objeto,
                    [item._id]: false,
                }
            ));
        }
        setProducto(objeto);
    }, [data]);



    const handleCLiente = () => {
        setCliente(!cliente);
    }

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Factura</DialogTitle>
                <DialogContent>
                    {data.cliente ?
                        <List className={classes.root}>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemIcon>
                                    <AccessibilityIcon />
                                </ListItemIcon>
                                <ListItemText primary="Vendedor"
                                    secondary={data.vendedor} />
                            </ListItem>
                            <Divider component="li" />
                            <ListItem button onClick={handleCLiente}>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cliente"
                                    secondary={data.cliente.name} />
                                {cliente ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={cliente} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <Divider component="li" />
                                    <ListItem className={classes.nested}>
                                        <ListItemText primary="Tipo"
                                            secondary={data.cliente.tipoC} />
                                    </ListItem>
                                    <Divider component="li" />
                                    <ListItem className={classes.nested}>
                                        <ListItemText primary="Correo"
                                            secondary={data.cliente.correo} />
                                    </ListItem>
                                    <Divider component="li" />
                                    <ListItem className={classes.nested}>
                                        <ListItemText primary="Documento"
                                            secondary={data.cliente.documento} />
                                    </ListItem>
                                    <Divider component="li" />
                                    <ListItem className={classes.nested}>
                                        <ListItemText primary="Teléfono"
                                            secondary={data.cliente.telefono} />
                                    </ListItem>
                                    <Divider component="li" />
                                </List>
                            </Collapse>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemIcon>
                                    <DateRangeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Fecha"
                                    secondary={new Date(data.fecha.$date).toLocaleDateString()} />
                            </ListItem>
                            <Divider component="li" />
                            {data.productos.map(function (item) {
                                return (
                                    <div key={item._id}>
                                        <ListItem button onClick={() => setProducto({
                                            ...producto,
                                            [item._id]: !producto[item._id],
                                        })}>
                                            <ListItemIcon>
                                                <ShoppingCartIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Producto"
                                                secondary={item.name} />
                                            {producto[item._id] ? <ExpandLess /> : <ExpandMore />}
                                        </ListItem>
                                        <Collapse in={producto[item._id]} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                <ListItem className={classes.nested}>
                                                    <ListItemText primary="Id"
                                                        secondary={item._id} />
                                                </ListItem>
                                                <Divider component="li" />
                                                <ListItem className={classes.nested}>
                                                    <ListItemText primary="Tipo"
                                                        secondary={item.tp} />
                                                </ListItem>
                                                <Divider component="li" />
                                                <ListItem className={classes.nested}>
                                                    <ListItemText primary="Marca"
                                                        secondary={item.brand} />
                                                </ListItem>
                                                <Divider component="li" />
                                                <ListItem className={classes.nested}>
                                                    <ListItemText primary="Precio"
                                                        secondary={item.price} />
                                                </ListItem>
                                                <Divider component="li" />
                                                <ListItem className={classes.nested}>
                                                    <ListItemText primary="Cantidad"
                                                        secondary={item.amount} />
                                                </ListItem>
                                                <Divider component="li" />
                                            </List>
                                        </Collapse>
                                    </div>
                                )
                            }
                            )}
                            <ListItem>
                                <ListItemIcon>
                                    <AssignmentTurnedInIcon />
                                </ListItemIcon>
                                <ListItemText primary="Total"
                                    secondary={`$${data.total}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <PlaceIcon />
                                </ListItemIcon>
                                <ListItemText primary="Ubicación"
                                    secondary={`Longitud: ${data.lugar.coordinates[0]},
                                                latitud: ${data.lugar.coordinates[1]}`} />
                            </ListItem>
                        </List> : null}

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} size="small" variant="contained" color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
