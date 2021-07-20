
// // ******************** CALLBACKS ********************

// // console.log("INDEX 1");
// // getUser(1, (user)=>{
// //     console.log(user.id)
// //     console.log(user.name)
// //     getRepos(user.name, (repos)=>{
// //         repos.map((repo)=>{ 
// //             // console.log(repo)
// //             getCommits(repo, (commit)=>{
// //                 console.log(commit)
// //             })
// //         })
// //         // getCommits() 
// //     })
// // })
// // // here you get into CALLBACK HELL!!!!!
// // console.log("INDEX 3");


// // function getUser(id, callback) {
// //     setTimeout(()=>{
// //         console.log("Reading Username form DB.....");
// //         callback({id, name:"Kamran"})
// //     }, 1000)
// // }


// // function getRepos(username, callback) {
// //     setTimeout(()=>{
// //         console.log("Calling Github API.....");
// //         console.log(`Following are the Repos of ${username}`)
// //         callback(["repo 1","repo 2","repo 3", "repo 4"])
// //     }, 2000)
// // }


// // function getCommits(reponame, callback) {
// //     setTimeout(()=>{
// //         console.log("Calling Github API for Commits.....");
// //         console.log(`Following are the Commits of Repo ${reponame}`)
// //         callback(["Commits"])
// //     }, 1000)
// // }







// // ******************** PROMISES ********************

// console.log("INDEX 1");
// // getUser(1)
// //     .then((user)=>{
// //         console.log(user.id)
// //         console.log(user.name)
// //         getRepos(user.name)
// //             .then((repos)=>{
// //                 repos.map(repo=>{
// //                     // console.log(repo)
// //                     getCommits(repo)
// //                         .then(res=>console.log(res))
// //                         .catch(err=>console.log(err))
// //                 })
// //             })
// //             .catch((err)=>console.log(err))
// //     })
// //     .catch((err)=>console.log(err))
// // ABOVE WAS A MISTAKE
// // BELOW IS CORRECT

// // getUser(1)
// //     .then((res)=>{return getRepos(res.name)})
// //     .then((repos)=>{
// //         return getCommits(repos[0])
// //     })
// //     .then((commit)=>console.log(commit))
// //     .catch((err)=>{console.log(err)})

// getUser(1)
//     .then((res)=>{return getRepos(res.name)})
//     .then((repos)=>{
//         return commits = repos.map((repo)=>{
//             console.log(repo)
//             return getCommits(repo)
//         })
//         // return commits
//     })
//     .then((commits)=>{
//         commits.map((commit)=>{
//             console.log(commit)
//         })
//     })
//     .catch((err)=>{console.log(err)})
// console.log("INDEX 3");


// function getUser(id) {
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             console.log("Reading Username form DB.....");
//             resolve({id, name:"Kamran"});
//             // reject("FAILED to Load! USERNAME")
//         }, 1000)
//     })
// }


// function getRepos(username) {
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             console.log("Calling Github API.....");
//             console.log(`Following are the Repos of ${username}`);
//             resolve(["repo 1","repo 2","repo 3", "repo 4"]);
//             // reject("FAILED to Load! REPOS")
//         }, 2000)
//     })
// }


// function getCommits(reponame) {
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             console.log("Calling Github API for Commits.....");
//             console.log(`Following are the Commits of Repo ${reponame}`);
//             resolve([`Commits for ${reponame}`]);
//             // reject("FAILED to Load! COMMITS")
//         }, 1000)
//     })
// }








// ******************** ASYNC and AWAIT ********************

console.log("INDEX 1");
// getUser(1)
//     .then((user)=>{
//         console.log(user.id)
//         console.log(user.name)
//         getRepos(user.name)
//             .then((repos)=>{
//                 repos.map(repo=>{
//                     // console.log(repo)
//                     getCommits(repo)
//                         .then(res=>console.log(res))
//                         .catch(err=>console.log(err))
//                 })
//             })
//             .catch((err)=>console.log(err))
//     })
//     .catch((err)=>console.log(err))
// ABOVE WAS A MISTAKE
// BELOW IS CORRECT

// getUser(1)
//     .then((res)=>{return getRepos(res.name)})
//     .then((repos)=>{
//         return getCommits(repos[0])
//     })
//     .then((commit)=>console.log(commit))
//     .catch((err)=>{console.log(err)})


async function displayCommits() {
    const user = await getUser(1);
    const repos = await getRepos(user.name);
    // const allCommits = repos.map(async (repo)=>{
    //     return await getCommits(repo)
    // })
    // allCommits.map((singleCommit)=>{
    //     console.log(singleCommit)
    // })
    const commit = await getCommits(repos[0]);
    console.log(commit)
}
displayCommits();

function getUser(id) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("Reading Username form DB.....");
            resolve({id, name:"Kamran"});
            // reject("FAILED to Load! USERNAME")
        }, 1000)
    })
}


function getRepos(username) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("Calling Github API.....");
            console.log(`Following are the Repos of ${username}`);
            resolve(["repo 1","repo 2","repo 3", "repo 4"]);
            // reject("FAILED to Load! REPOS")
        }, 2000)
    })
}


function getCommits(reponame) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("Calling Github API for Commits.....");
            console.log(`Following are the Commits of Repo ${reponame}`);
            resolve([`Commits for ${reponame}`]);
            // reject("FAILED to Load! COMMITS")
        }, 1000)
    })
}





