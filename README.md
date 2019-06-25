# Project-tech - MetalMatch
![Logo](https://github.com/TomasS666/Project-tech/blob/master/Project_tech/Logo/SVG/Artboard%202.svg)

## Description
MetalMatch is a webapp for single metalheads where you might meet your other half by the taste in music.

## Features
* Creating an account
* Logging in
* Add metalartists to your top 20
* Find users with the same interest in artists

## Installation
 
### Step 1. Use a terminal, preferably with a bash shell. Navigate to the desired folder where you will clone my project to.
Enter the following command in your terminal ``` git clone https://github.com/TomasS666/Project-tech.git ```

### Step 2. In your terminal, make sure you are in the project folder. If you are, type in the following command.
Enter ``` npm install ``` in your terminal. It will install all depencies needed for the webapp.

### Step 3. Install MongoDB, follow the guide below to succesfully install MongoDB for managing your databases and collections
[MongoDB Installation](https://docs.mongodb.com/manual/installation/)

### Step 4. After installation MongoDB
After installing MongoDB follow the documentation. Make sure you make two different collections in your db.
```users``` & ```bands```. You'll need to populate the bands collection yourself. The schema of bands is simple though, it simply consists of a ```name: string``` key value pair.

### Step 5. Create your ```.env``` file in the root directory of the project.
If you want to develop locally, add the following lines:
DB_HOST=localhost
DB_PORT= [...YOUR PORT...]
DB_NAME=[...YOUR DB NAME...]

### Step 6. Go to your terminal and type ```node server.js ``` or ```nodemon server.js``` if you have nodemon installed.
Enjoy! You can now create users by registering and then you can add bands to the users. The bands will be pushed as objects to a top_20 array of the user. You can add and remove bands and you "quick search" the bands if client-side JS is enabled.

## Deploying options
There are different free services for deploying your nodejs project and your database. This webapp is deployed to **Heroku** and the database is deployed to **Mongo Atlas**.

## Things to know before deploying
* Don't forget to add env variables which you've written down in your env file to Heroku or another deployment service because if you don't, it's gonna take you hours of debugging for nothing... Happened to me. 

## Usage 
### Demo
If you want to try the demo, [click here](https://p-tech.herokuapp.com)

## License
The MIT License

Copyright (c) 2010-2019 Tomas Stolp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
