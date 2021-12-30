import CheckboxTree from 'react-checkbox-tree';
import React, {useEffect, useState} from 'react';

const nodes = [{
    value: 'road-trips',
    label: 'Road Trips',
    children: [
        { value: '2019-summer', label: 'Summer 2019' },
        { value: '2021-spring', label: 'Spring 2021' },
        { value: '2021-fall', label: 'Fall 2021' }
    ],
}];

export default function Checklist ({checked, setChecked, checkboxValueList, expanded, setExpanded, map, stravaDateArray, setStravaDateArray, updateStravaRoutes}) {

    return (
        <CheckboxTree
            nodes={checkboxValueList}
            checked={checked}
            expanded={expanded}
            onCheck={currentChecked => setChecked(currentChecked)}
            onExpand={currentExpanded => setExpanded(currentExpanded)}
        />
    );
}