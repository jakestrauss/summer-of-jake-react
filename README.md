# Summer of Jake adventure map front end

This repo hosts the React code to summerofjake.com. Its main functions are to call the back-end server to retrieve strava route and photo marker data, and reference other staticly stored data on a Google Cloud bucket to display in an interactive manner on a map using the Google Maps Javascript API.

As of now, this is a personal project so I will not include detailed instructions on how to contribute to future development.

# Personal Notes

## Running locally
`npm run start` to hit prod server endpoint (https://www.summerofjakebackend.link:443)
`npm run start:dev` to hit local dev server endpoint (http://localhost:8080)

## Website infrastructure
* EC2 server (runs ‘server’ spring application and database-job as scheduled cron): https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#InstanceDetails:instanceId=i-064f11c98fabf4bac 
* MySQL database: https://console.aws.amazon.com/rds/home?region=us-east-1#database:id=summer-of-jake-db-2;is-cluster=false
* Cloud bucket (strava kmls, pictures, uploaded geojsons): https://console.cloud.google.com/storage/browser?referrer=search&project=summer-of-jake-adventure-map&prefix=
* Code pipeline: https://console.aws.amazon.com/codesuite/codepipeline/pipelines/summer-of-jake-backend-pipeline/view?region=us-east-1
* Code deploy: https://console.aws.amazon.com/codesuite/codedeploy/applications/summer-of-jake-website?region=us-east-1
* AWS Amplify: https://console.aws.amazon.com/amplify/home?region=us-east-1#/d36vgv5ul1f93o

* Google Maps Javascript API: https://developers.google.com/maps/documentation/javascript/datalayer