// const EventEmitter = require("events")
// const emitter = new EventEmitter();


// // Register a listener 
// emitter.on("message1", (eventArgs)=>{
//     // emitter.emit("afterMessage")
//     console.log("Called1 : ", emitter.emit("afterMessage"))
//     console.log(eventArgs.name, " called at ", eventArgs.url)
// })

// emitter.once("afterMessage", ()=>{
//     console.log("called Once")
// })

// emitter.on("message2", ({name, url})=>{
//     console.log("Called2 : ", emitter.emit("afterMessage"))
//     console.log(name, " called at ", url)
// })


// // Raise an event
// emitter.emit("message1", {name: "message1", url:"https://localhost:3000"})
// emitter.emit("message2", {name: "message2", url:"https://localhost:9000"})





const Logger = require("./logger");
const logger = new Logger();


logger.on("message1", ({name, url})=>{
    console.log("object Called");
    console.log(name, " called at ", url)
})


logger.log("Show this on Console.");