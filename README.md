Sockerr - A Twitter clone (version 2);
========================

### Introduction

Twitter clone, made in order to try out some of the feature testing tools such as Casper and Selenium. Also to test socket.io and other misc stuff.

### Languages/Platforms/Tools

* Node.js
* Express
* MongoDB
* Mongoose
* Casper
* Selenium WebDriver
* Bcrypt
* Mocha
* Socket.io
* jQuery

### Learning Outcomes

Refresher project - Casper didn't turn out to be good with SPAs. Prefer Selenium. Ignore the lack of structure/modularisation of app.


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
