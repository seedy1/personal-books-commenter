# NAME perosnal book jornal

## HOW TO RUN

## Setups

### 1. Install and setup node on your system
### 2. Install and setup Mysql and create a database and a test databaase
### 3. Add an .env file to the root folder and add the follwoing values accrodingly.
- DATABASE_NAME=NAME # make up
- TEST_DATABASE_NAME=NAME # make up
- DATABASE_USER=NAME # make up
- DATABASE_PASSWORD=NAME # make up
- DATABASE_PORT=PORT # make up
- DATABASE_HOST=NAME # make up
- PORT=PORT # make up
- BYCRYPT_SALT=NAME # make up
- SESSION_SECRET=NAME # make up

## Important commands 
### 1. Run the following commands to start the application
>`npm i`

>`npm gentypes`

>`node .\dist\index.js`

### 2. Run the following commands for testing
>`npm test` for testing

>`npm test-coverage` for coverage reporting

### To make changes to the code first run `npx tsc --watch` then `node .\dist\index.js`.

## TODO
#### my todo list to help me stay organzied 
- [x] book crud
- [x] book crud test - unit test
- [x] user auth - fs session and cookie
- [x] add swagger doc
- [x] link user with books
- [x] authorize user edit/delete for books they own
- [x] add islanbul for test coverage
- [x] 2nd test cycle
- [x] refactor ish
- [x] Add (persona and chapter and comment) feature
- [x] edit and delete (persona and chapter and comment) feature
- [x] final test
- [x] github actions
- [x] answer READNE questions for gradings

---

# Checkpoints report for the project

You **MUST** append a filled copy of this document at the end of your `README.MD`.

This document serves three main purposes:
- providing you a clear list of my expectations (check each point when done) ;
- ensuring I do not miss some of your engineering during the review ;
- asking for additional information that helps me during the review.

## Notice

Check every applicable checkbox in the above list. For each one, provide the requested additional information.

In your explanation, please provide links (file + line) to relevant parts of your source code and tests if applicable.

### Caption

🔵 means the checkbox is mandatory. If missing or absolutely not satisfying, it may cost you 0.5 penalty point.

## Expectations

### GraphQL API only

- [ ] Reduce code duplication for the various involved schemas (of the database, of the ORM, of GraphQL...). **[1 point]** 🔵
> How did you achieve this?

- [ ] Mitigation(s) against too complex GraphQL queries, arbitrary deep nested object fetching or related DoS. **[1 point per mitigation, up to 2]**
> Quote and explain each mitigation.

- [ ] Any security or performance improvement related to your GraphQL implementation, as optionally highlighted in the subject? points]**
> Explain each improvement.

### Input validation

- [x] Strictly and deeply validate the type of every input (`params, querystring, body`) at runtime before any processing. **[1 point]** 🔵
> How did you achieve this?

I achieved this by using fastify's validation. I do this by first creating a JSON schema with the accepted input fields and their types. Example src\schemas\json\user.json file is used to validate input src\routes\auth.ts in line 23. This is used in all places where an input is required. For Params I also did the same as seen in src\schemas\json\queryId.json which can been seen in src\routes\book.ts line 38.


- [x] Ensure the type of every input can be inferred by Typescript at any time and properly propagates across the app. **[1 point]** 🔵
> How did you achieve this?

I achieved this using the json2ts package https://www.npmjs.com/package/json2ts. When ever I updated a schema I ran `npm gentypes` which would generate/update the types from the JSON schemas.

- [x] Ensure the static and runtime input types are always synced. **[1 point]** 🔵
> How did you achieve this? If extra commands must be run before the typescript checking, how do you ensure there are run?

To do this one just simply runs `npm gentypes`. To do this automatically I can watch the schema files for any changes and run `npm gentypes` and that way the input and and tyepscript types will always be in sync.

### Authorisation

- [x] Check the current user is allowed to call this endpoint. **[1 point]** 🔵
> How did you achieve this?

I achieve this by using fastify hooks and preHandler at the same time as seen in `src\routes\user.ts` line 17. This will check authentication.

- [x] Check the current user is allowed to perform the action on a specific resource. **[1 point]** 🔵
> How did you achieve this?
I achieve this by first checking if the user is logged in, then I check if the user owns the resource to make changes. I do this in line 81 in `src\routes\user.ts` to chekc if a user can access and sepciifc book for viewing, editting and deleting. I checked if the book user id is the same as the current user ID. This will check authorization.


- [x] Did you build or use an authorisation framework, making the authorisation widely used in your code base? **[1 point]**
> How did you achieve this?

I used a combination of fastify-session and fastify-cookie to handle my authentication. It is injected into the fastify code so available throughtout my codebase. In the file src\lib\fastify.ts from line 24-31 I register the authentication 'protocols' to the fastify server/app which makes it available in all of my codebase.


- [ ] Do you have any way to ensure authorisation is checked on every endpoint? **[1 point]**
> It is pretty easy to forget authorising some action.
> For obvious reasons, it may lead to security issues and bugs.
> At work, we use `varvet/pundit` in our `Ruby on Rails` stack. It can raise exception just before answering the client if authorisation is not checked.
> https://github.com/varvet/pundit#ensuring-policies-and-scopes-are-used
> 
> How did you achieve this?

A way I could have done this if I had more time was to use a another prehandler/prevalidation hook to check if a user is authorized to visit certain routes. This could be a future improvemnt in the application

