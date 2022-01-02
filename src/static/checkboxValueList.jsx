const dayjs = require('dayjs');

const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const now = dayjs();
const monthsSinceJan2020 = (now.year()-2020)*12 + now.month() + 1;
const stravaYears = [];
for(let i = 0; i < monthsSinceJan2020/12; i++) {
    const curMonths = [];
    let monthsInYear;

    //if a previous year other than current one
    if(i < (monthsSinceJan2020/12) - 1) {
        monthsInYear = 12;
    } else {
        //in current year, take current month as most recent month
        monthsInYear = (monthsSinceJan2020 % 12);
    }

    for(let j = 0; j < monthsInYear; j++) {
        curMonths.push({
            value: `${2020+i}-${j+1}`,
            label: monthsShort[dayjs().month(j).month()]
        })
    }

    stravaYears.push({
        value: 2020+i,
        label: 2020+i,
        children: curMonths
    });
}

const checkboxValueList = [
    {
        value: 'road-trips',
        label: 'Road Trips',
        children: [
            { value: '2019-summer', label: 'Summer 2019' },
            { value: '2021-spring', label: 'Spring 2021' },
            { value: '2021-fall', label: 'Fall 2021' }
        ]
    },
    {
        value: 'thru-hikes',
        label: 'Thru Hikes',
        children: [
            { value: 'trt', label: 'Tahoe Rim Trail' },
            { value: 'pct', label: 'Pacific Crest Trail' }
        ],
    },
    {
        value: 'strava-activities',
        label: 'Strava Activities',
        children: stravaYears
    }
];
export default checkboxValueList;