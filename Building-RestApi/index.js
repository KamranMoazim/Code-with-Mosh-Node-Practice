const express = require("express");
const app = express();

// For Input Validation
const Joi = require("joi");

// To work with req.body use Following 
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))
// to set PORT using following :-
// export PORT=5000 or any.

const courses = [{
        id: 1,
        name: "Node"
    },

    {
        id: 2,
        name: "React"
    },
    {
        id: 3,
        name: "Mongo"
    },
    {
        id: 4,
        name: "Express"
    }
];

app.get("/", (req, res) => {
    res.send("You are at /");
})

app.get("/api/courses", (req, res) => {
    res.send({
        courses
    });
})

app.get("/api/courses/:id", (req, res) => {
    // const requiredCourse = courses.filter(course => course.id === parseInt(req.params.id));
    // if (requiredCourse.length)  res.send(requiredCourse)
    // else res.status(404).send("Not Found")
    const course = courses.find(course => course.id === parseInt(req.params.id))
    if (course) return res.send(course)
    else res.status(404).send("Course with Given ID could Not Found.")
})

// app.get("/api/courses/:id/:date", (req, res)=>{
//     console.log(`You are at ${req.route.path}`);
//     res.send(req.params)
// })

// app.get("/api/courses", (req, res)=>{
//     console.log(`You are at ${req.route.path}`);
//     res.send(req.query)
// })


// To work with req.body use Following 
// app.use(express.json());
app.post("/api/courses", (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send(result.error);
    else {
        const course = {
            id: courses.length + 1,
            name: req.body.name
        }
        courses.push(course)
        res.send({
            course
        }); 
    }
})


app.put("/api/courses/:id", (req, res) => {
    let course = courses.find(course => course.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("Course with Given ID could Not Found.") 
    else {
        const schema = {
            name: Joi.string().min(3).required()
        }
        const result = Joi.validate(req.body, schema);
    
        if (result.error) return res.status(400).send(result.error);
        else {
            course.name = req.body.name
            res.send({
                course
            });
        }
    }
})


app.delete("/api/courses/:id", (req, res)=>{
    let course = courses.find(course => course.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("Course with Given ID could Not Found.") 
    else {
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        res.send({
            course
        })
    }
})


// app.get()
// app.post()
// app.put()
// app.delete()