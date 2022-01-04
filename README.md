# Scheduling App
- Express JS
- PostgreSQL
- Sequelize
- PUG

https://user-images.githubusercontent.com/59971064/148086926-521cb93a-1d5f-4b5b-83aa-303294fb1db6.MP4
## Description
This aplication menages your team's schedules. Every team member can create, edit or delete their time slot and check planned schedules of coworkers.
## How to start
```
npm install
npm run start
```
## Functionality of application
### Users
- [x]  Every user can have his personal account. Email about registration can be sent on user request (using checkbox).
- [x]  Only unique users in database.
- [x]  Every user has his own profile, which he is able to modify. Ex., change name or email.
- [x]  Authenticated user can delete his profile at any time. All his data including schedules will be removed permanently
- [x]  User's passwords in database are hashed by bCrypt package
### Schedules
- [x]  Only authenticated users can add new schedules.
- [x]  Schedules can't be overlapping.
- [x]  Start time has to be before end time.
- [x]  Users can modify or delete their own schedules.
### Additional
- [x]  Dashboard shows:
- current user time,
- total amount of registered users,
- planned schedules.
- [x]  Application uses module which prevents the Cross-Site Request Forgery attacks.
## Features to add in future
- [ ]  Add possibility to change profile image
- [ ]  Filtering and sorting lists of schedules and users
- [ ]  Hide not actual schedules
- [ ]  Add calendar view to schedules
- [ ]  Advanced authentication options: resetting passwords, comfirm email after registration etc.
