# Nuxt 3 with Bootstrap 5

Project config

Create the application directory
```
application
  /layouts
  /pages
  /public
```

```js
// application/setup.js
module.exports = {
  axios: {
    baseURL: BASER_URL,
    timeout: TIMEOUT,
    headers: HEADERS
  }
};
```

# Nuxt

We recommend to look at the [documentation](https://v3.nuxtjs.org).

## Setup

Make sure to install the dependencies

```bash
npm install
```

## Development

Start the development server on http://localhost:3000

```bash
npm dev
```

## Production

Build the application for production:

```bash
npm build
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).