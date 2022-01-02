const dayjs = require('dayjs');
const initialStravaDateSet = [];
const now = dayjs();

//set initial months to be last 6 from current date
for(let i = 0; i < 6; i++) {
    const curTime = now.subtract(i, 'month');
    const year = curTime.year();
    const month = curTime.month()+1;
    initialStravaDateSet.push(`${year}-${month}`);
}

export default initialStravaDateSet;
