// asyncronous approach
console.log("Before");
getUser(1, getRepositories);
console.log("After");

function getRepositories(user) {
  getRepositories(user.gitHubUserName, getCommits);
}

function getCommits(repos) {
  getCommits(repos, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

// TO Deal with asyncronous programming
// callbacks
// Promises
// async / await

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database..... ");
    callback({
      id: id,
      gitHubUserName: "Mosh",
    });
  }, 2000);
}

function getRepositories(userName, callback) {
  setTimeout(() => {
    console.log("Getting Repos");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repos, callback) {
  setTimeout(() => {
    console.log("Getting comments");
    callback(["helo", "baby", "son o a b"]);
  }, 2000);
}
