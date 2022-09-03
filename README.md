# PERSONAL NOVEL JOURNAL

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
