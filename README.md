# express-project-template

This is a node api project template to see how I work

## Node architecture

- `srcs` Sources folder
- `dist` Folder for generated files
- `tslint.json` TSLinter configuration file
- `nodemon.json` Nodemon config file to watch project
- `tsconfig.json` Typescript config file

## Code architecture

I always use the base like this:

- Logger defined in [srcs/logger.ts](/srcs/logger.ts)
- Swagger defined in [srcs/swagger.ts](/srcs/swagger.ts)
- Stateless configuration setup with env [srcs/config.ts](/srcs/config.ts)
- Routes folder with a gloabal router `index.ts` [srcs/routes](/srcs/routes)
- Controllers folder for express route handlers
  [srcs/controllers](/srcs/controllers)

## Code standard

As a linter I like to use [standardjs](https://standardjs.com/) here I use tslint
with standard config

In `package.json` I often have at least five scripts:

- start
- build
- watch
- lint
- test

I prefer to use each CLI on code with npm like that we doesn't need to install
global package and CLI in node_modules will be used

# License

[MIT](https://en.wikipedia.org/wiki/MIT_License)
