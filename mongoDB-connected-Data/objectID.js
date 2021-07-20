
// _id: 60f4174d04775c7a9a1b16c6

// made with 12 bytes
    // 4 bytes : timestamp
    // 3 bytes : machine identifier
    // 2 bytes : process identifier
    // 3 bytes : counter


// 1 byte = 8 bits   ====> 0 or 1
// 2 ^ 8 = 256
// 2 ^ 24 = 16 Million  -----> for counter ----> so its almost impossible to have same object _id although you have same timestamp, machine identifuier and process identifier


const mongoose = require("mongoose");

const id = mongoose.Types.ObjectId();
console.log(id)
console.log(id.getTimestamp())
console.log(id.generationTime)