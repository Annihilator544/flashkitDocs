---
sidebar_position: 3
---

# DataBase Overview

Brief overview of Database decisions involving Flashkit

## DynamoDB
- A lot of data involving Flashkit is in JSON format, and DynamoDB is a NoSQL database that stores data in JSON format.
- the unique key for each user is the user ID, which is a string, this string is fetched from Firebase. Each user has a unique ID (uid) , and this ID is used to fetch the user data from DynamoDB.
- The user data is stored in a single table, with the user ID as primary key. This allows for fast access to user data and design files.

## DynamoDB architecture

``` mermaid
erDiagram
    User ||--o{ EQS : has
    User ||--o{ InstagramData : has
    User ||--o{ YoutubePastData : has
    User ||--o{ TikTokPastData : has
    User ||--o{ ProjectDirectory : has
    User ||--o{ DesignList : has
    
    EQS ||--o{ Analysis : contains
    EQS ||--o{ EngagementMetrics : contains
    
    EngagementMetrics ||--|| Details : includes
    
    InstagramData ||--o{ Posts : contains
    InstagramData ||--o{ Stories : contains
    InstagramData ||--o{ PastData : contains
    InstagramData ||--o{ UserData : contains
    
    YoutubePastData ||--|| Total : contains
    YoutubePastData ||--|| Monthly : contains
    YoutubePastData ||--|| Yearly : contains
    
    Monthly ||--o{ MonthlyObject : has
    Yearly ||--o{ YearlyObject : has
    
    User {
        string uid
        string InstagramId
        string InstagramAccessTokens
        object InstagramData
        string YoutubeAccessTokens
        object YoutubePastData
        string TikTokAccessTokens
        object TikTokPastData
        object DesignList
        object ProjectDirectory
        object EQSScore
    }
    
    Posts {
        string caption
        integer comments_count
        string id
        integer like_count
        string media_type
        string media_url
        string permalink
        string timestamp
        string username
        string biography
        integer followers_count
        integer follows_count
        string ig_id
        integer media_count
        string name
        string profile_picture_url
    }
    
    InstagramData {
        array posts
        array stories
        object pastData
        object userData
    }
    
    Analysis {
        string text
        string type
        array GPTResponse
    }
    
    EngagementMetrics {
        float score
        object details
        object object
    }
    
    Details {
        float growthScore
        float recentEngagementScore
        float yearOverYearScore
    }
    
    YoutubePastData {
        object monthly
        object yearly
        object total
    }
    
    Total {
        string currentSubscribers
        string currentViews
        integer initialSubscribers
        integer initialViews
        integer subscriberChange
        integer totalComments
        integer viewChange
    }
    
    Monthly {
        object date
    }
    
    Yearly {
        object year
    }
    
    MonthlyObject {
        integer views
        integer subscribers
        integer comments
    }

     DesignList {
        array designs
    }
    
    ProjectDirectory {
        array projects
    }
    
    YearlyObject {
        integer views
        integer subscribers
        integer comments
    }
```

## Local Database
- The local database is used for fast access to user data and design files, while the DynamoDB is used for cloud storage and syncing.
- contains all the user data and design files, and is used for fast access to user data and design files.
- it has a designList which contains all the designs of the user and their preview images.
- all of it is stored in Blobs, and the designList is stored in JSON format.
- designs are stored in key-value pairs, with the design ID as the key and the design file as the value.
- LocalForage is used for storing the data in the local database, and it is a wrapper around IndexedDB, WebSQL and localStorage.

## LocalForage architecture

here are some sample data structures for the local database:

### designList
```json
[
    {
        "name": "Untitled Design",
        "id": "uvC2EySo05",
        "lastModified": "2025-02-23T06:00:49.262Z"
    },
    {
        "name": "Untitled Design",
        "id": "UhtWTgJHHl",
        "lastModified": "2025-02-23T06:00:49.645Z"
    },
    {
        "name": "Untitled Design",
        "id": "WYtRYv44oP",
        "lastModified": "2025-02-23T06:00:50.363Z"
    },
    {
        "name": "Untitled Design",
        "id": "aJY9W9jV94",
        "lastModified": "2025-02-23T06:00:50.739Z"
    },
    {
        "name": "Untitled Design",
        "id": "PJFz0nG9Jn",
        "lastModified": "2025-02-23T06:00:51.142Z"
    },
    {
        "name": "Untitled Design",
        "id": "vRIDQ42jP8",
        "lastModified": "2025-02-23T06:00:51.485Z"
    },
    {
        "name": "Untitled Design",
        "id": "d0hqGexdkw",
        "lastModified": "2025-02-23T06:00:51.883Z"
    },
    {
        "name": "Untitled Des",
        "id": "mvyGpqS8WY",
        "lastModified": "2025-02-23T06:00:52.407Z"
    },
    {
        "name": "Untitled Design",
        "id": "bJSY-1TWgn",
        "lastModified": "2025-02-23T06:00:52.796Z"
    },
    {
        "name": "Untitled Design",
        "id": "VRR5X1Jy_K",
        "lastModified": "2025-02-23T06:00:53.180Z"
    },
    {
        "name": "Untitled Design",
        "id": "VNjI4JC-2E",
        "lastModified": "2025-02-23T06:00:53.548Z"
    }
]
```


