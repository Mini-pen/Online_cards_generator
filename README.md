# Intro
cards-generator is a javascript software to generate printable game cards based on svg templates and Framacalc spreadsheets to fill these templates.

# Install
Install dependances

`npm install`

Then compile

`rollup -c`

# Usage
Open **./index.html** with a browser.

# Doc
Create doc

`esdoc -c ./esdoc.json`

then open **./doc/index.html**

# Contributing
Please follow these rules when contributing to this project :
* Write everything in english.
* Use these 7 rules in your commit message : (for more detail see http://chris.beams.io/posts/git-commit/)
 * Separate subject from body with a blank line
 * Limit the subject line to 50 characters
 * Capitalize the subject line
 * Do not end the subject line with a period
 * Use the imperative mood in the subject line
 * Wrap the body at 72 characters
 * Use the body to explain what and why vs. how
* Use "standard" coding convention : http://standardjs.com
* Use semantic versioning for releases : http://semver.org/
* Use ES6 modules : http://exploringjs.com/es6/ch_modules.html
* Test code : https://mochajs.org/#getting-started (for mockery : https://sazzer.github.io/blog/2015/08/20/Unit-Testing-ES6-Modules-Mockery/)

# Test code
run

`npm test`

ps: It is ok if **mocha** tests don’t pass before a commit, but **standard** tests should


Thank you !