# API Routes

The following is a description of all of the routes that the API support, how to structure requests to them, and what they return.

# Summary

Summary

* Get a weather report: **GET** `/v1/weather?city=Vancouver`
* Create an account: **POST** `/v1/accounts` Body params (JSON): `name`, `password`
* Authenticate (trade a name and password for a token): **POST** `/v1/authenticate` Body params (JSON): `name`, `password`
* Get an account by its token: **GET** `/v1/accounts/:token`
* Add city to account: **POST** `/v1/accounts/:token/cities` Body params (JSON): `city`
* Remove city from account: **POST** `/v1/accounts/:token/cities/:cities/delete`

# Get a weather report

**GET** `/v1/weather`

**Query string parameters**

* `city`: The name of the city that you want the weather for. If not provided, assumes that you want the weather for Reykjavik.

**Response**

On success:

* `condition`: The general condition, matching a "Main" entry in [Open Weather Map Conditions](https://openweathermap.org/weather-conditions)
* `expect`: A more specific condition, matching a "Description" entry in [Open Weather Map Conditions](https://openweathermap.org/weather-conditions)
* `temperature`: One of: `super cold | very cold | cold | kind of cold | cool | kind of cool | warm | hot | very hot | super hot | scorching`;
* `windy`: One of: `not | a little | fairly | very | extremely | ridiculously | catastrophically | apocalyptically`;
* `cloudy`: One of: `not | barely | a little | noticeably | very | completely`
* `city`: The city that this report was generated for.

On failure:

* `error`: "Failed to create weather report"
* `city`: The city that the attempt was made for

**Example: Good request**

Request:

Request: **GET** `/v1/weather?city=Vancouver`

Response:

```
{
  "condition":"Clouds",
  "expect":"overcast clouds",
  "temperature":"cool",
  "windy":"fairly",
  "cloudy":"completely",
  "city":"Vancouver"
}
```

**Example: Bad Request**

Request: **GET** `/v1/weather?city=🦆`

Response:

```
{
  "error":"Failed to create weather report",
  "city":"🦆"
}
```

# Create an account

**POST** `/v1/accounts`

**Body parameters (JSON)**

* `name`: The desired account name
* `password`: The desired password

**Response**

On success:

* `name`: The name of the account that was just created
* `token`: A token that can be used to authenticate requests for that account

On failure:

* `error`: One of: `"Must provide name and password fields to create an account." | "Account was not created!"`

**Example: Good Request**

Request: **POST** `/v1/accounts` Body: `{ "name": "Foo", "password": "bar"}`

Response:

```
{
    "name": "Foo",
    "token": "e5efba61-4b31-4674-8b96-b53dfebdb986"
}
```

**Example: Bad Request (invalid params)**

Request: **POST** `/v1/accounts` Body: `{ "name": "Foo" }`

Response:

```
{
    "error": "Must provide name and password fields to create an account."
}
```

**Example: Bad Request (account exists, other)**

Request (when account already exists): **POST** `/v1/accounts` Body: `{ "name": "Foo", "password": "bar"}`

Response:

```
{
    "error": "Account was not created!"
}
```

# Authenticate

**POST** `/v1/authenticate`

**Body parameters (JSON)**

* `name`: The name of the account
* `password`: The password that you believe belongs to that account

**Response**

On success:

* `name`: The name of the account that was just authenticated
* `tokens`: An array of tokens that can be used to authenticate requests for that account
* `cities`: An array containing the names of any cities saved to that account

On failure:

* `error`: One of: `"No account matches that name and password" | "Must provide name and password fields to authenticate."`

**Example: Good Request**

Request: **POST** `/v1/authenticate` Body: `{ "name": "Foo", "password": "bar"}`

Response:

```
{
    "name": "Foo",
    "tokens": ["e5efba61-4b31-4674-8b96-b53dfebdb986"],
    "cities": ["Manila", "Berlin"]
}
```

**Example: Bad Request (invalid params)**

Request: **POST** `/v1/authenticate` Body: `{ "name": "Foo" }`

Response:

```
{
    "error": "Must provide name and password fields to authenticate."
}
```

**Example: Bad Request (incorrect credentials)**

Request: **POST** `/v1/accounts` Body: `{ "name": "Foo", "password": "not bar"}`

Response:

```
{
    "error": "No account matches that name and password"
}
```

# Add City

**POST** `/v1/accounts/:token/cities`

**Body parameters (JSON)**

* `city`: The name of the desired city

**Response**

On success (first time):

* `city`: The name of the city that was just added
* `message`: `"City added successfully"`

On success (subsequent times):

* `message`: `"City not added. Does it already exist on this account?"`

On failure:

* `error`: `"Must provide city name in request body"`

**Example: Good Request**

Request: **POST** `/v1/accounts/e5efba61-4b31-4674-8b96-b53dfebdb986/cities` Body: `{ "city": "Caracas" }`

Response (first time):

```
{
  "city": "Caracas",
  "message": "City added successfully"
}
```

**Example: Bad Request (no city provided)**

Request: **POST** `/v1/accounts/e5efba61-4b31-4674-8b96-b53dfebdb986/cities` Body: _(Oops, you forgot)_

Response:

```
{
    "error": "Must provide name and password fields to authenticate."
}
```

# Remove City

**POST** `/v1/accounts/:token/cities/:city/delete`

**Response**

* `message`: `"City deleted successfully"`

_Note: It responds with this success message even if that city didn't exist in the first place, and even if the token is invalid._

**Example**

Request: **POST** `/v1/accounts/e5efba61-4b31-4674-8b96-b53dfebdb986/cities/Almaty/delete`

Response:

```
{
  "message": "City deleted successfully"
}
```