### userData
```json
{
    "providerId": "firebase",
    "proactiveRefresh": {
        "user": {
            "uid": "ndN5R0MpRHNiTqEXW6IOuRhbcGm2",
            "email": "adityaa0544@gmail.com",
            "emailVerified": true,
            "displayName": "helllloooo",
            "isAnonymous": false,
            "photoURL": "https://flashkitpersonalbucket.s3.eu-west-2.amazonaws.com/ndN5R0MpRHNiTqEXW6IOuRhbcGm2/profile/542-5427076_colors-download-settings-cat-pixel-art-removebg-preview.png",
            "providerData": [
                {
                    "providerId": "google.com",
                    "uid": "102955589896338613102",
                    "displayName": "ADITYA SHARMA",
                    "email": "adityaa0544@gmail.com",
                    "phoneNumber": null,
                    "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocL-vsTV1_Xzv3EG0yoz_qbl2v84bYqaq7OMtyO6StPW8V1iew=s96-c"
                }
            ],
            "stsTokenManager": {
                "refreshToken": "AMf-vBxSOsy4hYLq3viypsKKB2Yd7H3tS-YW0gBv3wBlDudg1K3PHk0NP5QxBWu66gQ-QOeBYki6zTH9VSkHbVPgo9EdaV0XnwlhgUZCpjiBa3L6uK4yj53G-wvS_-zZfjwTIS32PVfdXTOPUU8crX2knp27GTP_BLr-LIa0FEhXJU9wlBdd2L3g0i96XF8pp_3ngMtokBSdYa8VuKvqg9H7CMqVg5N9PLhUY0IYpY9ObjAUi-TaA-Hp7T13xihsO9_E0CLpVdY-fjOAcATFmmM1sm3umGRgqOqkeG-_MLuX8eugnQVlfLLezzLRbeQSjkVZequoKB_Q-s-IioabX8t--2glb_yaF4mRoteYJTsTXW5E0mYdP8iCdLwk8KYsDSAJw4herJ6VF4BnefUeALignuOcpmlW1-u-YnCMeemSupjQ9alT1i4",
                "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5ZGRjYTc2YzEyMzMyNmI5ZTJlODJkOGFjNDg0MWU1MzMyMmI3NmEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiaGVsbGxsb29vbyIsInBpY3R1cmUiOiJodHRwczovL2ZsYXNoa2l0cGVyc29uYWxidWNrZXQuczMuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb20vbmRONVIwTXBSSE5pVHFFWFc2SU91UmhiY0dtMi9wcm9maWxlLzU0Mi01NDI3MDc2X2NvbG9ycy1kb3dubG9hZC1zZXR0aW5ncy1jYXQtcGl4ZWwtYXJ0LXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2ZsYXNoa2l0LTFmMmJhIiwiYXVkIjoiZmxhc2hraXQtMWYyYmEiLCJhdXRoX3RpbWUiOjE3NDAzMzM5ODAsInVzZXJfaWQiOiJuZE41UjBNcFJITmlUcUVYVzZJT3VSaGJjR20yIiwic3ViIjoibmRONVIwTXBSSE5pVHFFWFc2SU91UmhiY0dtMiIsImlhdCI6MTc0MzQ0NDY4NywiZXhwIjoxNzQzNDQ4Mjg3LCJlbWFpbCI6ImFkaXR5YWEwNTQ0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyOTU1NTg5ODk2MzM4NjEzMTAyIl0sImVtYWlsIjpbImFkaXR5YWEwNTQ0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.USWRMUXrZNw4Ww-fathIgwI1HK90Uu7hgUP24lG2dZ0BlsntYg8hQUfEtoBhLKlUgS0NhmdWIwnKk9-_5HPvi4UGhjRtYLUNBJH1NWXi-NRf9sjHLbHyWNjPT8fp-qp7YJAxFZXfUxg3xEHyWqxE2-Gc57BKbNgAe6CLUU8ts6qPk1OnEoc4uMjWRwEd2d9y4_Sa3yKkFT0c5T_IjJVEZJt6R7U7kRlXG-4-eqigvgZrmIfuVL0L4UvJSGglpRPe7i0E8Raa6T-IvxfIJyJ7AbrldKb-Ti1Fi8UOtzENGXvmVTYdSKMhomkir_cG2beHSuVzXF1cagHo_0khjmmHRQ",
                "expirationTime": 1743448286988
            },
            "createdAt": "1726084475881",
            "lastLoginAt": "1741686740791",
            "apiKey": "AIzaSyAE744QPg5QEKfDG9nTIQ5jnqbGn3V0jKY",
            "appName": "[DEFAULT]"
        },
        "isRunning": true,
        "timerId": 226,
        "errorBackoff": 30000
    },
    "reloadUserInfo": {
        "localId": "ndN5R0MpRHNiTqEXW6IOuRhbcGm2",
        "email": "adityaa0544@gmail.com",
        "displayName": "helllloooo",
        "photoUrl": "https://flashkitpersonalbucket.s3.eu-west-2.amazonaws.com/ndN5R0MpRHNiTqEXW6IOuRhbcGm2/profile/542-5427076_colors-download-settings-cat-pixel-art-removebg-preview.png",
        "emailVerified": true,
        "passwordUpdatedAt": 1726084475881,
        "providerUserInfo": [
            {
                "providerId": "google.com",
                "displayName": "ADITYA SHARMA",
                "photoUrl": "https://lh3.googleusercontent.com/a/ACg8ocL-vsTV1_Xzv3EG0yoz_qbl2v84bYqaq7OMtyO6StPW8V1iew=s96-c",
                "federatedId": "102955589896338613102",
                "email": "adityaa0544@gmail.com",
                "rawId": "102955589896338613102"
            }
        ],
        "validSince": "1726777568",
        "lastLoginAt": "1741686740791",
        "createdAt": "1726084475881",
        "lastRefreshAt": "2025-03-31T18:11:27.226052Z"
    },
    "reloadListener": null,
    "uid": "ndN5R0MpRHNiTqEXW6IOuRhbcGm2",
    "auth": {
        "apiKey": "AIzaSyAE744QPg5QEKfDG9nTIQ5jnqbGn3V0jKY",
        "authDomain": "flashkit-1f2ba.firebaseapp.com",
        "appName": "[DEFAULT]",
        "currentUser": {
            "uid": "gqwgr",
            "email": "kuijvgfbrewkh",
            "emailVerified": true,
            "displayName": "helllloooo",
            "isAnonymous": false,
            "photoURL": "https://flashkitpersonalbucket.s3.eu-west-2.amazonaws.com/ndN5R0MpRHNiTqEXW6IOuRhbcGm2/profile/542-5427076_colors-download-settings-cat-pixel-art-removebg-preview.png",
            "providerData": [
                {
                    "providerId": "google.com",
                    "uid": "102955589896338613102",
                    "displayName": "ADITYA SHARMA",
                    "email": "adityaa0544@gmail.com",
                    "phoneNumber": null,
                    "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocL-vsTV1_Xzv3EG0yoz_qbl2v84bYqaq7OMtyO6StPW8V1iew=s96-c"
                }
            ],
            "stsTokenManager": {
                "refreshToken": "AMf-vBxSOsy4hYLq3viypsKKB2Yd7H3tS-YW0gBv3wBlDudg1K3PHk0NP5QxBWu66gQ-QOeBYki6zTH9VSkHbVPgo9EdaV0XnwlhgUZCpjiBa3L6uK4yj53G-wvS_-zZfjwTIS32PVfdXTOPUU8crX2knp27GTP_BLr-LIa0FEhXJU9wlBdd2L3g0i96XF8pp_3ngMtokBSdYa8VuKvqg9H7CMqVg5N9PLhUY0IYpY9ObjAUi-TaA-Hp7T13xihsO9_E0CLpVdY-fjOAcATFmmM1sm3umGRgqOqkeG-_MLuX8eugnQVlfLLezzLRbeQSjkVZequoKB_Q-s-IioabX8t--2glb_yaF4mRoteYJTsTXW5E0mYdP8iCdLwk8KYsDSAJw4herJ6VF4BnefUeALignuOcpmlW1-u-YnCMeemSupjQ9alT1i4",
                "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5ZGRjYTc2YzEyMzMyNmI5ZTJlODJkOGFjNDg0MWU1MzMyMmI3NmEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiaGVsbGxsb29vbyIsInBpY3R1cmUiOiJodHRwczovL2ZsYXNoa2l0cGVyc29uYWxidWNrZXQuczMuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb20vbmRONVIwTXBSSE5pVHFFWFc2SU91UmhiY0dtMi9wcm9maWxlLzU0Mi01NDI3MDc2X2NvbG9ycy1kb3dubG9hZC1zZXR0aW5ncy1jYXQtcGl4ZWwtYXJ0LXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2ZsYXNoa2l0LTFmMmJhIiwiYXVkIjoiZmxhc2hraXQtMWYyYmEiLCJhdXRoX3RpbWUiOjE3NDAzMzM5ODAsInVzZXJfaWQiOiJuZE41UjBNcFJITmlUcUVYVzZJT3VSaGJjR20yIiwic3ViIjoibmRONVIwTXBSSE5pVHFFWFc2SU91UmhiY0dtMiIsImlhdCI6MTc0MzQ0NDY4NywiZXhwIjoxNzQzNDQ4Mjg3LCJlbWFpbCI6ImFkaXR5YWEwNTQ0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyOTU1NTg5ODk2MzM4NjEzMTAyIl0sImVtYWlsIjpbImFkaXR5YWEwNTQ0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.USWRMUXrZNw4Ww-fathIgwI1HK90Uu7hgUP24lG2dZ0BlsntYg8hQUfEtoBhLKlUgS0NhmdWIwnKk9-_5HPvi4UGhjRtYLUNBJH1NWXi-NRf9sjHLbHyWNjPT8fp-qp7YJAxFZXfUxg3xEHyWqxE2-Gc57BKbNgAe6CLUU8ts6qPk1OnEoc4uMjWRwEd2d9y4_Sa3yKkFT0c5T_IjJVEZJt6R7U7kRlXG-4-eqigvgZrmIfuVL0L4UvJSGglpRPe7i0E8Raa6T-IvxfIJyJ7AbrldKb-Ti1Fi8UOtzENGXvmVTYdSKMhomkir_cG2beHSuVzXF1cagHo_0khjmmHRQ",
                "expirationTime": 1743448286988
            },
            "createdAt": "1726084475881",
            "lastLoginAt": "1741686740791",
            "apiKey": "AIzaSyAE744QPg5QEKfDG9nTIQ5jnqbGn3V0jKY",
            "appName": "[DEFAULT]"
        }
    },
    "stsTokenManager": {
        "refreshToken": "AMf-vBxSOsy4hYLq3viypsKKB2Yd7H3tS-YW0gBv3wBlDudg1K3PHk0NP5QxBWu66gQ-QOeBYki6zTH9VSkHbVPgo9EdaV0XnwlhgUZCpjiBa3L6uK4yj53G-wvS_-zZfjwTIS32PVfdXTOPUU8crX2knp27GTP_BLr-LIa0FEhXJU9wlBdd2L3g0i96XF8pp_3ngMtokBSdYa8VuKvqg9H7CMqVg5N9PLhUY0IYpY9ObjAUi-TaA-Hp7T13xihsO9_E0CLpVdY-fjOAcATFmmM1sm3umGRgqOqkeG-_MLuX8eugnQVlfLLezzLRbeQSjkVZequoKB_Q-s-IioabX8t--2glb_yaF4mRoteYJTsTXW5E0mYdP8iCdLwk8KYsDSAJw4herJ6VF4BnefUeALignuOcpmlW1-u-YnCMeemSupjQ9alT1i4",
        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5ZGRjYTc2YzEyMzMyNmI5ZTJlODJkOGFjNDg0MWU1MzMyMmI3NmEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiaGVsbGxsb29vbyIsInBpY3R1cmUiOiJodHRwczovL2ZsYXNoa2l0cGVyc29uYWxidWNrZXQuczMuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb20vbmRONVIwTXBSSE5pVHFFWFc2SU91UmhiY0dtMi9wcm9maWxlLzU0Mi01NDI3MDc2X2NvbG9ycy1kb3dubG9hZC1zZXR0aW5ncy1jYXQtcGl4ZWwtYXJ0LXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2ZsYXNoa2l0LTFmMmJhIiwiYXVkIjoiZmxhc2hraXQtMWYyYmEiLCJhdXRoX3RpbWUiOjE3NDAzMzM5ODAsInVzZXJfaWQiOiJuZE41UjBNcFJITmlUcUVYVzZJT3VSaGJjR20yIiwic3ViIjoibmRONVIwTXBSSE5pVHFFWFc2SU91UmhiY0dtMiIsImlhdCI6MTc0MzQ0NDY4NywiZXhwIjoxNzQzNDQ4Mjg3LCJlbWFpbCI6ImFkaXR5YWEwNTQ0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyOTU1NTg5ODk2MzM4NjEzMTAyIl0sImVtYWlsIjpbImFkaXR5YWEwNTQ0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.USWRMUXrZNw4Ww-fathIgwI1HK90Uu7hgUP24lG2dZ0BlsntYg8hQUfEtoBhLKlUgS0NhmdWIwnKk9-_5HPvi4UGhjRtYLUNBJH1NWXi-NRf9sjHLbHyWNjPT8fp-qp7YJAxFZXfUxg3xEHyWqxE2-Gc57BKbNgAe6CLUU8ts6qPk1OnEoc4uMjWRwEd2d9y4_Sa3yKkFT0c5T_IjJVEZJt6R7U7kRlXG-4-eqigvgZrmIfuVL0L4UvJSGglpRPe7i0E8Raa6T-IvxfIJyJ7AbrldKb-Ti1Fi8UOtzENGXvmVTYdSKMhomkir_cG2beHSuVzXF1cagHo_0khjmmHRQ",
        "expirationTime": 1743448286988
    },
    "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5ZGRjYTc2YzEyMzMyNmI5ZTJlODJkOGFjNDg0MWU1MzMyMmI3NmEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiaGVsbGxsb29vbyIsInBpY3R1cmUiOiJodHRwczovL2ZsYXNoa2l0cGVyc29uYWxidWNrZXQuczMuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb20vbmRONVIwTXBSSE5pVHFFWFc2SU91UmhiY0dtMi9wcm9maWxlLzU0Mi01NDI3MDc2X2NvbG9ycy1kb3dubG9hZC1zZXR0aW5ncy1jYXQtcGl4ZWwtYXJ0LXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2ZsYXNoa2l0LTFmMmJhIiwiYXVkIjoiZmxhc2hraXQtMWYyYmEiLCJhdXRoX3RpbWUiOjE3NDAzMzM5ODAsInVzZXJfaWQiOiJuZE41UjBNcFJITmlUcUVYVzZJT3VSaGJjR20yIiwic3ViIjoibmRONVIwTXBSSE5pVHFFWFc2SU91UmhiY0dtMiIsImlhdCI6MTc0MzQ0NDY4NywiZXhwIjoxNzQzNDQ4Mjg3LCJlbWFpbCI6ImFkaXR5YWEwNTQ0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyOTU1NTg5ODk2MzM4NjEzMTAyIl0sImVtYWlsIjpbImFkaXR5YWEwNTQ0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.USWRMUXrZNw4Ww-fathIgwI1HK90Uu7hgUP24lG2dZ0BlsntYg8hQUfEtoBhLKlUgS0NhmdWIwnKk9-_5HPvi4UGhjRtYLUNBJH1NWXi-NRf9sjHLbHyWNjPT8fp-qp7YJAxFZXfUxg3xEHyWqxE2-Gc57BKbNgAe6CLUU8ts6qPk1OnEoc4uMjWRwEd2d9y4_Sa3yKkFT0c5T_IjJVEZJt6R7U7kRlXG-4-eqigvgZrmIfuVL0L4UvJSGglpRPe7i0E8Raa6T-IvxfIJyJ7AbrldKb-Ti1Fi8UOtzENGXvmVTYdSKMhomkir_cG2beHSuVzXF1cagHo_0khjmmHRQ",
    "displayName": "helllloooo",
    "email": "adityaa0544@gmail.com",
    "emailVerified": true,
    "phoneNumber": null,
    "photoURL": "https://flashkitpersonalbucket.s3.eu-west-2.amazonaws.com/ndN5R0MpRHNiTqEXW6IOuRhbcGm2/profile/542-5427076_colors-download-settings-cat-pixel-art-removebg-preview.png",
    "isAnonymous": false,
    "tenantId": null,
    "providerData": [
        {
            "providerId": "google.com",
            "uid": "102955589896338613102",
            "displayName": "ADITYA SHARMA",
            "email": "adityaa0544@gmail.com",
            "phoneNumber": null,
            "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocL-vsTV1_Xzv3EG0yoz_qbl2v84bYqaq7OMtyO6StPW8V1iew=s96-c"
        }
    ],
    "metadata": {
        "createdAt": "1726084475881",
        "lastLoginAt": "1741686740791"
    }
}
```

