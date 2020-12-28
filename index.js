const jsonfile = require('jsonfile')
const moment = require('moment')
const FILE_PATH = './data.json'
const simpleGit = require('simple-git')();
const DATE = moment().subtract(2, 'days').add(10, 'days').format()
const simpleGitPromise = require('simple-git/promise')();
const data = {
    date: DATE
}
// Repo name
const repo = 'github-hack';  //Repo name
// User name and password of your GitHub
const userName = 'animeshpaul123';
const password = 'animesH!animesH';
// Set up GitHub url like this so no manual entry of user pass needed
const gitHubUrl = `https://${userName}:${password}@github.com/${userName}/${repo}.git`;
// add local git config like username and email
simpleGit.addConfig('user.email', 'animeshpaul333@gmail.com');
simpleGit.addConfig('user.name', 'Animesh Paul');
// Add remore repo url as origin to repo
// simpleGitPromise.addRemote('origin-main', gitHubUrl);


// simpleGit().add(FILE_PATH).commit(DATE, { '--date': DATE })

const execute = () => {
    // Add all files for commit
    simpleGitPromise.add('.')
        .then(
            (addSuccess) => {
                console.log(addSuccess);
                simpleGitPromise.commit(DATE, { '--date': DATE })
                    .then(
                        (successCommit) => {
                            console.log(successCommit);
                            simpleGitPromise.push('origin-main', 'master')
                                .then((success) => {
                                    console.log('repo successfully pushed');
                                }, (failed) => {
                                    console.log('repo push failed', failed);
                                });
                        }, (failed) => {
                            console.log('failed commmit');
                        });
            }, (failedAdd) => {
                console.log('adding files failed');
            });
    // Commit files as Initial Commit

    // Finally push to online repository
}
jsonfile.writeFile(FILE_PATH, data, () => {
    execute()
})
