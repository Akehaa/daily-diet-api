<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# App

daily diet control app

## Functional Requirements
- [x] It should be able to register;
- [] It should be able to authenticate;
- [] It should be able to record a meal that has been completed, including:
  - Name;
  - Description;
  - Date and Hour;
  - Is it on the diet or not;
- [] It should be able to edit a meal, being able to change all the data above;
- [] It should be able to delete a meal;
- [] It should be able to list all the meals of a user;
- [] It should be able to view a specific meal;
- [] It should be able to get all the user metrics, including:
  - Total number of meals recorded;
  - Total number of meals in the diet;
  - Total number of meals out the diet;
  - Best sequence of meals within the diet;

## Business Requirements
- [x] It should be able to identify the user among the requests;
- [] The user can only view, edit and delete meals that it created;
- [] The user shouldn't be able to register with the same email;

## Non-functional Requirements
- [] User password must be encrypted;
- [] User must be identified by a JWT;
