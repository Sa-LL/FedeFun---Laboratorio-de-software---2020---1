import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Map from "./Mapa";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "absolute",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogMap({ open, handleClose, handleConfirm, handleCoordenadas }) {
    const classes = useStyles();

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>Ubicación</Typography>
                        <Button autoFocus color="inherit" onClick={handleConfirm}>
                            Confirmar
                        </Button>
                    </Toolbar>
                </AppBar>

                <Map handleCoordenadas={handleCoordenadas} />
            </Dialog>
        </div>
    )
}

