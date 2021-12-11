import axios from 'axios';

const ROUTESURL_REST_API_URL = process.env.REACT_APP_SUMMER_OF_JAKE_SERVER_END_POINT + "/api/routes";

class RouteURLService {
    getRoutes = async () => {
        try {
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            var finalResponse = await axios.get(ROUTESURL_REST_API_URL).then((response) => {
                const routeData = response.data;
                var routes = [];
                for(var i = 0; i < routeData.length; i++) {
                    var localUrl = response.data[i].url;
                    var localActivityTitle = response.data[i].activityTitle;
                    var localActivityDescription = response.data[i].activityDescription;
                    var localActivityId = response.data[i].activityId;
                    var localActivityDate = response.data[i].activityDate;
                    routes[i] = {
                        url: localUrl, 
                        activityTitle: localActivityTitle,
                        activityDescription: localActivityDescription,
                        activityId: localActivityId,
                        activityDate: localActivityDate
                    };
                }
                return routes; 
        })
        return finalResponse;
        } catch (err) {
            console.error("Routes call error " + err.message);
        }
    }
}

export default new RouteURLService();