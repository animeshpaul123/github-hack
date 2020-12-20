const jsonfile = require('jsonfile')
const moment = require('moment')
const FILE_PATH = './data.json'
const simpleGit = require('simple-git')();
const random = require('random')
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

const makeCommit = (n) => {
    const x = random.int(0, 54)
    const y = random.int(0, 6)
    const DATE = moment().subtract(1, 'year').add(1, 'day')
        .add(x, 'w').add(y, 'd').format()
    const data = {
        date: DATE
    }
    console.log(DATE)
    jsonfile.writeFile(FILE_PATH, data, () => {
        if (n === 0) return simpleGit.push('origin-main', 'master', () => {
            console.log("repo pushed")
        })
        simpleGit.add([FILE_PATH]).commit(DATE, { '--date': DATE }, makeCommit.bind(this, --n))
        // simpleGitPromise.add('.')
        //     .then(
        //         (addSuccess) => {
        //             console.log(addSuccess);
        //             simpleGitPromise.commit(DATE, { '--date': DATE })
        //                 .then(
        //                     (successCommit) => {
        //                         console.log(successCommit);
        //                         simpleGitPromise.push('origin-main', 'master')
        //                             .then((success) => {
        //                                 console.log('repo successfully pushed');
        //                             }, (failed) => {
        //                                 console.log('repo push failed', failed);
        //                             });
        //                     }, (failed) => {
        //                         console.log('failed commmit');
        //                     });
        //         }, (failedAdd) => {
        //             console.log('adding files failed');
        //         });
    })
}
makeCommit(100)
