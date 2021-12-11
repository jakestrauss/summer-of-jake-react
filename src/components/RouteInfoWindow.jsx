import React from 'react';
import '../static/RouteInfoWindow.css';
const dayjs = require('dayjs');

export default function RouteInfoWindow(routeObject) {
    const dateToDisplay = dayjs(routeObject.getProperty('date')).format('MM/DD/YYYY');
    const title = routeObject.getProperty('activity_title');
    const description = routeObject.getProperty('activity_description');
    const stravaUrl = "https://strava.com/activities/" + routeObject.getProperty('activity_id');

    return (
        <div>
            <h2 className="activity-title">{dateToDisplay}: {title}</h2>
            <div className = "activity-description">{description}</div>
            <div className="strava-link">
                <a className="strava-link" href={stravaUrl} target="_blank" rel="noopener noreferrer">View on Strava</a>
            </div>
        </div>
    )
}