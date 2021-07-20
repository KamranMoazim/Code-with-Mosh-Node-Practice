const p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        // resolve(1);                  //  pending => resolved, fulfilled
        // reject(new Error("ERROR"));  //  pending => rejected
    },5000)
})

p
.then((res)=>{console.log(res)})
.catch((err)=>{console.log(err)})