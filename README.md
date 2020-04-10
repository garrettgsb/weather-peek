# Weather Peek

## Usage

### Setup

### Try it out

## Notes

### Tech Stack - Why Express, Postgres, and React?

I wanted to strike a balance between using tools that are professional, and tools that are the right size for the job. Also, I have a simple React-Express boilerplate that I made for Lighthouse students that I thought could save me some time :) Here's why I think each piece is a good fit:

#### Express

This API is really simple: It's just one endpoint, plus some auth routes. Express is very light on the boilerplate and has minimal indirection built in, and I thought that would make it easier to pick out what's important and interesting about the code.

#### React

If anything in this project is overkill, it's React.

#### Postgres

Postgres is just a no-brainer for me. It's the DBMS that I've worked with the most, and it's supported by default by Heroku.

### Date
The date you're submitting this.
### Location of deployed application
If applicable, please provide the url where we can find and interact with your running application.
### Time spent
How much time did you spend on the assignment? Normally, this is expressed in hours.
### Assumptions made

**1. The example URL indicates the desired pattern**

• `https://myapi.com/v1/weather` is the resource
• `city` is a query string parameter

**2. There are no other endpoints except for auth**

**3. Users want simplified data**

There is no reason to have this as an assumption other than it seems like cheating to just pass Open Weather Map's API data along without interacting with it in any way, so I decided that it would be fun to take the assumption that the users of Weather Peek want weather data in a simplified, conversationally-toned, conclusion-oriented format. It's kind of a goofy assumption, but I thought it would make the code more interesting.

I will assume that this API is for users who are in too much of a hurry for numbers, and just care about categorical descriptions of:
  * How warm it is (in Celsius, not in Kelvin, lol)
  * How windy it is
  * How cloudy it is
  * The descriptive information expressed by [the conditions defined here](https://openweathermap.org/weather-conditions).

 ### Shortcuts/Compromises made
If applicable. Did you do something that you feel could have been done better in a real-world application? Please let us know.

* I didn't use PRs or feature branches. Eventually, it occurred to me that it would be pretty slick if I did a PR for each stretch feature (that would make it easy to look at each feature in isolation), but I thought of that too late.
* I just used the Node built-in `assert` for tests. Normally I would use something more verbose and versatile, like Chai.
* Error handling is rudimentary and ad hoc. It does two important things: Stops the app from exploding, and informs the developer what is wrong. However, a more robust app might do things like:
  - Notifications/logging: If Open Weather Map decides that the API key is bad, I should probably be automatically yelled at about it. If people keep getting "city not found" errors, it would be nice if I could discover post-hoc that it's because people keep submitting "北京" instead of "Beijing." (That example is true by the way)
  - Handling different failure modes: We mostly just let errors fly to the top and then go "uh, looks like something broke."
  - Relatedly: More descriptive error messages, for the developer and the client.
* Using MD5 to hash passwords. Not good enough for real life, but it's built into Postgres and requires zero config, so it's a good fit for quick iteration.
* Accounts don't have to validate an email address or anything. You just post a name and password, and boom.
* As is, there is no real benefit to having tokens in their own table. I was imagining this whole workflow for creating and revoking tokens for an account, but I decided it would be too much of a time sink to build.
* Tests actually run against the "prod" database (or... whichever database Express connects to), which is pretty scary. Sorry to any real-world users called "foo"!

### Stretch goals attempted
If applicable, use this area to tell us what stretch goals you attempted. What went well? What do you wish you could have done better? If you didn't attempt any of the stretch goals, feel free to let us know why.
### Instructions to run assignment locally
If applicable, please provide us with the necessary instructions to run your solution.
### What did you not include in your solution that you want us to know about?
Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.
### Other information about your submission that you feel it's important that we know if applicable.
### Your feedback on this technical challenge
Have feedback for how we could make this assignment better? Please let us know.
