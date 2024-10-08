## Running dev

`npm install`

```bash
npm run dev -- --open
```

## migrations

```bash
npx knex migrate:make _name_of_migration # e.g. npx knex migrate:make create_users
```

**Note:** you need to change the generated migration file from Knex generated CommonJS to ES6 module code.

```javascript
exports.up = function (knex) {

// becomes:

export async function up(knex) {

//same with the down function
```

````


```bash

npx knex migrate:latest
````

### rollback the last migration

```bash
npx knex migrate:rollback
```
