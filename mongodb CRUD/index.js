const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/playground", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB.", err))

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: String,
        default: Date.now
    },
    isPublished: Boolean
})

const Course = mongoose.model("course", courseSchema)


async function saveCourse() {
    const course = new Course({
        name: "Mongo DB",
        author: "Kamran",
        tags: ["easy", "mongo", "DB"],
        isPublished: false
    })
    const result = await course.save();
    console.log(result)
}
// saveCourse()



async function getCourses() {
    const courses = await Course.find();
    console.log(courses)
}
// getCourses()



async function getParticularCourse() {
    // Following are COMPARISON OPERATORS
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in ()
    // nin (not in)

    // Following are LOGICAL OPERATORS
    // or (OR)
    // and (AND)
    // not (NOT) 

    // Following are REGULAR EXPRESSIONS


    // const courses = await Course.find();    // to get all courses
    const courses = await Course
        .find({ // to search with only given properties
            author: "Kamran"
        })

        // Following are COMPARISON OPERATORS
        // .find({      
        //     // price: { $gte: 10, $lte: 20 }      // prices with b/w 10 to 20 dollars
        //     price: { $nin: [10, 20, 30] }      // prices which are not equal to 10 or 20 or 30
        // })

        // Following are LOGICAL OPERATORS
        // .find()
        // .or([{author: "Kamran"}, {author: "Ali"}])

        // Following are REGULAR EXPRESSIONS
        // .find({
        //     author: /^Kam/       // those authors whose names start with 'Kam'
        // })
        // .find({
        //     author: /ran$/       // those authors whose names end with 'ran'
        // })
        // .find({
        //     author: /.*mra.*/    // those authors whose names conatain 'mra',   // put 'i' at the end to make it case IN-sensitive like ----> /.*mra.*/i
        // })


        .limit(10) // to get only limited results
        .sort({ // to sort results with given properties
            name: 1
        })
        .select({ // to get only particular properties
            name: 1,
            tags: 1
        })
    //.count()  // to get the count of ONLY those documents(records) which matched your QUERY
    //.skip()   // to skip the number of documents(records) you want. Used for PAGINATION
    console.log(courses)
}
// getParticularCourse()



// THIS is ******* METHOD one ******* of updating the course
async function updateCourseOne(id) {
    const course = await Course.findById(id)
    if (!course) return;
    // METHOD 1
    course.isPublished = true;
    course.author = "Another Author";
    // METHOD 2
    // course.set({
    //     isPublished: true,
    //     author: "Another"
    // })
    const result = await course.save();
    console.log(result)
}
// updateCourseOne("60f2cfa75518604e186c1654")



// THIS is ******* METHOD two ******* of updating the course
async function updateCourseTwo(id) {
    // TO update one course at a time
    const result = await Course.updateOne({_id:id},{   
        $set: {          // Search for mongodb UPDATE OPERATORS. for more details.
            author:"Kamran",        
            isPublished: false
        }
    })
    // TO update Many courses in one GO
    // const result = await Course.updateMany({author:"Kamran"},{
    //     $set: {
    //         author:"None",       
    //         isPublished: true
    //     }
    // })
    console.log(result)
}
// updateCourseTwo("60f2cfa75518604e186c1654")



// THIS is ******* METHOD three ******* of updating the course
async function updateCourseThree(id) {
    const result = await Course.findByIdAndUpdate({id},{   
        $set: {         
            author:"Kamran",        
            isPublished: false
        }
    })
    console.log(result)
}
// updateCourseThree("60f2cfa75518604e186c1654")






// DELETING METHOD ONE
// async function deleteCourse(id) {
//     const course = await Course.findByIdAndDelete(id);
//     console.log(course)
// }


// DELETING METHOD TWO
// async function deleteCourse() {
//     const courses = await Course.deleteOne({isPublished: false});
//     console.log(courses)
// }
// deleteCourse()
// deleteCourse("60f2d005a865e44ec57630c7")


// DELETING METHOD THREE
// async function deleteCoursesMany() {
//     const courses = await Course.deleteMany({
//         isPublished: true
//     });
//     console.log(courses)
// }
// deleteCoursesMany();


