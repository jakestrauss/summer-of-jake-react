import React, {useEffect, useState} from 'react';
import Checkbox from '../components/Checkbox';
import checkboxValueList from '../static/checkboxValueList';
const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

export default function Checklist({checkedItems, setCheckedItems, map, stravaDateRange, setStravaDateRange}) {
    const handleChange = (event) => {
        setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }
    

    useEffect(() => {
        console.log("checkedItems: ", checkedItems);
        if(map) {
            if(checkedItems['strava-activities']) {
                map.data.setStyle( (feature) => {
                    var toDisplay = dayjs(feature.getProperty('date')).isBetween(stravaDateRange['start'], stravaDateRange['end']);
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
    }, [map, checkedItems, stravaDateRange]);  


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