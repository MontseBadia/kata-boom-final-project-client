# Project Name

- KATA-BOOM


## Description

Platform in which users can solve easy-level katas and send them as a challenge to his/her friends.


## User Stories

  **404:** As an anon/user I want to see a 404 page if I try to reach a page that does not exist so that I know it's my fault

  **500:** As an anon/user I want to see a 500 page if I try to reach a page and I can't so that I know there is a server error
  
  **Signup:** As an anon I can sign up in the platform so that I can do a kata
  
  **Login:** As a anon I can login to the platform so that I can do a kata
  
  **Logout:** As a user I can logout from the platform so that no one else can use my account 

  **Get Random Kata:** As a user I want to get a random kata so that I can do it
 
  **Type Solution:** As a user I want to type my solution to the kata so that I can submit it

  **Check Kata:** As a user I want to send my solution so that I can check if it has passed all tests

  **Submit Kata:** As a user I want to submit my kata so that I know if it was right

  **See Profile:** As a user I want to see my profile so that I see the katas I 've already done


## Backlog

  **Look for Friends:** As a user I would like to look for my friends in the platform

  **Add Friend:** As a user I would like to add my friends to my friends' list

  **Send Kata to Friend:** As a user I would like to send a kata challenge to a friend

  **Receive Kata from Friend:** As a user I would like to receive a kata challenge from a friend

  **Accet Kata Challenge:** As a user I would like to accept a kata challenge

  **See Friends' Profile:** As a user I would like to see my friends' profiles and the katas they have done

  **Comment on Katas:** As a user I would like to comment on my own and on my friends' katas

  **See Katas Comments:** As a user I would like to see my friends comments on the katas

  **Edit Comments:** As a user I would like to see edit my comments

  **Remove Comments:** As a user I would like to remove comments on my katas

  
# Client

## Routes

  - / - Homepage
  - /auth/signup - Signup form
  - /auth/login - Login form
  - /profile - Details of user, list of katas and option to get kata
  - /kata/name - Description of kata and editor to solve kata

### Backlog

  - /profile/friend/:id - Friend's profile
  - etc.

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.getMe()

- Kata Service
  - kata.getRandom()
  - getOne(name)
  - kata.check(id, solution)
  - kata.submit(id, solution)  

## Pages

- 404 Page
- 500 Page
- Sign in Page
- Log in Page
- Home Page
- Kata Detail Page
- Profile Page

## Components

- Navbar component
  - I
  - O
- Kata Card component
  - I: kata details
  - O
- Login/Signup form components
  - I
  - O: submit form

## Guards

- /: init auth
- /login: anon 
- /signup: anon 
- /profile: user
- /kataId: user

# Server

## Models

  User model

  ```
  username: { type: string / required / unique },
  email: { type: string / required / unique },
  password: { type: string / required },
  katas: [ { kata: { type: ObjectId / ref: Kata }, solution: { type: string } } ]
  ```

  Kata model

  ```
  name: { type: string / required },
  functionName: { type: string / required },
  description: { type: string / required },
  tests: [ { params: [ mixed ], result: { type: mixed / required } } ]
  ```

## API Endpoints/Backend Routes

- GET /auth/me
  - user only (404)
- POST /auth/signup
  - anon only (401)
- POST /auth/login
  - anon only (401)
- POST /auth/logout
  - user only (404)

- GET /profile
  - user only (401)
- GET /kata/random
  - user only (401)
- GET /kata/:name
  - user only (401)
  - body (kata)
- POST /kata/:id/check 
  - user only (401)
  - body (solution)
- POST /user/me/katas 
  - user only (401)
  - body (kataId, solution)
