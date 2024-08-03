console.log('Before');
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });

// getUser(1)
// .then(usr => getRepositories(usr.gitHubUsername))
// .then(repo => getCommits(repo[0]))
// .then(commits => console.log(commits))
// .catch(err => console.log("Error" , err))

// async and await approach

async function displayCommits() {
  try{const user = await getUser(1)
  const repos = await getRepositories(user.gitHubUsername);
  const commits = await getCommits(repos[0])
  console.log(commits)
} catch (err) {
  console.log("Error" , err.message)
}
}
displayCommits(1)



console.log('After');

function getUser(id) {
  return new Promise((resolve , reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
  })

}

function getRepositories(username, ) {
  return new Promise((resolve , reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  })
  
}

function getCommits(repo) {
  return new Promise((resolve , reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      reject(new Error("SMt failed while getting comments"));
    }, 2000);  
  })
}