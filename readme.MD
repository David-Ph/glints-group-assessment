# Create backend service to manage Talent Pool Company

### Important Links

- [Click here to go to documentation](https://documenter.getpostman.com/view/14556972/UUy4dRfn)

- [Click here to go to deployed API](https://glints-talent-pool.herokuapp.com/)

### How to install

`npm install`
will install all dependencies

### How to run app locally

1. Create a `.env.development` file

2. In the content, insert the required env variable as shown in `.env.example`

3. Enter `npm run dev` in the console to run app at http://localhost:3000

### How to seed database with dummy data

1. Enter `npm run seed:dev` in the console

or

2. Enter `npm run seed:dev:remove` to clear database

### How to run test

1. Create a `.env.test` file

2. In the content, insert the required env variable as shown in `.env.example`. Note that running a test will clear the database and seed it again before actually running the test, as such, it's recommended to use a different database for testing.

3. Enter `npm run test` in the console to run test.

### Unit Test Result

![unit test](https://i.imgur.com/NeZVFbe.png)

### Requirements:

- ✔️ Manage data Talent create - read - update - delete
- ✔️ Manage data PIC create - read - update - delete
- ✔️ Manage data Company create - read - update - delete
- ✔️ Manage talent pool tracker create - read - update
  - ✔️ each talent pool tracker will contains info related with:
    - ✔️ talent
    - ✔️ selected PIC
    - ✔️ company
    - ✔️ application status
  - ✔️ application status must be on of these review, HR interview, User interview, offer, accepted, rejected
  - ✔️ every create a new talent pool tracker, application status should be started with review
- List of required endpoint
  - ✔️ talent GET, POST, DELETE, PUT
  - ✔️ company GET, POST, DELETE, PUT
  - ✔️ pic GET, POST, DELETE, PUT
  - ✔️ tracker GET, POST, PUT
  - ✔️ Response must be in JSON
  - ✔️ Use any Framework, Library and Database that you're comfortable
  - ✔️ Implement Unit Test / Integration Test or Both of them
  - ✔️ Clear Documentation how to setup and run in local environment
  - ✔️ Deploy to make it live and to be able consumed by client-side
