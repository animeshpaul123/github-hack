const jsonfile = require('jsonfile')
const moment = require('moment')
const FILE_PATH = './data.json'
const simpleGit = require('simple-git')();

const simpleGitPromise = require('simple-git/promise')();

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

const makeCommit = (x, y) => {
    const DATE = moment().subtract(1, 'y').add(1, 'd')
        .add(x, 'w').add(y, 'd').format()
    const data = {
        date: DATE
    }
    jsonfile.writeFile(FILE_PATH, data, () => {
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
    })
}
makeCommit(3, 3)
// Add remore repo url as origin to repo
// simpleGitPromise.addRemote('origin-main', gitHubUrl);


// simpleGit().add(FILE_PATH).commit(DATE, { '--date': DATE })

const execute = () => {
    // Add all files for commit

    // Commit files as Initial Commit

    // Finally push to online repository
}
// jsonfile.writeFile(FILE_PATH, data, () => {
//     execute()
// })