### instagramData

```json
{
    "instagramData": {
        "posts": [
            {
                "id": "18021686899768745",
                "caption": "Walking in the holiday glow💕💕",
                "media_type": "CAROUSEL_ALBUM",
                "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/412645594_891027022327293_3805540981121109453_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeFnuKOct0-buiLDyfVXHe4XB_aafFBPHEcH9pp8UE8cR_huQm9p7QlFCH6xoviYz54f75q46jDv88ZEjfiXJaN0&_nc_ohc=xDB3SU_n_JUQ7kNvgGF27QH&_nc_oc=AdnS9EnhMdkk7lZifhPQIfTwK4QKc4mTBkBXF1Z-ntZqrTptvmuqTWJavZhvTgGdJZo&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=8Z0brU971sNT5BsVcv_Tqw&oh=00_AYEj1bJoC5bD_x7EwHaRxZ13S86a0nVZ6gIWtStEX4fKvA&oe=67F0C5ED",
                "permalink": "https://www.instagram.com/p/C1RTaZAuaKj/",
                "timestamp": "2023-12-25T09:06:05+0000",
                "username": "ehmxce",
                "like_count": 208,
                "comments_count": 17
            },
            {
                "id": "18026036995587854",
                "caption": "Hehe",
                "media_type": "IMAGE",
                "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/363286795_242195572027058_6005004142669580537_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeFgNjDesFMZwBsCTzZnbXAYrnQrcPeMCM6udCtw94wIztMZF0W3Y24DA_lUcQGIUP2khq20vEQE--cL26MhRcWe&_nc_ohc=f0WoYV8DuKMQ7kNvgG-jui-&_nc_oc=AdkUyaC_qHluGA6ZAHSQiFIZW6DL4RXNQHPhi0yCOyPSk-bFzNvukw9kzj2IMYmyj8U&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=8Z0brU971sNT5BsVcv_Tqw&oh=00_AYEUB_yyxr9ZSxoFUUZeDZrDdSPVSeplBacWEY7vHXfjTw&oe=67F0C2F2",
                "permalink": "https://www.instagram.com/p/CvFmaJmtKOi/",
                "timestamp": "2023-07-24T16:52:49+0000",
                "username": "ehmxce",
                "like_count": 155,
                "comments_count": 15
            },
            {
                "id": "18373052683008660",
                "caption": "Do I even need a caption for this post?\nI mean, just look at me",
                "media_type": "IMAGE",
                "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/356065180_520470656861953_3106458455011602790_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeEa7e7eWfPnYWHvYmVKW4qupNW4ctou_e-k1bhy2i797yqhfoJWwNrje6gZcqPJy9--O6HBJ9dBvzsb5SMysb-g&_nc_ohc=deW7xqSENHoQ7kNvgFNc_QN&_nc_oc=Adnq0r3LvD90tpMWTLn_LgbToR1BEZP2l8qkHORHFZ5lTzxEgyVizGb6j9dWZJfSrh4&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=8Z0brU971sNT5BsVcv_Tqw&oh=00_AYFbYxIqYdfq52SXXGLkYBmZQqQ3CLrldD-52NH1gruKFg&oe=67F0B2EB",
                "permalink": "https://www.instagram.com/p/Ct4xZChBjG-/",
                "timestamp": "2023-06-24T20:47:16+0000",
                "username": "ehmxce",
                "like_count": 164,
                "comments_count": 29
            },
            {
                "id": "17960603279533376",
                "caption": "Sunrises and sunsets 🌅🌄",
                "media_type": "CAROUSEL_ALBUM",
                "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/350251108_801838954727331_3969897833120622772_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeE2UGd2suSdr30E1ob9TcqmiiYO7bBo8rSKJg7tsGjytAuv4QtcMxAedPwlaFc0OuwQ2LZNbNH8Pt5g853Ku9im&_nc_ohc=P1-UVvRF2foQ7kNvgHfJhSr&_nc_oc=Adm5YOraHq5xFPf3Mg5WRnXLOdsu7c_QBxVoVFU2D6smTfRO094J_P9GKlwDo-QJ-1s&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=8Z0brU971sNT5BsVcv_Tqw&oh=00_AYEop48_r8GDlQbJcY0pOsNfNhwgrJD3DKSuNIr5ViMXHw&oe=67F0AF02",
                "permalink": "https://www.instagram.com/p/Cs7_ER9tZrg/",
                "timestamp": "2023-06-01T06:13:05+0000",
                "username": "ehmxce",
                "like_count": 177,
                "comments_count": 9
            },
            {
                "id": "17964835040494759",
                "caption": "Feels like a dream, so Vivid yet so elusive.",
                "media_type": "CAROUSEL_ALBUM",
                "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/332571574_200398895905526_4738168763592664255_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeHKMUZhnzTfQ-TMqlei-WfIF95D-MsKGNgX3kP4ywoY2HyZVcLves45651ZeQHxMufOgtpFMJpY57xZi0RXbcaa&_nc_ohc=pCQgVcQUmm8Q7kNvgEa6ncw&_nc_oc=AdmUanyJdhjtVQjhQilCUdYoVIFfzKC6fSe2jyKOx5hiGFLbfp7oDHni_Zh2v_Eb5jQ&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=8Z0brU971sNT5BsVcv_Tqw&oh=00_AYE8NK6w6WJrSDOMVBqj0wGwsolm5_UUJKiU18DYV-HqzQ&oe=67F0BB3E",
                "permalink": "https://www.instagram.com/p/Co5JdEvtn8I/",
                "timestamp": "2023-02-20T17:40:34+0000",
                "username": "ehmxce",
                "like_count": 158,
                "comments_count": 9
            },
            {
                "id": "18308221906072238",
                "caption": "These imperfections are what make your life unique.....",
                "media_type": "CAROUSEL_ALBUM",
                "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/323188650_874191260562246_3326709611621716552_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=105&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeEP7KSbPPXgZP3OQdZcBe8c29rInXlPu3jb2sideU-7eJEP_ygAQTldlfTPRzcS-IlZkgWLErxqgqFOkVZ2j7nd&_nc_ohc=lu0xWWt1tvUQ7kNvgHijmKi&_nc_oc=AdnxfO8cv5jKVB911vln9lhGWxuNTgAQBYkC95UtzAo9nMCTD20vkHY8QmZ_oz3Ytgc&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=8Z0brU971sNT5BsVcv_Tqw&oh=00_AYGeKC6QtY6oXOrxM9r38LmliuUlHPawCHlCDugRfYXV9g&oe=67F0B025",
                "permalink": "https://www.instagram.com/p/Cm4CMmvBL6U/",
                "timestamp": "2023-01-01T14:15:07+0000",
                "username": "ehmxce",
                "like_count": 148,
                "comments_count": 8
            },
            {
                "id": "18227000242153769",
                "caption": "Gotta look............",
                "media_type": "CAROUSEL_ALBUM",
                "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/312709596_138796548654382_8984276169382781616_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeEfBrMfMDAWTUGj4mexPStHwa0xV2U9Q9PBrTFXZT1D07_VF8kmkxuYHDyGr_pnaAu8OCg6HFM5FPAv-UOSbtGX&_nc_ohc=6UZcaaD5ynIQ7kNvgG-ykiP&_nc_oc=Adk2oxIieTUx-VmaoM-3g1VI6Ie4cVlV9Kmbo_CLkvRhbvDY0uCNlAIvP_fJ_9yX_es&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=8Z0brU971sNT5BsVcv_Tqw&oh=00_AYGT5WCAKP5upMVEJ2gp8JqxAIOgAAU0fPRNSMku9ivSlA&oe=67F0A100",
                "permalink": "https://www.instagram.com/p/CkHB5PsuA99/",
                "timestamp": "2022-10-24T20:26:54+0000",
                "username": "ehmxce",
                "like_count": 134,
                "comments_count": 3
            },
            {
                "id": "17943348458164301",
                "caption": "On the rocks........",
                "media_type": "CAROUSEL_ALBUM",
                "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/309680910_450597010380290_2938127082638156648_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeGSE6NEJzYqISIZKw-jpofBgRFeqPnUfLqBEV6o-dR8umKEjCh7W5i5SDV_WEdLpiarueqkfLjivfjkKjTl1fTL&_nc_ohc=GHa6OY2SCLUQ7kNvgHpeGXN&_nc_oc=AdlVspuQ64YzkNF-x71nkzSmJCy7ZwjpEnTDPNFvOVTjIXQMAgpL1N8ObbBNtQJ9BQg&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=8Z0brU971sNT5BsVcv_Tqw&oh=00_AYEqNMjc3iNxP6njWfn3py-HjMJLsgWAHP3ziyWEvF4ARg&oe=67F0B516",
                "permalink": "https://www.instagram.com/p/CjNGrd-ubdn/",
                "timestamp": "2022-10-02T08:32:45+0000",
                "username": "ehmxce",
                "like_count": 136,
                "comments_count": 18
            },
            {
                "id": "17970555427717689",
                "caption": "Living weekends to weekends might just work :)",
                "media_type": "CAROUSEL_ALBUM",
                "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/292601330_1989544441217115_3030108929516068503_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeE4dYhdWZjTb-DR5pZGhnQphr2g7HbjaXmGvaDsduNpee3SvGT-naw6SzjBIvTYD9xGCzk81s5Hld5bSS2Cvbtw&_nc_ohc=GZg1i-hqml4Q7kNvgGxGPwZ&_nc_oc=Adkd2AUuvSWAD0nFUx5i2J-vHjID3Fl6tDSqQj_OSu5E6HWNwQntRfbxFNW8egD-bIw&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=8Z0brU971sNT5BsVcv_Tqw&oh=00_AYGoaoDPQMoROmeAGg6QMdSbVsaSs6_ctSm9x2iCMu18vg&oe=67F0CC4A",
                "permalink": "https://www.instagram.com/p/Cf1MuTHqyTS/",
                "timestamp": "2022-07-10T12:09:37+0000",
                "username": "ehmxce",
                "like_count": 130,
                "comments_count": 7
            },
            {
                "id": "17957001088521773",
                "caption": "A little fashion never hurts.\nPC:@ayushsinghal10",
                "media_type": "CAROUSEL_ALBUM",
                "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/269893841_445698657001172_75031484779908001_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeHGrp-VFB5arFYRGi6ZBv-Z1BCbFKisbUjUEJsUqKxtSN58quK4WDV2EdETjnW0NsZYD9yx5NwbeRQE-DPOPcQ0&_nc_ohc=E6ru7XOBNyAQ7kNvgGzT84J&_nc_oc=Adm_A3Cqeg8bdt_Ye7eIvhdzf2MqGe-ApcOlQzkXdw46LYVU-rPNBR6T8CNTrLkDd9M&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=8Z0brU971sNT5BsVcv_Tqw&oh=00_AYEbhyT99ELVteFI768Ic6AOFsIY63u3gOV1PGkleB2rtw&oe=67F0A056",
                "permalink": "https://www.instagram.com/p/CX51m95hZOO/",
                "timestamp": "2021-12-25T11:12:41+0000",
                "username": "ehmxce",
                "like_count": 98,
                "comments_count": 9
            },
            {
                "id": "17913040658178815",
                "caption": "A weekend to remember. \n\nIt has been a while since we all met.\n#friends #alberthallmuseum",
                "media_type": "CAROUSEL_ALBUM",
                "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/261778850_641060423576613_1115013520392882734_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeG0BcWuxr4d6lhBpUBkBHzUXMp9IBr4w3Fcyn0gGvjDcaWeSdTI0TFZubvo3bodVkfg1ZXA9WVi8bzU0_iLXaA3&_nc_ohc=QZpqg7ZaKy0Q7kNvgE473iJ&_nc_oc=Admj0Xv1iDm_kBKQmiD1I9eFZ9-403XBK09ykdwRZM2z1TbK1bmGMlcVHME2B9_hObI&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&_nc_gid=8Z0brU971sNT5BsVcv_Tqw&oh=00_AYEzsCI5uELzLSTvqIikxZDHuVrp0vF_-SZOAMzOhfZrhw&oe=67F0C934",
                "permalink": "https://www.instagram.com/p/CW097QUBW84/",
                "timestamp": "2021-11-28T17:17:46+0000",
                "username": "ehmxce",
                "like_count": 78,
                "comments_count": 2
            }
        ],
        "stories": [
            {
                "id": "18069549841896513",
                "media_type": "IMAGE",
                "media_url": "https://scontent.cdninstagram.com/v/t51.75761-15/487770964_18262838179263986_8870970349831507470_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeFU3QYO4dddac8Qkbk4TTCupES_7Q682xSkRL_tDrzbFJW7Zj-koyK6UtjfkO_kxa21-z_HSHOK-EwyzhuOE6kY&_nc_ohc=-fkjHmA5jeEQ7kNvgG_s5Vx&_nc_oc=AdmL6d0OXpXtXKgRc6aWTZq7WzLgbay4IreDlHdJUWkplqjYuQw3ZKD_JYO7q6aAO2I&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AB9oSrcEAAAA&_nc_gid=i1DoOcWnS8vKFkgvbYO6wQ&oh=00_AYEPTktdhGNfGYWUCQy4AMCty-vwe8zI9ASaA_N4gdXU1w&oe=67F097A2",
                "permalink": "https://instagram.com/stories/ehmxce/3600594191648271005",
                "timestamp": "2025-03-31T18:04:53+0000",
                "username": "ehmxce",
                "like_count": 0,
                "comments_count": 0
            },
            {
                "id": "18112070935466289",
                "media_type": "IMAGE",
                "media_url": "https://scontent.cdninstagram.com/v/t51.75761-15/488269457_18262832017263986_4001031421042437631_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeHt16zS5pT9Gk9Z_dsV2LfCnrvQDmr0TM6eu9AOavRMzjd8WceW0RRh3PnxsprdSjcpntlYPRLSEkfxaL0lUnMd&_nc_ohc=id5PdR_ErMgQ7kNvgFNCTIS&_nc_oc=AdmREDpts0xYNMu_UzVEU52uzQwsCLuS_zGNeWHRLwSdKNPQFLgq_7JuhVdWFKxIfOA&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AB9oSrcEAAAA&_nc_gid=i1DoOcWnS8vKFkgvbYO6wQ&oh=00_AYG-O68z4mtOqX3ocb_kiJCvYLZkLNrY5-bWdhaYz9Vk2g&oe=67F0BB33",
                "permalink": "https://instagram.com/stories/ehmxce/3600554565662715914",
                "timestamp": "2025-03-31T16:46:07+0000",
                "username": "ehmxce",
                "like_count": 0,
                "comments_count": 0
            },
            {
                "id": "17850205662429079",
                "media_type": "VIDEO",
                "permalink": "https://instagram.com/stories/ehmxce/3599959008989801618",
                "timestamp": "2025-03-30T21:02:55+0000",
                "username": "ehmxce",
                "like_count": 0,
                "comments_count": 0,
                "thumbnail_url": "https://scontent.cdninstagram.com/v/t51.75761-15/487934121_18262738858263986_1587057674618395053_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_eui2=AeGtvWBnQ6LpJQv416jXEzTCcxsxhCTCxNJzGzGEJMLE0lAIYTi-09CIAVQWhACr6-kgm_RktIKPZqahFu67X2RI&_nc_ohc=xybLy6ssf2gQ7kNvgG1aTbI&_nc_oc=AdkdLOGlIRLJ1tCe3rDSPUmoukIv1nu6EiysRx1iksP7D_MZXGEAynoK9Nv9KKd1c9E&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=AB9oSrcEAAAA&_nc_gid=i1DoOcWnS8vKFkgvbYO6wQ&oh=00_AYFrpV66zas9qJKB-XowLpnHwJW4RFTomL82ew0V3h1BwQ&oe=67F0BABF"
            }
        ],
        "userData": {
            "biography": "fail early fail fast",
            "followers_count": 634,
            "follows_count": 1156,
            "ig_id": 7860103985,
            "media_count": 11,
            "name": "Aditya Sharma",
            "profile_picture_url": "https://scontent.fblr23-1.fna.fbcdn.net/v/t51.2885-15/355720589_1435212757311113_5212798743476698829_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7d201b&_nc_eui2=AeGG7XtELOqenD-SxoHA5EPvjjxVH9QIjzmOPFUf1AiPOdF_SHT5DJUFngf-ZfBfbtet16n8Iksue65KGkYS3_ad&_nc_ohc=FJA21nPsklgQ7kNvgGb5dNM&_nc_oc=AdmuDvZDgdhR0bB5hR_Qxjz_9IpWTiK7P6kk5_NypXLKLNBGl9XfjKOMdm2MAgrU_oc&_nc_zt=23&_nc_ht=scontent.fblr23-1.fna&edm=AL-3X8kEAAAA&oh=00_AYEDJ4qiJohg_gEUpgdoWOzw1aGv1uon5thriaHtGQW91w&oe=67F09681",
            "username": "ehmxce",
            "id": "17841407919572512"
        },
        "daily": {
            "2025-03-02": {
                "follower_count": -23,
                "impressions": 57,
                "reach": 55
            },
            "2025-03-03": {
                "follower_count": -23,
                "impressions": 205,
                "reach": 146
            },
            "2025-03-04": {
                "follower_count": -22,
                "impressions": 465,
                "reach": 369
            },
            "2025-03-05": {
                "follower_count": -22,
                "impressions": 16,
                "reach": 16
            },
            "2025-03-06": {
                "follower_count": -20,
                "impressions": 280,
                "reach": 269
            },
            "2025-03-07": {
                "follower_count": -19,
                "impressions": 198,
                "reach": 178
            },
            "2025-03-08": {
                "follower_count": -18,
                "impressions": 1544,
                "reach": 770
            },
            "2025-03-09": {
                "follower_count": -17,
                "impressions": 166,
                "reach": 109
            },
            "2025-03-10": {
                "follower_count": -16,
                "impressions": 5,
                "reach": 2
            },
            "2025-03-11": {
                "follower_count": -16,
                "impressions": 3,
                "reach": 1
            },
            "2025-03-12": {
                "follower_count": 617,
                "impressions": 10,
                "reach": 1
            },
            "2025-03-13": {
                "follower_count": 617,
                "impressions": 802,
                "reach": 322
            },
            "2025-03-14": {
                "follower_count": 618,
                "impressions": 263,
                "reach": 119
            },
            "2025-03-15": {
                "follower_count": 619,
                "impressions": 20,
                "reach": 4
            },
            "2025-03-16": {
                "follower_count": 620,
                "impressions": 521,
                "reach": 383
            },
            "2025-03-17": {
                "follower_count": 621,
                "impressions": 101,
                "reach": 82
            },
            "2025-03-18": {
                "follower_count": 623,
                "impressions": 262,
                "reach": 153
            },
            "2025-03-19": {
                "follower_count": 625,
                "impressions": 253,
                "reach": 183
            },
            "2025-03-20": {
                "follower_count": 626,
                "impressions": 43,
                "reach": 35
            },
            "2025-03-21": {
                "follower_count": 626,
                "impressions": 469,
                "reach": 236
            },
            "2025-03-22": {
                "follower_count": 627,
                "impressions": 510,
                "reach": 163
            },
            "2025-03-23": {
                "follower_count": 629,
                "impressions": 235,
                "reach": 145
            },
            "2025-03-24": {
                "follower_count": 630,
                "impressions": 586,
                "reach": 261
            },
            "2025-03-25": {
                "follower_count": 631,
                "impressions": 596,
                "reach": 331
            },
            "2025-03-26": {
                "follower_count": 632,
                "impressions": 131,
                "reach": 122
            },
            "2025-03-27": {
                "follower_count": 633,
                "impressions": 224,
                "reach": 217
            },
            "2025-03-28": {
                "follower_count": 634,
                "impressions": 322,
                "reach": 107
            },
            "2025-03-29": {
                "follower_count": 634,
                "impressions": 1220,
                "reach": 154
            },
            "2025-03-30": {
                "follower_count": 634,
                "impressions": 696,
                "reach": 268
            },
            "2025-03-31": {
                "follower_count": 634,
                "impressions": 274,
                "reach": 151
            }
        },
        "monthly": {},
        "yearly": {},
        "extraMetrics": {
            "profile_views": {
                "monthly": 284,
                "lastWeek": 83,
                "thisWeek": 40
            },
            "accounts_engaged": {
                "monthly": 68,
                "lastWeek": 18,
                "thisWeek": 30
            },
            "likes": {
                "monthly": 0,
                "lastWeek": 0,
                "thisWeek": 0
            },
            "comments": {
                "monthly": 0,
                "lastWeek": 0,
                "thisWeek": 0
            },
            "shares": {
                "monthly": 13,
                "lastWeek": 1,
                "thisWeek": 3
            },
            "saves": {
                "monthly": 0,
                "lastWeek": 0,
                "thisWeek": 0
            },
            "replies": {
                "monthly": 53,
                "lastWeek": 8,
                "thisWeek": 19
            },
            "follows_and_unfollows": {
                "monthly": 0,
                "lastWeek": 0,
                "thisWeek": 0
            },
            "total_interactions": {
                "monthly": 66,
                "lastWeek": 9,
                "thisWeek": 22
            }
        },
        "demographicData": {
            "DE": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 1,
                "follower_demographics": 2
            },
            "NO": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 1,
                "follower_demographics": 2
            },
            "AU": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 1,
                "follower_demographics": 1
            },
            "AE": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 3,
                "follower_demographics": 3
            },
            "IN": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 544,
                "follower_demographics": 602
            },
            "KE": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 1,
                "follower_demographics": 1
            },
            "GB": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 1,
                "follower_demographics": 1
            },
            "IE": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 0,
                "follower_demographics": 0
            },
            "FR": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 1,
                "follower_demographics": 1
            },
            "CA": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 2,
                "follower_demographics": 2
            },
            "US": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 4,
                "follower_demographics": 4
            },
            "EG": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 0,
                "follower_demographics": 1
            },
            "BG": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 0,
                "follower_demographics": 1
            },
            "IT": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 0,
                "follower_demographics": 1
            },
            "GR": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 0,
                "follower_demographics": 1
            },
            "ES": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 0,
                "follower_demographics": 1
            },
            "NG": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 0,
                "follower_demographics": 5
            },
            "PK": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 0,
                "follower_demographics": 1
            },
            "NL": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 0,
                "follower_demographics": 1
            },
            "MK": {
                "engaged_audience_demographics": 0,
                "reached_audience_demographics": 0,
                "follower_demographics": 1
            }
        },
        "lastFetched": "2025-03-31T18:32:09.792Z"
    },
    "instagramCalculatedData": {
        "totalImpressions": 3775,
        "totalReach": 1460,
        "percentageChangeReach": "-40.58",
        "percentageChangeImpressions": "-33.16",
        "percentageChangeFollowers": "0.79",
        "topCountry": "India"
    },
    "instagramEQS": {
        "eqsPercentage": 82,
        "eqsPercentageChange": 1
    }
}
```

