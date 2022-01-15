/* eslint eqeqeq: "off" */
import React, {useEffect, useState} from 'react';
import { renderToString } from 'react-dom/server'
import '../static/css/Map.css';
import { GoogleMap, KmlLayer, InfoWindow, useJsApiLoader, Marker } from '@react-google-maps/api';
import mapStyles from '../static/mapStyles';
import RouteURLService from '../services/RouteURLService';
import MarkerService from '../services/MarkerService';
import RouteInfoWindow from './RouteInfoWindow';
import checkboxBooleans from '../static/checkboxBooleans';
import Checklist from './Checklist';
import PhotoMarker from './PhotoMarker';
import checkboxValueList from '../static/checkboxValueList';
import summerOfJakeLogo from '../static/images/summer_of_jake_logo_yellow.png';
import placeIconPng from '../static/images/marker-512-red.png';
import currentPlaceIconPng from '../static/images/marker-512-yellow.png';
import trtImages from '../static/slideshow_images/trtImages';
import spring21Images from '../static/slideshow_images/spring21Images';
import fall21Images from '../static/slideshow_images/fall21Images';
import bendImages from '../static/slideshow_images/bendImages';
import PhotoSlideshow from './PhotoSlideshow';

const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

//Map Constants
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};
const center = {
    lat: 38.614374,
    lng: -99.111854
};
const seattle = {
    lat: 47.666355, 
    lng: -122.320698
}
const chapelHill = {
    lat: 35.899878,
    lng: -79.043309
}
const bend = {
    lat: 44.0582, 
    lng: -121.3153
}
const mapOptions = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "greedy"
};
const hardCodedKmlOptions = {
    suppressInfoWindows: true,
    preserveViewport: true
};
const kmlInfoWindowOptions = {
    maxWidth: 500
}

