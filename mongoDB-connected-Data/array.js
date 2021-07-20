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
    authors: [authorScehma]
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

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    })
    const result = await course.save();
    console.log(result)
}

async function listCourses() {
    const courses = await Course
        .find()
        .populate("author", "name -_id") // to get the author object with only name property excluding _id property
        //.populate("category", "name")
        .select("name author");
    console.log(courses)
}

async function updateAuthor(courseId) {
    const course = await Course.updateOne({
        _id: courseId
    }, {
        // $set: {
        //     "author.name":"New Updated Author"
        // }
        $unset: { // to remove anything completely or particular property
            "author": " "
        }
    });

    // const course = await Course.findById(courseId);
    // course.author.name = "Updated Author";
    // await course.save()
}


async function addAuthortoListofAuthors(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    await course.save()
}

async function removeAuthorfromListofAuthors(courseId, authorId) {
    // Method 1
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove()
    await course.save()
    // Method 2
    // const course = await Course.findById(courseId);
    // const requiredAuthor = course.authors.filter(author => author._id === authorId);
    // const index = course.authors.indexOf(requiredAuthor);
    // course.authors.splice(index, 1);
    // await course.save()
}

// createCourse("React", [ new Author({
//     name: "React Author 1",
//     bio: "React Author Bio 1",
//     website: "React Author website 1"
// }), new Author({
//     name: "React Author 2",
//     bio: "React Author Bio 2",
//     website: "React Author website 2"
// }), new Author({
//     name: "React Author 3",
//     bio: "React Author Bio 3",
//     website: "React Author website 3"
// })])

// addAuthortoListofAuthors("60f3eebc464a553df56812a4", new Author({
//     name:"fourth author",
//     bio:"fourth author bio"
// }))

removeAuthorfromListofAuthors("60f3eebc464a553df56812a4","60f3efcb0373763f5be27a94")

// updateAuthor("60f3e6d2d16d7635e5ae6e5f")

// listCourses();