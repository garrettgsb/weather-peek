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

I will assume that users just care about categorical descriptions of:
  * How warm it is (in Celsius, not in Kelvin, lol)
  * How windy it is
  * How cloudy it is
  * The descriptive information expressed by [the conditions defined here](https://openweathermap.org/weather-conditions).

 ### Shortcuts/Compromises made
If applicable. Did you do something that you feel could have been done better in a real-world application? Please let us know.

* I didn't use PRs or feature branches; On a larger project, I would... Especially if I were working with others
* I just used the node built-in `assert` for tests. Normally I would use something more verbose and versatile, like Chai.
* If I expected this application to grow, there are opportunities to establish patterns that a future developer (who might be me) could extend:
  - A `utils` directory containing reasonable groupings of utilities (e.g. "open weather map utils," "categorization utils," etc.)
  - Routes divided into Express routers, and a relatively sparse `server.js`
* Error handling is rudimentary. It does two important things: Stops the app from exploding, and informs the developer what is wrong. There are two things that come to mind that a more robust app would have:
  - Handling different failure modes of the API: We just go "uh, something broke," but we could (possibly) handle errors differently based on what they are.
  - Notifications/logging: If my API key is bad, I should probably receive an alert of some sort about that. If people keep getting "city not found" errors, it would be nice if I could discover post-hoc that it's because people keep inputting "北京," and the API doesn't know what that is-- You have to provide "Beijing." (That example is true by the way)
* Using MD5 to hash passwords. Not good enough for real life, but it's built into Postgres and requires zero config, so it's a good fit for a quick iteration.
* Accounts don't have to validate an email address or anything.

### Stretch goals attempted
If applicable, use this area to tell us what stretch goals you attempted. What went well? What do you wish you could have done better? If you didn't attempt any of the stretch goals, feel free to let us know why.
### Instructions to run assignment locally
If applicable, please provide us with the necessary instructions to run your solution.
### What did you not include in your solution that you want us to know about?
Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.
### Other information about your submission that you feel it's important that we know if applicable.
### Your feedback on this technical challenge
Have feedback for how we could make this assignment better? Please let us know.
