import React from 'react'
import Button from '@material-ui/core/Button';
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
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';
import DateRangeIcon from "@material-ui/icons/DateRange";

const useStyles = makeStyles((theme) => ({
    rango: {
        marginTop: "-5%",
        marginBottom: "5%",
    },
    limiteSuperior: {
        marginTop: "10%",
        marginBottom: "10%",
    },
    fechaExacto: {
        marginTop: "10%",
        marginBottom: "5%",
    },
}));

export default function DialogDate({ open, handleClose, setFiltroActivo, filtroActivo }) {
    const classes = useStyles();

    const handleDateChangeSuperior = (date) => {
        setFiltroActivo({
            ...filtroActivo,
            fecha: {
                ...filtroActivo.fecha,
                valor: {
                    ...filtroActivo.fecha.valor,
                    superior: date,
                }
            }
        })
    }

    const handleDateChangeInferior = (date) => {
        setFiltroActivo({
            ...filtroActivo,
            fecha: {
                ...filtroActivo.fecha,
                valor: {
                    ...filtroActivo.fecha.valor,
                    inferior: date,
                }
            }
        })
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Fecha</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch
                                color="primary"
                                checked={filtroActivo.fecha.rango}
                                onChange={() => setFiltroActivo({
                                    ...filtroActivo,
                                    fecha: {
                                        ...filtroActivo.fecha,
                                        rango: !filtroActivo.fecha.rango,
                                    }
                                })}
                                name="checked"
                            />}
                            label="Rango de fechas"
                        />
                        {filtroActivo.fecha.rango ? <div className={classes.rango} ><Grid className={classes.limiteSuperior} container alignItems="flex-end">
                            <Grid item>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                    <DatePicker
                                        label="Desde"
                                        inputVariant="outlined"
                                        value={filtroActivo.fecha.valor.superior}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><ArrowUpwardIcon /></InputAdornment>,
                                        }}
                                        onChange={handleDateChangeSuperior}
                                        format="dd/MM/yyyy"
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                            <Grid container alignItems="flex-end">
                                <Grid item>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                        <DatePicker
                                            label="Hasta"
                                            inputVariant="outlined"
                                            value={filtroActivo.fecha.valor.inferior}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><ArrowDownwardIcon /></InputAdornment>,
                                            }}
                                            onChange={handleDateChangeInferior}
                                            format="dd/MM/yyyy"
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid> </div> :
                            <Grid className={classes.fechaExacto} container alignItems="flex-end">
                                <Grid item>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                        <DatePicker
                                            label="Fecha exacta"
                                            inputVariant="outlined"
                                            value={filtroActivo.fecha.valor.superior}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><DateRangeIcon /></InputAdornment>,
                                            }}
                                            onChange={handleDateChangeSuperior}
                                            format="dd/MM/yyyy"
                                        />
                                    </MuiPickersUtilsProvider>
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
                            fecha: {
                                ...filtroActivo.fecha,
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
