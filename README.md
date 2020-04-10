# Weather Peek

A simple, conversationally-toned, conclusion-oriented weather API.

Try it live at [https://weather-peek-gsb.herokuapp.com](https://weather-peek-gsb.herokuapp.com)

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

**Categorical data.** This API doesn't return numbers-- Open Weather Map already does a great job of that. Instead, we give you a plain English subjective description of the conditions. (Is this a good idea? Probably not, but it's fun)

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

This API is really simple: It's just one endpoint, plus some auth routes. Express is very light on the boilerplate and has minimal indirection built in, and I thought that would make it easier to pick out what's important and interesting about the code.

#### React

If anything in this project is overkill, it's React. React is a lucrative choice for rapidly prototyping a state-driven UI though, and allowed me to move faster and stay relatively organized.

#### Postgres

Postgres is a no-brainer for me. It's the DBMS that I've worked with the most, and it's supported by default by Heroku.

### Date
The date you're submitting this.
### Location of deployed application
If applicable, please provide the url where we can find and interact with your running application.
### Time spent
How much time did you spend on the assignment? Normally, this is expressed in hours.

* Initial `/weather` endpoint + Open Weather Map integration: About an hour
* Set up database and API interactions for auth: 5 hours
* Build React UI: 4 hours
* Deploy to Heroku: 2 hours

### Assumptions made

**1. The example URL indicates the desired pattern**

* All API routes should be namespaced under `/v1`
* `https://myapi.com/v1/weather` is the resource
* `city` is a query string parameter

**2. No other endpoints are required, except for maybe auth**

**3. Users want simplified data**

There is no reason to have this as an assumption other than it seems like cheating to just pass Open Weather Map's API data along without interacting with it in any way, so I decided that it would be fun to take the assumption that instead of wanting to know things like the temperature in degrees or the cloud coverage as a percentage, the users of Weather Peek want weather data categorized in a simplified, conversationally-toned, conclusion-oriented format. It's kind of a goofy assumption, but I thought it would make the code more interesting (in retrospect: the code did not need to be contrived to be more interesting).

I will assume that this API is for users who are in too much of a hurry for numbers, and just care about categorical descriptions of:
  * How warm it is (in Celsius, not in Kelvin, lol)
  * How windy it is
  * How cloudy it is
  * The descriptive information expressed by [the conditions defined here](https://openweathermap.org/weather-conditions).

 ### Shortcuts/Compromises made
If applicable. Did you do something that you feel could have been done better in a real-world application? Please let us know.

* I didn't use PRs or feature branches. Eventually, it occurred to me that it would be pretty slick if I had done a PR for each stretch feature (that would make it easy to look at each feature in isolation), but I thought of that too late.
* I just used the Node built-in `assert` for tests. Normally I would use something more verbose and versatile, like Chai.
* Error handling is rudimentary and ad hoc. It does two important things: Stops the app from exploding, and informs the developer what is wrong. However, a more robust app might do things like:
  - Notifications/logging: If Open Weather Map decides that the API key is bad, I should probably be automatically yelled at about it. If people keep getting "city not found" errors, it would be nice if I could discover post-hoc that it's because people keep submitting "北京" instead of "Beijing." (That example is true, by the way)
  - Handling different failure modes: We mostly just let errors fly to the top and then go "uh, looks like something broke."
  - Relatedly: More descriptive error messages, for the developer and the client.
* Using MD5 to hash passwords. Not good enough for real life, but it's built into Postgres and requires zero config, so it's a good fit for quick iteration.
* Accounts don't have to validate an email address or anything. You just post a name and password, and boom.
* As is, there is no real benefit to having tokens in their own table. I was imagining this whole workflow for creating and revoking tokens for an account, but I decided it would be too much of a time sink to build.
* Tests actually run against the "prod" database (or... whichever database Express connects to), which is pretty scary. Sorry to any real-world users called "foo"!
* CSS is all in one big file, and I'm not using any sort of naming convention like BEM. This is manageable for now, but this app would grow out of that (lack of) approach very soon.
* The front end app isn't factored particularly well. I feel like the lifecycle of an account/token is kind of sprinkled all over the place and is hard to reason about.

### Stretch goals attempted
If applicable, use this area to tell us what stretch goals you attempted. What went well? What do you wish you could have done better? If you didn't attempt any of the stretch goals, feel free to let us know why.

#### ✓ Build a simple UI for the service

I thought it would be fun to build a "dashboard view" of all of the cities that you're interested in the weather for. You could use the API to get the weather reports, and to persist your list. But the fun isn't over: You can also use the browser's built-in speech synthesis engine to read a report (or all of the reports, in order) out loud to you, while you're scrambling some eggs or something.

I built it in React, so I was able to move pretty quickly, but I think I under-designed a little bit and I'm not totally happy with my encapsulation boundaries. If I were to put a few more hours into it, I would probably centralize the account/token management into a custom hook and export actions for the app to manipulate it.

#### ✓ Add authentication to the service

I created a basic account system that uses tokens for authentication. The tokens are just UUIDs, and they are associated with accounts but are not attributes of accounts. The idea was that one account could create multiple tokens to use in different apps, and revoke them as needed. I didn't build that part, but the system extends straightforwardly to support that.

While I was designing, I thought "well, authenticating needs to actually _do_ something." I suppose the obvious thing would have been to just prevent the weather endpoint from being used by an unauthenticated user, but that seems kind of draconian to the hypothetical people who might use this one day. Instead, I thought that an unauthenticated user should still be able to use the API, but if you authenticate, you'll be able to persist a list of cities to bring up later.

This part was more of a time sink than I expected, especially getting the database set up, but I think it went fairly smoothly. Writing unit tests as I was building saved me lots of time and bugs, and so I'm glad I took the time to do that, even though it slowed my roll.

#### ✓ Deploy your API and include the link in your README(...)

Man, deploying to Heroku was fiddly.

#### ✓ Proxy a real weather API via your service to fetch the actual weather

Definitely the easiest part-- This took barely any time at all. Open Weather Map is very straightforward to use, and this part came together very quickly. Their data comes back in a format that doesn't totally make sense to me, but it isn't hard to cope with.

### Instructions to run assignment locally
If applicable, please provide us with the necessary instructions to run your solution.

See: Usage > Setup in this document, but you should also be able to just [view the deployed version](https://weather-peek-gsb.herokuapp.com)

### What did you not include in your solution that you want us to know about?
Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.
### Other information about your submission that you feel it's important that we know if applicable.
### Your feedback on this technical challenge
Have feedback for how we could make this assignment better? Please let us know.
