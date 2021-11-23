import axios from 'axios';

const ROUTESURL_REST_API_URL = process.env.REACT_APP_SUMMER_OF_JAKE_SERVER_END_POINT + "/api/routes";

class RouteURLService {
    getRoutes = async () => {
        try {
            var finalResponse = await axios.get(ROUTESURL_REST_API_URL).then((response) => {
                const routeData = response.data;
                var routeUrls = [];
                for(var i = 0; i < routeData.length; i++) {
                    routeUrls[i] = response.data[i].url;
                }
                return routeUrls; 
        })
        return finalResponse;
        } catch (err) {
            console.error("Routes call error " + err.message);
        }
    }
}

export default new RouteURLService();