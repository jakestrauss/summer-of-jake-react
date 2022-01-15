/* eslint eqeqeq: "off" */
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const dayjs = require('dayjs');
const yearMonthRegEx = /2\d{3}-[0-12]/;

export default function Checklist ({checked, setChecked, checkboxValueList, expanded, setExpanded, map, markers, setMarkersToDisplay, 
    mapClick, fall19Window, setFall19Window, setFall19WindowPos, pctOneWindow, setPctOneWindow, setPctOneWindowPos,
    trtWindow, setTrtWindow, setTrtWindowPos, spring21Window, setSpring21Window, setSpring21WindowPos, 
    fall21Window, setFall21Window, setFall21WindowPos,
    selectedPlace, setSelectedPlace, seattle, bend, chapelHill}) {

    const handleTargetNode = (targetNode, currentChecked = checked) => {
        if(currentChecked.includes(targetNode.value)) {
            switch(targetNode.value) {
                case '2019-summer':
                    if(!fall19Window) {
                        mapClick();
                        setFall19Window(true);
                        setFall19WindowPos({
                            lat: 38.5458,
                            lng: -106.9253
                        });
                    }
                    break; 
                case 'pct':
                    if(!pctOneWindow) {
                        mapClick();
                        setPctOneWindow(true);
                        setPctOneWindowPos({
                            lat: 36.023601, 
                            lng: -118.133888
                        });
                    }
                    break;
                case 'trt':
                    if(!trtWindow) {
                        mapClick();
                        setTrtWindow(true);
                        setTrtWindowPos({
                            lat: 39.310182, 
                            lng: -119.899595
                        });
                    }
                    break;
                case '2021-spring':
                    if(!spring21Window) {
                        mapClick();
                        setSpring21Window(true);
                        setSpring21WindowPos({
                            lat: 41.216609, 
                            lng: -112.002672
                        });
                    }
                    break;
                case '2021-fall':
                    if(!fall21Window) {
                        mapClick();
                        setFall21Window(true);
                        setFall21WindowPos({
                            lat: 42.856419, 
                            lng: -106.330937
                        });
                    }
                    break;
                case 'chapel-hill':
                    if(selectedPlace === null) {
                        mapClick();
                        setSelectedPlace(chapelHill);
                    }
                break;
                case 'seattle':
                    if(selectedPlace === null) {
                        mapClick();
                        setSelectedPlace(seattle);
                    }
                break;
                case 'bend':
                    if(selectedPlace === null) {
                        mapClick();
                        setSelectedPlace(bend);
                    }
                break;
                default:
                    break;
                
                    
            }
        } else {
            switch(targetNode.value) {
                case '2019-summer':
                    if(fall19Window) {
                        setFall19Window(false);
                    }
                    break;
                case 'pct':
                    if(pctOneWindow) {
                        setPctOneWindow(false);
                    }
                    break;
                case '2021-spring':
                    if(spring21Window) {
                        setSpring21Window(false);
                    }
                    break;
                case '2021-fall':
                    if(fall21Window) {
                        setFall21Window(false);
                    }
                    break;
                case 'trt':
                    if(trtWindow) {
                        setTrtWindow(false);
                    }
                    break;
                case 'bend':
                case 'chapel-hill':
                case 'seattle':
                    setSelectedPlace(null);
                break;
                default:
                    break;
            }
        }
        
    }

    useEffect(() => {
        if(map) {
            if(checked.some(e => yearMonthRegEx.test(e))) {
                //display routes that fit in selected dates
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
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, checked])
    return (
        <div className="nested-checklist-wrapper">
                <CheckboxTree
                    nodes={checkboxValueList}
                    checked={checked}
                    expanded={expanded}
                    onCheck={(currentChecked, targetNode) => {
                        setChecked(currentChecked);
                        handleTargetNode(targetNode, currentChecked);
                    }}
                    onClick={targetNode => {
                        handleTargetNode(targetNode);
                    }}
                    expandOnClick={true}
                    onExpand={currentExpanded => setExpanded(currentExpanded)}
                    iconsClass="fa5"
                    icons={{
                        check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon={['far', 'check-square']} />,
                        uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['far', 'square']} />,
                        halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon={['far', 'minus-square']} />,
                        expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
                        expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
                    }}
                />
                <h5 className="checklist-bottom-banner">Click routes on map for more info!</h5>
        </div>
        
    );
}