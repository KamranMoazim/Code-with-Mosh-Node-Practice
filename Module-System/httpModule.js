const http = require("http")


// server.on("connection", (socket)=>{
//     console.log("New Connection...") 
//     console.log(socket)
// })


const server = http.createServer((req, res)=>{
    if (req.url === "/") {
        res.write("Hello Home Page")
        res.end()
    }
    if (req.url === "/api/courses") {
        res.write(JSON.stringify({
            courses: ["Node", "React", "Mongo", "Express"]
        }))
        res.end()
    }
});



server.listen(3000)


console.log("SERVER is Listening on Port 3000.")