console.log("before");
getUser(1,getCommits);

console.log("after");

function displayCommits(commits) {
  console.log(commits)
}

// 
function displayUser(u) {
  console.log("User", u);
  getRepositories(u.gitHubUserName,getCommits );

}



// 
function getCommits (repos) {
  console.log("repos" , r);
  getCommits(r , displayCommits)
  
}



function getUser(id, callBack) {
  setTimeout(() => {
    console.log("reading a user from databse ");
    callBack({ id: id, gitHubUserName: "BishwasKoirala" });
  }, 2000);
}

function getRepositories(userName, callBack) {
  setTimeout(() => {
    console.log("getting github repos");
    callBack(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(urm  , callback) {
  setTimeout(() => {
    console.log("getting commits ...")
    callback(["commit1" , "commit2" , "commit3"])
  })
}