# ePistolarium 2.0

## Clone & build
The build command will generate a bunch of TypeScript errors,
don't worry about them, the generated JavaScript will function properly and
the errors will be fixed shortly.
```
$ git clone https://github.com/HuygensING/e-pistolarium-2.0
$ cd e-pistolarium-2.0
$ npm i
$ npm run build
```

## Run locally
Startup the server and a webserver for the client.
Use two terminal windows because both commands start a running process.
```
$ npm run server
$ npm run server-client
```

## ToDo

- Style Home (faceted search and results)
- Save annotation
- Refactor handling of annotations to start/end anchors
- Dockerize
- Cache search results (impossible with current backend)
