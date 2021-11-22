import React, {useEffect, useState} from 'react';
import '../static/Map.css';
import { GoogleMap, KmlLayer, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import mapStyles from './../mapStyles';
import RouteURLService from '../services/RouteURLService';
import MarkerService from '../services/MarkerService';

const dayjs = require('dayjs');

//Map Constants
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};
const center = {
    lat: 40.644366,
    lng: -39.872822
};
const mapOptions = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
};
const hardCodedKmlOptions = {
    suppressInfoWindows: true
};
const kmlInfoWindowOptions = {
    maxWidth: 500
}

export default function Map() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""
    });

    //State variables
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [fall19Window, setFall19Window] = useState(false);
    const [fall19WindowPos, setFall19WindowPos] = useState({ lat: -25.363, lng: 131.044 });
    const [pctOneWindow, setPctOneWindow] = useState(false);
    const [pctOneWindowPos, setPctOneWindowPos] = useState({ lat: -25.363, lng: 131.044 });
    const [pctTwoWindow, setPctTwoWindow] = useState(false);
    const [pctTwoWindowPos, setPctTwoWindowPos] = useState({ lat: -25.363, lng: 131.044 });
    const [trtWindow, setTrtWindow] = useState(false);
    const [trtWindowPos, setTrtWindowPos] = useState({ lat: -25.363, lng: 131.044 });
    const [spring21Window, setSpring21Window] = useState(false);
    const [spring21WindowPos, setSpring21WindowPos] = useState({ lat: -25.363, lng: 131.044 });
    const [fall21Window, setFall21Window] = useState(false);
    const [fall21WindowPos, setFall21WindowPos] = useState({ lat: -25.363, lng: 131.044 });
    

    //Click events
    const fall19Click = (mapsMouseEvent) => {
        mapClick();
        setFall19Window(true);
        setFall19WindowPos(mapsMouseEvent.latLng);
    };
    const pctOneClick = (mapsMouseEvent) => {
        mapClick();
        setPctOneWindow(true);
        setPctOneWindowPos(mapsMouseEvent.latLng);
    };
    const pctTwoClick = (mapsMouseEvent) => {
        mapClick();
        setPctTwoWindow(true);
        setPctTwoWindowPos(mapsMouseEvent.latLng);
    };
    const trtClick = (mapsMouseEvent) => {
        mapClick();
        setTrtWindow(true);
        setTrtWindowPos(mapsMouseEvent.latLng);
    };
    const spring21Click = (mapsMouseEvent) => {
        mapClick();
        setSpring21Window(true);
        setSpring21WindowPos(mapsMouseEvent.latLng);
    };
    const fall21Click = (mapsMouseEvent) => {
        mapClick();
        setFall21Window(true);
        setFall21WindowPos(mapsMouseEvent.latLng);
    };
    const pctOneClose = () => {setPctOneWindow(false)};
    const pctTwoClose = () => {setPctTwoWindow(false)};
    const fall19Close = () => {setFall19Window(false)};
    const trtClose = () => {setTrtWindow(false)};
    const spring21Close = () => {setSpring21Window(false)};
    const fall21Close = () => {setFall21Window(false)};

    const mapClick = () => {
        fall19Close();
        pctOneClose();
        pctTwoClose();
        trtClose();
        spring21Close();
        fall21Close();
        setSelectedMarker(null);
    }


    useEffect(() => {
        RouteURLService.getRoutes().then(result => setRoutes(result));
        MarkerService.getMarkers().then(result => setMarkers(result));
    }, []);

    if (loadError)
        return (<>Error loading maps</>);
    if (!isLoaded || !routes)
        return (<>Loading maps</>);
    
    const markerSize = new window.google.maps.Size(20, 20);

    return (
        <div>
            <h1 className="map-title">Summer of Jake</h1>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={3} center={center} options={mapOptions} onClick={mapClick}>
                {
                    routes.map(route => (<KmlLayer url={route} options={hardCodedKmlOptions} key={`kmlLayer-${route}`}/>
                ))}
                <>
                <KmlLayer key={`fall19Kml`} url="https://storage.googleapis.com/strava-kmls/2019_road_trip_15.kmz" options={hardCodedKmlOptions} onClick={fall19Click} />
                {
                    fall19Window
                    && <InfoWindow key={`fall19InfoWindow`} visible={false} onCloseClick={fall19Close} options={kmlInfoWindowOptions} position={fall19WindowPos}>
                        <div>
                            <h2 className="kml-info-window-title">2019 Road Trip: The Long Way to Seattle</h2>
                            <p className="kml-info-window-body">The summer after I graduated college, I lived out of my Rav4 for 3 months and took my sweet time moving out to Seattle to start my first "real" job.</p>
                            <div class="iframe-container" position="relative" width="100%" height="100%" padding-bottom="56.25%">
                                <iframe src="https://www.youtube.com/embed/1ZjSy4kVV0w" position="absolute" top="0" left="0" width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                        </InfoWindow>
                }

                <KmlLayer key={`PCT_pt_1`} url="https://storage.googleapis.com/strava-kmls/PCT_pt_1.kmz" options={hardCodedKmlOptions} onClick={pctOneClick} />
                {
                    pctOneWindow
                    && <InfoWindow key={`pctInfoWindowOne`} visible={false} onCloseClick={pctOneClose} options={kmlInfoWindowOptions} position={pctOneWindowPos}>
                        <div>
                            <h2 className="kml-info-window-title">A Slower Method of Travel: 2021 Thru Hike of the Pacific Crest Trail</h2>
                            <p className="kml-info-window-body">After quitting my corporate job in Seattle in March, I spent mid-April to September on the adventure of a lifetime hiking from Mexico to Canada.</p>
                            <div class="iframe-container" position="relative" width="100%" height="100%" padding-bottom="56.25%">
                                <iframe src="https://www.youtube.com/embed/7RJZMheYyFI" position="absolute" top="0" left="0" width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                        </InfoWindow>
                }
                <KmlLayer key={`PCT_pt_2`} url="https://storage.googleapis.com/strava-kmls/PCT_pt_2.kmz" options={hardCodedKmlOptions} onClick={pctTwoClick} />
                {
                    pctTwoWindow
                    && <InfoWindow key={`pctInfoWindowTwo`} visible={false} onCloseClick={pctTwoClose} options={kmlInfoWindowOptions} position={pctTwoWindowPos}>
                        <div>
                            <h2 className="kml-info-window-title">A Slower Method of Travel: 2021 Thru Hike of the Pacific Crest Trail</h2>
                            <p className="kml-info-window-body">After quitting my corporate job in Seattle in March, I spent mid-April to September on the adventure of a lifetime hiking from Mexico to Canada.</p>
                            <div class="iframe-container" position="relative" width="100%" height="100%" padding-bottom="56.25%">
                                <iframe src="https://www.youtube.com/embed/7RJZMheYyFI" position="absolute" top="0" left="0" width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                        </InfoWindow>
                }
                </>

                <KmlLayer key={`Tahoe_Rim_Trail`} url="https://storage.googleapis.com/strava-kmls/Tahoe_Rim_Trail_1.kmz" options={hardCodedKmlOptions} onClick={trtClick} />
                {
                    trtWindow
                    && <InfoWindow key={`trtInfoWindow`} visible={false} onCloseClick={trtClose} options={kmlInfoWindowOptions} position={trtWindowPos}>
                        <div>
                            <h2 className="kml-info-window-title">Trial run: Quick Lap around a Lake</h2>
                            <p className="kml-info-window-body">During my 2019 road trip, I decided to try out my first small solo thru-hike by circumnavigating Lake Tahoe on the 170-mile Tahoe Rim Trail.</p>
                        </div>
                        </InfoWindow>
                }

                <KmlLayer key={`spring21`} url="https://storage.googleapis.com/strava-kmls/2021_spring_road_trip_10.kmz" options={hardCodedKmlOptions} onClick={spring21Click} />
                {
                    spring21Window
                    && <InfoWindow key={`spring21Window`} visible={false} onCloseClick={spring21Close} options={kmlInfoWindowOptions} position={spring21WindowPos}>
                        <div>
                            <h2 className="kml-info-window-title">Eastbound and Down: The Summer of Jake begins</h2>
                            <p className="kml-info-window-body">On March 1st 2021, I quit my job at Amazon and started driving back east to leave my car and life belongings at my parents' house for the
                            duration of my PCT thru-hike. Along the way I was able to fit in some skiing, kayaking, desert exploration, and was able to catch up with some old friends.</p>
                        </div>
                        </InfoWindow>
                }

                <KmlLayer key={`fall21`} url="https://storage.googleapis.com/strava-kmls/2021_fall_road_trip_4.kmz" options={hardCodedKmlOptions} onClick={fall21Click} />
                {
                    fall21Window
                    && <InfoWindow key={`fall21Window`} visible={false} onCloseClick={fall21Close} options={kmlInfoWindowOptions} position={fall21WindowPos}>
                        <div>
                            <h2 className="kml-info-window-title">Westward Again: The Oregon Trail</h2>
                            <p className="kml-info-window-body">After completing the Pacific Crest Trail, I decided to move to Bend, OR to ski bum it for the winter.
                            In October 2021 I set out west to begin the newest chapter of my life while checking out the I-90 highlights on the way.</p>
                        </div>
                        </InfoWindow>
                }
                
                {
                    markers.map(marker => {
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
                                <Marker position={marker.latLong} icon={localIcon} key={`marker-${marker.latLong}`} onClick={() => setSelectedMarker(marker)}>
                                </Marker>
                                {selectedMarker === marker
                                    && <InfoWindow key={`infoWindow-${marker.latLong}`} visible={false} position={marker.latLong} onCloseClick={() => setSelectedMarker(null)}>
                                        <div>
                                            <div className="image-container">
                                                <img style={imgStyle} src={marker.url} alt="Marker"></img>
                                            </div>
                                            <h2 className="activity-title">{dateToDisplay.format('MM/DD/YYYY')}: {marker.activityTitle}</h2>
                                            <div className = "marker-description">{marker.activityDescription}
                                            <br></br>
                                            <div className="strava-link">
                                                <a className="strava-link" href={stravaUrl} target="_blank">View on Strava</a>
                                            </div>
                                            
                                            </div>
                                        </div>
                                    </InfoWindow>
                                }
                            </>   
                        )
                    })
                }
            </GoogleMap>
        </div>
    );
}
