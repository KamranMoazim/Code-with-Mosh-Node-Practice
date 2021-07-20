// ******************** CALLBACKS ********************
// getCustomer(1, (customer)=>{
//     console.log("Customer : ", customer);
//     if (customer.isGold) {
//         getTopMovies((movies)=>{
//             console.log("Top Movies : ", movies);
//             sendEmail(customer.email, movies, ()=>{
//                 console.log("Email sending......")
//             })
//         })
//     }
// })
function getCustomer(id, callback) {
    setTimeout(()=>{
        callback({
            id,
            name:"Kamran",
            isGold: true,
            email: "kamrannaseer765@gmail.com"
        })
    },5000)
}
function getTopMovies(callback) {
    setTimeout(()=>{
        callback(["movie 1","movie 2"])
    },2000)
}
function sendEmail(email, movies, callback) {
    setTimeout(()=>{
        callback()
    },2000)
}







// ******************** ASYNC and AWAIT ********************
async function doTheTask() {
    const customer = await getCustomer(1);
    console.log("Customer : ",customer)
    const topMovies = await getTopMovies();
    console.log("Top Movies : ",topMovies)
    return await sendEmail(customer.name, topMovies);
}

// doTheTask();


function getCustomer(id) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({
                id,
                name:"Kamran",
                isGold: true,
                email: "kamrannaseer765@gmail.com"
            })
        },5000)
    })
}
function getTopMovies() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(["movie 1","movie 2"])
        },2000)
    })
}
function sendEmail(email, movies) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("Email sending......")
            resolve()
        },2000)
    })
}




// ******************** PROMISES ********************

// getCustomer(1)
//     .then((user)=>{
//         console.log("Customer : ",user);
//         getTopMovies();
//     })
//     .then((movies)=>{
//         console.log("Top Movies : ",movies);
//         sendEmail(user.name, movies)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
