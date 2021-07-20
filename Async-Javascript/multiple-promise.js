p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log("Promise 1 called!")
        resolve(1);
        // reject(new Error("REJECTED, Promise 1 call!"));
    },5000)
})

p2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log("Promise 2 called!")
        resolve(2)
        // reject(new Error("REJECTED, Promise 2 call!"));
    },2000)
})

// Promise.all([p1, p2])   // all promises must be completed first then you will receive values
//     .then(res=>{
//         console.log(res)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })

Promise.race([p1, p2])   // which promise completed first will be returned
    .then(res=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })