const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/playground", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB.", err))



const authorScehma = mongoose.Schema({
    name: String,
    bio: String,
    website: String
})

const Author = mongoose.model("Author", authorScehma)
const Course = mongoose.model("Course", mongoose.Schema({
    name: String,
    author: {
        type: authorScehma,
        required: true
    }
}))



// async function (name, bio, website) {
//     const author = new Author({
//         name,
//         bio,
//         website
//     })
//     const result = await author.save();
//     console.log(result)
// }

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    })
    const result = await course.save();
    console.log(result)
}

async function listCourses() {
    const courses = await Course
                    .find()
                    .populate("author", "name -_id")   // to get the author object with only name property excluding _id property
                    //.populate("category", "name")
                    .select("name author");
    console.log(courses)
}

async function updateAuthor(courseId) {
    const course = await Course.updateOne({_id:courseId},{
        // $set: {
        //     "author.name":"New Updated Author"
        // }
        $unset: {  // to remove anything completely or particular property
            "author":" "
        }
    });

    // const course = await Course.findById(courseId);
    // course.author.name = "Updated Author";
    // await course.save()
}


// createCourse("React", new Author({name:"React Author", bio:"React Author Bio", website:"React Author website"}))

updateAuthor("60f3e6d2d16d7635e5ae6e5f")

// listCourses();