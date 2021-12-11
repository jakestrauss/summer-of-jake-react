import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
const dayjs = require('dayjs');

export default function PhotoMarker({marker, selectedMarker, setSelectedMarker, mapClick}) {
    const markerSize = new window.google.maps.Size(20, 20);
    const localIcon = {
        url: marker.url,
        scaledSize: markerSize
    };
    const imgStyle = {
        maxHeight: `50%`,
        maxWidth: `100%`,
        width: `90%`,
        objectFit: `contain`
    };
    const stravaUrl = "https://strava.com/activities/" + marker.activityId;
    const dateToDisplay = dayjs(marker.activityDate);
    return(
        <>
            <Marker position={marker.latLong} icon={localIcon} key={`marker-${marker.latLong}`} onClick={() => {mapClick(); setSelectedMarker(marker);}}>
            </Marker>
            {selectedMarker === marker
                && <InfoWindow key={`infoWindow-${marker.latLong}`} visible={false} position={marker.latLong} onCloseClick={() => {setSelectedMarker(null)}}>
                    <div>
                        <div className="image-container">
                            <img style={imgStyle} src={marker.url} alt="Marker"></img>
                        </div>
                        <h2 className="activity-title">{dateToDisplay.format('MM/DD/YYYY')}: {marker.activityTitle}</h2>
                        <div className = "marker-description">{marker.activityDescription}
                        <br></br>
                        <div className="strava-link">
                            <a className="strava-link" href={stravaUrl} target="_blank" rel="noopener noreferrer">View on Strava</a>
                        </div>
                        
                        </div>
                    </div>
                </InfoWindow>
            }
        </>   
    )
}