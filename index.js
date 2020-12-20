const jsonfile = require('jsonfile')
const moment = require('moment')
const FILE_PATH = './data.json'
const simpleGit = require('simple-git')();
const DATE = moment().format()
const simpleGitPromise = require('simple-git/promise')();
const data = {
    date: DATE
}

jsonfile.writeFile(FILE_PATH, data)
// simpleGit().add(FILE_PATH).commit(DATE, { '--date': DATE })

// Repo name
const repo = 'github-hack';  //Repo name
// User name and password of your GitHub
const userName = 'animeshpaul123';
const password = 'animesH@123';
// Set up GitHub url like this so no manual entry of user pass needed
const gitHubUrl = `https://${userName}:${password}@github.com/${userName}/${repo} `;
// add local git config like username and email
simpleGit.addConfig('user.email', 'animeshpaul333@gmail.com');
simpleGit.addConfig('user.name', 'Animesh Paul');
// Add remore repo url as origin to repo
// simpleGitPromise.addRemote('origin-n', gitHubUrl);
// Add all files for commit
simpleGitPromise.add('.')
    .then(
        (addSuccess) => {
            console.log(addSuccess);
            simpleGitPromise.commit('Intial commit by simplegit')
                .then(
                    (successCommit) => {
                        console.log(successCommit);
                        simpleGitPromise.push('origin', 'master')
                            .then((success) => {
                                console.log('repo successfully pushed');
                            }, (failed) => {
                                console.log('repo push failed');
                            });
                    }, (failed) => {
                        console.log('failed commmit');
                    });
        }, (failedAdd) => {
            console.log('adding files failed');
        });
// Commit files as Initial Commit

// Finally push to online repository
