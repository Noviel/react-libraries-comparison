# Fullstack scalable project example

## Technical desicions

- TypeScript as a main language
- React as an UI layer
- Monorepo via Yarn workspaces
- Server side rendering with Next.js and Firebase functions
- Statis site vi Gatsby
- Client-side heavy blocking calculations are moved to Web Workers
- Universal interface for interaction with any domain "host"


## Run

Next.js application:

```sh
$ yarn dev -t next -c local
```

Gatsby application:

```sh
$ yarn dev -t static-site -c local
```

API Server:

```sh
$ yarn dev:server
```

## DevOps-ish

### Contours

Contour - is a collection of environment variables. With contours you can seamlessly build and deploy application to different environments.

There are 3 contours: `local`, `dev`, `prod`.

For example, web application requires API url. For local development you may want to point it to local development sever. For `dev` build it should points to remote dev/staging server, and to corresponding server for production build.


## Environment variables

There are two types of environment variables: private and public. 

Public variables can be set up per contour in `app.config.js`.

Private variables should not be in the repository. They can be defined directly inside a working (CI/CD platform) enviroment of in a `.env.{contour}` files. These files should be excluded from the repository.

Client applications require `process.env.PUBLIC_CLICKER_API_URL` variable to connect to the remote API.


### Scripts

There are 4 main scripts for buildable or/and deployable packages: `build`, `dev`, `deploy`, `release`.

Every one accepts the following arguments:
- --target (-t) - target package
- --contur (-c) - target contour

`build` takes an additional `--prod` flag for production builds. It will be automatically turned on for `prod` contour.

### Examples

Build `next` application for production: 
```sh
$ yarn build -t next -c prod
```

Build `static-site` for local contour in production mode: 
```sh
$ yarn build -t static-site -c local --prod
```

## Deploy

### Firebase

In order to deploy to Firebase you need to specify your project ID in `.firebaserc`. Project is using two Firebase projects: one for `dev` contour, second for `prod` contour.

### Docker

To do
