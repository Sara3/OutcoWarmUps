

    System Design
    Introduction
    System Design Process
    System Design Systematic Approach
    System Design Topics
    System Design Interview Tips
    Object Oriented Design
    System Design Problems
        Designing an API Rate Limiter
        Design News Feed
        Design Recommendation System
        Design Photo Sharing App
        Design Location Based App
        Design Messenger App
        Design Twitter
        Design Uber Lyft
        Design Surge Pricing
    Architect's Toolbox
        Cache Design
        Database and Cache
        Pull vs Poll
        Geo Location
        Storage Estimation
        ID Generator
        Latency Numbers
        Encoding Decoding Encryption Decryption
    Systems Design Glossary
        Consistent Hashing
        Sharding or Partitioning
        Database Indexes
        Proxies
        Caching
        Queues
        SQL vs. NoSQL
        CAP Theorem
        Distributed Messaging System
        Long-Polling vs WebSockets vs Server-Sent Events
        Producer and Consumer
        Latency, Bandwidth and Throughput
        Microservices Architecture
        RESTful API
        Concurrent Programming
    Distributed System Resources
        Distributed System Notes
    Reference
    Published with GitBook

Design Twitter
Designing Twitter

Social network service
Scenario
User stories, requirements of the system

    Post tweets
    Follow other people
    Favorite tweets
    Timeline consisting of top tweets from people the user follows
    Tweets can contain photos and videos.

Extended Requirements

    Searching for tweets.
    Replying to a tweet.
    Trending topics – current hot topics/searches.
    Tagging other users.
    Tweet Notification.
    Who to follow? Suggestions?
    Moments.

Capacity Estimation

Estimate: 200 Million DAU

Tweets View (Read): 200M users * 100 tweets ~ 20B per day

Storage (Write):

    New Tweets (Text): 100M tweets * (280 + 30 ) bytes per tweets ~ 30GB per day
    Multi-media (Photos, Videos): (100M / 5 photos * 200KB) + (100M/10 videos * 2MB) ~= 24TB per day

Service
System APIs

tweet(api_dev_key, tweet_data, tweet_location, user_location, media_ids)

    Parameters:

    api_dev_key (string): The API developer key of a registered account. This will be used to, among other things, throttle users based on their allocated quota.

    tweet_data (string): The text of the tweet, typically up to 140 characters.

    tweet_location (string): Optional location (longitude, latitude) this Tweet refers to. user_location (string): Optional location (longitude, latitude) of the user adding the tweet.

    media_ids (number[]): Optional list of media_ids to be associated with the Tweet. (All the media photo, video, etc. need to be uploaded separately).

    Returns: (string)

    A successful post will return the URL to access that tweet. Otherwise, an appropriate HTTP error is returned.

High Level System Component

Write: 100M / 86400s = 1150 tweets per second

Read: 20B / 86400s = 230K tweets per second

Read-heavy system.

This traffic will be distributed unevenly throughout the day, though, at peak time we should expect at least a few thousand write requests and around 1M read
Storage
Database Schema

Tweet
---
PK - TweetID: int
    UserID: int
    Content: varchar(140)
    TweetLatitude: int
    TweetLongitude: int
    CreationDate: datetime
    NumFavorites: int

-

User
---
PK - UserID: int
    UserName: varchar(32)
    Email: varchar(32)
    Name: varchar(30)
    DataOfBirth: date
    CreationDate: datetime
    LastLogin: datetime

-

UserFollow
---
PK UserID1: int UserID2: int

-

Favorite
---
PK TweetID: int UserID: int
    CreationDate: datetime

Data Sharding
Sharding based on UserID:

We can try storing all the data of a user on one server. While storing, we can pass the UserID to our hash function that will map the user to a database server where we will store all of the user’s tweets, favorites, follows, etc.

Issues with this approach:

    Hot user problem - lot of queries on the server holding hot user, high load will affect performance of the service
    Non-uniform distribution of storage - some user can end up storing a lot more tweets or having a lot more followers
    What if one user's data can't fit in one shard? - What if we cannot store all tweets of a user on one shard?
    Unavailability of all of the user's data on the shard - if that shard is down or higher latency if it's serving high load for specific user

--

To recover from these situation: repartition/redistribute our data or use consistent hashing
Sharding based on TweetID

Our hash function will map each TweetID to a random server where we will store that Tweet.

Pros:

    Solve the problem of hot users

Cons:

    In contrast to sharding by UserID, we have to query all database partitions to find tweets of a user, which can result in higher latencies

Store hot tweets in cache in front of database servers








