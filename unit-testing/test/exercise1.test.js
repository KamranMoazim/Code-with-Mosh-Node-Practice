const ex = require("../exercise1");

// --------------------------- Testing about FizzBuzz ---------------------------
describe("FizzBuzz", () => {

    const args = [null, undefined, "", false, "anystring", 'a', {}, []];     // type of NaN is number  
    args.forEach(arg => {
        it(`should throw if number is ${arg}`, () => {
            expect(() => ex.fizzBuzz(arg)).toThrow();
        })
    })

    it('test should return FizzBuzz if number is divisible by 3 and 5 both', () => {
        const result = ex.fizzBuzz(15)
        expect(result).toContain("FizzBuzz");
    })

    it('test should return Fizz if number is divisible by 3', () => {
        const result = ex.fizzBuzz(15)
        expect(result).toContain("Fizz");
    })

    it('test should return Buzz if number is divisible by 5', () => {
        const result = ex.fizzBuzz(15)
        expect(result).toContain("Buzz");
    })


    it('test should return input Number', () => {
        const result = ex.fizzBuzz(4)
        expect(result).toBe(4);
    })

});

