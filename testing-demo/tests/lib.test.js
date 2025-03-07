const lib = require('../lib')


describe('absoloute', () => {
  it('absolute - should return positive if input is positive', () => { 
    const result = lib.absolute(1)
    expect(result).toBe(1)
  })
  
  it('absolute - should return negative if input is negative', () => { 
    const result = lib.absolute(-1)
    expect(result).toBe(1)
  })
  
  it('absolute - should return 0 if input is 0', () => { 
    const result = lib.absolute(0)
    expect(result).toBe(0)
  })
}) 

describe('greet' , ()=> {
  it('should return the greeting message',()=> {
    const result = lib.greet("Bishwas")
    // expect(result).toBe('Welcome Bishwas') // this is bad . too specifiv
    expect(result).toMatch(/Bishwas/) // this is good as long as it contains Bishwas
    expect(result).toContain("Bishwas") // this is good as long as it contains Bishwas
  })
})

describe('getCurrencies' , () => {
  it('should return supported currencies' , () => {
    const result = lib.getCurrencies()

    expect(result).toEqual(expect.arrayContaining(['EUR','AUD','USD','NP','JP']))
  })
})