export default function Map() {
    const mapRef = React.useRef();
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""
    });

    //State variables
    const [placeIcon, setPlaceIcon] = useState({ url: placeIconPng });
    const [currentPlaceIcon, setCurrentPlaceIcon] = useState({ url: currentPlaceIconPng });
    const [checked, setChecked] = useState(checkboxBooleans);
    const [expanded, setExpanded] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [markersToDisplay, setMarkersToDisplay] = useState([]);
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
        setSelectedPlace(null);
    }
    const yearMonthRegEx = /2\d{3}-[0-12]/;

    useEffect(() => {
        MarkerService.getMarkers().then(result => setMarkers(result));
        RouteURLService.getRoutes().then(result => setRoutes(result));
    }, []);

    if (loadError)
        return (<>Error loading maps</>);
    if (!isLoaded || !routes || routes.length === 0 || markers.length === 0)
        return (<>Loading maps</>);
    
    const onMapLoad = (map) => {
        const infowindow = new window.google.maps.InfoWindow({});
        setPlaceIcon({
            url: placeIconPng,
            scaledSize: new window.google.maps.Size(35, 35)
        });
        setCurrentPlaceIcon({
            url: currentPlaceIconPng,
            scaledSize: new window.google.maps.Size(35, 35)
        });


        routes.map(route => {
            return map.data.loadGeoJson(route.url);
        });

        if(map) {
            if(checked.some(e => yearMonthRegEx.test(e))) {
                map.data.setStyle( (feature) => {
                    var toDisplay = false;
                    for(let yearMonthDate of checked) {
                        if(yearMonthRegEx.test(yearMonthDate)) {
                            var curDate = dayjs(feature.getProperty('date'));
                            if(curDate.year() == yearMonthDate.substring(0, 4) && curDate.month()+1 == yearMonthDate.substring(5))
                            {
                                toDisplay = true;
                                break;
                            }
                        }
                    }
                    
                    return {
                        visible: toDisplay,
                        strokeColor: 'cornflowerBlue',
                        strokeOpacity: 0.8
                    }
                });

                //display markers that fit in selected dates
                const updatedMarkersToDisplay = [];
                for(let marker of markers) {
                    var markerDate = dayjs(marker.activityDate);
                    for(let yearMonthDate of checked) {
                        if(yearMonthRegEx.test(yearMonthDate)) {
                            if(markerDate.year() == yearMonthDate.substring(0, 4) && markerDate.month()+1 == yearMonthDate.substring(5))
                            {
                                updatedMarkersToDisplay.push(marker);
                            }
                        }
                    }
                }
                setMarkersToDisplay(updatedMarkersToDisplay);
            } else {
                map.data.setStyle({
                    visible: false
                });
                setMarkersToDisplay([]);
            }
        }

        map.data.addListener("click", (event)  => {
            setSelectedMarker(null);
            infowindow.setPosition(event.latLng);
            infowindow.setContent(renderToString(RouteInfoWindow(event.feature)));
            infowindow.open({
                map,
                shouldFocus: true
                });
        });
        map.addListener("click", (event) => {
            infowindow.close();
        });

        mapRef.current=map;
    };

    return (
        <div>
            <img className="map-title" alt="Summer of Jake" src={summerOfJakeLogo} />
            <Checklist checkboxValueList={checkboxValueList} checked={checked} setChecked={setChecked} expanded={expanded} setExpanded={setExpanded} 
            markersToDisplay={markersToDisplay} checkboxBooleans={checkboxBooleans} 
            map={mapRef.current} markers={markers} setMarkersToDisplay={setMarkersToDisplay}
            mapClick={mapClick} fall19Window={fall19Window} setFall19Window={setFall19Window} setFall19WindowPos={setFall19WindowPos}
            pctOneWindow={pctOneWindow} setPctOneWindow={setPctOneWindow} setPctOneWindowPos={setPctOneWindowPos}
            trtWindow={trtWindow} setTrtWindow={setTrtWindow} setTrtWindowPos={setTrtWindowPos}
            spring21Window={spring21Window} setSpring21Window={setSpring21Window} setSpring21WindowPos={setSpring21WindowPos}
            fall21Window={fall21Window} setFall21Window={setFall21Window} setFall21WindowPos={setFall21WindowPos}
            setSelectedPlace={setSelectedPlace} selectedPlace={selectedPlace} chapelHill={chapelHill} bend={bend} seattle={seattle}/>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={5} center={center} options={mapOptions} onClick={mapClick} onLoad={onMapLoad}>
                <>
                { 
                    checked.includes('seattle')
                    &&
                    <Marker position={seattle} icon={placeIcon} onClick={() => {mapClick(); setSelectedPlace(seattle);}}></Marker> 
                }
                {
                    selectedPlace === seattle
                    && <InfoWindow key={seattle} visible={false} position={seattle} onCloseClick={() => {setSelectedPlace(null)}}>
                        <div>
                            <h2 className="kml-info-window-title">Seattle</h2>
                            <p className="kml-info-window-body">In Seattle I worked a lot, and tried to explore even more. This video just about sums it up--and probably gives you a little more than you asked for when coming to this site...</p>
                            <div className="iframe-container" position="relative" width="100%" height="100%" padding-bottom="56.25%">
                                <iframe src="https://www.youtube.com/embed/vibJt_kYSnI" position="absolute" top="0" left="0" width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>

                    </InfoWindow>
                }
                { 
                     checked.includes('chapel-hill')
                     &&
                    <Marker position={chapelHill} icon={placeIcon} onClick={() => {mapClick(); setSelectedPlace(chapelHill);}}></Marker> 
                }
                {
                    selectedPlace === chapelHill
                    && <InfoWindow key={chapelHill} visible={false} position={chapelHill} onCloseClick={() => {setSelectedPlace(null)}}>
                        <div>
                            <h2 className="kml-info-window-title">The college years: Chapel Thrill</h2>
                            <p className="kml-info-window-body">Ah, college. A carefree time where I learned a good bit and had a good bit more of fun. Here's a mediocre edit of some vertical iPhone 5 footage after UNC won the
                            men's basketball national championship in 2017. Note the rimless glasses, the pinnacle of style in April 2017. All rights to Kanye, please don't sue me.</p>
                            <div className="iframe-container" position="relative" width="100%" height="100%" padding-bottom="56.25%">
                                <iframe src="https://www.youtube.com/embed/9TQ9TG2tb8w" position="absolute" top="0" left="0" width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>

                    </InfoWindow>
                }
                { 
                    checked.includes('bend')
                    &&
                    <Marker position={bend} icon={currentPlaceIcon} onClick={() => {mapClick(); setSelectedPlace(bend);}}></Marker> }
                {
                    selectedPlace === bend
                    && 
                    <InfoWindow key={bend} visible={false} position={bend} onCloseClick={() => {setSelectedPlace(null)}}>
                        <div>
                            <div>
                                <h2 className="kml-info-window-title">Currently: Bend, Oregon</h2>
                                <p className="kml-info-window-body">Bend sucks, don't move here!</p>
                            </div>
                            <PhotoSlideshow images={bendImages}/>
                        </div>
                    </InfoWindow>
                }
                {
                    checked.includes('2019-summer')
                    &&
                    <KmlLayer key={`fall19Kml`} url="https://storage.googleapis.com/strava-kmls/2019_road_trip_15.kmz" options={hardCodedKmlOptions} onClick={fall19Click} />
                }
                    {
                        fall19Window
                        && <InfoWindow key={`fall19InfoWindow`} visible={false} onCloseClick={fall19Close} options={kmlInfoWindowOptions} position={fall19WindowPos}>
                            <div>
                                <h2 className="kml-info-window-title">2019 Road Trip: The Long Way to Seattle</h2>
                                <p className="kml-info-window-body">The summer after I graduated college, I lived out of my Rav4 for 3 months and took my sweet time moving out to Seattle to start my first "real" job. The time of my life :)</p>
                                <div className="iframe-container" position="relative" width="100%" height="100%" padding-bottom="56.25%">
                                    <iframe src="https://www.youtube.com/embed/1ZjSy4kVV0w" position="absolute" top="0" left="0" width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                    </iframe>
                                </div>
                            </div>
                            </InfoWindow>
                    }

                {   
                    checked.includes('pct')
                    &&
                    <KmlLayer key={`PCT_pt_1`} url="https://storage.googleapis.com/strava-kmls/PCT_pt_1.kmz" options={hardCodedKmlOptions} onClick={pctOneClick} />
                }
                {
                    pctOneWindow
                    && <InfoWindow key={`pctInfoWindowOne`} visible={false} onCloseClick={pctOneClose} options={kmlInfoWindowOptions} position={pctOneWindowPos}>
                        <div>
                            <h2 className="kml-info-window-title">A Slower Method of Travel: 2021 Thru Hike of the Pacific Crest Trail</h2>
                            <p className="kml-info-window-body">After quitting my corporate job in Seattle in March, I spent mid-April to September on the adventure of a lifetime hiking from Mexico to Canada.</p>
                            <div className="iframe-container" position="relative" width="100%" height="100%" padding-bottom="56.25%">
                                <iframe src="https://www.youtube.com/embed/7RJZMheYyFI" position="absolute" top="0" left="0" width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                        </InfoWindow>
                }

                {
                    checked.includes('pct')
                    &&
                    <KmlLayer key={`PCT_pt_2`} url="https://storage.googleapis.com/strava-kmls/PCT_pt_2.kmz" options={hardCodedKmlOptions} onClick={pctTwoClick} />
                }
                {
                    pctTwoWindow
                    && <InfoWindow key={`pctInfoWindowTwo`} visible={false} onCloseClick={pctTwoClose} options={kmlInfoWindowOptions} position={pctTwoWindowPos}>
                        <div>
                            <h2 className="kml-info-window-title">A Slower Method of Travel: 2021 Thru Hike of the Pacific Crest Trail</h2>
                            <p className="kml-info-window-body">After quitting my corporate job in Seattle in March, I spent mid-April to September on the adventure of a lifetime hiking from Mexico to Canada.</p>
                            <div className="iframe-container" position="relative" width="100%" height="100%" padding-bottom="56.25%">
                                <iframe src="https://www.youtube.com/embed/7RJZMheYyFI" position="absolute" top="0" left="0" width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                        </InfoWindow>
                }
                </>

                {
                    checked.includes('trt')
                    &&
                    <KmlLayer key={`Tahoe_Rim_Trail`} url="https://storage.googleapis.com/strava-kmls/Tahoe_Rim_Trail_1.kmz" options={hardCodedKmlOptions} onClick={trtClick} />
                }
                {
                    trtWindow
                    && <InfoWindow key={`trtInfoWindow`} visible={false} onCloseClick={trtClose} options={kmlInfoWindowOptions} position={trtWindowPos}>
                        <div> 
                            <div>
                                <h2 className="kml-info-window-title">Trial run: Quick Lap around a Lake</h2>
                                <p className="kml-info-window-body">During my 2019 road trip, I decided to try out my first small solo thru-hike by circumnavigating Lake Tahoe on the 170-mile Tahoe Rim Trail. It went...poorly. But I finished, 
                                saw enough beautiful scenery and learned enough about backpacking along the way, that it piqued my interest for a longer hike in the future.</p>
                            </div>
                            <PhotoSlideshow images={trtImages}/>
                        </div>
                        </InfoWindow>
                }

                {
                    checked.includes('2021-spring')
                    &&
                    <KmlLayer key={`spring21`} url="https://storage.googleapis.com/strava-kmls/2021_spring_road_trip_10.kmz" options={hardCodedKmlOptions} onClick={spring21Click} />
                }
                {
                    spring21Window
                    && <InfoWindow key={`spring21Window`} visible={false} onCloseClick={spring21Close} options={kmlInfoWindowOptions} position={spring21WindowPos}>
                        <div>
                            <div>
                                <h2 className="kml-info-window-title">Eastbound and Down: The Summer of Jake begins</h2>
                                <p className="kml-info-window-body">On March 1st 2021, I quit my job at Amazon and started driving back east to leave my car and life belongings at my parents' house for the
                                duration of my PCT thru-hike. Along the way I was able to fit in some skiing, kayaking, desert exploration, and caught up with some old friends.</p>
                            </div>
                            <PhotoSlideshow images={spring21Images}/>
                        </div>
                        </InfoWindow>
                }

                {
                    checked.includes('2021-fall')
                    &&
                    <KmlLayer key={`fall21`} url="https://storage.googleapis.com/strava-kmls/2021_fall_road_trip_4.kmz" options={hardCodedKmlOptions} onClick={fall21Click} />
                }
                {
                    fall21Window
                    && <InfoWindow key={`fall21Window`} visible={false} onCloseClick={fall21Close} options={kmlInfoWindowOptions} position={fall21WindowPos}>
                        <div>
                            <div>
                                <h2 className="kml-info-window-title">Westward Again: The Oregon Trail</h2>
                                <p className="kml-info-window-body">After completing the Pacific Crest Trail, I decided to move to Bend, OR to ski bum it for the winter.
                                In October 2021 I set out west to begin the newest chapter of my life while checking out the I-90 highlights on the way.</p>
                            </div>
                            <PhotoSlideshow images={fall21Images}/>
                        </div>
                        </InfoWindow>
                }
                {
                    markersToDisplay.map(marker => {
                        return <PhotoMarker key={`photoMarker-${marker.url}`} marker={marker} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} mapClick={mapClick} onChange={setSelectedMarker}/>;
                    })
                }
            </GoogleMap>
        </div>
    );
}
