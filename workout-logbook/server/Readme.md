# Workout Server

Screenshots for Workout Server assignment. Server side is fully functional.

## Register a user

Registering a user will return crypted password and a session token that is required to create, update or delete posts.

![Postman - Register](https://github.com/jcharfauros/Workout-Log/blob/master/server/assets/WL_register.png)

## PGAdmin - Users database

![PGAdmin - Users](https://github.com/jcharfauros/Workout-Log/blob/master/server/assets/PGA_users.png)

## Log in

When a registered user logs in they will get a session token.

![Postman - Login](https://github.com/jcharfauros/Workout-Log/blob/master/server/assets/WL_login.png)

## Create a Workout log entry

![Postman - Create](https://github.com/jcharfauros/Workout-Log/blob/master/server/assets/WL_create.png)

## PGAdmin - Log database

![PGAdmin - Logs](https://github.com/jcharfauros/Workout-Log/blob/master/server/assets/PGA_logs.png)

## Get

Get all workout entries inside the database.

![Postman - Get All](https://github.com/jcharfauros/Workout-Log/blob/master/server/assets/WL_getAll.png)

Get an individual workout entry

![Postman - Individual](https://github.com/jcharfauros/Workout-Log/blob/master/server/assets/WL_getIndividual.png)

## Update

Registered users are only allowed to update their own entries.

![Postman - Update](https://github.com/jcharfauros/Workout-Log/blob/master/server/assets/WL_update.png)

## Delete

Registered users are only allowed to delete their own entries.

![Postman - Delete](https://github.com/jcharfauros/Workout-Log/blob/master/server/assets/WL_deleteSuccess.png)
![Postman - Delete](https://github.com/jcharfauros/Workout-Log/blob/master/server/assets/WL_deleteErr.png)

## Folders that were created

- Middleware
- Controllers
- Models

## Files that were created

- app.js
- db.js
- .env
- .gitignore
- user controller
- log controller
- validate session
