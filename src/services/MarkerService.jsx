import axios from 'axios';

const MARKERS_REST_API_URL = process.env.REACT_APP_SUMMER_OF_JAKE_SERVER_END_POINT + "/api/markers";

class MarkerService {
    getMarkers = async () => {
        try {
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            var finalResponse = await axios.get(MARKERS_REST_API_URL).then((response) => {
                const markersData = response.data;
                var markers = [];
                for(var i = 0; i < markersData.length; i++) {
                    var localUrl = response.data[i].url;
                    var localLatLong = {lat: response.data[i].lat, lng: response.data[i].lng};
                    var localActivityTitle = response.data[i].activityTitle;
                    var localActivityDescription = response.data[i].activityDescription;
                    var localActivityId = response.data[i].activityId;
                    var localActivityDate = response.data[i].activityDate;
                    markers[i] = {
                        latLong: localLatLong, 
                        url: localUrl, 
                        activityTitle: localActivityTitle,
                        activityDescription: localActivityDescription,
                        activityId: localActivityId,
                        activityDate: localActivityDate
                    };
                }
                return markers; 
        })
        return finalResponse;
        } catch (err) {
            console.error("Markers call error: " + err.message);
        }
    }
}

export default new MarkerService();