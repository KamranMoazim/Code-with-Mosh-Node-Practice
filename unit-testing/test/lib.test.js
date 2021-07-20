// https://jestjs.io/docs/using-matchers -----------------> Documentation Link
// https://jestjs.io/docs/api -----------------> Documentation Link for Functions

const lib = require("../lib")

// --------------------------- Testing about Numbers ---------------------------
describe("absolute", ()=>{
    it('test should return a positive number if number in input is positive.', () => {
        const result = lib.absolute(1)
        expect(result).toBe(1);
    })
    // it('test should return a positive number if number in input is negative.', () => {
    //     const result = lib.absolute(-1)
    //     expect(result).toBe(1);
    // })
    // it('test should return a 0 if number in input is 0.', () => {
    //     const result = lib.absolute(0)
    //     expect(result).toBe(0);
    // })
})


// --------------------------- Testing about Strings ---------------------------
// describe("greet",()=>{
//     it("should return greeting message.", () => {
//         const result = lib.greet("Kamran");
//         // expect(result).toBe("Welcome Kamran");   // to check exact
//         // expect(result).toContain("Kamran");      // to check particular string in text
//         // expect(result).toMatch(/Kamran/);      // to check regular expression in text
//     })
// });


// --------------------------- Testing about Arrays ---------------------------
// describe("getCurrencies",()=>{
//     it("should return supported currencies.", () => {
//         const result = lib.getCurrencies();
//         // Too GENRAL
//         // expect(result).toBeDefined();
//         // expect(result).not.toBeNull();
//         // Too SPECIFIC
//         // expect(result[0]).toBe("USD");
//         // expect(result[1]).toBe("AUD");
//         // expect(result[2]).toBe("EUR");
//         // expect(result.length).toBe(3); 
//         // PROPER way
//         // expect(result).toContain("USD");
//         // expect(result).toContain("EUR");
//         // expect(result).toContain("AUD");
//         // expect(result.length).toBeGreaterThan(2);
//         // IDEAL way
//         expect(result).toEqual(expect.arrayContaining(["USD", "PKR"]))
//     })
// });



// --------------------------- Testing about Objects ---------------------------
// describe("getProduct",()=>{
//     it("should return product with given id.", () => {
//         const result = lib.getProduct(1);
//         // expect(result).toEqual({ id: 1, price: 10 });          // it checks the product should contain these no more no less
//         // expect(result).toMatchObject({ id: 1, price: 10 });    // it checks the product should contain these
//         // expect(result).toHaveProperty("id", 1);             // it checks the product should contain this property
//     })
// });




// --------------------------- Testing about Exceptions ---------------------------

// describe("registerUser", () => {
//     // it("should throw if username is falsy.", () => {
//     //     // following are falsy values in Js
//     //     // null
//     //     // undefined
//     //     // NaN
//     //     // ''
//     //     // 0
//     //     // false
//     //     const args = [null, undefined, NaN, '', 0, false]
//     //     args.forEach(arg => {
//     //         expect( () => lib.registerUser(arg) ).toThrow();
//     //     })
//     // })
//     const args = [null, undefined, NaN, '', 0, false]
//     args.forEach(arg => {
//         it(`should throw if username is ${arg}`, () => {
//             expect(() => lib.registerUser(arg)).toThrow();
//         })
//     })

//     it("should return a user object if username is valid.", () => {
//         const result = lib.registerUser("Kamran");
//         expect(result).toHaveProperty("username");
//         expect(result.id).toBeGreaterThan(0);
//     })

// });





