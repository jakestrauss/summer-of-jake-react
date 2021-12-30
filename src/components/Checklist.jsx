import React, {useEffect, useState} from 'react';
import Checkbox from '../components/Checkbox';
import checkboxValueList from '../static/checkboxValueList';
const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

export default function Checklist({checkedItems, setCheckedItems, map, stravaDateArray, setStravaDateArray, updateStravaRoutes}) {
    const handleChange = (event) => {
        setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }
    

    useEffect(() => {
        if(map) {
            if(checkedItems['strava-activities']) {
                map.data.setStyle( (feature) => {
                    var toDisplay = false;
                    for(let monthDate of stravaDateArray) {
                        if(dayjs(feature.getProperty('date')).isSame(monthDate, 'month')) {
                         toDisplay = true;
                            break;
                        }
                    }
                    
                    return {
                        visible: toDisplay,
                        strokeColor: 'cornflowerBlue',
                        strokeOpacity: 0.8
                    }
                });
            } else {
                map.data.setStyle({
                    visible: false
                });
            }
        }
    }, [map, checkedItems, stravaDateArray]);  


    return (
        <div>
            {
                checkboxValueList.map(item => (
                    <label key={item.key}>
                        {item.name}
                        <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
                    </label>
                ))
            }
        </div>
    );
}