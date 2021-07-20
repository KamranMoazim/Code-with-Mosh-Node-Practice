// Command to add documents(records) from JSON to MONGODB
// mongoimport --db mongo-exercises --collection courses --file exercise-data.json --jsonArray

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongo-exercises", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB.", err))

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    price: Number,
    date: {
        type: String,
        default: Date.now
    },
    isPublished: Boolean
})

const Course = mongoose.model("course", courseSchema)

// // EXERCISES ONE
// async function getParticularCourse() {
//     const courses = await Course
//         .find({
//             isPublished: true,
//             tags: {
//                 $in: ["backend"]
//             }
//         })
//         .sort({
//             name: 1
//         })
//         .select({
//             name: 1,
//             author: 1
//         })
//     console.log(courses)
// }
// getParticularCourse()



// // EXERCISES TWO
// async function getParticularCourse() {
//     const courses = await Course
//         .find({
//             isPublished: true,
//         })
//         .sort({
//             price: -1
//         })
//         .select({
//             name: 1,
//             author: 1
//         })
//     console.log(courses)
// }
// getParticularCourse()




// EXERCISES THREE
// async function getParticularCourse() {
//     const courses = await Course
//         .find({
//             isPublished: true,
//         })
//         .or([
//             {
//                 name: /.*by.*/
//             },
//             {
//                 price: {
//                     $gte: 15
//                 }
//             }
//         ])
//     console.log(courses)
// }
// getParticularCourse()