### youtubeData 

``` json
{
    "youtubeData": {
        "lastFetched": "2025-03-31T18:32:05.881Z",
        "daily": {
            "2024-12-29": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2024-12-30": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2024-12-31": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-01": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-02": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-05": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-06": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-07": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-09": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-10": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-11": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-12": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-13": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-14": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-15": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-16": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-17": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-18": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-19": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-20": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-21": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-22": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-23": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-24": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-25": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-26": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-27": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-28": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-29": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-30": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-01-31": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-01": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-02": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-05": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-06": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-07": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-09": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-10": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-11": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-12": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-13": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-14": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-15": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-16": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-17": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-18": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-19": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-20": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-21": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-22": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-23": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-24": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-25": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-26": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-27": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02-28": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-01": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-02": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-05": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-06": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-07": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-09": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-10": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-11": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-12": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-13": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-14": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-15": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-16": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-17": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-18": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-19": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-20": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-21": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-22": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-23": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-24": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-25": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-26": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-27": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03-28": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            }
        },
        "monthly": {
            "2014-01": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2014-02": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2014-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2014-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2014-05": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2014-06": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2014-07": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2014-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2014-09": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2014-10": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2014-11": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2014-12": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-01": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-02": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-05": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-06": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-07": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-09": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-10": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-11": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015-12": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-01": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-02": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-05": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-06": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-07": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-09": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-10": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-11": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016-12": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-01": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-02": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-05": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-06": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-07": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-09": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-10": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-11": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017-12": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2018-01": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2018-02": {
                "views": 0,
                "subscribers": 1,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2018-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2018-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2018-05": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2018-06": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2018-07": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2018-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2018-09": {
                "views": 80,
                "subscribers": 12,
                "comments": 1,
                "subscribed": 25,
                "unsubscribed": 55,
                "likes": 19,
                "dislikes": 0,
                "shares": 2,
                "estimatedMinutesWatched": 76,
                "averageViewDuration": 65.5,
                "averageViewPercentage": 32.433
            },
            "2018-10": {
                "views": 99,
                "subscribers": 6,
                "comments": 0,
                "subscribed": 45,
                "unsubscribed": 54,
                "likes": 17,
                "dislikes": 0,
                "shares": 4,
                "estimatedMinutesWatched": 61,
                "averageViewDuration": 34.94117647058823,
                "averageViewPercentage": 21.158823529411762
            },
            "2018-11": {
                "views": 23,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 5,
                "unsubscribed": 18,
                "likes": 4,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 19,
                "averageViewDuration": 71.46153846153847,
                "averageViewPercentage": 27.96
            },
            "2018-12": {
                "views": 24,
                "subscribers": 1,
                "comments": 1,
                "subscribed": 14,
                "unsubscribed": 10,
                "likes": 10,
                "dislikes": 1,
                "shares": 1,
                "estimatedMinutesWatched": 20,
                "averageViewDuration": 95.54545454545455,
                "averageViewPercentage": 39.83083333333333
            },
            "2019-01": {
                "views": 45,
                "subscribers": 0,
                "comments": 1,
                "subscribed": 1,
                "unsubscribed": 44,
                "likes": 1,
                "dislikes": 0,
                "shares": 2,
                "estimatedMinutesWatched": 67,
                "averageViewDuration": 73.38888888888889,
                "averageViewPercentage": 31.176315789473687
            },
            "2019-02": {
                "views": 26,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 2,
                "unsubscribed": 24,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 45,
                "averageViewDuration": 131.53846153846155,
                "averageViewPercentage": 54.128461538461536
            },
            "2019-03": {
                "views": 14,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 14,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 11,
                "averageViewDuration": 43.3,
                "averageViewPercentage": 16.546
            },
            "2019-04": {
                "views": 20,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 20,
                "likes": 1,
                "dislikes": 0,
                "shares": 1,
                "estimatedMinutesWatched": 57,
                "averageViewDuration": 169.36363636363637,
                "averageViewPercentage": 67.6809090909091
            },
            "2019-05": {
                "views": 18,
                "subscribers": 1,
                "comments": 0,
                "subscribed": 10,
                "unsubscribed": 8,
                "likes": 4,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 34,
                "averageViewDuration": 218.75,
                "averageViewPercentage": 84.24249999999999
            },
            "2019-06": {
                "views": 8,
                "subscribers": -1,
                "comments": 0,
                "subscribed": 5,
                "unsubscribed": 3,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 4,
                "averageViewDuration": 82.25,
                "averageViewPercentage": 42.35
            },
            "2019-07": {
                "views": 4,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 4,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 3,
                "averageViewDuration": 59.75,
                "averageViewPercentage": 30.115
            },
            "2019-08": {
                "views": 5,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 5,
                "likes": 0,
                "dislikes": 0,
                "shares": 1,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 14.8,
                "averageViewPercentage": 9.274
            },
            "2019-09": {
                "views": 8,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 8,
                "likes": 0,
                "dislikes": 0,
                "shares": 1,
                "estimatedMinutesWatched": 4,
                "averageViewDuration": 53.5,
                "averageViewPercentage": 31.85875
            },
            "2019-10": {
                "views": 6,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 1,
                "unsubscribed": 5,
                "likes": 0,
                "dislikes": 1,
                "shares": 0,
                "estimatedMinutesWatched": 1,
                "averageViewDuration": 27.666666666666668,
                "averageViewPercentage": 13.421666666666665
            },
            "2019-11": {
                "views": 5,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 5,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 4,
                "averageViewDuration": 45.5,
                "averageViewPercentage": 28.7675
            },
            "2019-12": {
                "views": 2,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 2,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 2,
                "averageViewDuration": 65.5,
                "averageViewPercentage": 33.87
            },
            "2020-01": {
                "views": 2,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 2,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 1,
                "averageViewDuration": 57,
                "averageViewPercentage": 31.564999999999998
            },
            "2020-02": {
                "views": 2,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 2,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 24.5,
                "averageViewPercentage": 12.435
            },
            "2020-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2020-04": {
                "views": 1,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 1,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 16,
                "averageViewPercentage": 16.2
            },
            "2020-05": {
                "views": 1,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 1,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 4,
                "averageViewPercentage": 2.52
            },
            "2020-06": {
                "views": 2,
                "subscribers": -1,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 2,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 11,
                "averageViewPercentage": 5.744999999999999
            },
            "2020-07": {
                "views": 2,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 2,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 5,
                "averageViewPercentage": 2.91
            },
            "2020-08": {
                "views": 2,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 1,
                "unsubscribed": 1,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 9,
                "averageViewPercentage": 8.540000000000001
            },
            "2020-09": {
                "views": 1,
                "subscribers": -1,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 1,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 14,
                "averageViewPercentage": 7.5
            },
            "2020-10": {
                "views": 1,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 1,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 10,
                "averageViewPercentage": 4.79
            },
            "2020-11": {
                "views": 1,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 1,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 10,
                "averageViewPercentage": 5.07
            },
            "2020-12": {
                "views": 1,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 1,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 10,
                "averageViewPercentage": 4.65
            },
            "2021-01": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2021-02": {
                "views": 3,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 3,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 4,
                "averageViewDuration": 118.33333333333333,
                "averageViewPercentage": 44.416666666666664
            },
            "2021-03": {
                "views": 2,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 2,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 4,
                "averageViewDuration": 140.5,
                "averageViewPercentage": 53.235
            },
            "2021-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2021-05": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2021-06": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2021-07": {
                "views": 2,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 2,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 3,
                "averageViewDuration": 190,
                "averageViewPercentage": 48.065
            },
            "2021-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2021-09": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2021-10": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2021-11": {
                "views": 4,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 4,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 12.666666666666666,
                "averageViewPercentage": 5.3
            },
            "2021-12": {
                "views": 3,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 3,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 14.333333333333334,
                "averageViewPercentage": 5.793333333333333
            },
            "2022-01": {
                "views": 0,
                "subscribers": -1,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2022-02": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2022-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2022-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2022-05": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2022-06": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2022-07": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2022-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2022-09": {
                "views": 0,
                "subscribers": -1,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2022-10": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2022-11": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2022-12": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023-01": {
                "views": 0,
                "subscribers": 1,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023-02": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023-05": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023-06": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023-07": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023-09": {
                "views": 1,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 1,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 1,
                "averageViewDuration": 74,
                "averageViewPercentage": 37.19
            },
            "2023-10": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023-11": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023-12": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2024-01": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2024-02": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2024-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2024-04": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2024-05": {
                "views": 1,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 1,
                "likes": -2,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 1,
                "averageViewDuration": 62,
                "averageViewPercentage": 28.970000000000002
            },
            "2024-06": {
                "views": 2,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 2,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 19,
                "averageViewPercentage": 11.05
            },
            "2024-07": {
                "views": 3,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 3,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 1,
                "averageViewDuration": 22,
                "averageViewPercentage": 12.93
            },
            "2024-08": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2024-09": {
                "views": 2,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 2,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 8,
                "averageViewPercentage": 4.485
            },
            "2024-10": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2024-11": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2024-12": {
                "views": 1,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 1,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 13,
                "averageViewPercentage": 4.98
            },
            "2025-01": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-02": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2025-03": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            }
        },
        "yearly": {
            "2014": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2015": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2016": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2017": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2018": {
                "views": 226,
                "subscribers": 20,
                "comments": 2,
                "subscribed": 89,
                "unsubscribed": 137,
                "likes": 50,
                "dislikes": 1,
                "shares": 7,
                "estimatedMinutesWatched": 176,
                "averageViewDuration": 63.31372549019608,
                "averageViewPercentage": 29.336153846153845
            },
            "2019": {
                "views": 161,
                "subscribers": 0,
                "comments": 1,
                "subscribed": 19,
                "unsubscribed": 142,
                "likes": 6,
                "dislikes": 1,
                "shares": 5,
                "estimatedMinutesWatched": 232,
                "averageViewDuration": 92.75268817204301,
                "averageViewPercentage": 39.72712765957448
            },
            "2020": {
                "views": 16,
                "subscribers": -2,
                "comments": 0,
                "subscribed": 4,
                "unsubscribed": 12,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 1,
                "averageViewDuration": 18.133333333333333,
                "averageViewPercentage": 10.680666666666665
            },
            "2021": {
                "views": 14,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 14,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 11,
                "averageViewDuration": 75.58333333333333,
                "averageViewPercentage": 28.39461538461539
            },
            "2022": {
                "views": 0,
                "subscribers": -2,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            },
            "2023": {
                "views": 1,
                "subscribers": 1,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 1,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 1,
                "averageViewDuration": 74,
                "averageViewPercentage": 37.19
            },
            "2024": {
                "views": 9,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 3,
                "unsubscribed": 6,
                "likes": -2,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 2,
                "averageViewDuration": 22,
                "averageViewPercentage": 11.15
            },
            "2025": {
                "views": 0,
                "subscribers": 0,
                "comments": 0,
                "subscribed": 0,
                "unsubscribed": 0,
                "likes": 0,
                "dislikes": 0,
                "shares": 0,
                "estimatedMinutesWatched": 0,
                "averageViewDuration": 0,
                "averageViewPercentage": 0
            }
        },
        "channel": {
            "kind": "youtube#channel",
            "etag": "YMdziUHpYdivaOy-SHnalgolsqA",
            "id": "UCR1waM0YoLc_XN6MIaUVzFg",
            "snippet": {
                "title": "Aditya Sharma",
                "description": "Subscribe my channel to get official lyrics of songs",
                "customUrl": "@adityasharma9884",
                "publishedAt": "2014-01-01T13:23:06Z",
                "thumbnails": {
                    "default": {
                        "url": "https://yt3.ggpht.com/ytc/AIdro_mHeseZ-r2FjLjKAq3DerQOzSTT6Zxh9OWyB9OP_F8iAohx=s88-c-k-c0x00ffffff-no-rj",
                        "width": 88,
                        "height": 88
                    },
                    "medium": {
                        "url": "https://yt3.ggpht.com/ytc/AIdro_mHeseZ-r2FjLjKAq3DerQOzSTT6Zxh9OWyB9OP_F8iAohx=s240-c-k-c0x00ffffff-no-rj",
                        "width": 240,
                        "height": 240
                    },
                    "high": {
                        "url": "https://yt3.ggpht.com/ytc/AIdro_mHeseZ-r2FjLjKAq3DerQOzSTT6Zxh9OWyB9OP_F8iAohx=s800-c-k-c0x00ffffff-no-rj",
                        "width": 800,
                        "height": 800
                    }
                },
                "localized": {
                    "title": "Aditya Sharma",
                    "description": "Subscribe my channel to get official lyrics of songs"
                },
                "country": "IN"
            },
            "contentDetails": {
                "relatedPlaylists": {
                    "likes": "LL",
                    "uploads": "UUR1waM0YoLc_XN6MIaUVzFg"
                }
            },
            "statistics": {
                "viewCount": "427",
                "subscriberCount": "17",
                "hiddenSubscriberCount": false,
                "videoCount": "15"
            },
            "brandingSettings": {
                "channel": {
                    "title": "Aditya Sharma",
                    "description": "Subscribe my channel to get official lyrics of songs",
                    "keywords": "songs lyrics",
                    "country": "IN"
                },
                "image": {
                    "bannerExternalUrl": "https://yt3.googleusercontent.com/RfLATp7NiC5u_J_02MwYCcTY8_tNj9QM521rroOigp1SnJyS7rtPo51yUnY34NsWf7zJiQ4G_Q"
                }
            }
        }
    },
    "youtubeCalculatedData": {
        "totalViewsThisWeek": 0,
        "percentageChangeViews": 0,
        "totalWatchTime": 0,
        "percentageChangeWatchTime": 0,
        "percentageChangeSubscribers": 0,
        "averageViewDuration": 0,
        "percentageChangeAverageViewDuration": 0
    },
    "eqs": {
        "eqsPercentage": 0,
        "eqsPercentageChange": 0
    }
}
```