### Secret and configuration management

- [x] Use a hash for any sensitive data you do not need to store as plain text. 🔵
> Also check this if you do not store any password or such data (and say it here).

I did hash all sensitive data (only have password as a sensitive data) and stored their hashed value in the database, and not their plain text form. To acheive this I used TYPEORMs `@beforeSave()` hook to hash any password. See `src\models\Users.ts` the method starting at line 36.

- [x] Store your configuration entries in environment variables or outside the git scope. **[1 point]** 🔵
> How did you achieve this?

I used the .env package which enables me to keep configuration variables and added the file to my `.gitignore`. 

- [x] Do you provide a way to list every configuration entries (setup instructions, documentation, requireness... are appreciated)? **[1 point]**
> How did you achieve this?

Yes on top of this README.md file I give configuration instructions to be able to run the application.

- [x] Do you have a kind of configuration validation with meaningful error messages? **[1 point]**
> How did you achieve this?

I achieved this by having a fucntion to check if the env variable is present or not. If it is not present an error will be thrown warning you that it is missing. See the function in `src\lib\dotenv.ts` on line 33.

### Package management

- [x] Do not use any package with less than 50k downloads a week. 🔵

No :-)

- [ ] Did you write some automated tools that check no unpopular dependency was installed? If yes, ensure it runs frequently. **[1 point]**
> How did you achieve this? A Github Action (or similar) and compliance rule for pull requests are appreciated.


- [x] Properly use dependencies and devDevepencies in your package.json. **[0.5 points]**
> How did you achieve this?

I made sure to use --save-dev for packages which would only be used for development purposes and npm will put them in the devDevepencies section. This manin includes packages with `@types` and testing packages.

### Automated API generation

- [x] Do you have automated documentation generation for your API (such as OpenAPI/Swagger...)? **[1 point]** 🔵
  -- provide json export
> How did you achieve this?
> You must link your documentation for review (a Github page, a ZIP archive, an attachment to the release notes...).

I achieved this by using fastify swagger. See `src\lib\swaggerDoc.ts`. I will provide a the json export in the root folder. See `generated-swagger-docs.json` for json export.

- [ ] In addition to requireness and types, do you provide a comment for every property of your documentation? **[1 point]**
> How did you achieve this?

- [ ] Do you document the schema of responses (at least for success codes) and provide examples of payloads? **[1 point]**
> How did you achieve this?

- [ ] Is your documentation automatically built and published when a commit reach the develop or master branches? **[1 point]**
> How did you achieve this?

### Error management

- [x] Do not expose internal application state or code (no sent stacktrace in production!). **[1 point]** 🔵
> How did you achieve this?

I achieved this in two ways; The first was to implement a custom validator and made sure no internal server state was exposed.
The second is to turn off fastify logging. See `src\lib\fastify.ts` line 18.

- [ ] Do you report errors to Sentry, Rollbar, Stackdriver… **[1 point]**
> How did you achieve this?

### Log management

- [ ] Mention everything you put in place for a better debugging experience based on the logs collection and analysis. **[3 points]**
> How did you achieve this?

- [x] Mention everything you put in place to ensure no sensitive data were recorded to the log. **[1 point]**
> How did you achieve this?

I had no logs so no sensitive could be recorded.

### Asynchronous first

- [x] Always use the async implementations when available. **[1 point]** 🔵
> List all the functions you call in their async implementation instead of the sync one.
> 
> Ex: I used `await fs.readFile` in file `folder/xxx.ts:120` instead of `fs.readFileSync`.

I used `await genSalt()` in file `src\models\Users.ts` instead of `genSaltSync` in line 33.

I used `await hash()` in file `src\models\Users.ts` instead of `hashSync` in line 34.

Also for all my routes and typeORM methods I used async/await implemntations. For example in `src\routes\book.ts` line 24.



- [x] No unhandled promise rejections, no uncaught exceptions… **[1 point]** 🔵
> For example, how do you ensure every promise rejection is caught and properly handled?
> Tips: one part of the answer could be the use of a linter.

I will add try and catch clauses in most places where this can happen.
### Code quality

- [x] Did you put a focus on reducing code duplication? **[1 point]**
> How did you achieve this?

I achieved this by modularizing my application and follwoing the DRY convention.

For example I have a models folder which is used in both the test and dev databases. Instead of having user and user_test tables/models, I only have one user model which I used throughout the app.

Also created a shared fastify server in `src\lib\fastify.ts` which is being used for both dev run and test runs.

Utilized fastify hooks in `src\routes\user.ts` on line 17 instead of calling the preHandler in every route individually.


- [x] Eslint rules are checked for any pushed commit to develop or master branch. **[1 point]**
> Please provide a link to the sample of Github Action logs (or similar).

For every push to master I have a github action that runs the linter to check and log for any errors and warnings.

### Automated tests

- [ ] You implemented automated specs. **[1 point]** 🔵
> Please provide a link to the more complete summary you have.

- [x] Your test code coverage is 75% or more.  **[1 point]** 🔵
> Please provide a link to the `istanbul` HTML coverage summary (or from a similar tool).

Test coverage can be found in the `coverage` folder.
Here is a screenshot of a recent run.
![text coverage image](tc.png)


- [ ] Do you run the test on a CD/CI, such as Github Action? **[1 point]**
> Please provide a link to the latest test summary you have, hosted on Github Action or similar.
