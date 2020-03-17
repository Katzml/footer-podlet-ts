# A simple podium's podlet on Express TypeScript server


## Run on dev server with
```
npm run dev
```
Run the index.ts without compilation, you need need to have nodemon installed globally.

## Compile TS to JS with
```
npm run build
```
With this command you generate a build folder on root of project, 
this folder contain a index.js was build from index.ts with ES6 config.

## Run your JS build file with
```
npm start
```
You must build the index.ts file with "build" command before run the start command, 
this command execute the index.js file on the build folder


### NOTE: You will define your own env variables for the PORT of server
