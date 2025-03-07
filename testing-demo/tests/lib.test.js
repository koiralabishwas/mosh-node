const lib = require('../lib')

//NOTE : tobe means excat same in memmory when it comes to object and arrays so use toEqual


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

describe('getProduct',() => {
  it('should return product id and price' , () => {
    const result = lib.getProduct(1)
    
    // expect(result).toEqual({id : 1 ,price : 10}) // needs to be exact same object
    expect(result).toMatchObject({id : 1 , price : 10}) // just need to contain these properties
    expect(result).toHaveProperty('id',1) // good if it has only this property
  })
})

describe('registerUser' , () => {
  it('should throw if userName is falsy', () => {
    const args = [undefined, null , NaN , "" , 0]

    args.forEach(a => {
      expect(() => {lib.registerUser(a)}).toThrow()
    })
  })

  it('should return user object if valid username' , () => {
    const result = lib.registerUser('Bishwas')
    expect(result).toMatchObject({username: 'Bishwas'})
    expect(result.id).toBeGreaterThan(0)
  })
}) 
