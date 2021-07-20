const express = require("express");
const router = express.Router();


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

const schema = {
name: Joi.string().min(3).required()
}


router.get("/", (req, res) => {
    res.send({
        courses
    });
})

router.get("/:id", (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id))
    if (course) return res.send(course)
    else res.status(404).send("Course with Given ID could Not Found.")
})


router.post("/", (req, res) => {
    const result = schema.validate(req.body);
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


router.put("/:id", (req, res) => {
    let course = courses.find(course => course.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("Course with Given ID could Not Found.") 
    else {
        const result = schema.validate(req.body);
    
        if (result.error) return res.status(400).send(result.error);
        else {
            course.name = req.body.name
            res.send({
                course
            });
        }
    }
})


router.delete("/:id", (req, res)=>{
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



module.exports = router;