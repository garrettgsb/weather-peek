# Weather Peek

A simple, conversationally-toned, conclusion-oriented weather API.

Try it live at [https://weather-peek-gsb.herokuapp.com](https://weather-peek-gsb.herokuapp.com)

If you are not viewing this README on GitHub, you might find it easier to [head over there to view it](https://github.com/garrettgsb/weather-peek)

# Table of Contents

* [Usage](#usage)
  - [Setup (run locally)](#setup-run-locally)
  - [Try it out: API](#try-it-out-api)
    * [Routes: Summary](#routes-summary)
    * [Routes: Details](#routes-details)
  - [Try it out: UI](#try-it-out-ui)
* [Notes](#notes)
  - [Tech Stack](#tech-stack---why-express-postgres-and-react)
  - [Date](#date)
  - [Location of Deployed Application](#location-of-deployed-application)
  - [Time Spent](#time-spent)
  - [Assumptions Made](#assumptions-made)
  - [Shortcuts/Compromises Made](#shortcutscompromises-made)
  - [Stretch Goals Attempted](#stretch-goals-attempted)
  - [Instructions to Run Assignment Locally](#instructions-to-run-assignment-locally)
  - [What Did You Not Include?](#what-did-you-not-include-in-your-solution-that-you-want-us-to-know-about)
  - [Other Information](#what-did-you-not-include-in-your-solution-that-you-want-us-to-know-about)
  - [Feedback](#your-feedback-on-this-technical-challenge)


# Usage

## Setup (run locally)

**Prerequisites:**

* Node v13.12.0 - Known to work on this version, and known to fail on v8.10.0.
* Yarn package manager - Try npm at your own risk :)
* A running Postgres server with a user and database called `postgres` (should exist by default)

Clone the repo:

```
git clone https://github.com/garrettgsb/weather-peek.git
cd weather-peek
```

Consider your environment variables for  `db` and `api`. For local development, copying `.env.example` to `.env` should do the trick:

```
cp db/.env.example db/.env
cp api/.env.example api/.env
```

Now, run `install-local` to install all dependencies (project, api, and ui, respectively) and set up the database:

```
yarn install-local
```

You should have everything set up to start the app now, but you may want to check to see that you have a Postgres database called `weather_peek`:

```
psql weather_peek
\dt
```

Should see three tables: `accounts`, `city_favorites` and `tokens`.

Now, you're ready to launch the app! The API server will serve the built version of the UI app from the home route, so that is the quickest way to see it in action:

```
cd api
yarn start
```

When the server indicates that it's listening, you're ready to navigate to `localhost:8080` in your browser, and you should see the loaded React app. You can also try the weather endpoint to see the neat JSON it returns: `localhost:8080/v1/weather?city=Ankara`

### For local front-end development

The `ui` directory contains the source for the React app. If you are doing any code modifications in that app, you will probably find it more convenient to start Webpack Devserver in another terminal tab (or however you prefer to run multiple processes) and use `localhost:3000`. Webpack Devserver will proxy requests to `localhost:8080`, so API requests will behave the same as in the built version.

From the `weather-peek` directory:

```
cd ui
yarn start
```

Then, navigate to `localhost:3000` and you're on your bike. 🚴‍♀️

### Building

If you have made code changes to the `ui` app that you would like reflected in the built version served by `api`, you will need to rebuild the app. There's a React script for that, and the build directory will be moved to the right place automatically:

From the `weather-peek` directory:

```
cd ui
yarn build
```

----------------

## Try it out: API

**JSON API endpoints.** This API reads and returns JSON, and can be used with cURL, Postman, Insomnia, or any application that knows how to make an HTTP request. To get started, you can try pointing your browser to [https://weather-peek-gsb.herokuapp.com/v1/weather?city=Vancouver](https://weather-peek-gsb.herokuapp.com/v1/weather?city=Vancouver) (or loalhost:8080 if running locally)

**Persistent accounts.** Using the account routes, you can create an account and authenticate with it to receive a **token**. Your **token** can be used to **save cities** that you're interested in, and get **reports** for all of them at once. Applications can treat **tokens** like API keys.

**Categorical data.** This API doesn't return numbers-- Open Weather Map already does a great job of that. Instead, we give you a plain English subjective description of the conditions. (Is this a good idea? Probably not, but it's just for fun)

### Routes: Summary

* Get a weather report: **GET** `/v1/weather?city=Vancouver`
* Create an account: **POST** `/v1/accounts` Body params (JSON): `name`, `password`
* Authenticate (trade a name and password for a token): **POST** `/v1/authenticate` Body params (JSON): `name`, `password`
* Get an account by its token: **GET** `/v1/accounts/:token`
* Add city to account: **POST** `/v1/accounts/:token/cities` Body params (JSON): `city`
* Remove city from account: **POST** `/v1/accounts/:token/cities/:cities/delete`

### Routes: Details

API behavior is described in detail in [API_ROUTES.md](API_ROUTES.md)

## Try it out: UI

Navigate to [https://weather-peek-gsb.herokuapp.com](https://weather-peek-gsb.herokuapp.com) (or localhost:3000 if running locally) and play around with:

* Creating a new account
* Adding and removing cities
* Logging into your account from another browser
* Listening to the "Audio" for one city, or every city
* Close that tab, restart your computer, go for a jog, open it back up-- Hey, you're still logged in!
* Log out and repeat the steps above-- It's like you were never there

# Notes

### Tech Stack - Why Express, Postgres, and React?

I wanted to strike a balance between using tools that are professional, and tools that are the right size for the job. Also, I have a simple React-Express boilerplate that I made for Lighthouse students that I thought could save me some time :) Here's why I think each piece is a good fit:

#### Express

This API is really simple: It's just one endpoint, plus some auth routes. Express is very light on the boilerplate and has minimal indirection built in, and I thought that would make my design decisions more conspicuous.

**Strengths:** Lightweight, easy to set up, easy to refactor and recompose.

**Weaknesses:** Very little convention (requires more, sometimes non-obvious configuration), lots to DIY (and therefore maybe get wrong), built-in error handling especially lacking.

#### React

React is a lucrative choice for rapidly prototyping a state-driven UI, and allowed me to move faster and stay relatively organized. It's also the front end framework that I'm most comfortable with, and is fairly relevant.

**Strengths:** State-driven component lifecycle shields the developer from fiddly re-render logic, convenient to refactor and compose components, very well supported.

**Weaknesses:** React, Webpack Devserver, and CRA introduce extra complexity that can sometimes bog you down.

#### Postgres

Postgres is a no-brainer for me. It's the DBMS that I've worked with the most, and it's supported by default by Heroku.

**Strengths:** Heaps of features built in, widespread platform support.

**Weaknesses:** Well, it's a SQL RDBMS, so it isn't very forgiving in occasionally obtuse ways. As a result, development time slows down while you tinker to get things just so (but when you do, the solution tends to be pretty solid).

### Date
> The date you're submitting this.

April 10th, 2020

### Location of deployed application
> If applicable, please provide the url where we can find and interact with your running application.

### Time spent
> How much time did you spend on the assignment? Normally, this is expressed in hours.

* Initial `/weather` endpoint + Open Weather Map integration: About an hour
* Set up database and API interactions for auth: 5 hours
* Build React UI: 4 hours
* Deploy to Heroku: 2 hours
* Documentation: Sprinkled in while coding, and then about 2 hours at the end

### Assumptions made

**1. The example URL indicates the desired pattern**

* All API routes should be namespaced under `/v1`
* `https://myapi.com/v1/weather` is the resource
* `city` is a query string parameter

**2. No other endpoints are required, except for maybe auth**

**3. Users want simplified data**

There is no reason to have this as an assumption other than it seems like cheating to just pass Open Weather Map's API data along without interacting with it in any way. I decided that it would be fun to take the assumption that instead of wanting to know things like the temperature in degrees or the cloud coverage as a percentage, the users of Weather Peek want weather data categorized in a simplified, conversationally-toned, conclusion-oriented format. For example, they don't want to know "it's 10ºC outside," they want to know "it's kind of cool outside."

It's a goofy assumption, but I thought it would make the code more interesting (In retrospect: The code did not need to be contrived to be more interesting-- It was already _plenty_ of work).

I will assume that this API is for users who are in too much of a hurry for numbers, and just care about categorical descriptions of:
  * How warm it is
  * How windy it is
  * How cloudy it is
  * The descriptive information expressed by [the conditions defined here](https://openweathermap.org/weather-conditions).

 ### Shortcuts/Compromises made
> If applicable. Did you do something that you feel could have been done better in a real-world application? Please let us know.

* I didn't use PRs or feature branches. Eventually, it occurred to me that it would be pretty slick if I had done a PR for each stretch feature (that would make it easy to look at each feature in isolation), but I thought of that too late.
* I just used the Node built-in `assert` for tests. Normally I would use something more verbose and versatile, like Chai.
* Error handling is rudimentary and ad hoc. It does two important things: Stops the app from exploding, and informs the developer what is wrong. However, a more robust app might do things like:
  - Notifications/logging: If Open Weather Map decides that the API key is bad, I should probably be automatically yelled at about it. If people keep getting "city not found" errors, it would be nice if I could discover post-hoc that it's because they are submitting things like "北京" instead of "Beijing." (That example is true, by the way)
  - Handling different failure modes: We mostly just let errors fly to the top and then go "uh, looks like something broke."
  - Relatedly: More descriptive error messages, for the developer and the client.
* Using MD5 to hash passwords. Not good enough for real life, but it's built into Postgres and requires zero config, so it's a good fit for quick iteration.
* Accounts don't have to validate an email address or anything. You just post a name and password, and boom.
* As is, there is no real benefit to having tokens in their own table. I was imagining this whole workflow for creating and revoking tokens for an account, but I decided it would be too much of a time sink to build.
* I don't really know if UUIDs are considered secure enough for this type of token... I did zero due diligence to evaluate the security of this project.
* Tests actually run against the same database that Express connects to, which is pretty scary.
* Domain knowledge: Normally I would want to ramp up on meteorology or something to work on a project like this, but I didn't. Is 25 m/s a stiff breeze? A tornado? I don't really know.
* CSS is all in one big file, and I'm not using any sort of naming convention like BEM. This is manageable for now, but this app would grow out of that (lack of) approach before long.
* Front end layout is not very thoughtful. It's just flexboxes lining things up in a semi-reasonable way. It looks okay on mobile, but I didn't really put very much effort into achieving that.
* The front end app isn't factored particularly well. I feel like the lifecycle of an account/token is kind of sprinkled all over the place and is hard to reason about.
* Deploy instructions: There aren't any. I don't think I'm good enough at deploying this app yet to tell others how to do so, but it would be next on my list, even if only for my own reference.
* QA: I wasn't able to do as much as bullet-proofing as I wanted (and I wasn't supposed to enlist help, so I couldn't trick a friend into doing it), so I'm still not sure where all the potholes are.
* Mixed metaphors: Is bullet-proofing how you deal with potholes? I don't think so, but I didn't have time to workshop something better.

### Stretch goals attempted
> If applicable, use this area to tell us what stretch goals you attempted. What went well? What do you wish you could have done better? If you didn't attempt any of the stretch goals, feel free to let us know why.

#### ✓ Build a simple UI for the service

I thought it would be fun to build a "dashboard view" that lists the weather for some number of cities. You could use the API to get the weather reports, and to persist your list. But the fun isn't over: You can also use the browser's built-in speech synthesis engine to read a report (or all of the reports, in order) out loud to you, maybe while you're brushing your teeth or something.

I built it in React, so I was able to move pretty quickly, but I think I under-designed a little bit and I'm not totally happy with my encapsulation boundaries. If I were to put a few more hours into it, I would probably centralize the account/token management into a custom hook and export actions for the app to manipulate it.

#### ✓ Add authentication to the service

I created a basic account system that uses tokens for authentication. The tokens are just UUIDs, and they are associated with accounts but are not attributes of accounts. The idea was that one account could create multiple tokens to use in different apps, and revoke them as needed. I didn't build that part, but the system extends straightforwardly to support that.

While I was designing, I thought "well, authenticating needs to actually _do_ something." I suppose the obvious thing would have been to just prevent the weather endpoint from being used by an unauthenticated user, but that seems kind of draconian to the hypothetical people who might use this one day. Instead, I thought that an unauthenticated user should still be able to use the API, but if you authenticate, you'll be able to persist a list of cities to bring up later.

This part was more of a time sink than I expected, especially getting the database set up, but I think it went fairly smoothly. Writing unit tests as I was building saved me lots of time and bugs, and so I'm glad I took the time to do that, even though it slowed my roll.

#### ✓ Deploy your API and include the link in your README(...)

Deploying to Heroku was fiddly and I had to re-learn a bunch of stuff, but it wasn't too hard to get going. I didn't document the deploy process because I don't think I really have one yet, but that would be very high on my list of things to do next.

#### ✓ Proxy a real weather API via your service to fetch the actual weather

Definitely the easiest part-- This took barely any time at all. Open Weather Map is very straightforward to use, and this part came together very quickly. Their data comes back in a format that doesn't totally make sense to me, but it isn't hard to cope with.

### Instructions to run assignment locally
> If applicable, please provide us with the necessary instructions to run your solution.

See: Usage > Setup in this document, but you should also be able to just [view the deployed version](https://weather-peek-gsb.herokuapp.com)

### What did you not include in your solution that you want us to know about?
> Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.

There's a mountain of stuff that could be improved, which I've already written many words about, but I crossed every finish line that I set out to cross. I made sure to put in enough extra hours that I'm pretty happy with what I'm submitting.

### Other information about your submission that you feel it's important that we know if applicable.

I didn't actually think I'd sink _this_ much time into this assignment, but I had a pretty slow week, so it was easy to just put in an hour here, a few hours there... I probably wouldn't have been able to complete every stretch goal if I were busier (or I would have done less ambitious versions of them).

I think my first iteration was so quick that I tricked myself into underestimating how much work I was signing up for on subsequent iterations.

### Your feedback on this technical challenge
> Have feedback for how we could make this assignment better? Please let us know.

I like this challenge for how open-ended it is, and for the variety of stretch goals that suit different skill sets. It's also very time-flexible: How you implement each goal can scale up or down depending on your schedule. My first iteration took under an hour, so even if I were swamped with other work, I still would have managed to submit something. On the other end of the spectrum, hi, it's me again: There's plenty to do if you can afford to sink a ton of time into it. That probably makes it hard to compare candidates, but it's very convenient for us.

I think if it gets the results that you want, then great! It's a great assignment.

If it _doesn't_ get the results you want though, my advice would be to consider providing more guidelines about what results you _do_ want. I think the goals are fairly well articulated, but by virtue of being so open-ended, a candidate could potentially wander down the wrong path when they would have just as happily taken a better one. However, if that hasn't been your experience, then I don't think the challenge needs to change at all.
