<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# App

daily diet control app

## Functional Requirements
- [x] It should be able to register;
- [x] It should be able to authenticate;
- [x] It should be able to record a meal that has been completed, including:
  - Name;
  - Description;
  - Date and Hour;
  - Is it on the diet or not.
- [x] It should be able to edit a meal, being able to change all the data above;
- [x] It should be able to delete a meal;
- [x] It should be able to list all the meals of an user;
- [x] It should be able to view a specific meal;
- [x] It should be able to get all the user metrics, including:
  - Total number of meals recorded;
  - Total number of meals in the diet;
  - Total number of meals out the diet;
  - Best sequence of meals within the diet.

## Business Requirements
- [x] It should be able to identify the user among the requests;
- [x] The user can only view meals that it created;
- [x] The user can only edit meals that it created;
- [x] The user can only delete meals that it created;
- [x] The user shouldn't be able to register with the same email.

## Non-functional Requirements
- [x] User password must be encrypted;
- [x] User must be identified by a JWT.
