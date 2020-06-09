import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    rango: {
        marginTop: "-5%",
        marginBottom: "5%",
    },
    limiteSuperior: {
        marginTop: "10%",
        marginBottom: "10%",
    },
    precioExacto: {
        marginTop: "10%",
        marginBottom: "5%",
    },
}));

export default function DialogPrecio({ open, handleClose, titulo, setFiltroActivo, filtroActivo, campo }) {
    const classes = useStyles();
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{titulo}</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch
                                color="primary"
                                checked={filtroActivo[campo].rango}
                                onChange={() => setFiltroActivo({
                                    ...filtroActivo,
                                    [campo]: {
                                        ...filtroActivo[campo],
                                        rango: !filtroActivo[campo].rango,
                                    }
                                })}
                                name="checked"
                            />}
                            label="Rango de precios"
                        />
                        {filtroActivo[campo].rango ? <div className={classes.rango} ><Grid className={classes.limiteSuperior} container alignItems="flex-end">
                            <Grid item>
                                <TextField
                                    id="limite-superior"
                                    label="Precio tope superior"
                                    type="number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><ArrowUpwardIcon /></InputAdornment>
                                    }}
                                    variant="outlined"
                                    onChange={(e) => setFiltroActivo({
                                        ...filtroActivo,
                                        [campo]: {
                                            ...filtroActivo[campo],
                                            valor: {
                                                ...filtroActivo[campo].valor,
                                                superior: e.target.value
                                            }

                                        }
                                    })}
                                    value={filtroActivo[campo].valor.superior}
                                />
                            </Grid>
                        </Grid>
                            <Grid container alignItems="flex-end">
                                <Grid item>
                                    <TextField id="limite-inferior" label="Precio tope inferior"
                                        type="number"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><ArrowDownwardIcon /></InputAdornment>
                                        }}
                                        variant="outlined"
                                        onChange={(e) => setFiltroActivo({
                                            ...filtroActivo,
                                            [campo]: {
                                                ...filtroActivo[campo],
                                                valor: {
                                                    ...filtroActivo[campo].valor,
                                                    inferior: e.target.value
                                                }

                                            }
                                        })}
                                        value={filtroActivo[campo].valor.inferior}
                                    />
                                </Grid>
                            </Grid> </div> :
                            <Grid className={classes.precioExacto} container alignItems="flex-end">
                                <Grid item>
                                    <TextField
                                        id="Precio exact"
                                        label="Precio exacto"
                                        type="number"
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        onChange={(e) => setFiltroActivo({
                                            ...filtroActivo,
                                            [campo]: {
                                                ...filtroActivo[campo],
                                                valor: {
                                                    ...filtroActivo[campo].valor,
                                                    superior: e.target.value
                                                }

                                            }
                                        })}
                                        value={filtroActivo[campo].valor.superior}
                                    />
                                </Grid>
                            </Grid>

                        }

                    </FormGroup>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} size="small" variant="contained" color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        setFiltroActivo({
                            ...filtroActivo,
                            [campo]: {
                                ...filtroActivo[campo],
                                estado: true,
                            }
                        });
                        handleClose();
                    }} size="small" variant="contained" color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
