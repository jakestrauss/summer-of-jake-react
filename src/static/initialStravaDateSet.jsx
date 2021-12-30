const dayjs = require('dayjs');
const initialStravaDateSet = [];
const now = dayjs();

//set initial months to be last 6 from current date
for(let i = 0; i < 6; i++) {
    initialStravaDateSet.push(now.subtract(i, 'month'));
}

export default initialStravaDateSet;
