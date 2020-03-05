## Ease Engenharia

A React Native project for Ease Engenharia.

### `npm install`

Start by cloning the repo and installing all the required dependencies.

### `npx react-native run-ios`

Runs the app in iOS simulator.

### `npx react-native run-android`

Runs the app in Android simulator.

## Authorization

All API requests require the use of a generated JWT Token. You can find your JWT Token by authenticating the user.

To authenticate an API request, you should provide your JWT Token in the `Authorization` header.

```javascript
{
    "Authorizathion": "Bearer <jwt_token>"
}
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **Required**. |

## Responses

Many API endpoints return the JSON representation of the resources created or edited. However, if an invalid request is submitted, or some other error occurs, returns a JSON response in the following format:

```javascript
{
  "message" : string
}
```