
# multiple-choice-questions

[![Build Status](https://img.shields.io/github/workflow/status/dominikklein/multiple-choice-questions/Test%20&%20Build)](https://github.com/dominikklein/multiple-choice-questions/actions/workflows/checks.yml)
[![Nest.js](https://img.shields.io/github/package-json/dependency-version/dominikklein/multiple-choice-questions/@nestjs/core)](https://nestjs.com/)
[![TypeORM](https://img.shields.io/github/package-json/dependency-version/dominikklein/multiple-choice-questions/typeorm)](https://typeorm.io/)
[![GraphQL](https://img.shields.io/github/package-json/dependency-version/dominikklein/multiple-choice-questions/graphql)](https://graphql.org/)
[![License](https://img.shields.io/github/package-json/license/dominikklein/multiple-choice-questions?color=white)](http://www.wtfpl.net/)

## Description

A simple multiple choice question API with (NestJS)[https://nestjs.com/] and (GraphQL)[https://graphql.org/] query language.

It's possible to add questions in mulitple languages and for different categories.
The same questions in multiple languages should be combined with the `questionUuid` column.

The API is available with the following GraphQL entry endpoint `/graphql`.
Also the GraphQL playground is available with the following url `https://localhost:3000/graphql`.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
