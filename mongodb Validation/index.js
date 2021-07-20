const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/playground", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB.", err))

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ["web", "mobile", "network"],
        lowercase: true,
        // uppercase: true,
        // trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: { // this is custom VALIDATION
            validator: function (arrayElements) {
                return arrayElements && arrayElements.length > 0;
            },
            // validator: () => new Promise((resolve, reject)=>{
            //     // Do Async work here.
            //     resolve(arrayElements && arrayElements.length > 0)
            //     // reject(false)
            // }),
            message: "A course should have at least ONE tag."
        }
    },
    date: {
        type: String,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { // Arrow Function Cannot be USED here because Arrow dont have access to 'this' property
            return this.isPublished // it means if isPublihed is True then Price is Must else Not
        },
        min: 20,
        max: 200,
        // Following Functions are called automatically for setting the price value
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
})

const Course = mongoose.model("course", courseSchema)





async function saveCourse() {

    const course = new Course({
        name: "Mongo DB",
        category: "web",
        author: "Kamran",
        tags: [],
        tags: null,
        isPublished: true,
        price: 43.7
    })
    try {
        const result = await course.save();
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}
saveCourse()





async function getCourses() {
    const courses = await Course.find();
    console.log(courses)
}






async function getParticularCourse() {
    const courses = await Course
        .find({
            author: "Kamran"
        })
    console.log(courses)
}






// THIS is ******* METHOD one ******* of updating the course
async function updateCourseOne(id) {
    const course = await Course.findById(id)
    if (!course) return;
    course.isPublished = true;
    course.author = "Another Author";
    const result = await course.save();
    console.log(result)
}

// THIS is ******* METHOD two ******* of updating the course
async function updateCourseTwo(id) {
    // TO update one course at a time
    const result = await Course.updateOne({
        _id: id
    }, {
        $set: { // Search for mongodb UPDATE OPERATORS. for more details.
            author: "Kamran",
            isPublished: false
        }
    })

    console.log(result)
}

// THIS is ******* METHOD three ******* of updating the course
async function updateCourseThree(id) {
    const result = await Course.findByIdAndUpdate({
        id
    }, {
        $set: {
            author: "Kamran",
            isPublished: false
        }
    })
    console.log(result)
}






// DELETING METHOD ONE
async function deleteCourse(id) {
    const course = await Course.findByIdAndDelete(id);
    console.log(course)
}

// DELETING METHOD TWO
async function deleteCourseOne() {
    const courses = await Course.deleteOne({
        isPublished: false
    });
    console.log(courses)
}

// DELETING METHOD THREE
async function deleteCoursesMany() {
    const courses = await Course.deleteMany({
        isPublished: true
    });
    console.log(courses)
}

