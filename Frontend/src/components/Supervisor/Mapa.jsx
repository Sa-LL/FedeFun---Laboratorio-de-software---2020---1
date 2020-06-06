import React, { useState } from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import ReactMapGl from "react-map-gl";

export default function Mapa() {

    const [viewport, SetViewport] = useState({
        latitude: 4.813415,
        longitude: -75.699704,
        width: "200px",
        height: "300px",
        zoom: 10,
    });

    return (
        <div>
            <CssBaseline />
            <ReactMapGl {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >

            </ReactMapGl>
        </div>
    )
}
