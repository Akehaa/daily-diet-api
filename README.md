# Daily Diet, a diet control API

API developed to assist users in managing their diets, allowing the recording, editing, deletion and statistical analysis of meals. It uses JWT for authentication.

It follows a Domain-Driven Design (DDD) approach. Has end-to-end and unit tests.

# Technologies

<div style="display: inline_block"><br>
<img align="center" alt="nodejs" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg">
<img align="center" alt="TypeScript" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg">
<img align="center" alt="nestjs" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg">
<img align="center" alt="prisma" height="60" width="80" src="https://vitest.dev/logo.svg">
<img align="center" alt="postgresql" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg">
<img align="center" alt="docker" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg">
<img align="center" alt="prisma" height="60" width="80" src="https://img.icons8.com/?size=256&id=YKKmRFS8Utmm&format=png">
</div>

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
