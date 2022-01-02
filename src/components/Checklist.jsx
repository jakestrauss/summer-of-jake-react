import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const dayjs = require('dayjs');
const yearMonthRegEx = /2\d{3}-[0-12]/;

export default function Checklist ({checked, setChecked, checkboxValueList, expanded, setExpanded, map, markers, setMarkersToDisplay}) {

    useEffect(() => {
        if(map) {
            console.log(checked);
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
    }, [map, checked])
    return (
        <div className="nested-checklist-wrapper">
                <CheckboxTree
                    nodes={checkboxValueList}
                    checked={checked}
                    expanded={expanded}
                    onCheck={currentChecked => {setChecked(currentChecked);}}
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
        </div>
        
    );
}