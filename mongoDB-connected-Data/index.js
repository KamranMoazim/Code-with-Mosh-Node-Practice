// Trade off between Query Performance vs Consistency

// FIRST APPROACH
// using References (Normailization)   --> CONSISTENCY++   -->  QUERY PERFORMANCE--
const author = { 
    name: "kamran",
    // other properties
}
const course = {
    author : "id",
}

// SECOND APPROACH
// using Embedded Documents (Denormailization) --> QUERY PERFORMANCE++   --> CONSISTENCY--
const course = {
    author : { 
        name: "kamran"
        // other properties
    }
}

// THIRD APPROACH  ---> Combination of both above mentioned
const author = { 
    name: "kamran",
    // 50 other properties
}
const course = {
    id : "ref",
    name: "kamran"
}