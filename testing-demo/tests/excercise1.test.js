const exercise1 = require('../exercise1')

describe('fizzbuzz' , () => {

  it('FizzBuzz - should return FizzBuzz if divisible by 3 and 5' , () => {
    const args = [15 , 30 , 45 , 60 , 75 , 90]
    args.forEach(arg => {
      expect(exercise1.fizzBuzz(arg)).toBe('FizzBuzz')
    });
  })
  it('Fizz - should return Fizz if only divisible by 3' , () => {
    const args = [3,6,9,12,18,21,24,27]
    args.forEach(arg => expect(exercise1.fizzBuzz(arg)).toBe('Fizz'))
  })

  it('Buzz - should return Buzz if only divisible by Five' , () => {
    const args = [5 , 10 , 20 , 25, 35 , 40 ,50 , 55 , 65]
    args.forEach(arg => expect(exercise1.fizzBuzz(arg)).toBe('Buzz'))
  })

  it ('number - returns givenNumber if not divisible by either 3 or 5' , () => {
    const args = [1,2,4,7,8,11,13]
    args.forEach(arg => expect(exercise1.fizzBuzz(arg)).toBe(arg))
  })

  it ('thorw - throws error if not a number' , () => {
    const args = [''  , undefined , null] // NaN's type is number
    args.forEach(arg => {
      expect(() => exercise1.fizzBuzz(arg)).toThrow()
    })
  })
})