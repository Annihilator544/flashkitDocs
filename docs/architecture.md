---
sidebar_position: 2
---

# Architecture Overview

Brief overview of Architectural decisions involving Flashkit,

## Major Features
- 2 databases for faster load times, local and DynamoDB.
- 2 storage solutions, local and S3.
- real time data sync across multiple devices, single source of truth- dynamoDB.
- real time user data fetching, manipulations and transformations.
- canvas link sharing and previewing, editable links and non editable links.
- inbuilt canvas for creating designs.
- real time cloud saving and loading of designs.
- inbuilt EQS score for social media.
- inbuilt analytics for social media.
- processing tens of thousands of data points on client side.
- inbuilt file system for storing designs locally.
- when offline, eventually the changes are synced to the cloud.
- inbuilt worker service for syncing data between local and dynamoDB.
- multiple canvas features.

## Dual Database Architecture
- Flashkit uses a dual database architecture, with a local database for fast access and a DynamoDB for cloud storage and syncing.
- The local database is used for storing user data and design files, while the DynamoDB is used for storing user data and design files in the cloud.
- Onload of the app, changes made to local database while offline are synced to the DynamoDB, and vice versa.
- in cases of conflict, DynamoDB is the source of truth.
- The local database is used for fast access to user data and design files, while the DynamoDB is used for cloud storage and syncing.
- Both databases are synced in real time, and changes made to one database are reflected in the other database.

```mermaid
graph TD
    A[Flashkit]
    A1[Dynamo DB]
    A2[Instagram]
    A3[Design Files - S3]
    A5[Worker Service to Sync Dynamo DB and Local DB]
    A6[Local DB]
    A7[Project Files]
    A11[Jpeg - preview Image]
    A12[JSON - Design File]
    A13[Youtube Access Token]
    A14[TikTok Access Token]
    A15[Instagram User Data]
    A16[Youtube User Data]
    A17[TikTok User Data]
    A18[Instagram Access Token]
    A19[Youtube]
    A20[TikTok]

    A1 --> A2
    A1 --> A5
    A1 --> A19
    A1 --> A20
    A6 --> A2
    A6 --> A19
    A6 --> A20
    A2 --> A18
    A2 --> A15
    A19 --> A13
    A19 --> A16
    A20 --> A14
    A20 --> A17
    A5 --> A1
    A1 --> A3
    A5 --> A6
    A6 --> A5
    A6 --> A7
    A1 --> A7
    A3 --> A11
    A3 --> A12
```

## AWS Services
- [AWS Lambda](https://aws.amazon.com/lambda/): Serverless compute service that runs your code in response to events and automatically manages the underlying compute resources for you. Used for processing data and getting AI responses.
- [AWS S3](https://aws.amazon.com/s3/): Object storage service that offers industry-leading scalability, data availability, security, and performance. Used for storing design files and images.
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/): Fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. Used for storing user data and design files.

``` mermaid
architecture-beta
    junction junctionDynamoS3
    group awsLambda(cloud)[AWS Lambda]
        junction junctionAwsLambdaA in awsLambda
        junction junctionAwsLambdaB in awsLambda
        junction junctionAwsLambdaC in awsLambda
        group youtubeLambda(server)[Youtube Lambda] in awsLambda
            service getYoutubeEQSScore(server)[Youtube EQS Score] in youtubeLambda
            service getYoutubeEQSText(server)[Youtube EQS Text] in youtubeLambda
            junction junctionTopYoutube in youtubeLambda
            junction junctionBottomYoutube in youtubeLambda
            getYoutubeEQSScore:R -- L:junctionTopYoutube
            getYoutubeEQSText:R -- L:junctionBottomYoutube
            junctionBottomYoutube:T -- B:junctionTopYoutube
            junctionTopYoutube:T -- B:junctionAwsLambdaA

        group instagramLambda(server)[Instagram Lambda] in awsLambda
            service getInstagramEQSScore(server)[Instagram EQS Score] in instagramLambda
            service getInstagramEQSText(server)[Instagram EQS Text] in instagramLambda
            junction junctionTopInstagram in instagramLambda
            junction junctionBottomInstagram in instagramLambda
            getInstagramEQSScore:L -- R:junctionTopInstagram
            getInstagramEQSText:L -- R:junctionBottomInstagram
            junctionBottomInstagram:B -- T:junctionTopInstagram
            junctionBottomInstagram:T -- B:junctionAwsLambdaB

        group tikTokLambda(server)[TikTok Lambda] in awsLambda
            service getTikTokEQSScore(server)[TikTok EQS Score] in tikTokLambda
            service getTikTokEQSText(server)[TikTok EQS Text] in tikTokLambda
            junction junctionTopTikTok in tikTokLambda
            junction junctionBottomTikTok in tikTokLambda
            getTikTokEQSScore:R -- L:junctionTopTikTok
            getTikTokEQSText:R -- L:junctionBottomTikTok
            junctionBottomTikTok:B -- T:junctionTopTikTok
            junctionTopTikTok:B -- T:junctionAwsLambdaA

        group EQSLambda(server)[EQS Lambda] in awsLambda
            service getEQSOneLiner(server)[EQS One Liner] in EQSLambda
            getEQSOneLiner:B -- T:junctionAwsLambdaB

        junctionAwsLambdaA:R -- L:junctionAwsLambdaC
        junctionAwsLambdaB:L -- R:junctionAwsLambdaC
        junctionAwsLambdaC:T -- B:client
        

    group awsS3(cloud)[AWS S3]
        service s3personal(disk)[S3 Personal Bucket] in awsS3
        service s3public(disk)[S3 Public Bucket ] in awsS3
        junction junctionTops3personal in awsS3
        junction junctionTops3public in awsS3
        s3personal:B -- T:junctionTops3personal
        s3public:B -- T:junctionTops3public
        junctionTops3public:L -- R:junctionTops3personal
        junctionTops3personal:R -- L:client

    group dynamoDB(cloud)[DynamoDB]
        service dynamoDBpersonal(disk)[DynamoDB] in dynamoDB
        dynamoDBpersonal:L -- R:client



    group otherServices(cloud)[Other Services]
        junction junctionOtherServices in otherServices
        group socialMedia(cloud)[Social Media] in otherServices
            service youtubeAPI(server)[Youtube API] in socialMedia
            service instagramAPI(server)[Instagram API] in socialMedia
            service tikTokAPI(server)[TikTok API] in socialMedia
            junction junctionInstagram in socialMedia
            junction junctionYoutube in socialMedia
            junction junctionTikTok in socialMedia
            youtubeAPI:R -- L:junctionYoutube
            instagramAPI:R -- L:junctionInstagram
            tikTokAPI:R -- L:junctionTikTok
            junctionYoutube:B -- T:junctionInstagram
            junctionYoutube:T -- B:junctionTikTok
            junctionInstagram:R -- L:junctionOtherServices

        group plotono(cloud)[Plotono] in otherServices
            service plotonoAPI(server)[Plotono] in plotono
            plotonoAPI:L -- R:junctionOtherServices

        group firebase(cloud)[Firebase] in otherServices
            service firebaseAPI(server)[Firebase] in firebase
            firebaseAPI:B -- T:junctionOtherServices
        junctionOtherServices:B -- T:client
    
    group api(cloud)[Client]
        service db(database)[Local Database] in api
        service client(server)[Client] in api
        
```