# Weather App backend Server

This project provides a backend server for a weather dashboard application. It includes user authentication, weather data integration, favorite cities functionality, and API endpoints for interacting with the frontend. The backend is built with Node.js, Express.js, and PostgreSQL, using Prisma for ORM.

## Setup

### Prerequisites

- Node.js and npm installed
- Postgres installed and running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anilkokkul/weather-app-BE.git
   cd weather-app-BE
    ```
2.Install Dependancies:


```bash
  npm install
```
3.Set environment variables:

Create a .env file at the root of the project and add the following:
```bash
  PORT=5000
  DATABASE_URL=postgresql://username:password@localhost:5432/database_name
  SECRET_KEY=YOUR_SECRET_KEY
  WEATHER_API_KEY=YOUR_WEATHER_API_KEY
  ```
4.Database Setup

``` 
  npx prisma migrate dev
  npx prisma generate
```

5.Run server
```bash
npm run dev
```

## API Documentation

 - [Weather API Dashboard APIs with example](https://documenter.getpostman.com/view/28958585/2sA3kSoP7W)


