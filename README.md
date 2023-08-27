x# Caching Server

Caching server is a REST API server for the cachecheats web app built on Express abd Knex.js using Postgres DB.

## Testing

Testing is done using the [Japa](https://japa.dev/docs) testing tool using its [Assert plugin](https://japa.dev/docs/plugins/assert) and [Supertest](https://github.com/ladjs/supertest#readme) for emulating http calls.

## Architecture

- Top layer is API route definitions and route handlers.
  - API/resource/routes.
  - Route handlers/controllers send back responses and status codes but do no actual business logic.
  - The BaseController class contains methods for handling normal CRUD.
- Second layer is the service layer handling business logic and sending results or error back to calling controller
  - The BaseService class handles basic CRUD operations
  - Create a subclass for overriding validation functions and adding resource specific functionality
- Third layer is the data-access layer handling actual DB queries
  - BaseRepository class handles shared CRUD functionality
  -

## Requirements

- [x] As an admin I want to be able to CRUD places and cachetypes
  - Add CRUD API for places and cachetypes
- [] As a user i want to be able to register for an account so that I can use the application
  - Register endpoint for registering new user
- [] As an admin I need to be able to promote users to enable them to use the system
  - Add admin promote endpoint
- [] As a user I want to be able to log on so that I can use the system
  - Add logon endpoint
- [] As a user, when I am loggen on, I want to see my profile information so I can verify that the system holds correct information
  - Add user profile endpoint
- [] As a user I need to be able to reset my password if I have forgotten it
  - Add user pwd reset endpoint sending  email with expiring link for reset
- [] As a user I need to be able to list, filter, search add, update and archive caches that I have added.


## Project outline

- Basic setup
  - [x] Create initial app file. Server, linting, formatting, dev script using nodemon, db connection, config and logger
  - [x] Add launch file for VSCode debugging
  - [x] Add security middleware
  - [x] Setup testing tools
- Add DB migration(s) and data seeders
  - [x] DB migration for all known tables
  - [x] Seeders for populating all
  - [x] npm scripts for running migtations and seeding
  - [x] Create postgres DB for dev and test
  - [] Production DB setup
- Add REST API
  - [x] Add crud endpoints for places
  - [x] Refactor shared functionality to base classes
  - [x] Refactor to separate app and web server
  - [x] Refactor to create generic route handler class
  - [x] Add data validators
  - [x] Add CRUD endpoints for cachetypes
  - [] Add CRUD endpoints for users
  - [] Add authorization middleware
  - [] Add CRUD endpoints for caches and cachecomments
  - [] Add proper testing



