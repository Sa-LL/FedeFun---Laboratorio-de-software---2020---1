import React, { useState } from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import InteractiveMap, { Marker } from "react-map-gl";
import RoomIcon from '@material-ui/icons/Room';
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    largeIcon: {
        '& svg': {
            fontSize: 60
        }
    },
}));

export default function Mapa({ handleCoordenadas }) {

    const classes = useStyles();

    const [markers, setMarkers] = useState(null);

    const [viewport, SetViewport] = useState({
        latitude: 4.813415,
        longitude: -75.699704,
        width: "100vw",
        height: "100vh",
        zoom: 13,
    });

    const handleClick = ({ lngLat: [longitude, latitude] }) => {
        setMarkers({ longitude, latitude });
        handleCoordenadas(longitude, latitude);
    }

    return (
        <div>
            <CssBaseline />
            <InteractiveMap
                {...viewport}
                onClick={handleClick}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={viewport => {
                    SetViewport(viewport);
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                {markers
                    ? <Marker
                        {...markers}
                        offsetLeft={-41}
                        offsetTop={-65}
                    >
                        <IconButton
                            className={classes.largeIcon}
                        >
                            <RoomIcon color="secondary" />
                        </IconButton>
                    </Marker> : null}
            </InteractiveMap>
        </div>
    )
}
