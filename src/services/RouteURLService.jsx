import axios from 'axios';

const ROUTESURL_REST_API_URL = 'http://localhost:8080/api/routes'

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
            console.error("Routes call error");
        }
    }
}

export default new RouteURLService();