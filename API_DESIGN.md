# API Documentation - Vehicle Management System

## Overview
REST API for managing vehicle information in a dealership or fleet management system.

## Base URL
```
http://localhost:3000
```

## Data Models

### Vehicle
| Field           | Type   | Description                    | Required |
|-----------------|--------|--------------------------------|----------|
| id             | string | Unique identifier              | Yes      |
| brand          | string | Vehicle manufacturer           | Yes      |
| model          | string | Vehicle model name             | Yes      |
| registrationNo | string | License plate number           | Yes      |
| year           | number | Manufacturing year             | Yes      |
| rentalPricePerDay          | number | Vehicle rental price in EUR           | Yes      |

## API Endpoints

### Vehicles

#### Create a Vehicle
```http
POST /vehicles
```
**Request Body:**
```json
{
  "brand": "string",
  "model": "string",
  "registrationNo": "string",
  "year": "number",
  "price": "number"
}
```
**Responses:**
- `201 Created`: Vehicle successfully created
- `400 Bad Request`: Invalid input
- `500 Internal Server Error`: Server error

#### Update a Vehicle
```http
PUT /vehicles/{id}
```
**Parameters:**
- `id` (path) - Vehicle ID

**Request Body:** Same as Create
**Responses:**
- `200 OK`: Vehicle updated
- `404 Not Found`: Vehicle not found
- `500 Internal Server Error`: Server error

#### Delete a Vehicle
```http
DELETE /vehicles/{id}
```
**Parameters:**
- `id` (path) - Vehicle ID

**Responses:**
- `200 OK`: Vehicle deleted
- `404 Not Found`: Vehicle not found
- `500 Internal Server Error`: Server error

#### Get Vehicle by ID
```http
GET /vehicles/{id}
```
**Parameters:**
- `id` (path) - Vehicle ID

**Responses:**
- `200 OK`: Success with vehicle data
- `404 Not Found`: Vehicle not found
- `500 Internal Server Error`: Server error

#### List All Vehicles
```http
GET /vehicles
```
**Responses:**
- `200 OK`: Success with array of vehicles
- `500 Internal Server Error`: Server error

#### Search Vehicle by Registration Number
```http
GET /vehicles/search/{registrationNo}
```
**Parameters:**
- `registrationNo` (path) - Vehicle registration number

**Responses:**
- `200 OK`: Success with vehicle data
- `404 Not Found`: Vehicle not found
- `500 Internal Server Error`: Server error

#### Get Vehicles by Price Range
```http
GET /vehicles/price
```
**Query Parameters:**
- `max` (number) - Maximum price

**Responses:**
- `200 OK`: Success with array of vehicles
- `400 Bad Request`: Invalid parameters
- `500 Internal Server Error`: Server error

## Error Responses
All error responses follow this format:
```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

<!-- ## Rate Limiting
- 1000 requests per hour per API key

## Authentication
Bearer token required in Authorization header
```http
Authorization: Bearer <your_token>
```
 --> 