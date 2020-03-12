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

## Login

* **URL**

```http
POST /login
```

* **Data Params**

```javascript
{
  "email": string,
  "password": string
}
```

* **Response**

```javascript
{
  "auth": boolean,
  "userId": number,
  "token": string
}
```

## Constructions

* **URL**

```http
GET /constructions
```

* **Response**

```javascript
[
  {
    "id": number,
    "title": string,
    "clientName": string,
    "created": Date,
    "updated": Date
  }
]
```

* **URL**

```http
GET /constructions/:id
```

* **Response**

```javascript
{
  "id": number,
  "title": string,
  "clientName": string,
  "created": Date,
  "updated": Date,
  "floors": [
      {
          "id": number,
          "title": string
      }
  ]
}
```

* **URL**

```http
DELETE /constructions/:id
```

* **Response**

```javascript
{
  "message": string
}
```

* **URL**

```http
PUT /constructions/:id
```

* **Data Params**

```javascript
{
  "title": string,
  "clientName": string
}
```

* **Response**

```javascript
{
  "message": string
}
```

* **URL**

```http
POST /constructions
```

* **Data Params**

```javascript
{
  "title": string,
  "clientName": string
}
```

* **Response**

```javascript
{
  "id": number
}
```

## Reports

* **URL**

```http
GET /constructions/:id/reports
```

* **Response**

```javascript
[
  {
    "id": number,
    "constructionId": number,
    "serviceNumber": number,
    "pdf": string,
    "word": string,
    "created": Date,
    "updated": Date
  }
]
```

* **URL**

```http
GET /constructions/:id/reports/:reportId
```

* **Response**

```javascript
{
  "id": number,
  "constructionId": number,
  "serviceNumber": number,
  "pdf": string,
  "word": string,
  "created": Date,
  "updated": Date,
}
```

* **URL**

```http
DELETE /constructions/:id/reports/:reportId
```

* **Response**

```javascript
{
  "message": string
}
```

* **URL**

```http
PUT /constructions/:id/reports/:reportId
```

* **Data Params**

```javascript
{
  "serviceNumber": number,
  "pdf": string,
  "word": string
}
```

* **Response**

```javascript
{
  "message": string
}
```

* **URL**

```http
POST /constructions/:id/reports
```

* **Data Params**

```javascript
{
  "serviceNumber": number,
  "pdf": string,
  "word": string
}
```

* **Response**

```javascript
{
  "id": number
}
```

## Floors

* **URL**

```http
GET /constructions/:id/floors
```

* **Response**

```javascript
[
  {
    "id": number,
    "constructionId": number,
    "title": string,
    "created": Date,
    "updated": Date
  }
]
```

* **URL**

```http
GET /constructions/:id/floors/:floorId
```

* **Response**

```javascript
{
  "id": number,
  "constructionId": number,
  "title": string,
  "created": Date,
  "updated": Date,
  "items": [
      {
          "id": number,
          "title": string,
          "observation": string,
          "rating": number,
          "image": string
      }
  ]
}
```

* **URL**

```http
DELETE /constructions/:id/floors/:floorId
```

* **Response**

```javascript
{
  "message": string
}
```

* **URL**

```http
PUT /constructions/:id/floors/:floorId
```

* **Data Params**

```javascript
{
  "title": string
}
```

* **Response**

```javascript
{
  "message": string
}
```

* **URL**

```http
POST /constructions/:id/floors
```

* **Data Params**

```javascript
{
  "title": string
}
```

* **Response**

```javascript
{
  "id": number
}
```

## Items

* **URL**

```http
GET /constructions/:id/floors/:floorId/items
```

* **Response**

```javascript
[
  {
    "id": number,
    "floorId": number,
    "title": string,
    "observation": string,
    "rating": number,
    "image": string
    "created": Date,
    "updated": Date
  }
]
```

* **URL**

```http
GET /constructions/:id/floors/:floorId/items/:itemId
```

* **Response**

```javascript
{
  "id": number,
  "floorId": number,
  "title": string,
  "observation": string,
  "rating": number,
  "image": string
  "created": Date,
  "updated": Date
}
```

* **URL**

```http
DELETE /constructions/:id/floors/:floorId/items/:itemId
```

* **Response**

```javascript
{
  "message": string
}
```

* **URL**

```http
PUT /constructions/:id/floors/:floorId/items/:itemId
```

* **Data Params**

```javascript
{
  "title": string,
  "observation": string,
  "rating": number,
  "image": string
}
```

* **Response**

```javascript
{
  "message": string
}
```

* **URL**

```http
POST /constructions/:id/floors/:floorId/items
```

* **Data Params**

```javascript
{
  "title": string,
  "observation": string,
  "rating": number,
  "image": string
}
```

* **Response**

```javascript
{
  "id": number
}
```