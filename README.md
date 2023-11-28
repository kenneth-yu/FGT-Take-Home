This was created using the generic remix sandbox. All you need to run the application is to a simple `npm install` followed by a `npm run dev`. The usual app url will be `localhost:3000` but be sure to take a look at the console output just incase the port is already in use. 

Given more time, there are a few places where the code can be refactored for a little bit more reusability. Some of the designs could also be a little more precise and flushed out with the guidance from a designer. 


# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
