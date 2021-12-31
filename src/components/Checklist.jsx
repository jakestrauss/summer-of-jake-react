import CheckboxTree from 'react-checkbox-tree';
import React, {useEffect, useState} from 'react';
const dayjs = require('dayjs');
const yearMonthRegEx = /2\d{3}-[0-12]/;

export default function Checklist ({checked, setChecked, checkboxValueList, expanded, setExpanded, map, markers, markersToDisplay, setMarkersToDisplay}) {

    useEffect(() => {
        if(map) {
            if(checked.some(e => yearMonthRegEx.test(e))) {
                //display routes that fit in selected dates
                map.data.setStyle( (feature) => {
                    var toDisplay = false;
                    for(let yearMonthDate of checked) {
                        if(yearMonthRegEx.test(yearMonthDate)) {
                            var curDate = dayjs(feature.getProperty('date'));
                            if(curDate.year() == yearMonthDate.substring(0, 4) && curDate.month() == yearMonthDate.substring(5))
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
                            if(markerDate.year() == yearMonthDate.substring(0, 4) && markerDate.month() == yearMonthDate.substring(5))
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
    }, [map, checked])
    return (
        <div className="nested-checklist-wrapper">
            <span className="nested-checklist">
            <CheckboxTree
                nodes={checkboxValueList}
                checked={checked}
                expanded={expanded}
                onCheck={currentChecked => {setChecked(currentChecked);}}
                onExpand={currentExpanded => setExpanded(currentExpanded)}
            />
            </span>
        </div>
        
    );
}