Sockerr - A Twitter clone (version 2);
========================

## Sockerr (version 2);

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
* Casperjs
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

Run the tests: 

```
In order to easily set up a test database and tear-down things withe ease, please use the following test runners that I have created (casper_runner is for feature tests):

$ node mocha_runner.js
$ node casper_runner.js
```

Start the node server and visit http://localhost:3000/

```
$ node app.js