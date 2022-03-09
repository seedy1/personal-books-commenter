npx tsc --watch and node .\dist\scrap.js 
"test": "set NODE_ENV=test && mocha --recursive dist/specs --exit --async-stack-traces",

# NAME perosnal book jornal

## DESCRIPTION
add later

## HOW TO RUN

## Setups

### 1. Install and setup node on your system
### 2. Install and setup Mysql and create a database and a test databaase
### 3. Add an .env file to the root folder and add the follwoing values accrodingly.
- DATABASE_NAME=
- TEST_DATABASE_NAME=
- DATABASE_USER=
- DATABASE_PASSWORD=
- DATABASE_PORT=
- DATABASE_HOST=
- PORT=
- BYCRYPT_SALT=
- SESSION_SECRET=

## Important commands 
### 1. Run the following commands to start the application
>`npm i`

>`npm gentypes`

>`node .\dist\index.js`

### 2. Run the following commands for testing
>`npm test` for testing

>`npm test-coverage` for coverage reporting

### To run in production do the following
- skrtt
- skrtt

## TODO

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
- [ ] final test
- [ ] github actions
- [ ] answer READNE questions for gradings


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

I achieved this by using fastify's input validator. I do this by first creating a JSON schema with the accedpted fields and their types. Example src\schemas\json\user.json file is used to validate input src\routes\auth.ts in line 23. This is used in all places where an input is required. For Params I also did the same as seen in src\schemas\json\queryId.json which can been seen in src\routes\book.ts line 38.

----------------------
- [x] Ensure the type of every input can be inferred by Typescript at any time and properly propagates across the app. **[1 point]** 🔵
> How did you achieve this?

I achieved this using the json2ts package-https://www.npmjs.com/package/json2ts. When ever I updated a schema I ran `npm gentypes` which would generate/update the types from the JSON schemas.

- [ ] Ensure the static and runtime input types are always synced. **[1 point]** 🔵
> How did you achieve this? If extra commands must be run before the typescript checking, how do you ensure there are run?

To do this one just simply runs `npm gentypes`. To do this automatically I can watch the schema schema files for any changes and run `npm gentypes`.

### Authorisation

- [x] Check the current user is allowed to call this endpoint. **[1 point]** 🔵
> How did you achieve this?

- [ ] Check the current user is allowed to perform the action on a specific resource. **[1 point]** 🔵
> How did you achieve this?

- [ ] Did you build or use an authorisation framework, making the authorisation widely used in your code base? **[1 point]**
> How did you achieve this?

- [ ] Do you have any way to ensure authorisation is checked on every endpoint? **[1 point]**
> It is pretty easy to forget authorising some action.
> For obvious reasons, it may lead to security issues and bugs.
> At work, we use `varvet/pundit` in our `Ruby on Rails` stack. It can raise exception just before answering the client if authorisation is not checked.
> https://github.com/varvet/pundit#ensuring-policies-and-scopes-are-used
> 
> How did you achieve this?

### Secret and configuration management

- [ ] Use a hash for any sensitive data you do not need to store as plain text. 🔵
> Also check this if you do not store any password or such data (and say it here).

- [ ] Store your configuration entries in environment variables or outside the git scope. **[1 point]** 🔵
> How did you achieve this?

- [ ] Do you provide a way to list every configuration entries (setup instructions, documentation, requireness... are appreciated)? **[1 point]**
> How did you achieve this?

- [ ] Do you have a kind of configuration validation with meaningful error messages? **[1 point]**
> How did you achieve this?

### Package management

- [ ] Do not use any package with less than 50k downloads a week. 🔵

- [ ] Did you write some automated tools that check no unpopular dependency was installed? If yes, ensure it runs frequently. **[1 point]**
> How did you achieve this? A Github Action (or similar) and compliance rule for pull requests are appreciated.

- [ ] Properly use dependencies and devDevepencies in your package.json. **[0.5 points]**
> How did you achieve this?

### Automated API generation

- [ ] Do you have automated documentation generation for your API (such as OpenAPI/Swagger...)? **[1 point]** 🔵
  -- provide json export
> How did you achieve this?
> You must link your documentation for review (a Github page, a ZIP archive, an attachment to the release notes...).

- [ ] In addition to requireness and types, do you provide a comment for every property of your documentation? **[1 point]**
> How did you achieve this?

- [ ] Do you document the schema of responses (at least for success codes) and provide examples of payloads? **[1 point]**
> How did you achieve this?

- [ ] Is your documentation automatically built and published when a commit reach the develop or master branches? **[1 point]**
> How did you achieve this?

### Error management

- [ ] Do not expose internal application state or code (no sent stacktrace in production!). **[1 point]** 🔵
> How did you achieve this?

- [ ] Do you report errors to Sentry, Rollbar, Stackdriver… **[1 point]**
> How did you achieve this?

### Log management

- [ ] Mention everything you put in place for a better debugging experience based on the logs collection and analysis. **[3 points]**
> How did you achieve this?

- [ ] Mention everything you put in place to ensure no sensitive data were recorded to the log. **[1 point]**
> How did you achieve this?

### Asynchronous first

- [ ] Always use the async implementations when available. **[1 point]** 🔵
> List all the functions you call in their async implementation instead of the sync one.
> 
> Ex: I used `await fs.readFile` in file `folder/xxx.ts:120` instead of `fs.readFileSync`.

- [ ] No unhandled promise rejections, no uncaught exceptions… **[1 point]** 🔵
> For example, how do you ensure every promise rejection is caught and properly handled?
> Tips: one part of the answer could be the use of a linter.

### Code quality

- [ ] Did you put a focus on reducing code duplication? **[1 point]**
> How did you achieve this?

- [ ] Eslint rules are checked for any pushed commit to develop or master branch. **[1 point]**
> Please provide a link to the sample of Github Action logs (or similar).

### Automated tests

- [ ] You implemented automated specs. **[1 point]** 🔵
> Please provide a link to the more complete summary you have.

- [ ] Your test code coverage is 75% or more.  **[1 point]** 🔵
> Please provide a link to the `istanbul` HTML coverage summary (or from a similar tool).

- [ ] Do you run the test on a CD/CI, such as Github Action? **[1 point]**
> Please provide a link to the latest test summary you have, hosted on Github Action or similar.