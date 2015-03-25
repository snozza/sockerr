Sockerr - A Twitter clone (version 2);
========================

## Sockerr (version 2)

### Introduction

This is a redo of the Chitter - Twitter clone project (original named bitter_js).
I decided to redo the original clone done in node.js in order to completely test drive the project. Casperjs was chosen for the feature testing, while mocha was utilised for unit tests.
The goals were to get familiar with bootstrap, make a single page web app, and utilise sockets to ensure everythign was updated in realtime.
The end result is a bare-bones Twitter clone that allows users to sign up, log in, post/delete bites, and also see instant updates of other user's actions.

### Languages/Platforms/Tools

* Node.js
* Express
* MongoDB
* Mongoose
* Bcrypt
* Mocha
* Socket.io
* jQuery

### Learning Outcomes

I acheived the single page and real-time aspects relatively easily after extensively using sockets and JQuery in previous projects. The biggest issue was feature testing. I had hoped that Casperjs in isolation or combination with mocha would make this quite simple, and I was very pleased at first. However, Casperjs fell apart when it came to the extensive use of AJAX and JQuery (seems to be an issue with phantomjs headless browser). Other than that slight hiccup, this was a very good refresher project.


### To-do List
- [ ] Add equivalent functionality that I have in the original version (followers, private messages etc.)
- [ ] More use of Jquery animations for cool effects
- [ ] Improve the CSS and HTML (Current design is rather simple - using bootstrap).
- [ ] Add hashtags and other Twitter related content
- [ ] Find better testing tools for feature testing AJAX and JQuery.

### Instructions

The live version of the site will be available shortly.

Clone the repository:

```
$ git clone git@github.com:snozza/sockerr.git
```

Change into the directory and npm install the modules:

```
$ cd sockerr
$ npm install
```

Setup:

```
Ensure that mocha is installed globally:

$ npm install mocha -g

Download the chromedriver executable from http://chromedriver.storage.googleapis.com/index.html and place it on your path (e.g. /usr/local/bin).
Futher information can be found at https://code.google.com/p/selenium/wiki/ChromeDriver

Download the Selenium stand-alone server from http://www.seleniumhq.org/download
then in a separate terminal run:

$ java -jar /pathtofile/selenium-server-standalone-2.44.0.jar

Ensure that MongoDB is installed and run a mongodb server daemon in a seperate terminal

$ mongod
```

Run the tests: 

```
Please use the following test runner (includes setup and teardown of server and database)

$ node mocha_runner.js
```

Start the node server and visit http://localhost:3000/

```
$ node app.js
